import React from "react";

import styles from "./Topbar.module.scss";
import { useDispatch } from "react-redux";
import {
  logoutUser,
} from "../../Store/Slices/functionality.slice";

const Topbar = (): JSX.Element => {
  const dispatch = useDispatch();

  function logoutClick(): void {
    dispatch(logoutUser({}));
  }
  return (
    <div className={styles.topNavigation}>
      <div
        id="logoutBtn"
        className={`${styles.logOutIcon} material-icons`}
        onClick={logoutClick}
      >
        <span>login</span>
      </div>
    </div>
  );
};

export default Topbar;
