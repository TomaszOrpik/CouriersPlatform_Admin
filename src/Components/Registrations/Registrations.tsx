import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Registrations.module.scss";
import RegistrationsList from "./RegistrationsList/RegistrationsList";
import { Registration } from "../../Store/Models/Registration.model";
import RegistrationDetails from "./RegistrationDetails/RegistrationDetails";
import { AppState } from "../..";
import { getRegistrations } from "../../Store/Slices/registrations.slice";
import { InstructionsService } from "../../Services/Instructions.service";

const Registrations = () => {
  const dispatch = useDispatch();
  const selectRegistrations: Registration[] = useSelector(
    (state: AppState) => state.registrations.registrationsList);
  const selectActiveRegistration: Registration | null = useSelector(
    (state: AppState) => {
      if (state.registrations.activeRegistrationId === "") return null;
      else {
        const registration = state.registrations.registrationsList.find(
          (r: Registration) => r.id === state.registrations.activeRegistrationId
        );
        if (registration) return registration;
        else return null;
      }
    });

  useEffect(() => {
    dispatch(getRegistrations())
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      InstructionsService.execute('registrations', 10, [
        {
          element: '#registrationsList',
          title: 'Zgłoszenia',
          description: 'Lista zgłoszeń zawierająca numer zgłoszenia, imię i nazwisko zgłaszającego, datę przyjęcia zgłoszenia oraz aktualny status. Klikając w zgłoszenie wyświetlisz szczegóły w panuelu po prawej stronie.',
          position: 'right',
        }, {
          element: '#assignBtn',
          title: 'Przypisz Zgłoszenie',
          description: 'Poprzez wciśnięcie tego przycisku przypisujesz siebie jako osobę rozwiązującą zgłoszenie',
          position: 'left',
        }, {
          element: '#registrationNumber',
          title: 'Numer Zgłoszenia',
          description: 'Unikalny numer zgłoszenia',
          position: 'left',
        }, {
          element: '#packageNumber',
          title: 'Numer Przesyłki',
          description: 'Numer Przesyłki której dotyczy zgłoszenie',
          position: 'left',
        }, {
          element: '#registrationDate',
          title: 'Data Zgłoszenia',
          description: 'Data, kiedy przyjęto zgłoszenie',
          position: 'left',
        }, {
          element: '#registrationReceiver',
          title: 'Dane Odbiorcy',
          description: 'Dane odbiorcy przesyłki',
          position: 'left',
        }, {
          element: '#registrationSender',
          title: 'Dane Nadawcy',
          description: 'Dane nadawcy przesyłki',
          position: 'left',
        }, {
          element: '#registrationSubject',
          title: 'Temat Zgłoszenia',
          description: 'Tytuł zgłoszenia',
          position: 'left',
        }, {
          element: '#registrationComments',
          title: 'Uwagi Zgłaszającego',
          description: 'Opis zgłoszenia, dodatkowe uwagi zgłaszającego',
          position: 'left',
        }, {
          element: '#registrationPhone',
          title: 'Telefon Kontaktowy',
          description: 'Numer telefonu podany jako kontaktowy przez zgłaszającego',
          position: 'left',
        }, {
          element: '#registrationMail',
          title: 'E-mail Kontaktowy',
          description: 'Adres e-mail podany jako kontaktowy przez zgłaszającego',
          position: 'left',
        }
      ]);
    }, 500);
  }, []);

  return (
    <div className={styles.registrationsContainer}>
      <div className={styles.tablePart} id="registrationsList">
        <RegistrationsList registrations={selectRegistrations} />
      </div>
      <div className={styles.detailsPart}>
        <RegistrationDetails registration={selectActiveRegistration} />
      </div>
    </div>
  );
};

export default Registrations;
