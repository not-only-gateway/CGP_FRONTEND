import getQuery from "../../utils/getQuery";
import {KEYS} from "../KEYS";

export const VACANCY = [{
    title: 'Informações básicas',
    groups: '3 2 2',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [
        {
            label: 'Nome função',
            placeHolder: 'Nome função',
            required: true,
            disabled: true,
            key: 'nomef',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Nome membro',
            placeHolder: 'Nome membro',
            required: true,
            disabled: true,
            key: 'nomem',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Cargo comissionado',
            placeHolder: 'Cargo comissionado',
            required: true,
            disabled: true,
            key: 'cargoc',
            type: 'text',
            width: '100%',
        },
    ],

},
    {
        title: 'Relações',
        groups: '2 2',
        rowGap: '4px',
        columnGap: '16px',


        inputs: [
            {
                label: 'Cargo comissionado',
                placeHolder: 'Cargo comissionado',
                required: true,
                disabled: true,
                key: 'commissioned',
                type: 'text',
                width: '100%',

                query: getQuery('commissioned'),
                keys: KEYS.COMMISSIONED,

            },

            {
                label: 'Unidade',
                placeHolder: 'Unidade',
                required: false,
                disabled: true,
                key: 'unit',
                type: 'text',
                width: '100%',

                query: getQuery('unit'),
                keys: KEYS.UNIT,

            },

            {
                label: 'Titular',
                placeHolder: 'Titular',
                required: false,
                disabled: false,
                key: 'holder',
                type: 'text',
                width: '100%',

                query: getQuery('collaborator'),
                keys: KEYS.COLLABORATOR_SIMPLE,

            },
            {
                label: 'Substituto',
                placeHolder: 'Substituto',
                required: false,
                disabled: false,
                key: 'substitute',
                type: 'text',
                width: '100%',


                query: getQuery('collaborator'),
                keys: KEYS.COLLABORATOR_SIMPLE
            }
        ]
    }]