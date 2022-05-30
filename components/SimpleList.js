import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switcher} from "@f-ui/core";
import getQuery from "../utils/getQuery";
import styles from "../styles/Home.module.css";
import {KEYS} from "../templates/KEYS";
import FormTemplate from "../ext/FormTemplate";
import {SIMPLE} from "../templates/forms/SIMPLE";
import {List, useQuery, useRequest} from "@f-ui/query";
import Cookies from "universal-cookie/lib";
import ENV from "../env";

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
                        url: ENV.URLS.host + '/api/'+props.urlPath + (Object.keys(current).length === 0 ? '' : '/' + data.id),
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

                    icon: <span className={'material-icons-round'}>delete_forever</span>,
                    onClick: (e) => {

                        make({
                            url: ENV.URLS.host + '/api/'+props.urlPath + '/' + e.id,
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
