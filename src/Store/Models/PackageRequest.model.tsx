import { PackageStatus } from "./Package.model";
import { Position } from "./Position.model";

export class PackageRequest {
  id: string;
  packageNumber: string;
  sendDate: string;
  receiver: string;
  sender: string;
  position: Position;
  comments: string;
  status: PackageStatus;

  constructor(
    id: string,
    packageNumber: string,
    sendDate: string,
    receiver: string,
    sender: string,
    position: Position,
    comments: string,
    status: PackageStatus,
  ) {
    this.id = id;
    this.packageNumber = packageNumber;
    this.sendDate = sendDate;
    this.receiver = receiver;
    this.sender = sender;
    this.position = position;
    this.comments = comments;
    this.status = status;
  }
}
