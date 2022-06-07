import React from 'react'
import PropTypes from "prop-types";
import styles from './styles/TreeView.module.css'
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {v4} from 'uuid';
import Node from "./utils/Node";


export default function TreeView(props) {
   const [wrapperKey, setWrapperKey] = useState()
   useLayoutEffect(() => {
      if(!wrapperKey)
         setWrapperKey(v4())
   }, [])

   return (
       <figure className={styles.wrapper} onContextMenu={e => {
          e.preventDefault()

       }}>
          {props.nodes.map((n, i) => (
             <ul className={styles.tree} key={i + '-root-' + wrapperKey}>
                <Node wrapperKey={wrapperKey} index={i} content={n.content} subNodes={n.subNodes} isRoot={true}/>
             </ul>
          ))}
       </figure>
   )
}
TreeView.propTypes = {
   nodes: PropTypes.arrayOf(PropTypes.shape({

      content: PropTypes.node,
      subNodes: PropTypes.array,
   }))
}
