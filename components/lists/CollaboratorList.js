import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import useQuery from "../../ext/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import {KEYS} from "../../templates/KEYS";
import styles from "../../styles/Home.module.css";

import List from "../../ext/list/List";
import FormTemplate from "../../ext/FormTemplate";
import {COLLABORATOR} from "../../templates/forms/COLLABORATOR";
import page from "../../public/page.json";
import useRequest from "../../ext/hooks/useRequest";

export default function CollaboratorList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('collaborator'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Colaborador'}
                initial={current}
                handleClose={() => setCurrent(undefined)}
                obj={COLLABORATOR}
                submit={(data) => {
                    const dataParsed = {
                        ...data,
                        id: data.id.replaceAll('.', '').replaceAll('-', ''),
                        commissioned: data.commissioned?.id,
                        effective:  data.effective?.id,
                        unit:  data.unit?.acronym,
                        marital_status:  data.marital_status?.id,
                        instruction:  data.instruction?.id,
                        linkage: data.linkage?.id
                    }
                    const fD = new FormData();
                    Object.keys(dataParsed)
                        .forEach(k => {
                            fD.append(k, dataParsed[k])
                        })


                    make({
                        url: page.host + '/api/collaborator' + (Object.keys(current).length === 0 ? '' : '/' + data.id),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                        data: dataParsed,
                        headers: { "Content-Type": "multipart/form-data" }
                    }).catch()
                }}
            />
            <List
                options={[{
                    label: 'Deletar',

                    validadeChoice: true,
                    validationMessage: 'Tem certeza ?',

                    icon: <span className={'material-icons-round'}>delete_forever</span>,
                    onClick: (e) => {
                        console.log(e)
                        make({
                            url: page.host + '/api/collaborator/' + e.id,
                            method: 'delete'
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }]} hasCardView={true}
                hook={hook}
                createOption={true}
                onCreate={() => setCurrent({})}
                keys={KEYS.COLLABORATOR}
                onRowClick={e => {
                    let split = e.id.split('')
                    let maskedCPF = [split[0],split[1],split[2],'.', split[3],split[4],split[5],'.',split[6],split[7],split[8],'-',split[9],split[10]].join('')
                    setCurrent({...e, id:maskedCPF})
                }}
                title={'Colaboradores'}
            />
        </Switcher>
    )
}

CollaboratorList.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
