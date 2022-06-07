import React, {useEffect, useMemo, useState} from 'react'
import CollaboratorList from "../components/CollaboratorList";
import Extensions from "../components/Extensions";
import TreeView from "../components/tree/TreeView";
import {useRequest} from "@f-ui/query";
import ENV from "../env";
import styles from "../styles/Unit.module.css"
export default function Unidades() {
    const [nodes, setNodes] = useState([])
    const {make} = useRequest(false)
    const findRel = (u, all) => {
        if(u) {
            const children = all.filter(a => a.parent_unit === u.acronym || a.parent_unit?.acronym === u.acronym)
            return {
                subNodes: children.filter(c => c).map(c => findRel(c, all)),
                content: u.acronym
            }
        }
        return {subNodes: [], content: "u.acronym"}
    }
    useEffect(() => {
        make({
            url: ENV.URLS.host + '/api/list/all/unit',
            method: 'GET'
        }).then(res => {
            const u= res.data
            console.log(u)
            setNodes([findRel(u.find(uu => !uu.parent_unit), u)])
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <TreeView nodes={nodes}/>
        </div>
    )
}
