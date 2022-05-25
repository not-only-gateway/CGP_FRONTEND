import React, {useEffect, useState} from 'react'
import {Tab, VerticalTabs} from "@f-ui/core";
import styles from '../styles/Home.module.css'
import CollaboratorList from "../components/CollaboratorList";
import VacancyList from "../components/VacancyList";
import UnitList from "../components/UnitList";
import SimpleList from "../components/SimpleList";
import CommissionedList from "../components/CommissionedList";
import EffectiveList from "../components/EffectiveList";
import {useRouter} from "next/router";

export default function Index() {
    useEffect(() => {
        console.log('HERE')
    }, [])
    return (
        <div style={{padding: '0 32px'}}>
            <CollaboratorList/>
        </div>
    )
}
