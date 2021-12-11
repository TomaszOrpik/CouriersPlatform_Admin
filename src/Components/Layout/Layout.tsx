import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import Topbar from "../Topbar/Topbar";
import styles from "./Layout.module.scss";

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: IProps): JSX.Element => {
  const canRead = useSelector((state: any) => state.functionality.canRead);
  return (
    <Router>
      {canRead ? (
        <div className={styles.appBody}>
          <Navigation />
          <div className={styles.page}>
            <Topbar />
            <div className={styles.pages}>{props.children}</div>
          </div>
        </div>
      ) : (
        <div className={styles.pageFull}>{props.children}</div>
      )}
    </Router>
  );
};

export default Layout;
