import { Package } from "./Package.model";
import { Position } from "./Position.model";
import { Region } from "./Region.model";

export interface Courier {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  startPosition: Position;
  vehicle: string;
  registration: string;
  startTime: string;
  region: Region;
  deliveredPackages: Package[];
  undeliveredPackages: Package[];
  currentPackages: Package;
}

export { };
