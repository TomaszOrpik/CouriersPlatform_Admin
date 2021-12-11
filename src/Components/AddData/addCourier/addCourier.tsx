import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../..";
import { InstructionsService } from "../../../Services/Instructions.service";
import { CourierRequest } from "../../../Store/Models/CourierRequest.model";
import {
  addCourier,
  resetAddCourierValidators,
  validateCourier,
} from "../../../Store/Slices/couriers.slice";
import styles from "./../addData.module.scss";

interface IProps { }

const AddCourier = (props: IProps) => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [startPositionLatitude, setStartPositionLatitude] = useState(0);
  const [startPositionLongitude, setStartPositionLongitude] = useState(0);
  const [vehicle, setVehicle] = useState("");
  const [registaration, setRegistration] = useState("");
  const [regionName, setRegionName] = useState("");
  const [regionTopLeftLatitude, setRegionTopLeftLatitude] = useState(0);
  const [regionTopLeftLongitude, setRegionTopLeftLongitude] = useState(0);
  const [regionBottomLeftLatitude, setRegionBottomLeftLatitude] = useState(0);
  const [regionBottomLeftLongitude, setRegionBottomLeftLongitude] = useState(0);
  const [regionTopRightLatitude, setRegionTopRightLatitude] = useState(0);
  const [regionTopRightLongitude, setRegionTopRightLongitude] = useState(0);
  const [regionBottomRightLatitude, setRegionBottomRightLatitude] = useState(0);
  const [regionBottomRightLongitude, setRegionBottomRightLongitude] =
    useState(0);

  const dispatch = useDispatch();

  const errorMessages = useSelector(
    (state: AppState) => state.couriers.addCourierValidators
  );
  const validated = useSelector((state: AppState) => state.couriers.validated);

  useEffect(() => {
    if (employeeNumber === "") dispatch(resetAddCourierValidators({}));
  }, [dispatch, employeeNumber]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('addCourier', 10, [
        {
          element: '#employeeNumberAddCourier',
          title: 'Identyfikator Kuriera',
          description: 'Wpisz tutaj numer identyfikacyjny dodawanego kuriera',
          position: 'right'
        }, {
          element: '#nameAddCourier',
          title: 'Imię Kuriera',
          description: 'Wpisz tutaj imię dodawanego kuriera',
          position: 'bottom'
        }, {
          element: '#surnameAddCourier',
          title: 'Nazwisko Kuriera',
          description: 'Wpisz tutaj nazwisko dodawanego kuriera',
          position: 'bottom'
        }, {
          element: '#passwordAddCourier',
          title: 'Hasło Kuriera',
          description: 'Wpisz tutaj hasło, którym kurier będzie się logował do aplikacji mobilnej',
          position: 'left'
        }, {
          element: "#vehicleAddCourier",
          title: 'Pojazd',
          description: 'Wpisz tutaj pojazd, którym będzie przemieszczał się kurier',
          position: 'right'
        }, {
          element: '#registrationAddCourier',
          title: 'Rejestracja',
          description: 'Wpisz tutaj rejestrację pojazdu, którym będzie przemieszczał się kurier',
          position: 'bottom'
        }, {
          element: '#phoneAddCourier',
          title: 'Numer Telefonu',
          description: 'Wpisz tutaj numer telefonu dodawanego kuriera',
          position: 'bottom'
        }, {
          element: "#startPositionAddCourier",
          title: 'Pozycja Startowa Kuriera',
          description: 'Wpisz tutaj długość geograficzną (longitude) i szerokość (latitude) opisujące pozycję z której kurier będzie rozpoczynał rozwożenie przesyłek',
          position: 'right'
        }, {
          element: '#regionAddCourier',
          title: 'Region',
          description: 'Wpisz tutaj nazwę regionu, który będzie obsługiwany przez kuriera',
          position: 'right'
        }, {
          element: '#regionLatLongAddCourier',
          title: 'Granice Regionu',
          description: 'Wpisz tutaj 4 granice wyznaczające obsługiwany region przez kuriera, przy pomocy długości geograficznej (longitude) i szerokości (latitude)',
          position: 'top'
        }, {
          element: '#validateAddCourierBtn',
          title: 'Sprawdź Dane',
          description: 'Wciśnij ten przycisk by sprawdzić, czy podane przez Ciebie dane kuriera są prawidłowe i nie istnieją w bazie danych, dopiero po prawidłowej walidacji będziesz w stanie zapisać je w systemie',
          position: 'left'
        }, {
          element: '#addAddCourierBtn',
          title: 'Dodaj Kuriera',
          description: 'Zapisz wprowadzone dane kuriera w systemie',
          position: 'left'
        },
      ]);
    }, 500);
  }, []);

  const handleSubmitClick = () => {
    const newCourier: CourierRequest = {
      employeeNumber: employeeNumber,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phoneNumber,
      startPosition: {
        latitude: startPositionLatitude,
        longitude: startPositionLongitude,
      },
      vehicle: vehicle,
      registration: registaration,
      startTime: "00:00",
      region: {
        name: regionName,
        leftTop: {
          latitude: regionTopLeftLatitude,
          longitude: regionTopLeftLongitude,
        },
        leftBottom: {
          latitude: regionBottomLeftLatitude,
          longitude: regionBottomLeftLongitude,
        },
        rightTop: {
          latitude: regionTopRightLatitude,
          longitude: regionTopRightLongitude,
        },
        rightBottom: {
          latitude: regionBottomRightLatitude,
          longitude: regionBottomRightLongitude,
        },
      },
      deliveredPackages: [],
      undeliveredPackages: [],
      currentPackages: "",
    };

    dispatch(addCourier(newCourier));
  };

  const handleValidateClick = () => {
    const newCourier: CourierRequest = {
      employeeNumber: employeeNumber,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phoneNumber,
      startPosition: {
        latitude: startPositionLatitude,
        longitude: startPositionLongitude,
      },
      vehicle: vehicle,
      registration: registaration,
      startTime: "",
      region: {
        name: regionName,
        leftTop: {
          latitude: regionTopLeftLatitude,
          longitude: regionTopLeftLongitude,
        },
        leftBottom: {
          latitude: regionBottomLeftLatitude,
          longitude: regionBottomLeftLongitude,
        },
        rightTop: {
          latitude: regionTopRightLatitude,
          longitude: regionTopRightLongitude,
        },
        rightBottom: {
          latitude: regionBottomRightLatitude,
          longitude: regionBottomRightLongitude,
        },
      },
      deliveredPackages: [],
      undeliveredPackages: [],
      currentPackages: "",
    };

    dispatch(validateCourier(newCourier));
    dispatch(resetAddCourierValidators({}));
  };

  return (
    <div>
      <div className={styles.addContainer}>
        <span className={styles.title}>Dodaj Kuriera</span>
        <div className={styles.rowInputs}>
          <div id="employeeNumberAddCourier"
            style={{ marginRight: "auto" }}>
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Id Kuriera"
              id="employeeNumberInput"
              onChange={(input) => {
                setEmployeeNumber(input.target.value);
              }}
            />
          </div>
          <div id="nameAddCourier">
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
          <div id="surnameAddCourier"
            style={{ marginRight: "auto", marginLeft: "auto" }}>
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
          <div id="passwordAddCourier">
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
          <div id="vehicleAddCourier">
            <TextField
              className={styles.searchInput}
              style={{ marginRight: "100px" }}
              variant="outlined"
              label="Pojazd"
              id="vehicleInput"
              onChange={(input) => {
                setVehicle(input.target.value);
              }}
            />
          </div>
          <div id="registrationAddCourier">
            <TextField
              className={styles.searchInput}
              style={{ marginRight: "100px" }}
              variant="outlined"
              label="Rejestracja"
              id="registrationInput"
              onChange={(input) => {
                setRegistration(input.target.value);
              }}
            />
          </div>
          <div id="phoneAddCourier">
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
        <div id="startPositionAddCourier" style={{ width: '50%' }}>
          <div className={styles.subTitleContainer}>
            <span className={styles.subTitle}>Pozycja Startowa</span>
          </div>
          <div className={styles.rowInputs}>
            <TextField
              className={styles.searchInput}
              style={{ marginRight: "100px" }}
              variant="outlined"
              label="Latitude"
              type="number"
              id="startLatInput"
              onChange={(input) => {
                setStartPositionLatitude(+input.target.value);
              }}
            />
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Longitude"
              type="number"
              id="startLongInput"
              onChange={(input) => {
                setStartPositionLongitude(+input.target.value);
              }}
            />
          </div>
        </div>
        <div id="regionAddCourier" style={{ width: '50%' }}>
          <div className={styles.subTitleContainer}>
            <span className={styles.subTitle}>Region</span>
          </div>
          <div className={styles.rowInputs}>
            <TextField
              className={styles.searchInput}
              style={{ marginRight: "auto" }}
              variant="outlined"
              label="Nazwa Regionu"
              id="regionNameInput"
              onChange={(input) => {
                setRegionName(input.target.value);
              }}
            />
          </div>
        </div>
        <div id="regionLatLongAddCourier" className={styles.rowInputs}>
          <div className={styles.column}>
            <span style={{ lineHeight: "30px" }}>Lewy Górny Róg</span>
            <br />
            <TextField
              className={styles.searchInput}
              style={{ marginBottom: "20px" }}
              variant="outlined"
              label="Latitude"
              type="number"
              id="leftTopLatInput"
              onChange={(input) => {
                setRegionTopLeftLatitude(+input.target.value);
              }}
            />
            <br />
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Longitude"
              type="number"
              id="leftTopLongInput"
              onChange={(input) => {
                setRegionTopLeftLongitude(+input.target.value);
              }}
            />
          </div>
          <div className={styles.column}>
            <span style={{ lineHeight: "30px" }}>Lewy Dolny Róg</span>
            <br />
            <TextField
              className={styles.searchInput}
              style={{ marginBottom: "20px" }}
              variant="outlined"
              label="Latitude"
              type="number"
              id="leftBottomLatInput"
              onChange={(input) => {
                setRegionBottomLeftLatitude(+input.target.value);
              }}
            />
            <br />
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Longitude"
              type="number"
              id="leftBottomLogInput"
              onChange={(input) => {
                setRegionBottomLeftLongitude(+input.target.value);
              }}
            />
          </div>
          <div className={styles.column}>
            <span style={{ lineHeight: "30px" }}>Prawy Górny Róg</span>
            <br />
            <TextField
              className={styles.searchInput}
              style={{ marginBottom: "20px" }}
              variant="outlined"
              label="Latitude"
              type="number"
              id="rightTopLatInput"
              onChange={(input) => {
                setRegionTopRightLatitude(+input.target.value);
              }}
            />
            <br />
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Longitude"
              type="number"
              id="rightTopLongInput"
              onChange={(input) => {
                setRegionTopRightLongitude(+input.target.value);
              }}
            />
          </div>
          <div className={styles.column} style={{ marginRight: "auto" }}>
            <span style={{ lineHeight: "30px" }}>Prawy Dolny Róg</span>
            <br />
            <TextField
              className={styles.searchInput}
              style={{ marginBottom: "20px" }}
              variant="outlined"
              label="Latitude"
              type="number"
              id="rightBotLatInput"
              onChange={(input) => {
                setRegionBottomRightLatitude(+input.target.value);
              }}
            />
            <br />
            <TextField
              className={styles.searchInput}
              variant="outlined"
              label="Longitude"
              type="number"
              id="rightBotLongInput"
              onChange={(input) => {
                setRegionBottomRightLongitude(+input.target.value);
              }}
            />
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
              id="validateAddCourierBtn"
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
              id="addAddCourierBtn"
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
    </div>
  );
};

export default AddCourier;
