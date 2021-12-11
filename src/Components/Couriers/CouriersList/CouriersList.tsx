import React, { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { Courier } from "../../../Store/Models/Courier.model";
import styles from "../Couriers.module.scss";
import CouriersListElement from "./CouriersListElement/CouriersListElement";

interface IProps {
  couriers: Courier[];
}

const CouriersList = (props: IProps) => {
  const [couriers, setCouriers] = useState<Courier[]>([]);

  const filterCouriers = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    if (value.length === 0) setCouriers(props.couriers);
    else
      setCouriers(props.couriers.filter((x: Courier) =>
        x.employeeNumber.toLowerCase().startsWith(value.toLowerCase())
      ));
  };

  useEffect(() => {
    setCouriers(props.couriers);
  }, [props.couriers]);

  return (
    <div>
      <div className={styles.navigation}>
        <div className={styles.searchBar} id="courierSearchParent">
          <TextField
            className={styles.searchInput}
            variant="outlined"
            label="Wyszukaj kuriera"
            id="courierFilterInput"
            placeholder="Podaj numer kuriera..."
            onChange={filterCouriers}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={styles.curiersList} id="couriersListView">
          <div className={styles.listTitle}>Aktywni Kurierzy</div>
          <div className={styles.listBody}>
            {couriers.map((c: Courier) => (
              <CouriersListElement key={c.employeeNumber} courier={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouriersList;
