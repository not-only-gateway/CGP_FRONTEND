import React, {useContext, useEffect, useMemo, useState} from "react";
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


export default function Collaborators(props) {
    const {isBirthdays} = props
    const [current, setCurrent] = useState()
    const base = {
        equal: true, key: 'active', value: true, hidden: true
    }
    const hook = useQuery(
        getQuery(isBirthdays ? 'birthdays/collaborator' : 'collaborator'),
        [{asc: true, desc: false, key: 'name'}],
        props.unit ? [base, {
                equal: true, key: 'unit', value: props.unit, hidden: true
            }]
            :
            [base]
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
    unit: PropTypes.string,
    isBirthdays: PropTypes.bool
}