import { Package } from "./Package.model";
import { User } from "./User.model";

export interface Registration {
  id: string;
  package: Package;
  date: Date;
  user: User;
  subject: string;
  additionalInfo: string;
  contactPhone: number;
  contactMail: string;
  status: RegistrationStatus;
}

export enum RegistrationStatus {
  solved = "Rozwiązane",
  assigned = "Przypisane",
  waiting = "Oczekujące",
}

export { };
