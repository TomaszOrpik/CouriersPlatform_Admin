# Admin App

### Opis

Aplikacja webowa służąca do zarządzania danymi dostaw. Służy do -przyjmowania zgłoszeń, dodawania użytkowników, paczek i pracowników. Aplikacja ma dwa typy uprawnień "read" oraz "write" pierwszy pozwala tylko na wyświetlenie danych z bazy, drugi na pełny dostęp z możliwością edycji. W trybie developerskim jest możliwość zresetowania bazy danych by przywrócić zamockowane dane, służące do testów. Aplikacja wymaga uruchomionych [Backendu](https://github.com/TomaszOrpik/CouriersPlatform__Backend) oraz [Widgetu Mapy](https://github.com/TomaszOrpik/CouriersPlatform_Map_Widget) do działania.

### Instalacja

- Instalacja Pakietów <br/>
   Instalujemy wszystkie niezbędne pakiety komendą `npm install`.

### Wersja Developerska

- Uruchomienie Backendu
  Uruchamiamy [Backend](https://github.com/TomaszOrpik/CouriersPlatform__Backend) w trybie developerskim
- Uruchomienie Mapy
  Uruchamiamy [Widget Mapy](https://github.com/TomaszOrpik/CouriersPlatform_Map_Widget) w trybie developerskim
- Uruchomienie Aplikacji
  Uruchamiamy aplikację komendą `npm run start`

### Wersja Produkcyjna

- Przygotowanie Backendu
  Należy skompilować [Backend](https://github.com/TomaszOrpik/CouriersPlatform__Backend) w wersji produkcyjnej
- Przygotowanie Mapy
  Należy skompilować [Widget Mapy](https://github.com/TomaszOrpik/CouriersPlatform_Map_Widget) w wersji produkcyjnej
- Przygotowanie zmiennych
  W pliku `constansts.ts` w folderze `src/constant` podmieniamy adres mapy i backendu z adresem wersji produkcyjnej
- Skompilowanie aplikacji
  Aplikację kompilujemy do wersji produkcyjnej komendą `npm run build`