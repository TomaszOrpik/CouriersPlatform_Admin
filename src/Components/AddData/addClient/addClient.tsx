import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../..";
import { InstructionsService } from "../../../Services/Instructions.service";
import { User } from "../../../Store/Models/User.model";
import {
  addUser,
  resetAddUserValidators,
  validateUser,
} from "../../../Store/Slices/users.slice";
import styles from "./../addData.module.scss";

interface IProps { }

const AddClient = (props: IProps) => {
  const [id, setId] = React.useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const errorMessages = useSelector(
    (state: AppState) => state.users.addUserValidators
  );

  const validated = useSelector((state: AppState) => state.users.validated);

  React.useEffect(() => {
    if (id === "") dispatch(resetAddUserValidators({}));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('addClient', 10, [
        {
          element: '#idAddClient',
          title: 'Id Klienta',
          description: 'Wpisz tutaj identyfikator klienta, którym będzie mógł się zalogować do aplikacji mobilnej, numer identyfikacyjny musi być unikalny dla każdego klienta',
          position: 'right'
        }, {
          element: '#nameAddClient',
          title: 'Imię Klienta',
          description: 'Wpisz tutaj imię dodawanego klienta',
          position: 'bottom'
        }, {
          element: '#surnameAddClient',
          title: 'Nazwisko Klienta',
          description: 'Wpisz tutaj nazwisko dodawanego klienta',
          position: 'bottom'
        }, {
          element: '#passwordAddClient',
          title: 'Hasło Klienta',
          description: 'Wpisz tutaj hasło, którym klient będzie mógł się zalogować do aplikacji mobilnej',
          position: 'left'
        }, {
          element: '#streetAddClient',
          title: 'Ulica',
          description: 'Wpisz tutaj ulicę, numer domu i mieszkania dodawanego klienta',
          position: 'right'
        }, {
          element: '#postcodeAddClient',
          title: 'Kod Pocztowy',
          description: 'Wpisz tutaj kod pocztowy dodawanego klienta',
          position: 'bottom'
        }, {
          element: '#cityAddClient',
          title: 'Miasto',
          description: 'Wpisz tutaj miasto w którym mieszka dodawany klient',
          position: 'bottom'
        }, {
          element: '#phoneAddClient',
          title: 'Telefon Klienta',
          description: 'Wpisz tutaj numer kontaktowy klienta, który będzie służył do kontaktu z nim',
          position: 'left'
        }, {
          element: '#validateAddClient',
          title: 'Sprawdź Dane',
          description: 'Kliknij tutaj by sprawdzić czy wprowadzone przez Ciebie dane są poprawne i czy istnieją już w systemie, dopiero po sprawdzeniu będzie można dodania nowego klienta',
          position: 'left'
        }, {
          element: '#addAddClient',
          title: 'Dodaj Klienta',
          description: 'Wciśnij by zapisać wprowadzone dane klienta w systemie',
          position: 'left'
        }
      ]);
    }, 500);
  }, []);

  const handleSubmitClick = () => {
    const user: User = {
      id: id,
      password: password,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      street: street,
      postCode: postCode,
      city: city,
    };
    dispatch(addUser(user));
  };
  const handleValidateClick = () => {
    const user: User = {
      id: id,
      password: password,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      street: street,
      postCode: postCode,
      city: city,
    };
    dispatch(validateUser(user));
    dispatch(resetAddUserValidators({}));
  };

  return (
    <div>
      <div className={styles.addContainer}>
        <span className={styles.title}>Dodaj Klienta</span>
        <div className={styles.rowInputs}>
          <div id="idAddClient" style={{ marginRight: "auto" }}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Id"
              id="idInput"
              onChange={(input) => {
                setId(input.target.value);
              }}
            />
          </div>
          <div id="nameAddClient">
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Imię"
              id="firstNameInput"
              onChange={(input) => {
                setFirstName(input.target.value);
              }}
            />
          </div>
          <div id="surnameAddClient" style={{ marginRight: "auto", marginLeft: "auto" }}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Nazwisko"
              id="secondNameInput"
              onChange={(input) => {
                setLastName(input.target.value);
              }}
            />
          </div>
          <div id="passwordAddClient">
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Hasło"
              type="password"
              id="passwordInput"
              onChange={(input) => {
                setPassword(input.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.rowInputs}>
          <div id="streetAddClient" style={{ marginRight: "auto" }}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Ulica"
              id="streetInput"
              onChange={(input) => {
                setStreet(input.target.value);
              }}
            />
          </div>
          <div id="postcodeAddClient">
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Kod Pocztowy"
              id="postcodeInput"
              onChange={(input) => {
                setPostCode(input.target.value);
              }}
            />
          </div>
          <div id="cityAddClient" style={{ marginRight: "auto", marginLeft: "auto" }}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Miasto"
              id="cityInput"
              onChange={(input) => {
                setCity(input.target.value);
              }}
            />
          </div>
          <div id="phoneAddClient">
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Telefon"
              type="number"
              id="phoneInput"
              onChange={(input) => {
                setPhoneNumber(+input.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.column} style={{ alignItems: "end" }}>
          {errorMessages.map((message: string) => {
            return (
              <div>
                <br />
                <span style={{ color: "red" }}>{message}</span>
              </div>
            );
          })}
          <br />
          <Button
            id="validateAddClient"
            className={styles.addButtonForm}
            variant="contained"
            color="primary"
            onClick={() => {
              handleValidateClick();
            }}
          >
            Sprawdź dane
          </Button>
          <br />
          <Button
            id="addAddClient"
            disabled={!validated}
            className={styles.addButtonForm}
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmitClick();
            }}
          >
            Dodaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
