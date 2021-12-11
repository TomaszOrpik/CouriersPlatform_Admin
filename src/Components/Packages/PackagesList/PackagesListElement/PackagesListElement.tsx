import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../..';
import { Package, PackageStatus } from '../../../../Store/Models/Package.model';
import { setActivePackageId } from '../../../../Store/Slices/packages.slice';
import styles from '../PackagesList.module.scss';


interface IProps {
    package: Package
}

function PackagesListElement(props: IProps) {
    const dispatch = useDispatch();
    const selectActivePackageId = useSelector((state: AppState) => state.packages.activePackageId);

    function SetPackageToActive() {
        if (props.package.id === selectActivePackageId) {
            dispatch(setActivePackageId(''));
        }
        else dispatch(setActivePackageId(props.package.id));
    }

    return (
        <div>
            <Accordion className={'packagePanel'} expanded={props.package.id === selectActivePackageId} onClick={SetPackageToActive}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="paneContent"
                    id="panelHeader">
                    <Typography>
                        <span className={styles.listHeaderLeft}>Nr Przesyłki: </span>
                        <span className={props.package.id === selectActivePackageId ? styles.listHeaderRightActive : styles.listHeaderRight}>{props.package.id}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className={styles.packageDetailsContainer}>
                            <div className={styles.senderContainer} id="senderInfo">
                                <div className={styles.textHeader}>NADAWCA:</div>
                                <div className={styles.textBody}>{`${props.package.sender.firstName} ${props.package.sender.lastName}`}</div>
                                <div className={styles.textBody}>{props.package.sender.street}</div>
                                <div className={styles.textBody}>{`${props.package.sender.postCode} ${props.package.sender.city}`}</div>
                            </div>
                            <div className={styles.receiverContainer} id="receiverInfo">
                                <div className={styles.textHeader}>ODBIORCA:</div>
                                <div className={styles.textBody}>{`${props.package.receiver.firstName} ${props.package.receiver.lastName}`}</div>
                                <div className={styles.textBody}>{props.package.receiver.street}</div>
                                <div className={styles.textBody}>{`${props.package.receiver.postCode} ${props.package.receiver.city}`}</div>
                            </div>
                            <div className={styles.additionalInfoContainer} id="statusInfo">
                                <div className={styles.textHeader}>STATUS</div>
                                <div className={`${styles.textBody} ${props.package.status === PackageStatus.waiting ? styles.textBodyRed :
                                    props.package.status === PackageStatus.assigned ? styles.textBodyYellow :
                                        styles.textBodyGreen}`}>{props.package.status}</div>
                            </div>
                        </div>
                        <div id="additionalInfo">
                            <div className={`${styles.textHeader} ${styles.textLeft}`}>
                                UWAGI:
                            </div>
                            <div className={`${styles.textBody} ${styles.textLeft}`}>
                                {props.package.comments !== '' ? props.package.comments : 'BRAK'}
                            </div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion></div>
    )
}

export default PackagesListElement;