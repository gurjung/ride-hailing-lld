import { Ride } from "../models/Ride";
import { Location } from "../models/Location";
import { VehicleType } from "../enums/VehicleType";
import { PaymentMethod } from "../enums/PaymentMethod";
import { Payment } from "../models/Payment";
import { DriverService } from "./DriverService";
import { RiderService } from "./RiderService";
import { PricingService } from "./PricingService";
import { PaymentService } from "./PaymentService";
import { DriverMatchingStrategy } from "../interfaces/DriverMatchingStrategy";
import { NearestDriverStrategy } from "../strategies/matching/NearestDriverStrategy";
import { RiderNotificationObserver } from "../observers/RiderNotificationObserver";
import { DriverNotificationObserver } from "../observers/DriverNotificationObserver";
import { VehicleFactory } from "../factories/VehicleFactory";

export class RideService {
  private driverService: DriverService;
  private riderService: RiderService;
  private pricingService: PricingService;
  private paymentService: PaymentService;
  private matchingStrategy: DriverMatchingStrategy;
  private rides: Map<string, Ride>;
  private rideCounter: number;
  private paymentCounter: number;

  constructor(
    driverService: DriverService,
    riderService: RiderService,
    pricingService: PricingService,
    paymentService: PaymentService,
    matchingStrategy: DriverMatchingStrategy = new NearestDriverStrategy(),
  ) {
    this.driverService = driverService;
    this.riderService = riderService;
    this.pricingService = pricingService;
    this.paymentService = paymentService;
    this.matchingStrategy = matchingStrategy;
    this.rides = new Map<string, Ride>();
    this.rideCounter = 1;
    this.paymentCounter = 1;
  }

  public setMatchingStrategy(strategy: DriverMatchingStrategy): void {
    this.matchingStrategy = strategy;
  }

  public requestRide(
    riderId: string,
    pickup: Location,
    drop: Location,
    vehicleType: VehicleType,
  ): Ride {
    const rider = this.riderService.getRider(riderId);
    if (!rider) {
      throw new Error(`Rider not found: ${riderId}`);
    }

    const distanceInKm = pickup.distanceTo(drop);
    const sampleVehicle = VehicleFactory.createVehicle(
      "SAMPLE",
      "SAMPLE",
      vehicleType,
    );
    const estimatedFare = this.pricingService.calculateFare(
      distanceInKm,
      sampleVehicle,
    );

    const rideId = `RIDE-${this.rideCounter++}`;
    const ride = new Ride(
      rideId,
      rider,
      pickup,
      drop,
      vehicleType,
      distanceInKm,
      estimatedFare,
    );

    ride.addObserver(new RiderNotificationObserver());
    ride.addObserver(new DriverNotificationObserver());

    this.rides.set(rideId, ride);

    const availableDrivers =
      this.driverService.getAvailableDrivers(vehicleType);
    const matchedDriver = this.matchingStrategy.findDriver(
      pickup,
      availableDrivers,
    );

    if (matchedDriver) {
      ride.accept(matchedDriver);
    } else {
      console.log(
        `[RideService] No available ${vehicleType} drivers found for ride ${rideId}.`,
      );
    }

    return ride;
  }

  public startRide(rideId: string): void {
    const ride = this.getRide(rideId);
    if (!ride) {
      throw new Error(`Ride not found: ${rideId}`);
    }
    ride.start();
  }

  public completeRide(rideId: string, paymentMethod: PaymentMethod): Payment {
    const ride = this.getRide(rideId);
    if (!ride) {
      throw new Error(`Ride not found: ${rideId}`);
    }

    ride.complete();

    const paymentId = `PAY-${this.paymentCounter++}`;
    const payment = new Payment(
      paymentId,
      ride.getId(),
      ride.getFare(),
      paymentMethod,
    );

    this.paymentService.processPayment(payment, ride.getRider());
    return payment;
  }

  public cancelRide(rideId: string): void {
    const ride = this.getRide(rideId);
    if (!ride) {
      throw new Error(`Ride not found: ${rideId}`);
    }
    ride.cancel();
  }

  public getRide(rideId: string): Ride | undefined {
    return this.rides.get(rideId);
  }
}
