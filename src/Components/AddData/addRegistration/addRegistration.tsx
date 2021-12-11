import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../..";
import { InstructionsService } from "../../../Services/Instructions.service";
import { RegistrationStatus } from "../../../Store/Models/Registration.model";
import { RegistrationRequest } from "../../../Store/Models/RegistrationRequest.model";
import { getPackages } from "../../../Store/Slices/packages.slice";
import { addRegistration, resetAddRegistrationValidators, validateRegistration } from "../../../Store/Slices/registrations.slice";
import { getUsers } from "../../../Store/Slices/users.slice";
import styles from "./../addData.module.scss";


interface IProps { }

const AddRegistrationComponent = (props: IProps) => {
  const [id, setId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [subject, setSubject] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [contactPhone, setContactPhone] = useState(0);
  const [contactMail, setContactMail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPackages());
    dispatch(getUsers());
  }, [dispatch]);

  const packages = useSelector((state: AppState) => state.packages.packagesList);
  const users = useSelector((state: AppState) => state.users.usersList);

  const errorMessages = useSelector((state: AppState) => state.registrations.addRegistrationValidators);
  const validated = useSelector((state: AppState) => state.registrations.validated);

  useEffect(() => {
    if (id === "") dispatch(resetAddRegistrationValidators({}));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('addRegistration', 10, [
        {
          element: '#idAddRegistration',
          title: 'Id Zgłoszenia',
          description: 'Wpisz tutaj identyfikator zgłoszenia, musi być on unikalny dla każdego ze zgłoszeń',
          position: 'right'
        }, {
          element: '#selectPackageAddRegistration',
          title: 'Paczka',
          description: 'Wybierz przesyłkę, której dotyczy zgłoszenie',
          position: 'bottom'
        }, {
          element: '#dateAddRegistration',
          title: 'Data Zgłoszenia',
          description: 'Wybierz datę przyjęcia zgłoszenia',
          position: 'bottom'
        }, {
          element: '#selectUserAddRegistration',
          title: 'Zgłaszający',
          description: 'Wybierz z dodanych użytkowników osobę zgłaszającą',
          position: 'left'
        }, {
          element: '#subjectAddRegistration',
          title: 'Temat Zgłoszenia',
          description: 'Wpisz tutaj temat zgłoszenia opisujący je w kilku słowach',
          position: 'right',
        }, {
          element: '#infoAddRegistration',
          title: 'Dodatkowe Informacje',
          description: 'Wpisz tutaj opis zgłoszenia, postaraj się zamieścić jak najwięcej ważnych informacji',
          position: 'bottom'
        }, {
          element: '#phoneAddRegistration',
          title: 'Telefon Kontaktowy',
          description: 'Wpisz tutaj numer kontaktowy osoby zgłaszającej',
          position: 'bottom'
        }, {
          element: '#mailAddRegistration',
          title: 'Email',
          description: 'Wpisz tutaj adres e-mail osoby zgłaszającej',
          position: 'left'
        }, {
          element: '#validateAddRegistrationBtn',
          title: 'Sprawdź dane',
          description: 'Wciśnij by sprawdzić czy wprowadzone dane są poprawne i czy nie istnieją jeszcze w systemie, po poprawnej walidacji będzie można zapisać dane zgłoszenia',
          position: 'left'
        }, {
          element: '#addAddRegistrationBtn',
          title: 'Dodaj Zgłoszenie',
          description: 'Wciśnij by zapisać wpisane wcześniej dane zgłoszenia',
          position: 'left'
        }
      ]);
    }, 500);
  }, []);

  const handleSubmitClick = () => {
    const request = new RegistrationRequest(
      id,
      packageId,
      date,
      user,
      subject,
      additionalInfo,
      contactPhone,
      contactMail,
      RegistrationStatus.waiting
    );

    dispatch(addRegistration(request));
  };

  const handleValidateClick = () => {
    const request = new RegistrationRequest(
      id,
      packageId,
      date,
      user,
      subject,
      additionalInfo,
      contactPhone,
      contactMail,
      RegistrationStatus.waiting
    );

    dispatch(validateRegistration(request));
    dispatch(resetAddRegistrationValidators({}));
  };

  return (
    <div className={styles.addContainer}>
      <span className={styles.title}>Dodaj Zgłoszenie</span>
      <div className={styles.rowInputs}>
        <div id="idAddRegistration" style={{ marginRight: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Id"
            id="registrationIdInput"
            onChange={(input) => {
              setId(input.target.value);
            }}
          />
        </div>
        <div id="selectPackageAddRegistration">
          <span style={{ fontSize: '32px' }}>Paczka:</span>
          <Select
            variant="outlined"
            id="packageSelect"
            value={packageId || ""}
            style={{ width: "200px", marginLeft: '10px' }}
            className={styles.searchInput}
            onChange={(event) => {
              setPackageId(event.target.value as string);
            }}
          >
            {packages.map((p) => {
              return (
                <MenuItem key={Math.random()} value={p.id}>
                  {`${p.id}`}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div id="dateAddRegistration" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            type="date"
            id="dateInput"
            onChange={(input) => {
              setDate(input.target.value);
            }}
          />
        </div>
        <div id="selectUserAddRegistration">
          <span style={{ fontSize: '32px' }}>Zgłaszający:</span>
          <Select
            variant="outlined"
            id="userSelect"
            value={user || ""}
            style={{ width: "200px", marginLeft: '10px' }}
            className={styles.searchInput}
            onChange={(event) => {
              setUser(event.target.value as string);
            }}
          >
            {users.map((u) => {
              return (
                <MenuItem key={Math.random()} value={u.id}>
                  {`${u.firstName} ${u.lastName}`}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
      <div className={styles.rowInputs}>
        <div id="subjectAddRegistration" style={{ marginRight: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Temat"
            id="subjectInput"
            onChange={(input) => {
              setSubject(input.target.value);
            }}
          />
        </div>
        <div id="infoAddRegistration">
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Dodatkowe Informacje"
            multiline
            rows={4}
            id="additionalInfoInput"
            onChange={(input) => {
              setAdditionalInfo(input.target.value);
            }}
          />
        </div>
        <div id="phoneAddRegistration" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            type="number"
            label="Numer kontaktowy"
            id="contactPhoneInput"
            onChange={(input) => {
              setContactPhone(+input.target.value);
            }}
          />
        </div>
        <div id="mailAddRegistration">
          <TextField
            className={styles.searchInput}
            style={{ width: "500px" }}
            variant="outlined"
            label="Email"
            type="mail"
            id="mailInput"
            onChange={(input) => {
              setContactMail(input.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.column} style={{ alignItems: "end" }}>
        {errorMessages.map((message: string) => {
          return (
            <div key={Math.random()}>
              <br />
              <span style={{ color: "red" }}>{message}</span>
            </div>
          );
        })}
        <br />
        <Button
          id="validateAddRegistrationBtn"
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
          id="addAddRegistrationBtn"
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
  );
};

export default AddRegistrationComponent;
