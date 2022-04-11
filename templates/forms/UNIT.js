import getQuery from "../../utils/getQuery";
import {KEYS} from "../KEYS";

export const UNIT = [{
    title: 'Informações básicas',
    groups: '3 2 3 3 2',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [

        {
            label: 'Nome',
            placeHolder: 'Nome',
            required: true,
            disabled: false,
            key: 'name',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Acrônimo',
            placeHolder: 'Acrônimo',
            required: true,
            disabled: false,
            key: 'acronym',
            type: 'text',
            width: '100%',
        },

        {
            label: 'Unidade pai',
            placeHolder: 'Unidade pai',
            required: true,
            disabled: false,
            key: 'parent_unit',
            type: 'text',
            width: '100%',
            keys: KEYS.UNIT,
            query: getQuery('unit')
        },
        {
            label: 'Unidade raiz',
            placeHolder: 'Unidade raiz',
            required: true,
            disabled: false,
            key: 'root',
            type: 'text',
            width: '100%',
            keys: KEYS.UNIT,
            query: getQuery('unit')
        },



    ]
}]