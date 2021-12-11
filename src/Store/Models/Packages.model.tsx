import { Package } from "./Package.model";

export interface Packages {
  packagesList: Package[];
  addPackageValidators: string[];
  validated: boolean;
  activePackageId: string;
}
