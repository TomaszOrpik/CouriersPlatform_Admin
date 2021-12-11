import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../..";
import { InstructionsService } from "../../../Services/Instructions.service";
import { PackageStatus } from "../../../Store/Models/Package.model";
import { PackageRequest } from "../../../Store/Models/PackageRequest.model";
import {
  addPackage,
  resetAddPackageValidators,
  validatePackage,
} from "../../../Store/Slices/packages.slice";
import { getUsers } from "../../../Store/Slices/users.slice";
import styles from "./../addData.module.scss";

interface IProps { }

const AddPackageComponent = (props: IProps) => {
  const [id, setId] = useState("");
  const [packageNumber, setPackageNumber] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [positionLat, setPositionLat] = useState(0);
  const [positionLong, setPositionLong] = useState(0);
  const [comments, setComments] = useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state: AppState) => state.users.usersList);

  const errorMessages = useSelector(
    (state: AppState) => state.packages.addPackageValidators
  );
  const validated = useSelector((state: AppState) => state.packages.validated);

  useEffect(() => {
    if (id === "") dispatch(resetAddPackageValidators({}));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('addPackage', 10, [
        {
          element: '#idAddPackage',
          title: 'Identyfikator Przesyłki',
          description: 'Wpisz tutaj identyfikator dodawanej przesyłki, musi on być unikalny dla każdej paczki',
          position: 'right'
        }, {
          element: '#packageNumberAddPackage',
          title: 'Numer Przesyłki',
          description: 'Wpisz tutaj numer dodawanej przesyłki, musi on być unikalny dla każdej paczki',
          position: 'bottom'
        }, {
          element: "#dateAddPackage",
          title: 'Data dostarczenia',
          description: 'Wybierz prognozowaną datę dostarczenia dodawanej przesyłki',
          position: 'bottom'
        }, {
          element: '#additionalAddPackage',
          title: 'Dodatkowe Uwagi',
          description: 'Wpisz tutaj dodatkowe uwagi odnośnie dostarczenia dodawanej przesyłki',
          position: 'left'
        }, {
          element: '#selectSenderAddPackage',
          title: 'Nadawca',
          description: 'Wybierz z listy dodanych klientów nadawcę dodawanej przesyłki',
          position: 'right'
        }, {
          element: '#selectReceiverAddPackage',
          title: 'Odbiorca',
          description: 'Wybierz z listy dodanych klientów odbiorcę dodawanej przesyłki',
          position: 'right'
        }, {
          element: '#positionAddPackage',
          title: 'Pozycja',
          description: 'Wpisz tutaj długość geograficzną (longitude) i szerokość (latitude) adresu pod który ma zostać dostarczona dodawana przesyłka',
          position: 'bottom'
        }, {
          element: '#validateAddPackageBtn',
          title: 'Sprawdź Dane',
          description: 'Wciśnij by sprawdzić czy wprowadzone przez Ciebie dane są poprawne i nie istnieją w systemie, po poprawnej walidacji pojawi się opcja dodania przesyłki',
          position: 'left'
        }, {
          element: '#addAddPackageBtn',
          title: 'Dodaj Paczkę',
          description: 'Wciśnij by dodać wprowadzone dane przesyłki do systemu',
          position: 'left'
        }
      ]);
    }, 500);
  }, []);

  const handleSubmitClick = () => {
    const request = new PackageRequest(
      id,
      packageNumber,
      sendDate,
      receiverId,
      senderId,
      {
        latitude: positionLat,
        longitude: positionLong,
      },
      comments,
      PackageStatus.waiting
    );

    dispatch(addPackage(request));
  };

  const handleValidateClick = () => {
    const request = new PackageRequest(
      id,
      packageNumber,
      sendDate,
      receiverId,
      senderId,
      {
        latitude: positionLat,
        longitude: positionLong,
      },
      comments,
      PackageStatus.waiting
    );

    dispatch(validatePackage(request));
    dispatch(resetAddPackageValidators({}));
  };

  return (
    <div className={styles.addContainer}>
      <span className={styles.title}>Dodaj Przesyłkę</span>
      <div className={styles.rowInputs}>
        <div id="idAddPackage" style={{ marginRight: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Id"
            id="packageIdInput"
            onChange={(input) => {
              setId(input.target.value);
            }}
          />
        </div>
        <div id="packageNumberAddPackage">
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Numer Przesyłki"
            id="packageNumberInput"
            onChange={(input) => {
              setPackageNumber(input.target.value);
            }}
          />
        </div>
        <div id="dateAddPackage" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <TextField
            className={styles.searchInput}
            variant="outlined"
            type="date"
            id="dateInput"
            onChange={(input) => {
              setSendDate(input.target.value);
            }}
          />
        </div>
        <div id="additionalAddPackage">
          <TextField
            className={styles.searchInput}
            style={{ width: "500px" }}
            variant="outlined"
            label="Komentarz"
            multiline
            rows={4}
            id="commentInput"
            onChange={(input) => {
              setComments(input.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.rowInputs}>
        <div id="selectSenderAddPackage" className={styles.column} style={{ marginRight: "100px" }}>
          <span className={styles.subTitle}>Nadawca</span>
          <Select
            variant="outlined"
            id="senderSelect"
            value={senderId || ""}
            style={{ width: "200px" }}
            className={styles.searchInput}
            onChange={(event) => {
              setSenderId(event.target.value as string);
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
        <div id="selectReceiverAddPackage" className={styles.column} style={{ marginRight: "100px" }}>
          <span className={styles.subTitle}>Odbiorca</span>
          <Select
            variant="outlined"
            id="receiverSelect"
            value={receiverId || ""}
            style={{ width: "200px" }}
            className={styles.searchInput}
            onChange={(event) => {
              setReceiverId(event.target.value as string);
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
      <div className={styles.subTitleContainer}>
        <span className={styles.subTitle}>Pozycja</span>
      </div>
      <div id="positionAddPackage">
        <div className={styles.rowInputs}>
          <TextField
            className={styles.searchInput}
            style={{ marginRight: "100px" }}
            variant="outlined"
            label="Latitude"
            type="number"
            id="posLatInput"
            onChange={(input) => {
              setPositionLat(+input.target.value);
            }}
          />
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Longitude"
            type="number"
            id="posLongInput"
            onChange={(input) => {
              setPositionLong(+input.target.value);
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
          id="validateAddPackageBtn"
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
          id="addAddPackageBtn"
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

export default AddPackageComponent;
