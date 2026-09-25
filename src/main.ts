import { RiderService } from "./services/RiderService";
import { DriverService } from "./services/DriverService";
import { PricingService } from "./services/PricingService";
import { PaymentService } from "./services/PaymentService";
import { RideService } from "./services/RideService";
import { Rider } from "./models/Rider";
import { Driver } from "./models/Driver";
import { Location } from "./models/Location";
import { VehicleFactory } from "./factories/VehicleFactory";
import { VehicleType } from "./enums/VehicleType";
import { PaymentMethod } from "./enums/PaymentMethod";
import { SurgePricingStrategy } from "./strategies/pricing/SurgePricingStrategy";
import { RatingBasedDriverStrategy } from "./strategies/matching/RatingBasedDriverStrategy";

const riderService = new RiderService();
const driverService = new DriverService();
const pricingService = new PricingService();
const paymentService = new PaymentService();

const rideService = new RideService(
  driverService,
  riderService,
  pricingService,
  paymentService,
);

const rider1 = new Rider(
  "R-101",
  "Alice Johnson",
  "+1-555-0101",
  "alice@example.com",
  500.0,
);
const rider2 = new Rider(
  "R-102",
  "Bob Smith",
  "+1-555-0102",
  "bob@example.com",
  10.0,
);
riderService.registerRider(rider1);
riderService.registerRider(rider2);

const sedan1 = VehicleFactory.createVehicle(
  "DL-01-AB-1234",
  "Honda City",
  VehicleType.SEDAN,
);
const sedan2 = VehicleFactory.createVehicle(
  "DL-01-CD-5678",
  "Hyundai Verna",
  VehicleType.SEDAN,
);
const suv1 = VehicleFactory.createVehicle(
  "DL-02-EF-9012",
  "Toyota Innova",
  VehicleType.SUV,
);

const driver1 = new Driver(
  "D-201",
  "David Miller",
  "+1-555-0201",
  "david@example.com",
  sedan1,
  new Location(28.6139, 77.209),
  4.6,
);
const driver2 = new Driver(
  "D-202",
  "Sarah Connor",
  "+1-555-0202",
  "sarah@example.com",
  sedan2,
  new Location(28.625, 77.215),
  4.9,
);
const driver3 = new Driver(
  "D-203",
  "James Wilson",
  "+1-555-0203",
  "james@example.com",
  suv1,
  new Location(28.618, 77.21),
  4.8,
);

driverService.registerDriver(driver1);
driverService.registerDriver(driver2);
driverService.registerDriver(driver3);

console.log(
  "--- SCENARIO 1: Standard Ride Flow with Nearest Driver & Wallet Payment ---",
);
const pickup1 = new Location(28.614, 77.2092);
const drop1 = new Location(28.7041, 77.1025);

const ride1 = rideService.requestRide(
  rider1.getId(),
  pickup1,
  drop1,
  VehicleType.SEDAN,
);
console.log(
  `Estimated Fare: $${ride1.getFare()} for ${ride1.getDistanceInKm()} km`,
);

rideService.startRide(ride1.getId());
const payment1 = rideService.completeRide(ride1.getId(), PaymentMethod.WALLET);
console.log(
  `Payment Status for ${payment1.getId()}: ${payment1.getStatus()}\n`,
);

console.log("--- SCENARIO 2: Payment Fallback via Chain of Responsibility ---");
const pickup2 = new Location(28.62, 77.212);
const drop2 = new Location(28.65, 77.23);

const ride2 = rideService.requestRide(
  rider2.getId(),
  pickup2,
  drop2,
  VehicleType.SEDAN,
);
console.log(
  `Estimated Fare: $${ride2.getFare()} (Rider Wallet Balance: $${rider2.getWalletBalance().toFixed(2)})`,
);

rideService.startRide(ride2.getId());
const payment2 = rideService.completeRide(ride2.getId(), PaymentMethod.WALLET);
console.log(
  `Payment Status for ${payment2.getId()}: ${payment2.getStatus()} via ${payment2.getPaymentMethod()}\n`,
);

console.log(
  "--- SCENARIO 3: Runtime Strategy Switching (Surge Pricing & Rating-Based Matching) ---",
);
pricingService.setPricingStrategy(new SurgePricingStrategy(1.8));
rideService.setMatchingStrategy(new RatingBasedDriverStrategy(20.0));

const pickup3 = new Location(28.615, 77.21);
const drop3 = new Location(28.68, 77.25);

const ride3 = rideService.requestRide(
  rider1.getId(),
  pickup3,
  drop3,
  VehicleType.SEDAN,
);
console.log(
  `Surge Fare: $${ride3.getFare()} for ${ride3.getDistanceInKm()} km`,
);
if (ride3.getDriver()) {
  console.log(
    `Assigned Driver: ${ride3.getDriver()!.getName()} (Rating: ${ride3.getDriver()!.getRating()})`,
  );
}

rideService.startRide(ride3.getId());
const payment3 = rideService.completeRide(ride3.getId(), PaymentMethod.WALLET);
console.log(
  `Payment Status for ${payment3.getId()}: ${payment3.getStatus()}\n`,
);

console.log("--- SCENARIO 4: Cancellation Lifecycle ---");
const ride4 = rideService.requestRide(
  rider1.getId(),
  pickup1,
  drop1,
  VehicleType.SUV,
);
console.log(`Current Status: ${ride4.getStatus()}`);
rideService.cancelRide(ride4.getId());
console.log(`Status after cancellation: ${ride4.getStatus()}`);

try {
  rideService.startRide(ride4.getId());
} catch (error) {
  if (error instanceof Error) {
    console.log(`Lifecycle Guard Caught: ${error.message}`);
  }
}
