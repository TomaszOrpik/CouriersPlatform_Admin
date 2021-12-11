import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import styles from "../Registrations.module.scss";

import { Registration } from "../../../Store/Models/Registration.model";

interface IProps {
  registration: Registration | null;
}
interface IState { }

class RegistrationDetails extends Component<IProps, IState> {
  render() {
    return (
      <div className={styles.componentContainer}>
        {this.props.registration !== null ? (
          <div>
            <div className={styles.assignBtnTextRow}>
              <Button
                id="assignBtn"
                className={styles.assignBtn}
                variant="contained"
                color="primary"
              >
                PRZYPISZ DO MNIE
              </Button>
            </div>
            <div id="registrationNumber" className={styles.textRow}>
              <div className={styles.textLeft}>Numer Zgłoszenia:</div>
              <div className={styles.textRight}>
                {this.props.registration.id}
              </div>
            </div>
            <div id="packageNumber" className={styles.textRow}>
              <div className={styles.textLeft}>Numer Przesyłki:</div>
              <div className={styles.textRight}>
                {this.props.registration.package.packageNumber}
              </div>
            </div>
            <div id="registrationDate" className={styles.textRow}>
              <div className={styles.textLeft}>Data:</div>
              <div className={styles.textRight}>
                {`${new Date(this.props.registration.date)
                  .getDay()
                  .toString()
                  .padStart(2, "0")}/${new Date(this.props.registration.date)
                    .getMonth()
                    .toString()
                    .padStart(
                      2,
                      "0"
                    )}/${new Date(this.props.registration.date).getFullYear()}`}
              </div>
            </div>
            <div id="registrationReceiver" className={styles.textRow}>
              <div className={styles.textLeft}>Adres Odbiorcy:</div>
              <div className={styles.textRight}>
                <div>{`${this.props.registration.package.receiver.firstName} ${this.props.registration.package.receiver.lastName}`}</div>
                <div>{this.props.registration.package.receiver.street}</div>
                <div>{`${this.props.registration.package.receiver.postCode} ${this.props.registration.package.receiver.city}`}</div>
              </div>
            </div>
            <div id="registrationSender" className={styles.textRow}>
              <div className={styles.textLeft}>Adres Nadawcy:</div>
              <div className={styles.textRight}>
                <div>{`${this.props.registration.package.sender.firstName} ${this.props.registration.package.sender.lastName}`}</div>
                <div>{this.props.registration.package.sender.street}</div>
                <div>{`${this.props.registration.package.sender.postCode} ${this.props.registration.package.sender.city}`}</div>
              </div>
            </div>
            <div id="registrationSubject" className={styles.textRow}>
              <div className={styles.textLeft}>Temat:</div>
              <div className={styles.textRight}>
                {this.props.registration.subject}
              </div>
            </div>
            <div id="registrationComments" className={styles.additionalInfoData}>
              <div className={styles.aiTitle}>Uwagi Zgłaszającego:</div>
              <div className={styles.aiText}>
                {this.props.registration.additionalInfo !== ""
                  ? this.props.registration.additionalInfo
                  : "Brak"}
              </div>
            </div>
            <div id="registrationPhone" className={styles.textRow}>
              <div className={styles.textLeft}>Telefon Kontaktowy:</div>
              <div className={styles.textRight}>
                <a
                  className={styles.customLink}
                  href={`tel:${this.props.registration.contactPhone}`}
                >
                  {this.props.registration.contactPhone}
                </a>
              </div>
            </div>
            <div id="registrationMail" className={styles.textRow}>
              <div className={styles.textLeft}>Adres E-mail:</div>
              <div className={styles.textRight}>
                <a
                  className={styles.customLink}
                  href={`mailto:${this.props.registration.contactMail}`}
                >
                  {this.props.registration.contactMail}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default RegistrationDetails;
