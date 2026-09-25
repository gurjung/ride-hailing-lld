export abstract class User {
  protected id: string;
  protected name: string;
  protected phoneNumber: string;
  protected email: string;
  protected rating: number;

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    rating: number = 5.0,
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.rating = rating;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRating(): number {
    return this.rating;
  }

  public setRating(rating: number): void {
    this.rating = rating;
  }
}
