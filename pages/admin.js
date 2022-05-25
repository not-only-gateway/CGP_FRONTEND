import React, {useContext, useEffect, useState} from 'react'
import {Tab, VerticalTabs} from "@f-ui/core";
import styles from '../styles/Home.module.css'
import CollaboratorList from "../components/CollaboratorList";
import VacancyList from "../components/VacancyList";
import UnitList from "../components/UnitList";
import SimpleList from "../components/SimpleList";
import CommissionedList from "../components/CommissionedList";
import EffectiveList from "../components/EffectiveList";
import {useRouter} from "next/router";
import AdminContext from "../ext/wrapper/AdminContext";

export default function Home() {
    const [open, setOpen] = useState(0)
    const router = useRouter()
    const isADM = useContext(AdminContext)
    useEffect(() => {
        if(!isADM)
            router.push('/')
    }, [isADM])
    useEffect(() => {

        if (router.isReady) {
            const i = parseInt(router.query.indexTab)
            setOpen(i ? i : 0)
        }
    }, [router.isReady])


    return (
        <VerticalTabs
            open={open}
            setOpen={v => {
                setOpen(v)
                router.push({
                    pathname: '/',
                    query: {indexTab: v},
                })
            }} className={styles.tabs}>
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
