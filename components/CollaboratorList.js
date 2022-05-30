import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button, DataRow, Modal, Switcher, Tab, Tabs} from "@f-ui/core";

import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";

import {List, useQuery, useRequest, Avatar} from "@f-ui/query";
import FormTemplate from "../ext/FormTemplate";
import {COLLABORATOR} from "../templates/forms/COLLABORATOR";
import page from "../public/page.json";
import Cookies from "universal-cookie/lib";
import AdminContext from "../ext/wrapper/AdminContext";
import QRCode from 'qrcode'
import html2canvas from "html2canvas";


export default function CollaboratorList() {
    const isADM = useContext(AdminContext)
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('collaborator'), [{asc: true, desc: false, key: 'name'}], [{
        equal: true, key: 'active', value: true, hidden: true
    }])

    const {make, setShowSuccess} = useRequest(false)
    const keys = useMemo(() => {
        if (!isADM) return KEYS.NOT_ADM_COLLABORATOR
        return KEYS.COLLABORATOR
    }, [isADM])
    return (<>
        {!isADM ? (
            <Modal
                animationStyle={'slide-right'}
                className={styles.modal} blurIntensity={'1px'} wrapperClassName={styles.modalWrapper}
                open={current !== undefined} handleClose={() => setCurrent(undefined)}
            >
                <User keys={keys} current={current}/>
            </Modal>
        ) : null}
        <Switcher openChild={current && isADM ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Colaborador'}
                initial={current}
                create={!current?.id}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={COLLABORATOR}
                submit={(data) => {
                    const id = current ? current.id.replaceAll('.', '').replaceAll('-', '') : data.id

                    const dataParsed = {
                        ...data,
                        id: data.id.replaceAll('.', '').replaceAll('-', ''),
                        commissioned: data.commissioned?.id,
                        effective: data.effective?.id,
                        unit: data.unit?.acronym,
                        marital_status: data.marital_status?.id,
                        instruction: data.instruction?.id,
                        linkage: data.linkage?.id,


                    }

                    make({
                        url: page.host + '/api/collaborator' + (Object.keys(current).length === 0 ? '' : '/' + id),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                        data: dataParsed,
                        headers: {'authorization': (new Cookies()).get('jwt')}
                    }, true).catch()
                }}
            />
            <List
                cardHeight={'450px'}
                defaultVisualization={'card'}
                hasCardView={true}
                mapKeyOnNull={{
                    key: 'image', value: (v) => v.gender.toLowerCase() === 'masculino' ? './male.svg' : './female.svg'
                }}
                options={isADM ? [{
                    label: 'Deletar',

                    validadeChoice: true, validationMessage: 'Tem certeza ?',

                    icon: <span className={'material-icons-round'}>delete_forever</span>, onClick: (e) => {
                        make({
                            url: page.host + '/api/collaborator/' + e.id,
                            method: 'delete',
                            headers: {'authorization': (new Cookies()).get('jwt')}
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }] : []}

                hook={hook}
                createOption={isADM}
                onCreate={() => setCurrent({})}
                keys={keys}
                onRowClick={async e => {

                    let split = e.id.split('')
                    let maskedCPF = [split[0], split[1], split[2], '.', split[3], split[4], split[5], '.', split[6], split[7], split[8], '-', split[9], split[10]].join('')
                    const state = {...(e.data ? e.data : e), id: maskedCPF}
                    if (state.gender) state.gender = state.gender.toLowerCase()
                    setCurrent(state)
                }}
                title={'Colaboradores'}
            />
        </Switcher>
    </>)
}

CollaboratorList.propTypes = {
    handleClose: PropTypes.func, create: PropTypes.bool, data: PropTypes.object
}


function User({current, keys}) {
    const ref = useCallback(node => {
        if (node)
            QRCode.toCanvas(node, getVCARD(current.name, current.email, current.extension), (err) => console.log(err))
    }, [])
    const canvasRef = useRef()
    const [open, setOpen] = useState(0)


    return (
        <Tabs open={open} setOpen={setOpen}>
            <Tab label={'Dados'} className={styles.modalTab}>
                <Avatar
                    alt={current?.name}
                    src={current?.image}
                    size={"huge"}
                    outlined={true}
                />
                <h2>{current?.name}</h2>
                {current ?
                    <DataRow
                        keys={keys.filter(k => k.key !== 'image')}
                        asCard={true} selfContained={true}
                        object={current}
                        className={styles.selectedCard}
                    />
                    :
                    undefined
                }
            </Tab>
            <Tab label={'Cartão virtual'} className={styles.modalTab}>
                <fieldset className={styles.qrCode}>
                    <legend>Cartão virtual</legend>
                    <div ref={canvasRef} className={styles.cardWrapper}>

                        <img src={'./ass.png'} alt={'assinatura'} className={styles.imgData}/>
                        <div className={styles.cardInfo}>
                            <div style={{fontSize: '8px'}}>
                                {current.name}
                            </div>
                            <div>
                                {current.role}
                            </div>
                            <div>
                                {current.unit?.name}
                            </div>
                            <div>
                                {current.directory}
                            </div>
                            <div style={{fontSize: '8px'}}>
                                Agência Espacial Brasileira
                            </div>
                            <div>
                                (61) 2033-{current.extension}&nbsp;&nbsp;&nbsp;&nbsp;{current.email}
                            </div>
                        </div>
                    </div>
                    {/*<canvas ref={canvasRef} className={styles.canvas} width={'890'} height={'300'}/>*/}
                    <Button variant={"filled"}
                            className={styles.buttonDownload}
                            onClick={(e) => {
                                console.log(canvasRef.current)
                                html2canvas(canvasRef.current, { scale:4, backgroundColor: null }).then(canvas =>  {
                                    document.body.appendChild(canvas);
                                    const element = document.createElement('a');
                                    element.setAttribute('href', canvas.toDataURL());
                                    element.setAttribute('download', 'Cartão virtual' + current.name);
                                    element.style.display = 'none';
                                    document.body.appendChild(element);
                                    element.click();
                                    document.body.removeChild(element);
                                })
                            }}>
                        <span className={'material-icons-round'} style={{fontSize: '1.1rem'}}>file_download</span>
                        Download
                    </Button>
                </fieldset>
                <fieldset className={styles.qrCode}>
                    <legend>Contato</legend>
                    <canvas ref={ref}/>
                    <Button variant={"filled"}
                            className={styles.buttonDownload}
                            onClick={(e) => {
                                const element = document.createElement('a');
                                element.setAttribute('href', e.target.previousSibling.toDataURL());
                                element.setAttribute('download', 'QR-CODE-' + current.name);
                                element.style.display = 'none';
                                document.body.appendChild(element);
                                element.click();
                                document.body.removeChild(element);
                            }}>
                        <span className={'material-icons-round'} style={{fontSize: '1.1rem'}}>file_download</span>
                        Download
                    </Button>
                </fieldset>
            </Tab>
        </Tabs>
    )
}

function getVCARD(name, email, ramal) {
    const splitName = name.split(/\s/)
    return `BEGIN:VCARD
N: ${splitName[splitName.length - 1]}; ${splitName[0]};;;
FN: ${name}
TITLE: Agencia Espacial Brasileira
TEL;WORK,VOICE:61 2033-${ramal}
EMAIL;INTERNET,HOME:${email}
ADR;WORK:;;SPO, Setor Policial, Área 5 Quadra 3 BL A, SHCS, Brasília - DF, 70610-200;;;;
END:VCARD`
}