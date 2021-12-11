import React, { useEffect, useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Package, PackageStatus } from '../../../Store/Models/Package.model';

import styles from './PackagesList.module.scss';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PackagesListElement from './PackagesListElement/PackagesListElement';

interface IProps {
    packages: Package[],
}

const PackagesList = (props: IProps) => {
    const [packages, setPackages] = useState<Package[]>([]);

    useEffect(() => {
        if (packages.length === 0)
            setPackages(props.packages);
    }, [packages.length, props.packages]);

    let selectDateRef: any = null;
    let selectHourRef: any = null;

    let idFilter = '';
    let dateFilter: Date | null = null;
    let senderFilter = '';
    let receiverFilter = '';
    let timeFilter = '';
    let statusFilter = '';

    const SetIdFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        idFilter = event.target.value as string;
        FilterPackages();
    }
    const SetDateFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        dateFilter = new Date(event.target.value as string);
        FilterPackages();
    }
    const SetSenderFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        senderFilter = event.target.value as string;
        FilterPackages();
    }
    const SetReceiverFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        receiverFilter = event.target.value as string;
        FilterPackages();
    }
    const SetTimeFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        timeFilter = event.target.value as string;
        FilterPackages();
    }
    const SetStatusFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
        statusFilter = event.target.value as string;
        FilterPackages();
    }

    const FilterPackages = () => {
        let packages = props.packages;
        let currentPackages: Package[];
        if (idFilter === '') packages = props.packages;
        else packages = props.packages.filter((p: Package) => p.id.toLowerCase().startsWith(idFilter.toLowerCase()));
        currentPackages = packages;
        if (dateFilter === null) packages = currentPackages;
        else packages = currentPackages.filter((p: Package) =>
            p.sendDate.getFullYear() === dateFilter?.getFullYear() &&
            p.sendDate.getMonth() === dateFilter.getMonth() &&
            p.sendDate.getDay() === dateFilter.getDay());
        currentPackages = packages;
        if (senderFilter === '') packages = currentPackages;
        else packages = currentPackages.filter((p: Package) => `${p.sender.firstName} ${p.sender.lastName}`.startsWith(senderFilter)
            || `${p.sender.lastName} ${p.sender.firstName}`.startsWith(senderFilter));
        currentPackages = packages;
        if (receiverFilter === '') packages = currentPackages;
        else packages = currentPackages.filter((p: Package) => `${p.receiver.firstName} ${p.receiver.lastName}`.startsWith(receiverFilter)
            || `${p.receiver.lastName} ${p.receiver.firstName}`.startsWith(receiverFilter));
        currentPackages = packages;
        if (timeFilter === '') packages = currentPackages;
        else packages = currentPackages.filter((p: Package) => p.sendDate.getHours() === parseInt(timeFilter.split(':')[0]) &&
            p.sendDate.getMinutes() === parseInt(timeFilter.split(':')[1]));
        currentPackages = packages;
        if (statusFilter === '') packages = currentPackages;
        else packages = currentPackages.filter((p: Package) => p.status === statusFilter);

        setPackages(packages);
    }

    const handleDateClearClick = () => {
        ((selectDateRef as HTMLDivElement).children[1].children[0] as HTMLInputElement).value = '';
        dateFilter = null;
        FilterPackages();
    };
    const handleTimeClearClick = () => {
        ((selectHourRef as HTMLDivElement).children[1].children[0] as HTMLInputElement).value = '';
        timeFilter = '';
        FilterPackages();
    };

    return (<div className={styles.inputsContainer} id="packageList">
        <div className={styles.flexRow}>
            <div id="packageFilter" className={styles.packageFilter}>
                <TextField className={styles.packageIdInput}
                    variant="outlined"
                    label="Numer Przesyłki"
                    id="packageIdFilterInput"
                    placeholder="Podaj numer przesyłki..."
                    onChange={SetIdFilter}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>,
                    }} />
            </div>
            <div id="packageDateFilter">
                <TextField ref={(input) => selectDateRef = input}
                    className={styles.dateInput}
                    variant="outlined"
                    label="Data Zarejestrowania"
                    type="date"
                    id="packageDateFilterInput"
                    placeholder="wybierz datę..."
                    onChange={SetDateFilter}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleDateClearClick}>
                                <ClearIcon />
                            </IconButton>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }} />
            </div>
        </div>
        <div className={styles.flexRow}>
            <div id="senderFilter" className={styles.senderFilter}>
                <TextField
                    className={styles.senderInput}
                    variant="outlined"
                    label="Wyszukaj nadawcę"
                    id="senderFilterInput"
                    placeholder="Wpisz imię i nazwisko nadawcy..."
                    onChange={SetSenderFilter}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>,
                    }} />
            </div>
            <div id="receiverFilter">
                <TextField
                    className={styles.receiverInput}
                    variant="outlined"
                    label="Wyszukaj odbiorcę"
                    id="receiverFilterInput"
                    placeholder="Wpisz imię i nazwisko odbiorcy..."
                    onChange={SetReceiverFilter}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>,
                    }} />
            </div>
        </div>
        <div className={styles.flexRowLast}>
            <div id="timeFilter" className={styles.timeFilter}>
                <TextField ref={(input) => selectHourRef = input}
                    className={styles.hourInput}
                    variant="outlined"
                    label="Godzina Zarejestrowania"
                    type="time"
                    id="packageTimeInput"
                    placeholder="wybierz godzinę..."
                    onChange={SetTimeFilter}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleTimeClearClick}>
                                <ClearIcon />
                            </IconButton>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }} />
            </div>
            <div id="statusFilter">
                <FormControl variant="outlined" className={styles.statusInputFilter}>
                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                    <Select
                        labelId="statusInputLabel"
                        id="statusInput"
                        onChange={SetStatusFilter}
                        label="Status"
                        defaultValue={''}>
                        <MenuItem value={''}>Wszystkie</MenuItem>
                        <MenuItem value={PackageStatus.waiting}>Oczekująca</MenuItem>
                        <MenuItem value={PackageStatus.assigned}>Wydana do dostarczenia</MenuItem>
                        <MenuItem value={PackageStatus.delivered}>Dostarczona</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
        <div className={"listBody"}>
            {packages.map((p: Package) =>
                <PackagesListElement key={Math.random()} package={p} />
            )}
        </div>
    </div>)
}

export default PackagesList;
