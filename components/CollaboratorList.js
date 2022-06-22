import React, {useState} from "react";
import PropTypes from "prop-types";
import {Icon, Switcher} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";

import {List, useQuery, useRequest} from "@f-ui/query";
import FormTemplate from "../ext/FormTemplate";
import {COLLABORATOR} from "../templates/forms/COLLABORATOR";
import Cookies from "universal-cookie/lib";
import ENV from "../env";

const SUFFIX_EMAIL = '@aeb.gov.br'

export default function CollaboratorList() {
    const [current, setCurrent] = useState()
    const hook = useQuery(
        getQuery('collaborator'),
        [{asc: true, desc: false, key: 'name'}]
    )
    const {make} = useRequest(false)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
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
                    const cpf = data.cpf.replaceAll('.', '').replaceAll('-', '')
                    const dataParsed = {
                        ...data,
                        id: data.id ? data.id : cpf,
                        cpf,
                        commissioned: data.commissioned?.id,
                        effective: data.effective?.id,
                        unit: data.unit?.acronym,
                        superior: data.superior?.id,
                        marital_status: data.marital_status?.id,
                        instruction: data.instruction?.id,
                        linkage: data.linkage?.id,
                        email: data.email ? (data.email.includes(SUFFIX_EMAIL) ? data.email : data.email + SUFFIX_EMAIL) : undefined
                    }

                    make(
                        {
                            url: ENV.URLS.host + '/api/collaborator' + (Object.keys(current).length === 0 ? '' : '/' + id),
                            method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                            data: dataParsed,
                            headers: {'authorization': (new Cookies()).get('jwt')}
                        },
                        true).catch()
                }}
            />
            <List
                cardHeight={'450px'}
                defaultVisualization={'card'}
                hasCardView={true}
                mapKeyOnNull={{
                    key: 'image', value: (v) => v.gender.toLowerCase() === 'masculino' ? './male.svg' : './female.svg'
                }}
                options={[{
                    label: 'Deletar',

                    validadeChoice: true, validationMessage: 'Tem certeza ?',

                    icon: <Icon>delete_forever</Icon>, onClick: (e) => {
                        make({
                            url: ENV.URLS.host + '/api/collaborator/' + e.id,
                            method: 'delete',
                            headers: {'authorization': (new Cookies()).get('jwt')}
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }]}
                hook={hook}
                createOption={true}
                onCreate={() => setCurrent({})}
                keys={KEYS.COLLABORATOR}
                onRowClick={e => setCurrent(e.data ? e.data : e)}
                title={'Colaboradores'}
            />
        </Switcher>
    )
}

CollaboratorList.propTypes = {
    handleClose: PropTypes.func, create: PropTypes.bool, data: PropTypes.object
}

