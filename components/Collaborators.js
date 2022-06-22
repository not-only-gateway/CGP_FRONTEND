import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";

import {List, useQuery} from "@f-ui/query";
import UserModal from "./UserModal";


export default function Collaborators(props) {
    const {isBirthdays} = props
    const [current, setCurrent] = useState()


    const hook = useQuery(
        getQuery(isBirthdays ? 'birthdays/collaborator' : 'collaborator'),
        [{asc: true, desc: false, key: 'name'}],
        props.unit ?
            [{equal: true, key: 'active', value: true, hidden: true}, {equal: true, key: 'unit', value: props.unit, hidden: true}]
                :
            [{equal: true, key: 'active', value: true, hidden: true}]
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