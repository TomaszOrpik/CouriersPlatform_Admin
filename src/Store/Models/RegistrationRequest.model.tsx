import { RegistrationStatus } from "./Registration.model";

export class RegistrationRequest {
  id: string;
  packageId: string;
  date: string;
  user: string;
  subject: string;
  additionaInfo: string;
  contactPhone: number;
  contactMail: string;
  status: RegistrationStatus;

  constructor(
    id: string,
    packageId: string,
    date: string,
    user: string,
    subject: string,
    additionalInfo: string,
    contactPhone: number,
    contactMail: string,
    status: RegistrationStatus
  ) {
    this.id = id;
    this.packageId = packageId;
    this.date = date;
    this.user = user;
    this.subject = subject;
    this.additionaInfo = additionalInfo;
    this.contactPhone = contactPhone;
    this.contactMail = contactMail;
    this.status = status;
  }
}
