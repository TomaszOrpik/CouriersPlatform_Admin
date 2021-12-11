import { Courier } from "./Courier.model";

export interface Couriers {
  couriersList: Courier[];
  addCourierValidators: string[];
  validated: boolean;
  activeCourierId: string;
}
