import React from "react";
import styles from "../../Couriers.module.scss";

import { Courier } from "../../../../Store/Models/Courier.model";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCourierId } from "../../../../Store/Slices/couriers.slice";
import { AppState } from "../../../..";

interface IProps {
  courier: Courier;
}

const CouriersListElement = (props: IProps) => {
  const dispatch = useDispatch();
  const selectActiveCourierId = useSelector(
    (state: AppState) => state.couriers.activeCourierId
  );

  const listElementClicked = () => {
    dispatch(setActiveCourierId(props.courier.employeeNumber));
  };

  return (
    <div
      className={`${styles.courierNameContainer} ${props.courier.employeeNumber === selectActiveCourierId
        ? styles.activeId
        : ""
        }`}
      onClick={listElementClicked}
    >
      {props.courier.employeeNumber}
    </div>
  );
};

export default CouriersListElement;
