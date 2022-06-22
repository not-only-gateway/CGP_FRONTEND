import React, {useState} from "react";
import PropTypes from "prop-types";
import {Icon, Switcher} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import styles from "../styles/Home.module.css";
import {KEYS} from "../templates/KEYS";
import FormTemplate from "../ext/FormTemplate";
import {COMMISSIONED} from "../templates/forms/COMMISSIONED";
import {List, useQuery, useRequest} from "@f-ui/query";
import Cookies from "universal-cookie/lib";
import ENV from "../env";

export default function CommissionedList(props) {
    const [current, setCurrent] = useState()

    const hook = useQuery(getQuery('commissioned'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Cargo comissionado'}
                initial={current}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={COMMISSIONED}
                submit={(data) => {
                    make({
                        url: ENV.URLS.host + '/api/commissioned' + '/' + props.data.id,
                        method:  'PUT',
                        data,
                        headers: {'authorization': (new Cookies()).get('jwt')}
                    }).catch()
                }}
            />
            <List
                options={[{
                    label: 'Deletar',

                    validadeChoice: true,
                    validationMessage: 'Tem certeza ?',

                    icon: <Icon>delete_forever</Icon>,
                    onClick: (e) => {
                        console.log(e)
                        make({
                            url: ENV.URLS.host + '/api/commissioned/' + e.id,
                            method: 'delete',
                            headers: {'authorization': (new Cookies()).get('jwt')}
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }]}
                hook={hook}

                keys={KEYS.COMMISSIONED}
                onRowClick={e => setCurrent(e)}
                title={'Cargos comissionados'}
            />
        </Switcher>)

}

CommissionedList.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
