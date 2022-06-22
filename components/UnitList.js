import React, {useState} from "react";
import PropTypes from "prop-types";
import {Icon, Switcher} from "@f-ui/core";
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
    const hook = useQuery(getQuery('unit'), [], props.unit ? [{
        equal: true, key: "parent_unit", value: props.unit, hidden: true
    }] : [])
    const {make} = useRequest(true)

    const list = (
        <List
            options={[{
                label: 'Deletar',

                validadeChoice: true,
                validationMessage: 'Tem certeza ?',

                icon: <Icon>delete_forever</Icon>,
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
            createOption={!props.unit}
            onCreate={() => setCurrent({})}
            keys={KEYS.UNIT}
            onRowClick={e => {
                if(props.unit)
                    props.redirect("/unit?id="+e.acronym)
                setCurrent(e)
            }}
            title={'Unidades'}
        />
    )

    if (props.unit)
        return list
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
            {list}
        </Switcher>)

}

UnitList.propTypes = {
    redirect: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object,
    unit: PropTypes.string
}
