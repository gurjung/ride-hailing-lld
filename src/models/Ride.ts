import { Rider } from "./Rider";
import { Driver } from "./Driver";
import { Location } from "./Location";
import { VehicleType } from "../enums/VehicleType";
import { RideStatus } from "../enums/RideStatus";
import { RideState } from "../interfaces/RideState";
import { RequestedState } from "../states/RequestedState";
import { RideObserver } from "../interfaces/RideObserver";

export class Ride {
  private id: string;
  private rider: Rider;
  private driver: Driver | null;
  private pickupLocation: Location;
  private dropLocation: Location;
  private vehicleType: VehicleType;
  private distanceInKm: number;
  private fare: number;
  private state: RideState;
  private observers: RideObserver[];

  constructor(
    id: string,
    rider: Rider,
    pickupLocation: Location,
    dropLocation: Location,
    vehicleType: VehicleType,
    distanceInKm: number,
    fare: number = 0.0,
  ) {
    this.id = id;
    this.rider = rider;
    this.driver = null;
    this.pickupLocation = pickupLocation;
    this.dropLocation = dropLocation;
    this.vehicleType = vehicleType;
    this.distanceInKm = distanceInKm;
    this.fare = fare;
    this.state = new RequestedState();
    this.observers = [];
  }

  public getId(): string {
    return this.id;
  }

  public getRider(): Rider {
    return this.rider;
  }

  public getDriver(): Driver | null {
    return this.driver;
  }

  public setDriver(driver: Driver): void {
    this.driver = driver;
  }

  public getPickupLocation(): Location {
    return this.pickupLocation;
  }

  public getDropLocation(): Location {
    return this.dropLocation;
  }

  public getVehicleType(): VehicleType {
    return this.vehicleType;
  }

  public getDistanceInKm(): number {
    return this.distanceInKm;
  }

  public getFare(): number {
    return this.fare;
  }

  public setFare(fare: number): void {
    this.fare = fare;
  }

  public getState(): RideState {
    return this.state;
  }

  public setState(state: RideState): void {
    this.state = state;
    this.notifyObservers();
  }

  public getStatus(): RideStatus {
    return this.state.getStatus();
  }

  public addObserver(observer: RideObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: RideObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public notifyObservers(): void {
    for (const observer of this.observers) {
      observer.onRideStatusChanged(this);
    }
  }

  public accept(driver: Driver): void {
    this.state.accept(this, driver);
  }

  public start(): void {
    this.state.start(this);
  }

  public complete(): void {
    this.state.complete(this);
  }

  public cancel(): void {
    this.state.cancel(this);
  }
}
