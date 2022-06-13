import React, {useState} from 'react'
import {Tab, Tabs, VerticalTabs} from "@f-ui/core";
import styles from "../styles/Home.module.css";
import Collaborators from "../components/Collaborators";
import Units from "../components/Units";
import {useRouter} from "next/router";


export default function Index() {
    const router = useRouter()
    const [open, setOpen] = useState(0)
    return (
        <VerticalTabs open={open} setOpen={setOpen} styles={{padding: "8px", height: "100%", color: "var(--fabric-color-quaternary)"}}>
            <Tab label={'Todos os colaboradores'} className={styles.wrapper}>
                <Collaborators/>
            </Tab>
            <Tab label={'Aniversariantes'} className={styles.wrapper}>
                <Collaborators isBirthdays={true}/>
            </Tab>
            <Tab label={'Unidades'} className={styles.wrapper} group={"Hierarquia"}>
                <Units redirect={router.push}/>
            </Tab>
            <Tab disabled={true} label={'Colaboradores'} className={styles.wrapper} group={"Hierarquia"}>

            </Tab>
        </VerticalTabs>
    )
}
