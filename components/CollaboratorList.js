import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button, DataRow, Modal, Switcher, Tab, Tabs, TextField} from "@f-ui/core";

import getQuery from "../utils/getQuery";
import {KEYS, unit} from "../templates/KEYS";
import styles from "../styles/Home.module.css";

import {List, useQuery, useRequest, Avatar} from "@f-ui/query";
import FormTemplate from "../ext/FormTemplate";
import {COLLABORATOR} from "../templates/forms/COLLABORATOR";
import Cookies from "universal-cookie/lib";
import AdminContext from "../ext/wrapper/AdminContext";
import QRCode from 'qrcode'
import html2canvas from "html2canvas";
import ENV from "../env";


export default function CollaboratorList() {
    const isADM = useContext(AdminContext)
    console.log(isADM)
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('collaborator'), [{asc: true, desc: false, key: 'name'}], [{
        equal: true, key: 'active', value: true, hidden: true
    }])

    const {make} = useRequest(false)
    const keys = useMemo(() => {
        if (!isADM) return KEYS.NOT_ADM_COLLABORATOR
        return KEYS.COLLABORATOR
    }, [isADM])
    return (<>
        {!isADM && current ? (
            <User keys={keys} current={current} setCurrent={setCurrent}/>
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
                    const id = current.id

                    console.log(data)
                    const dataParsed = {
                        ...data,
                        id: data.id,
                        cpf: data.cpf.replaceAll('.', '').replaceAll('-', ''),
                        commissioned: data.commissioned?.id,
                        effective: data.effective?.id,
                        unit: data.unit?.acronym,
                        marital_status: data.marital_status?.id,
                        instruction: data.instruction?.id,
                        linkage: data.linkage?.id,
                    }

                    make({
                        url: ENV.URLS.host + '/api/collaborator' + (Object.keys(current).length === 0 ? '' : '/' + id),
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
                            url: ENV.URLS.host + '/api/collaborator/' + e.id,
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
                    console.log(e)
                    const state = {...(e.data ? e.data : e)}
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


function User({current, keys, setCurrent}) {
    const ref = useCallback(node => {
        if (node)
            QRCode.toCanvas(node, getVCARD(current.name, current.email, current.extension), (err) => console.log(err))
    }, [])
    const canvasRef = useRef()
    const [open, setOpen] = useState(0)
    const [report, setReport] = useState(false)
    const [reportData, setReportData] = useState('')

    const ownProfile = useMemo(() => {
        const e = localStorage.getItem('email')
        return current && e !== null && current.email.toLowerCase().trim() === e.toLowerCase().trim()
    }, [current])
    const allKeys = useMemo(() => {
        return [
            ...keys.filter(k => k.key !== 'image'),
            {
                key: 'unit',
                type: 'object',
                subfieldKey: 'name',
                label: 'Nome unidade',
                visible: true
            },
            {
                key: 'directory',
                type: 'string',
                label: 'Diretoria',
                visible: true
            }
        ]
    }, [])
    return (
        <>
            <Modal
                open={report}
                handleClose={() => setReport(false)}
                blurIntensity={'1px'}
                className={styles.reportModal}
                wrapperClassName={styles.reportWrapperModal}>
                <TextField
                    value={reportData}
                    label={'Mensagem'}
                    placeholder={'Descreva o erro'}
                    handleChange={e => setReportData(e.target.value)}
                    variant={'area'}
                />
                <Button
                    variant={"filled"}
                    className={styles.buttonDownload}
                    disabled={reportData.length === 0}
                    onClick={(e) => {


                        setReport(false)
                        setReportData('')
                    }}>
                    Enviar
                </Button>
            </Modal>
            {report ? null : <Modal
                animationStyle={'slide-right'}
                className={styles.modal}
                blurIntensity={'1px'}
                wrapperClassName={styles.modalWrapper}
                open={current !== undefined}
                handleClose={() => {
                    console.log('CLOSING', report)
                    if (!report)
                        setCurrent(undefined)
                }}
            >
                <Tabs open={open} setOpen={setOpen} className={styles.modalContent}>
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
                                keys={allKeys}
                                asCard={true} selfContained={true}
                                object={current}
                                className={styles.selectedCard}
                            />
                            :
                            undefined
                        }

                        {ownProfile ?
                            <Button onClick={() => setReport(true)} className={styles.report} variant={"filled"}>Reportar
                                erro no dado</Button> : null}

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

                            <Button
                                variant={"filled"}
                                className={styles.buttonDownload}
                                onClick={(e) => {
                                    html2canvas(canvasRef.current, {scale: 4, backgroundColor: null}).then(canvas => {
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
                                <span className={'material-icons-round'}
                                      style={{fontSize: '1.1rem'}}>file_download</span>
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
                                <span className={'material-icons-round'}
                                      style={{fontSize: '1.1rem'}}>file_download</span>
                                Download
                            </Button>
                        </fieldset>
                    </Tab>
                </Tabs>
            </Modal>}
        </>
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