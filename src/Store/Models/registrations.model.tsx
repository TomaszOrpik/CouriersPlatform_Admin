import { Registration } from "./Registration.model";

export interface Registrations {
  registrationsList: Registration[];
  addRegistrationValidators: string[];
  validated: boolean;
  activeRegistrationId: string;
}
