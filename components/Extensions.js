import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {Switcher, Tab, Tabs} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";

import {List, useQuery, useRequest} from "@f-ui/query";
import FormTemplate from "../ext/FormTemplate";
import {COLLABORATOR} from "../templates/forms/COLLABORATOR";
import Cookies from "universal-cookie/lib";
import AdminContext from "../ext/wrapper/AdminContext";
import ENV from "../env";
import UserModal from "./UserModal";


export default function Extensions() {
    const [open, setOpen] = useState(0)
    return (
        <Tabs open={open} setOpen={setOpen}>
            <Tab label={'Todos os colaboradores'} className={styles.wrapper}>
                <Collaborators/>
            </Tab>
            <Tab label={'Aniversariantes'} className={styles.wrapper}>
                <Collaborators isBirthdays={true}/>
            </Tab>
        </Tabs>
    )
}

Extensions.propTypes = {
    handleClose: PropTypes.func,
    data: PropTypes.object
}


function Collaborators(props) {
    const {isBirthdays} = props
    const [current, setCurrent] = useState()
    const hook = useQuery(
        getQuery(isBirthdays ? 'birthdays/collaborator' : 'collaborator'),
        [{asc: true, desc: false, key: 'name'}],
        [{
            equal: true, key: 'active', value: true, hidden: true
        }]
    )

    return (
        <>
            {current ? (
                <UserModal current={current} setCurrent={setCurrent}/>
            ) : null}
            <List
                cardHeight={'450px'}
                defaultVisualization={'card'}
                hasCardView={true} noFilters={isBirthdays}
                mapKeyOnNull={{
                    key: 'image',
                    value: (v) => v.gender.toLowerCase() === 'masculino' ? './male.svg' : './female.svg'
                }}
                hook={hook}
                keys={KEYS.NOT_ADM_COLLABORATOR}
                onRowClick={e => setCurrent(e.data ? e.data : e)}
                title={isBirthdays ? "Aniversariantes" : 'Colaboradores'}
            />
        </>
    )
}

Collaborators.propTypes = {
    isBirthdays: PropTypes.bool
}