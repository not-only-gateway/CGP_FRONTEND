import React, {useCallback, useContext, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AlertProvider, Button, Dropdown, DropdownOptions, Modal, Tab, Tabs, TextField, ThemeContext} from "@f-ui/core";
import styles from "../styles/Home.module.css";

import {Avatar, useRequest} from "@f-ui/query";
import Cookies from "universal-cookie/lib";
import QRCode from 'qrcode'
import html2canvas from "html2canvas";
import ENV from "../env";

const SUFFIX_EMAIL = '@aeb.gov.br'

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

export default function UserModal(props) {
    const {current, setCurrent} = props
    const ref = useCallback(node => {
        if (node)
            QRCode.toCanvas(node, getVCARD(current.name, current.email, current.extension), (err) => console.log(err))
    }, [])
    const canvasRef = useRef()
    const [open, setOpen] = useState(0)
    const [reportData, setReportData] = useState('')
    const [birthMessage, setBirthMessage] = useState('')
    const isBirthDay = useMemo(() => {
        const date = new Date(current.birth)
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const dateObj = new Date();
        const monthM = dateObj.getUTCMonth() + 1;
        const dayM = dateObj.getUTCDate();
        return month === monthM && day === dayM
    }, [])
    const themeProvider = useContext(ThemeContext)
    const ownProfile = useMemo(() => {
        const e = localStorage.getItem('email')
        return current && e !== null && current.email.toLowerCase().trim() === e.toLowerCase().trim()
    }, [current])

    const {make} = useRequest(true)
    const sendMail = (data) => {
        make({
            url: ENV.URLS.host + '/api/notification',
            method: 'POST',
            headers: {'authorization': (new Cookies()).get('jwt')},
            data
        })

    }
    return (
        <Modal
            animationStyle={'slide-right'}
            className={styles.modal}
            blurIntensity={'1px'}
            wrapperClassName={styles.modalWrapper}
            open={current !== undefined}
            handleClose={() => setCurrent(undefined)}
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
                        <>

                            <fieldset className={styles.fieldSet}>
                                <legend>Email</legend>
                                <div>{current.email}</div>
                            </fieldset>
                            <fieldset className={styles.fieldSet}>
                                <legend>Ramail</legend>
                                <div>{current.extension ? current.extension : 'Não informado'}</div>
                            </fieldset>
                            <fieldset className={styles.fieldSet}>
                                <legend>Cargo</legend>
                                <div>{current.role ? current.role : 'Não informado'}</div>
                            </fieldset>
                            {current.unit ? <fieldset className={styles.fieldSet}>
                                <legend>Unidade</legend>
                                <div>{current.unit.name}</div>
                            </fieldset> : null}
                            {current.directory ? <fieldset className={styles.fieldSet}>
                                <legend>Diretoria</legend>
                                <div>{current.directory}</div>
                            </fieldset> : null}
                        </>
                        :
                        undefined
                    }
                    <div className={styles.floating}>
                        {isBirthDay && !ownProfile ?
                            <Dropdown className={styles.report} hideArrow={true}
                                      disabled={true}
                                      styles={{'--fabric-accent-color': '#ff5555'}}
                                      wrapperClassname={[styles.contentModal, themeProvider.dark ? styles.dark : styles.light].join(' ')}>
                                <div className={styles.contentInput}>
                                    <span style={{color: '#ff5555'}} className={'material-icons-round'}>cake</span>
                                    Parabenizar aniversariante
                                </div>
                                <DropdownOptions>
                                    <TextField
                                        value={birthMessage}
                                        label={'Mensagem'}
                                        placeholder={'Feliz aniversário...'}
                                        handleChange={e => setBirthMessage(e.target.value)}
                                        variant={'area'}
                                    />
                                    <Button
                                        variant={"filled"}
                                        className={styles.buttonDownload}
                                        disabled={birthMessage.length === 0}
                                        onClick={(e) => {

                                        }}>
                                        Enviar
                                    </Button>
                                </DropdownOptions>
                            </Dropdown> : null}

                        {ownProfile ?
                            <Dropdown
                                className={styles.report} hideArrow={true}
                                disabled={true}
                                wrapperClassname={[styles.contentModal, themeProvider.dark ? styles.dark : styles.light].join(' ')}>
                                <div className={styles.contentInput}>
                                    <span className={'material-icons-round'}>bug_report</span>
                                    Reportar erro no dado
                                </div>
                                <DropdownOptions>
                                    <TextField
                                        value={reportData}
                                        label={'Mensagem'}
                                        placeholder={'Descrição'}
                                        handleChange={e => setReportData(e.target.value)}
                                        variant={'area'}
                                    />
                                    <Button
                                        variant={"filled"}
                                        className={styles.buttonDownload}
                                        disabled={reportData.length === 0}
                                        onClick={(e) => {
                                            sendMail({
                                                title: 'CAFE',
                                                message: "CAFE",
                                                footer: "CAFE",
                                                sender: 'gustavo.roque@aeb.gov.br',
                                                receiver: 'gustavo.roque@aeb.gov.br'
                                            })
                                        }}>
                                        Enviar
                                    </Button>
                                </DropdownOptions>
                            </Dropdown> : null}

                    </div>
                </Tab>
                <Tab label={'Cartão virtual'} disabled={!current.role || !current.extension} className={styles.modalTab}>
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
        </Modal>
    )
}

UserModal.propTypes={
    current: PropTypes.object,
    setCurrent: PropTypes.func
}