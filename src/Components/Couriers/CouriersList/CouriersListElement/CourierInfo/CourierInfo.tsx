import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import styles from "./CourierInfo.module.scss";
import { Courier } from "../../../../../Store/Models/Courier.model";

interface IProps {
  courier: Courier | null;
}

function CourierInfo(props: IProps) {

  return <div>
    {
      props.courier ? (<div className={styles.infoContainer}>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Identyfikator:</div>
          <div className={styles.singleRowValue}>{props.courier.employeeNumber}</div>
        </div>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Samochód:</div>
          <div className={styles.singleRowValue}>{props.courier.vehicle}</div>
        </div>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Rejestracja:</div>
          <div className={styles.singleRowValue}>
            {props.courier.registration}
          </div>
        </div>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Rozpoczęcie:</div>
          <div className={styles.singleRowValue}>
            {props.courier.startTime !== "" ? `${props.courier.startTime}` : '00:00'}
          </div>
        </div>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Aktualna Przesyłka:</div>
          <div className={styles.singleRowValue}>
            {props.courier.currentPackages ? props.courier.currentPackages.id : 'Brak'}
          </div>
        </div>
        <div className={styles.singleRow}>
          <div className={styles.singleRowKey}>Liczba przesyłek:</div>
          <div className={styles.singleRowValue}>
            {props.courier.currentPackages
              ? props.courier.deliveredPackages.length +
              props.courier.undeliveredPackages.length +
              1
              : props.courier.deliveredPackages.length +
              props.courier.undeliveredPackages.length}
          </div>
        </div>
        <div className={`${styles.singleRow} ${styles.noUnderline}`}>
          <div className={styles.centerText}>
            <div className={styles.textGreen}>Dostarczone</div>
            <div className={styles.textGreen}>
              {props.courier.deliveredPackages.length}
            </div>
          </div>
          <div className={styles.centerText}>
            <div className={styles.textRed}>Oczekujące</div>
            <div className={styles.textRed}>
              {props.courier.undeliveredPackages.length}
            </div>
          </div>
        </div>
        <PieChart
          data={[
            {
              title: "Niedostarczone",
              value: props.courier.undeliveredPackages.length,
              color: "#FF0000",
            },
            {
              title: "Dostarczone",
              value: props.courier.deliveredPackages.length,
              color: "#008000",
            },
          ]}
          style={{ height: "100px" }}
        />
      </div>) : null
    }
  </div>
}

export default CourierInfo;
