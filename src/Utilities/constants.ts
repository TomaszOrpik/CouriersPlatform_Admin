export class CONSTANTS {
  static API_ENDPOINT =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3005/"
      : "to_add_production_endpoint";
  static MAP_ENDPOINT =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/'
      : 'to_add_production_endpoint';
}
