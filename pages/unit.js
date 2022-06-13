import React, {useEffect, useState} from 'react'
import styles from "../styles/Unit.module.css";
import {useRequest} from "@f-ui/query";
import pages from "../public/page.json"
import {useRouter} from "next/router";
import Cookies from "universal-cookie/lib";
import {Button, Tab, ToolTip, VerticalTabs} from "@f-ui/core";
import Collaborators from "../components/Collaborators";
import UnitList from "../components/UnitList";

export default function Unit() {
    const [open, setOpen] = useState(0)
    const [unit, setUnit] = useState()
    const router = useRouter()
    const {make} = useRequest(false)
    useEffect(() => {
        setOpen(0)
        setUnit(undefined)
        make({
            url: pages.host + "/api/unit/" + router.query.id,
            headers: {authorization: (new Cookies()).get("jwt")}
        }, false)
            .then(res => {
                if (res)
                    setUnit(res.data)
            })
            .catch()
    }, [router.query])

    if (!unit)
        return null
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <Button
                    variant={"filled"}
                    onClick={() => router.push("/unit?id=" + unit.parent_unit.acronym)}
                    className={styles.button}
                    styles={{   padding: "4px"}}
                >
                    <ToolTip content={"Retornar para ramais"}/>
                    <span style={{fontSize: "1.2rem"}} className={"material-icons-round"}>
                        chevron_left
                    </span>
                </Button>
                <h2 className={styles.header}>
                    {unit.name}
                </h2>
                {unit.parent_unit ?
                    <Button
                        variant={"outlined"}
                        onClick={() => router.push("/unit?id=" + unit.parent_unit.acronym)}
                        className={styles.button}
                        styles={{ padding: "4px 16px", background: "var(--fabric-border-primary)"}}
                    >
                        Ir para {unit.parent_unit.acronym}
                        <span style={{fontSize: "1.2rem"}} className={"material-icons-round"}>
                            open_in_new
                        </span>
                    </Button>
                    : null}
            </div>
            <VerticalTabs open={open} setOpen={setOpen} className={styles.tabs}>
                <Tab label={"Colaboradores"} className={styles.tab}>
                    <Collaborators unit={router.query.id}/>
                </Tab>
                <Tab label={"Unidades subordinadas"} className={styles.tab}>
                    <UnitList unit={unit.acronym} redirect={router.push}/>
                </Tab>

            </VerticalTabs>
        </div>
    )
}
