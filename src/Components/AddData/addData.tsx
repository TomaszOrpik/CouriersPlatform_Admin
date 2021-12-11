import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

import styles from "./addData.module.scss";
import { InstructionsService } from "../../Services/Instructions.service";

interface IProps { }

const AddData = (props: IProps) => {

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('addData', 20, [
        {
          element: '#addCourierBtn',
          title: 'Dodaj Kuriera',
          description: 'Wciskając ten przycisk przechodzisz do ekranu dodawania nowego kuriera do systemu',
          position: 'right'
        },
        {
          element: '#addClientBtn',
          title: 'Dodaj Klienta',
          description: 'Wciskając ten przycisk przechodzisz do ekranu dodawania nowego klienta do systemu',
          position: 'left'
        },
        {
          element: '#addRegistrationBtn',
          title: 'Dodaj Zgłoszenie',
          description: 'Wciskając ten przycisk przechodzisz do ekranu dodawania zgłoszenia do systemu',
          position: 'right'
        },
        {
          element: '#addPackageBtn',
          title: 'Dodaj Przesyłkę',
          description: 'Wciskając ten przycisk przechodzisz do ekranu dodawania nowej przesyłki do systemu',
          position: 'left'
        }
      ]);
    }, 500);
  }, []);

  return (
    <div>
      <div className={styles.rowOneFourth}>
        <NavLink id="addCourierBtn" to="/nowy/kurier" className={styles.addButtonLink}>
          <Button color="primary" className={styles.addButton}>
            Dodaj Kuriera
          </Button>
        </NavLink>
        <NavLink id="addClientBtn" to="/nowy/klient" className={styles.addButtonLink}>
          <Button color="primary" className={styles.addButton}>
            Dodaj Klienta
          </Button>
        </NavLink>
      </div>
      <div className={styles.rowOneFourth}>
        <NavLink id="addRegistrationBtn" to="/nowy/zgloszenie" className={styles.addButtonLink}>
          <Button color="primary" className={styles.addButton}>
            Dodaj Zgłoszenie
          </Button>
        </NavLink>
        <NavLink id="addPackageBtn" to="/nowy/przesylka" className={styles.addButtonLink}>
          <Button color="primary" className={styles.addButton}>
            Dodaj Przesyłkę
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default AddData;
