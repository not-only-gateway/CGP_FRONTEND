import React, {useState} from "react";
import PropTypes from "prop-types";
import {Icon, Switcher} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import styles from "../styles/Home.module.css";
import {KEYS} from "../templates/KEYS";
import FormTemplate from "../ext/FormTemplate";
import {EFFECTIVE} from "../templates/forms/EFFECTIVE";
import {List, useQuery, useRequest} from "@f-ui/query";
import Cookies from "universal-cookie/lib";
import ENV from "../env";

export default function EffectiveList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('effective'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Cargo efetivo'}
                initial={current}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={EFFECTIVE}
                submit={(data) => {
                    make({
                        url: ENV.URLS.host + '/api/effective' + (Object.keys(current).length === 0 ? '' : '/' + props.data.id),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
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
                        make({
                            url: ENV.URLS.host + '/api/effective/' + e.id,
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
                keys={KEYS.EFFECTIVE}
                onRowClick={e => setCurrent(e)}
                title={'Cargos efetivos'}
        />
        </Switcher>)

}

EffectiveList.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
