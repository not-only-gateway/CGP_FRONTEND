import React from 'react'
import PropTypes from "prop-types";
import styles from '../styles/TreeView.module.css'

export default function Node(props) {

   return (

      <li>
         <span
             onClick={() => {
                if (props.onClick)
                   props.onClick()
             }}
         ><div className={styles.node}>{props.content}</div></span>

         {props.subNodes.length > 0 ?
            <ul>
               {props.subNodes?.map((m, i) => (
                  <React.Fragment key={i + '-element-' + props.wrapperKey}>
                     <Node
                         subNodes={m.subNodes}
                         onClick={m.onClick}
                           content={m.content} isRoot={false} wrapperKey={props.wrapperKey}
                           index={props.index + 1}
                     />
                  </React.Fragment>
               ))}
            </ul>
            :
            null}

      </li>

   )
}
Node.propTypes = {
   onClick: PropTypes.func,
   wrapperKey: PropTypes.string.isRequired,
   isRoot: PropTypes.bool,
   content: PropTypes.node,
   subNodes: PropTypes.array,
   index: PropTypes.number.isRequired
}
