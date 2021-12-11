import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../..";
import styles from "./Navigation.module.scss";

const Navigation = (): JSX.Element => {
  const canWrite = useSelector((state: AppState) => state.functionality.canWrite);

  return (
    <div className={styles.navigationBar}>
      <img
        className={styles.smallIcon}
        src="./assets/logoNoNameExample.svg"
        alt="smallLogo"
      />
      <NavLink
        id="couriersPageBtn"
        to="/kurierzy"
        className={styles.customLink}
        activeClassName={styles.active}
      >
        <span className={`${styles.customIcon} material-icons`}>
          local_shipping
        </span>
      </NavLink>
      <NavLink
        id="packagesPageBtn"
        to="/przesylki"
        className={styles.customLink}
        activeClassName={styles.active}
      >
        <span className={`${styles.customIcon} material-icons`}>unarchive</span>
      </NavLink>
      <NavLink
        id="registrationsPageBtn"
        to="/powiadomienia"
        className={styles.customLink}
        activeClassName={styles.active}
      >
        <span className={`${styles.customIcon} material-icons`}>
          announcement
        </span>
      </NavLink>
      {canWrite ? <NavLink
        id="addPageBtn"
        to="/nowy"
        className={styles.customLink}
        activeClassName={styles.active}
      >
        <span className={`${styles.customIcon} material-icons`}>add_box</span>
      </NavLink> : null}

    </div>
  );
};

export default Navigation;
