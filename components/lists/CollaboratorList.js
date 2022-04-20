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
import SOLIDES from "../../utils/SOLIDES";

export default function CollaboratorList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('collaborator'))
    const {make, setShowSuccess} = useRequest(false)

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
                        data: dataParsed
                    }, true).catch()
                }}
            />
            <List
                mapKeyOnNull={{
                    key: 'image',
                    value: (v) => v.gender === 'Masculino' ? './male.svg' : './female.svg'
                }}
                options={[{
                    label: 'Deletar',

                    validadeChoice: true,
                    validationMessage: 'Tem certeza ?',

                    icon: <span className={'material-icons-round'}>delete_forever</span>,
                    onClick: (e) => {
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
                onRowClick={async e => {
                    let split = e.id.split('')
                    let maskedCPF = [split[0], split[1], split[2], '.', split[3], split[4], split[5], '.', split[6], split[7], split[8], '-', split[9], split[10]].join('')
                    setCurrent({...e, id: maskedCPF})
                    if (e?.id && !e?.image) {
                        const res = await SOLIDES(e.id, make, e.solides_id)

                        if (res) {
                            setCurrent({...e, id: maskedCPF, image: res[0], solides_id: res[1]?.id})
                        }
                    }
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
