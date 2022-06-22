import React from 'react'
import PropTypes from "prop-types";
import styles from './styles/TreeView.module.css'
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {v4} from 'uuid';
import Node from "./utils/Node";
import {Button} from "@f-ui/core";

const RIGHT_BUTTON = 2
const KEY = v4()
export default function TreeView(props) {
    const [scale, setScale] = useState(1)
    const handleWheel = e => {
        e.preventDefault()

        console.log(e.wheelDelta)
        if (e.wheelDelta > 0 && scale < 3)
            setScale(scale + scale * .1)
        else if (e.wheelDelta < 0 && scale >= .5)
            setScale(scale - scale * .1)
    }

    function handleBoardScroll(ref, event) {
        let scrolling = true
        let pos = {top: 0, left: 0, x: 0, y: 0};

        pos = {
            left: ref.scrollLeft,
            top: ref.scrollTop,
            x: event.clientX,
            y: event.clientY,
        };
        ref.style.cursor = 'grabbing'
        const handleMouseMove = (event) => {
            if (scrolling) {
                const dx = event.clientX - pos.x;
                const dy = event.clientY - pos.y;
                ref.scrollTop = pos.top - dy;
                ref.scrollLeft = pos.left - dx;
            }
        }
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', () => {
            ref.style.cursor = 'default'
            document.removeEventListener('mousemove', handleMouseMove)
            scrolling = false
        }, {once: true})
    }

    function handleMouseDown(event) {
        const target = event.currentTarget
        if (event.button === RIGHT_BUTTON) {
            console.log(target)
            handleBoardScroll(target, event)
        }
    }

    const ref = useRef()
    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('wheel', handleWheel, {passive: false})
            ref.current.parentNode.addEventListener("mousedown", handleMouseDown)
        }
        return () => {
            if (ref.current) {
                ref.current.parentNode.removeEventListener("mousedown", handleMouseDown)
                ref.current.removeEventListener('wheel', handleWheel, {passive: false})
            }
        }
    }, [scale])

    return (
        <div style={{overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", gap: "8px", position: "relative"}}>
            <h2 className={styles.title}>
                {props.title}
            </h2>
            <div className={styles.container}>
                <div
                    ref={ref}
                    className={styles.wrapper}
                    onContextMenu={e => {
                        e.preventDefault()

                    }}
                >

                    {props.nodes.map((n, i) => (
                        <ul
                            className={styles.tree} key={i + '-root-' + KEY}
                            style={{padding: "100px", transform: `scale(${scale})`}}
                        >
                            <Node wrapperKey={KEY} index={i} onClick={n.onClick} content={n.content}
                                  subNodes={n.subNodes} isRoot={true}/>
                        </ul>
                    ))}
                </div>

            </div>
            <div className={styles.scaleWrapper}>
                <Button styles={{background: "var(--fabric-border-primary)"}}  className={styles.button}  onClick={() => setScale(prev => (prev + .25) > 3 ? 3 : prev + .25)} disabled={scale === 3}>
                    <span style={{fontSize: "1.1rem"}}  className="material-icons-round">
                        add
                    </span>
                </Button>
                <div className={styles.currentScale}>
                    {scale.toFixed(0)}
                </div>
                <Button styles={{background: "var(--fabric-border-primary)"}} className={styles.button} onClick={() => setScale(prev => (prev - .25) < .25 ? .25 : prev - .25)} disabled={scale === .25}>
                    <span style={{fontSize: "1.1rem"}} className="material-icons-round">
                        remove
                    </span>
                </Button>
            </div>
        </div>
    )
}
TreeView.propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.node,
        subNodes: PropTypes.array,
        onClick: PropTypes.func
    }))
}
