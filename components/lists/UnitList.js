import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import useQuery from "../../ext/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import {KEYS} from "../../templates/KEYS";
import styles from "../../styles/Home.module.css";
import List from "../../ext/list/List";
import FormTemplate from "../../ext/FormTemplate";
import {UNIT} from "../../templates/forms/UNIT";
import page from "../../public/page.json";
import useRequest from "../../ext/hooks/useRequest";

export default function UnitList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery('unit'))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={'Unidade'}
                initial={current}
                handleClose={() => setCurrent(undefined)}
                obj={UNIT}
                submit={(data) => {
                    make({
                        url: page.host + '/api/unit' + (Object.keys(current).length === 0 ? '' : '/' + props.data.id),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                        data: {
                            ...data,
                            id: data.id.replaceAll('.', '').replaceAll('-', '')
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
                        console.log(e)
                        make({
                            url: page.host + '/api/unit/' + e.id,
                            method: 'delete'
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
