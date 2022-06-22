import React, {useEffect, useState} from 'react'
import styles from "../styles/Unit.module.css";
import {useRequest} from "@f-ui/query";
import pages from "../public/page.json"
import {useRouter} from "next/router";
import Cookies from "universal-cookie/lib";
import {Button, Icon, Tab, Tabs} from "@f-ui/core";
import Collaborators from "../components/Collaborators";
import UnitList from "../components/UnitList";
import axios from "axios";

export default function Unit() {
    const [open, setOpen] = useState(0)
    const [unit, setUnit] = useState()
    const router = useRouter()
    useEffect(() => {
        setOpen(0)
        setUnit(undefined)
        axios({
            url: pages.host + "/api/unit/" + router.query.id,
            headers: {authorization: (new Cookies()).get("jwt")}
        })
            .then(res => {
                if (res)
                    setUnit(res.data)
            })
            .catch(err => console.error(err))
    }, [router.query])

    if (!unit)
        return null
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <h2 className={styles.header}>
                    {unit.name}
                </h2>
                {unit.parent_unit ?
                    <Button
                        variant={"filled"}
                        onClick={() => router.push("/unit?id=" + unit.parent_unit.acronym)}
                        className={styles.button}
                    >
                        Ir para {unit.parent_unit.acronym}
                        <Icon styles={{fontSize: "1.2rem"}}>
                            arrow_upward
                        </Icon>
                    </Button>
                    : null}
            </div>
            {unit?.acronym ?
                <Tabs open={open} setOpen={setOpen} headerClassName={styles.listHeader} className={styles.tabs}>
                    <Tab label={"Colaboradores"} className={styles.tab}>
                        <Collaborators unit={unit.acronym}/>
                    </Tab>
                    <Tab label={"Unidades subordinadas"} className={styles.tab}>
                        <UnitList unit={unit.acronym} redirect={router.push}/>
                    </Tab>
                </Tabs>
                :
                null}
        </div>
    )
}
