import React, { useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@material-ui/data-grid";

import styles from "../Registrations.module.scss";

import { Registration } from "../../../Store/Models/Registration.model";
import { useDispatch } from "react-redux";
import { setActiveRegistrationId } from "../../../Store/Slices/registrations.slice";

interface IProps {
  registrations: Registration[];
}

function RegistrationsList(props: IProps) {
  const dispatch = useDispatch();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Numer Zgłoszenia", width: 300 },
    { field: "name", headerName: "Imię i Nazwisko", width: 300 },
    { field: "date", headerName: "Data", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];
  const rows =
    props.registrations !== undefined
      ? props.registrations.map((r: Registration) => {
        return {
          id: r.id,
          name: `${r.package.receiver.firstName} ${r.package.receiver.lastName}`,
          date: `${new Date(r.date).getDay().toString().padStart(2, "0")}/${new Date(r.date)
            .getMonth()
            .toString()
            .padStart(2, "0")}/${new Date(r.date)
              .getFullYear()
              .toString()
              .padStart(2, "0")}`,
          status: r.status,
        };
      })
      :
      [];

  useEffect(() => {
    return () => {
      dispatch(setActiveRegistrationId(""));
    };
  }, [dispatch]);

  function HandleRowClick(param: GridRowParams) {
    dispatch(setActiveRegistrationId(param.id));
  }

  return (
    <div className={styles.componentContainer}>
      <DataGrid
        hideFooterSelectedRowCount={true}
        className={styles.datagridAdditionalStyles}
        rows={rows}
        columns={columns}
        pageSize={20}
        onRowClick={HandleRowClick}
      />
    </div>
  );
}

export default RegistrationsList;
