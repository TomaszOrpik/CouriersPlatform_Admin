import { Position } from "./Position.model";
import { User } from "./User.model";

export interface Package {
  id: string;
  packageNumber: string;
  sendDate: Date;
  receiver: User;
  sender: User;
  position: Position;
  comments: string;
  status: PackageStatus;
}

export enum PackageStatus {
  failed = "Niedostarczona",
  waiting = "Oczekująca", ///w dystrybucji
  assigned = "Wydana do dostarczenia", ///jest u kuriera
  inProgress = "W trakcie dostarczania", ///jest u kuriera jako obecnie dostarczana
  delivered = "Dostarczona",
}

export {};
