import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import useQuery from "../ext/hooks/useQuery";
import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";
import List from "../ext/list/List";
import FormTemplate from "../ext/FormTemplate";
import {VACANCY} from "../templates/forms/VACANCY";
import page from "../public/page.json";
import useRequest from "../ext/hooks/useRequest";

export default function VacancyList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('vacancy'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Distribuição de comissionado'}
                initial={current}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={VACANCY}
                submit={(data) => {
                    make({
                        url: page.host + '/api/vacancy/' + data.id,
                        method: 'PUT',
                        data: {
                            ...data,
                            commissioned: data.commissioned?.id,
                            unit: data.unit?.acronym,
                            holder: data.holder?.id,
                            substitute: data.substitute?.id
                        }
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

                        make({
                            url: page.host + '/api/vacancy/' + e.id,
                            method: 'delete'
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }]}
                hook={hook}

                keys={KEYS.VACANCY}
                onRowClick={e => setCurrent(e)}
                title={'Distribuição de comissionados'}
            />
        </Switcher>)

}

VacancyList.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
