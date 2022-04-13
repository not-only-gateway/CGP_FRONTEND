import React, {useEffect, useState} from 'react'
import {Tab, VerticalTabs} from "@f-ui/core";
import styles from '../styles/Home.module.css'
import CollaboratorList from "../components/lists/CollaboratorList";
import VacancyList from "../components/lists/VacancyList";
import UnitList from "../components/lists/UnitList";
import SimpleList from "../components/lists/SimpleList";
import CommissionedList from "../components/lists/CommissionedList";
import EffectiveList from "../components/lists/EffectiveList";

export default function Home() {
    const [open, setOpen] = useState(0)

    return (
        <VerticalTabs open={open} setOpen={setOpen} className={styles.tabs}>
            <Tab label={'Colaboradores'} group={'Colaboradores e distribuição'} className={styles.tab}>
                <CollaboratorList/>
            </Tab>
            <Tab label={'Distribuição de comissionados'} group={'Colaboradores e distribuição'} className={styles.tab}>
                <VacancyList/>
            </Tab>
            <Tab label={'Unidade'} group={'Relacionamentos'} className={styles.tab}>
                <UnitList/>
            </Tab>
            <Tab label={'Cargos Efetivos'} group={'Relacionamentos'} className={styles.tab}>
                <EffectiveList/>
            </Tab>
            <Tab label={'Cargos comissionados'} group={'Relacionamentos'} className={styles.tab}>
                <CommissionedList/>
            </Tab>
            <Tab label={'Estado civil'} group={'Tabelas de apoio'} className={styles.tab}>
                <SimpleList title={'Estado civil'} urlPath={'marital_status'}/>
            </Tab>
            <Tab label={'Instrução'} group={'Tabelas de apoio'} className={styles.tab}>
                <SimpleList title={'Instrução'} urlPath={'instruction'}/>
            </Tab>
        </VerticalTabs>
    )
}
