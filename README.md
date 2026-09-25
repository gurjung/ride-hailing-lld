# Ride-Hailing Platform - Low-Level Design (LLD)

A robust, object-oriented Low-Level Design (LLD) implementation of an on-demand ride-hailing system (similar to Uber / Ola), built with **Java-style TypeScript** following SOLID principles and classic Gang of Four (GoF) design patterns.

---

## Architecture & Project Structure

The project strictly separates domain models, service coordinators, algorithmic strategies, and state transitions into dedicated layers:

```text
src/
├── enums/                  # System-wide enumerations
│   ├── PaymentMethod.ts    # WALLET, CARD, CASH
│   ├── PaymentStatus.ts    # PENDING, COMPLETED, FAILED
│   ├── RideStatus.ts       # REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED
│   └── VehicleType.ts      # BIKE, SEDAN, SUV, PREMIUM
│
├── factories/              # Creational patterns
│   └── VehicleFactory.ts   # Centralized vehicle creation with capacities & rates
│
├── interfaces/             # Centralized abstractions & contracts
│   ├── DriverMatchingStrategy.ts
│   ├── PricingStrategy.ts
│   ├── RideObserver.ts
│   └── RideState.ts
│
├── models/                 # Pure domain entities (encapsulated state)
│   ├── Driver.ts           # Extends User; vehicle, location, availability
│   ├── Location.ts         # Coordinates with Haversine distance calculation
│   ├── Payment.ts          # Payment transaction entity
│   ├── Ride.ts             # Aggregate root managing lifecycle & observers
│   ├── Rider.ts            # Extends User; wallet balance & fund operations
│   ├── User.ts             # Abstract base user (id, name, phone, rating)
│   └── Vehicle.ts          # Vehicle specs, base fare & per-km rate
│
├── observers/              # Observer pattern implementations
│   ├── DriverNotificationObserver.ts
│   └── RiderNotificationObserver.ts
│
├── payment/                # Chain of Responsibility pattern implementations
│   ├── CardPaymentHandler.ts
│   ├── PaymentHandler.ts   # Abstract handler with setNext & passToNext
│   ├── PaymentValidationHandler.ts
│   └── WalletPaymentHandler.ts
│
├── services/               # Orchestration and business service layer
│   ├── DriverService.ts    # Driver fleet tracking, GPS pings, availability queries
│   ├── PaymentService.ts   # Payment handler chain setup and execution
│   ├── PricingService.ts   # Fare calculation with pluggable pricing strategies
│   ├── RiderService.ts     # Rider account management
│   └── RideService.ts      # Facade orchestrating matching, trips, and payments
│
├── states/                 # State pattern implementations
│   ├── AcceptedState.ts
│   ├── CancelledState.ts
│   ├── CompletedState.ts
│   ├── InProgressState.ts
│   └── RequestedState.ts
│
├── strategies/             # Strategy pattern implementations
│   ├── matching/
│   │   ├── NearestDriverStrategy.ts
│   │   └── RatingBasedDriverStrategy.ts
│   └── pricing/
│       ├── StandardPricingStrategy.ts
│       └── SurgePricingStrategy.ts
│
└── main.ts                 # End-to-end interactive simulation runner
```

---

## Applied Design Patterns

| Pattern | Category | Implementation | Real-World Purpose |
|---|---|---|---|
| **Strategy** (Pricing) | Behavioral | `PricingStrategy`, `StandardPricingStrategy`, `SurgePricingStrategy` | Allows runtime switching of fare calculation rules (standard distance rates vs. peak surge multipliers). |
| **Strategy** (Matching) | Behavioral | `DriverMatchingStrategy`, `NearestDriverStrategy`, `RatingBasedDriverStrategy` | Decouples driver selection algorithms (proximity-based vs. highest-rated driver within radius). |
| **State** | Behavioral | `RideState`, `RequestedState`, `AcceptedState`, `InProgressState`, `CompletedState`, `CancelledState` | Enforces valid trip lifecycle transitions and guards against invalid actions (e.g., cannot start a cancelled trip). |
| **Observer** | Behavioral | `RideObserver`, `RiderNotificationObserver`, `DriverNotificationObserver` | Automatically broadcasts trip status updates to riders and drivers without coupling entities to notification delivery channels. |
| **Chain of Responsibility** | Behavioral | `PaymentHandler`, `PaymentValidationHandler` $\rightarrow$ `WalletPaymentHandler` $\rightarrow$ `CardPaymentHandler` | Implements multi-tier payment handling with automatic fallback to secondary payment methods upon insufficient wallet balance. |
| **Factory** | Creational | `VehicleFactory` | Encapsulates instantiation and parameterization of various vehicle categories (`BIKE`, `SEDAN`, `SUV`, `PREMIUM`). |

---

## SOLID Principles Highlights

- **Single Responsibility Principle (SRP)**: Entities maintain only state; fleet tracking is isolated to `DriverService`, billing pipelines to `PaymentService`, and ride orchestration to `RideService`.
- **Open/Closed Principle (OCP)**: New pricing strategies (e.g., flat rates), matching heuristics (e.g., EV priority), or payment methods (e.g., UPI) can be added without modifying existing core code.
- **Liskov Substitution Principle (LSP)**: All concrete state classes, pricing strategies, and payment handlers can be swapped transparently for their base abstractions.
- **Interface Segregation Principle (ISP)**: Interfaces in `src/interfaces/` are lean and focused, ensuring classes only depend on methods they need.
- **Dependency Inversion Principle (DIP)**: High-level services depend on abstractions (`PricingStrategy`, `PaymentHandler`, `DriverMatchingStrategy`), not concrete implementations.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### Running the Simulation
Execute the full end-to-end simulation covering all 4 core scenarios:
```bash
npm start
```

### Type Checking
Verify strict TypeScript compilation with zero type errors:
```bash
npx tsc --noEmit
```

### Formatting Code
Format all project files using Prettier:
```bash
npx prettier --write .
```

---

## Simulation Scenarios Demonstrated in `main.ts`

1. **Standard Trip**: Ride requested $\rightarrow$ nearest driver matched dynamically $\rightarrow$ trip started $\rightarrow$ completed $\rightarrow$ direct wallet payment.
2. **Payment Fallback Pipeline**: Rider with insufficient wallet balance triggers automatic fallback to credit card via the Chain of Responsibility.
3. **Runtime Strategy Switching**: Dynamically changes pricing strategy to `SurgePricingStrategy(1.8)` and matching strategy to `RatingBasedDriverStrategy(20.0 km)`.
4. **Lifecycle Guards & Cancellation**: Rider cancels trip; system verifies that subsequent illegal state actions (e.g. attempting to start a cancelled ride) are caught and rejected by state guards.

---

## Assignment Deliverables

- **Source Code**: Fully typed, humanized Java-style TypeScript with zero comments in `src/`.
- **Core Pseudocode**: [`Code_Pseudocode.txt`](Code_Pseudocode.txt) demonstrating the 5 applied design patterns.
- **Design Note**: [`Design_Note.pdf`](Design_Note.pdf) (and [`Design_Note.md`](Design_Note.md)) detailing architectural decisions, SOLID alignment, scalability, testability, and trade-offs.
- **Class Diagram**: PlantUML specification for high-resolution UML class diagram export.
