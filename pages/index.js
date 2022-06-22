import React, {useContext, useEffect, useState} from 'react'
import {Tab, VerticalTabs} from "@f-ui/core";
import styles from '../styles/Home.module.css'
import CollaboratorList from "../components/CollaboratorList";
import VacancyList from "../components/VacancyList";
import UnitList from "../components/UnitList";
import SimpleList from "../components/SimpleList";
import CommissionedList from "../components/CommissionedList";
import EffectiveList from "../components/EffectiveList";
import Collaborators from "../components/Collaborators";
import Units from "../components/Units";
import {useRouter} from "next/router";
import AdminContext from "../ext/wrapper/AdminContext";


export default function Home() {
    const [open, setOpen] = useState(0)
    const router = useRouter()
    const isADM = useContext(AdminContext)

    useEffect(() => {
        if (router.isReady) {
            const i = parseInt(router.query.indexTab)
            setOpen(i ? i : 0)
        }
    }, [router.isReady])


    return (
        <VerticalTabs
            open={open} headerClassName={styles.header}
            setOpen={v => {
                setOpen(v)
                router.push({
                    pathname: '/',
                    query: {indexTab: v},
                })
            }} className={styles.tabs}>
            <Tab label={'Todos os colaboradores'} className={styles.tab} group={"Ramais"}>
                <Collaborators/>
            </Tab>
            <Tab label={'Aniversariantes'} className={styles.tab} group={"Ramais"}>
                <Collaborators isBirthdays={true}/>
            </Tab>
            <Tab label={'Unidades'} className={styles.tab} group={"Hierarquia"}>
                <Units redirect={router.push}/>
            </Tab>
            <Tab disabled={true} label={'Colaboradores'} className={styles.tab} group={"Hierarquia"}>

            </Tab>
            {isADM ?
                <Tab label={'Colaboradores'} group={'Colaboradores e distribuição'} className={styles.tab}>
                    <CollaboratorList/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Distribuição de comissionados'} group={'Colaboradores e distribuição'}
                     className={styles.tab}>
                    <VacancyList/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Unidade'} group={'Estruturais'} className={styles.tab}>
                    <UnitList/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Cargos Efetivos'} group={'Estruturais'} className={styles.tab}>
                    <EffectiveList/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Cargos comissionados'} group={'Estruturais'} className={styles.tab}>
                    <CommissionedList/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Estado civil'} group={'Tabelas de apoio'} className={styles.tab}>
                    <SimpleList title={'Estado civil'} urlPath={'marital_status'}/>
                </Tab>
                :
                null
            }
            {isADM ?
                <Tab label={'Instrução'} group={'Tabelas de apoio'} className={styles.tab}>
                    <SimpleList title={'Instrução'} urlPath={'instruction'}/>
                </Tab>
                :
                null
            }
        </VerticalTabs>
    )
}
