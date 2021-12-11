import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Courier } from "../../Store/Models/Courier.model";
import styles from "./Couriers.module.scss";
import CouriersList from "./CouriersList/CouriersList";
import { getCouriers } from "../../Store/Slices/couriers.slice";
import { AppState } from "../..";
import { CONSTANTS } from "../../Utilities/constants";
import CourierInfo from "./CouriersList/CouriersListElement/CourierInfo/CourierInfo";
import { InstructionModel, InstructionsService } from "../../Services/Instructions.service";
import { LocalStorageService } from "../../Services/LocalStorage.service";

const Couriers = () => {
  const mapEndpoint = CONSTANTS.MAP_ENDPOINT;
  const dispatch = useDispatch();
  const [showInfo, changeShowInfo] = useState(true);
  const canWrite = useSelector((state: AppState) => state.functionality.canWrite);
  const selectCouriers: Courier[] = useSelector((state: AppState) => state.couriers.couriersList);
  const selectActiveCourierId = useSelector(
    (state: AppState) => state.couriers.activeCourierId
  );
  const selectActiveCourier = useSelector(
    (state: AppState) => {
      if (state.couriers.activeCourierId === "") return null;
      else {
        const courier = state.couriers.couriersList.find(
          (c: Courier) => c.employeeNumber === state.couriers.activeCourierId
        );
        if (courier) return courier;
        else return null;
      }
    }
  )
  const [url, setUrl] = useState(mapEndpoint);

  useEffect(() => {
    dispatch(getCouriers());
  }, [dispatch]);

  useEffect(() => {
    const mapToken = LocalStorageService.getElement('mapToken');
    if (selectActiveCourierId === '')
      setUrl(`${mapEndpoint}?token=${mapToken}`);
    else
      setUrl(`${mapEndpoint}?type=courier&id=${selectActiveCourierId}&token=${mapToken}`);
  }, [selectActiveCourierId, mapEndpoint]);

  useEffect(() => {
    const instructions: InstructionModel[] = [];
    instructions.push({
      element: '#logoutBtn',
      title: 'Wyloguj',
      description: 'Wciśnij by się wylogować z aplikacji',
      position: 'left'
    });
    instructions.push({
      element: '#couriersPageBtn',
      title: 'Kurierzy',
      description: 'Wciśnij by przejść do strony z podglądem wszystkich kurierów w trasie',
      position: 'right'
    });
    instructions.push({
      element: '#packagesPageBtn',
      title: 'Przesyłki',
      description: 'Wciśnij by przejść do strony z listą zarejestrowanych przesyłek',
      position: 'right'
    });
    instructions.push({
      element: '#registrationsPageBtn',
      title: 'Zgłoszenia',
      description: 'Wciśnij by przejść do strony z listą uwag zgłaszanych przez klientów',
      position: 'right'
    });
    if (canWrite) instructions.push({
      element: '#addPageBtn',
      title: 'Dodaj',
      description: 'Wciśnij by przejść do strony odpowiedzialnej za dodawanie nowych danych do aplikacji',
      position: 'right'
    });
    instructions.push({
      element: '#courierSearchParent',
      title: 'Wyszukiwanie',
      description: 'Wyszukaj kuriera po numerze pracownika',
      position: 'right',
    });
    instructions.push({
      element: '#couriersListView',
      title: 'List kurierów',
      description: 'List kurierów, którzy są aktualnie w pracy, kliknij na numer pracownika by wyświetlić szczegóły dostaw kuriera i jego aktualną trasę na mapie',
      position: 'right',
    });
    instructions.push({
      element: '#mapContainer',
      title: 'Mapa',
      description: 'Mapa opdpowiada za wyświetlanie aktualnej trasy kuriera wybranego z listy, wyświetla lokalizację wszystkich przesyłek i aktualną pozycję kuriera. Mapę można przesuwać, przybliżać i oddalać za pomocą przycisków myszki.',
      position: 'left',
    });
    instructions.push({
      element: '#infoBox',
      title: 'Szczegóły',
      description: 'Szczegóły kuriera, możesz tu sprawdzić numer pracownika danego kuriera, samochód, którym się przemieszcza, rejestrację pojazdu, godzinę rozpoczęcia pracy, przesyłkę, którą właśnie dostarcza i statystyki odnośnie dostaw. W prawym górnym rogu znajduje się przycisk służący do ukrycia/wyświetlenia szczegółów.',
      position: 'left',
    });
    setTimeout(() => {
      InstructionsService.execute('couriers', 20, instructions);
    }, 500);
  }, [canWrite]);

  return (
    <div className={styles.container}>
      {showInfo ? <div id="infoBox" className={styles.infoBox}>
        <div className={styles.infoHeader}>
          <div style={{ marginRight: 'auto' }}></div>
          <div className={`${styles.closeInfo} material-icons`}
            onClick={() => { changeShowInfo(false) }}>
            close
          </div>
        </div>
        <CourierInfo courier={selectActiveCourier} />
      </div>
        : <div className={styles.infoBoxClosed}>
          <div className={`${styles.openInfo} material-icons`}
            onClick={() => { changeShowInfo(true) }}>
            menu_open
          </div>
        </div>}

      <CouriersList couriers={selectCouriers} />
      <div className={styles.mapContainer} id="mapContainer">
        <iframe src={url} className={styles.mapFrame} title="courierMap" />
      </div>
    </div>
  );
};

export default Couriers;
