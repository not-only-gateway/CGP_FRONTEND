import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import useQuery from "../ext/hooks/useQuery";
import getQuery from "../utils/getQuery";
import styles from "../styles/Home.module.css";
import List from "../ext/list/List";
import {KEYS} from "../templates/KEYS";
import FormTemplate from "../ext/FormTemplate";
import page from "../public/page.json";
import {SIMPLE} from "../templates/forms/SIMPLE";
import useRequest from "../ext/hooks/useRequest";

export default function SimpleList(props) {
    const [current, setCurrent] = useState()
    const hook = useQuery(getQuery(props.urlPath))
    const {make} = useRequest(true)
    return (
        <Switcher openChild={current ? 0 : 1} className={styles.wrapper}>
            <FormTemplate
                title={props.title}
                initial={current}
                handleClose={() => {
                    hook.clean()
                    setCurrent(undefined)
                }}
                obj={SIMPLE}
                submit={(data) => {
                    make({
                        url: page.host + '/api/'+props.urlPath + (Object.keys(current).length === 0 ? '' : '/' + data.id),
                        method: Object.keys(current).length === 0 ? 'POST' : 'PUT',
                        data
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
                            url: page.host + '/api/'+props.urlPath + '/' + e.id,
                            method: 'delete'
                        })
                            .then(() => hook.clean())
                            .catch()
                    }
                }]}
                hook={hook}
                createOption={true}
                onCreate={() => setCurrent({})}
                keys={KEYS.SIMPLE}
                onRowClick={e => setCurrent(e)}
                title={props.title}
           />
        </Switcher>)
}

SimpleList.propTypes = {
    title: PropTypes.string,
    urlPath: PropTypes.string.isRequired,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object
}
