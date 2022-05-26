import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {DataRow, Modal, Switcher} from "@f-ui/core";

import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";

import {List, useQuery, useRequest, Avatar} from "@f-ui/query";
import FormTemplate from "../ext/FormTemplate";
import {COLLABORATOR} from "../templates/forms/COLLABORATOR";
import page from "../public/page.json";
import Cookies from "universal-cookie/lib";
import AdminContext from "../ext/wrapper/AdminContext";


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
                open={current !== undefined} handleClose={() => setCurrent(undefined)}>
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
                    /> : undefined}
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
