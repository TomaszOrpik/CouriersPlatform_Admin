import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../..";
import { CONSTANTS } from "../../Utilities/constants";
import { InstructionsService } from "../../Services/Instructions.service";
import { LocalStorageService } from "../../Services/LocalStorage.service";
import { Package } from "../../Store/Models/Package.model";
import { getPackages } from "../../Store/Slices/packages.slice";

import styles from "./Packages.module.scss";
import PackagesList from "./PackagesList/PackagesList";

const Packages = () => {
  const mapEndpoint = CONSTANTS.MAP_ENDPOINT;
  const dispatch = useDispatch();
  const selectPackages: Package[] = useSelector((state: AppState) => state.packages.packagesList);
  const selectActivePackageId = useSelector((state: AppState) => state.packages.activePackageId);

  const [url, setUrl] = useState(mapEndpoint);

  useEffect(() => {
    dispatch(getPackages())
  }, [dispatch]);
  useEffect(() => {
    const mapToken = LocalStorageService.getElement('mapToken');
    if (selectActivePackageId === '')
      setUrl(`${mapEndpoint}?token=${mapToken}`);
    else
      setUrl(`${mapEndpoint}?type=package&id=${selectActivePackageId}&token=${mapToken}`);
  }, [selectActivePackageId, mapEndpoint]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('packages', 10, [
        {
          element: '#packageFilter',
          title: 'Numer Przesyłki',
          description: 'Wpisz tutaj numer szukanej przesyłki',
          position: 'right',
        }, {
          element: '#packageDateFilter',
          title: 'Data Zarejestrowania',
          description: 'Wybierz tutaj datę zarejestrowania szukanej przesyłki',
          position: 'right',
        }, {
          element: '#senderFilter',
          title: 'Nadawca',
          description: 'Wpisz tutaj imię i nazwisko nadawcy szukanej przesyłki',
          position: 'right',
        }, {
          element: '#receiverFilter',
          title: 'Odbiorca',
          description: 'Wpisz tutaj imię i nazwisko odbiorcy szukanej przesyłki',
          position: 'right',
        }, {
          element: '#timeFilter',
          title: 'Godzina Zarejestrowania',
          description: 'Wybierz godzinę zarejestrowania szukanej przesyłki',
          position: 'right',
        }, {
          element: '#statusFilter',
          title: 'Status',
          description: 'Wybierz status szukanej przesyłki',
          position: 'right',
        }, {
          element: '#senderInfo',
          title: 'Nadawca',
          description: 'Dane adresowe nadawcy',
          position: 'right',
        }, {
          element: '#receiverInfo',
          title: 'Odbiorca',
          description: 'Dane adresowe odbiorcy',
          position: 'right',
        }, {
          element: '#statusInfo',
          title: 'Status',
          description: 'Aktualny status przesyłki',
          position: 'right',
        }, {
          element: '#additionalInfo',
          title: 'Uwagi',
          description: 'Dodatkowe uwagi nadawcy na temat przesyłki',
          position: 'right',
        }, {
          element: '#panelHeader',
          title: 'Numer Przesyłki',
          description: 'Numer aktualnie wybranej przesyłki, klikając wybierasz przesyłkę, której szczegóły chcesz aktualnie wyświetlać',
          position: 'right',
        }, {
          element: '#packageList',
          title: 'List Przesyłek',
          description: 'Lista przesyłek zarejestrowanych w systemie',
          position: 'right',
        },
        {
          element: '#mapContainer',
          title: 'Mapa',
          description: 'Mapa wyświetla aktualną pozycję kuriera z przesyłką oraz pozycję odbiorcy przesyłki. Wyświetla również najbardziej optymalną trasę kuriera, za pomocą myszki można przybliżać i przesuwać wyświetlaną część mapy',
          position: 'left',
        }
      ]);
    }, 500);

  }, []);

  return (
    <div className={styles.packagesContainer}>
      <div className={styles.leftSide}>
        <PackagesList packages={selectPackages} />
      </div>
      <div id="mapContainer" className={styles.rightSide}>
        <iframe src={url} className={styles.mapFrame} title="packageMap" />
      </div>
    </div>
  );
};

export default Packages;
