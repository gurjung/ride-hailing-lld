export class Location {
  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public distanceTo(other: Location): number {
    const earthRadiusKm = 6371;
    const dLat = this.toRadians(other.getLatitude() - this.latitude);
    const dLon = this.toRadians(other.getLongitude() - this.longitude);
    const lat1 = this.toRadians(this.latitude);
    const lat2 = this.toRadians(other.getLatitude());

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return Math.round(distance * 100) / 100;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
