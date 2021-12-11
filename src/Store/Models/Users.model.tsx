import { User } from "./User.model";

export interface Users {
  usersList: User[];
  addUserValidators: string[];
  validated: boolean;
}
