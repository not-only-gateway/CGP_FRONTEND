import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import {KEYS} from "../templates/KEYS";
import styles from "../styles/Home.module.css";
import FormTemplate from "../ext/FormTemplate";
import {UNIT} from "../templates/forms/UNIT";
import {List, useQuery, useRequest} from "@f-ui/query";
import Cookies from "universal-cookie/lib";
import ENV from "../env";

export default function UnitList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('unit'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Unidade'}
                initial={current}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={UNIT}
                submit={(data) => {
                    make({
                        url: ENV.URLS.host + '/api/unit' + (Object.keys(current).length === 0 ? '' : '/' + data.acronym),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                        data: {
                            ...data,
                            parent_unit: data.parent_unit?.acronym,
                            root: data.root?.acronym
                        },
                        headers: {'authorization': (new Cookies()).get('jwt')}
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
                            url: ENV.URLS.host + '/api/unit/' + e.id,
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
                keys={KEYS.UNIT}
                onRowClick={e => setCurrent(e)}
                title={'Unidades'}
            />

        </Switcher>)

}

UnitList.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
