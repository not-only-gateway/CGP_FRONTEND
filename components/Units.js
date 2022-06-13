import React, {useEffect, useMemo, useState} from 'react'
import CollaboratorList from "./CollaboratorList";
import Extensions from "./Collaborators";
import TreeView from "./tree/TreeView";
import {useRequest} from "@f-ui/query";
import ENV from "../env";
import styles from "../styles/Unit.module.css"
import PropTypes from "prop-types";


export default function Units(props) {
    const {redirect} = props
    const [nodes, setNodes] = useState([])
    const {make} = useRequest(false)
    const findRel = (u, all) => {
        if (u) {
            const children = all.filter(a => a.parent_unit === u.acronym || a.parent_unit?.acronym === u.acronym)
            return {
                subNodes: children.filter(c => c).map(c => findRel(c, all)),
                content: u.acronym,
                onClick: () => redirect("/unit?id=" + u.acronym)
            }
        }
        return {subNodes: [], content: "u.acronym"}
    }
    useEffect(() => {
        make({
            url: ENV.URLS.host + '/api/list/all/unit',
            method: 'GET'
        }).then(res => {
            const u = res.data
            setNodes([findRel(u.find(uu => !uu.parent_unit), u)])
        })
    }, [])

    return (
        <div style={{
            overflow: "hidden",
            display: "flex"
        }}>
            <TreeView nodes={nodes} title={"Unidades organizacionais"}/>
        </div>
    )
}

Units.propTypes={
    redirect: PropTypes.func
}