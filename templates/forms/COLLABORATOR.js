import {KEYS} from "../KEYS";
import getQuery from "../../utils/getQuery";

export const COLLABORATOR = [{
    title: 'Informações básicas',
    groups: '3 2 3 3 2',
    rowGap: '4px',
    columnGap: '16px',
    inputs: [
        {
            label: 'Imagem',
            placeHolder: 'Imagem',
            required: false,
            disabled: false,
            key: 'image',
            type: 'image'
        },
        {
            label: 'CPF',
            placeHolder: 'CPF',
            required: true,
            disabled: false,
            key: 'cpf',
            type: 'text',
            width: '100%',
            customProps: {
                mask: '000.000.000-00'
            }
        },
        {
            label: 'Matrícula',
            placeHolder: 'Matrícula',
            required: false,
            disabled: false,
            key: 'registration',
            type: 'text',
            width: '100%',
            customProps: {
                maxLength: 15
            }
        },
        {
            label: 'Nome',
            placeHolder: 'Nome',
            required: true,
            disabled: false,
            key: 'name',
            type: 'text',
            width: '100%',
            customProps: {
                maxLength: 100
            }
        },
        {
            label: 'Superior',
            placeHolder: 'Superior',
            required: false,
            disabled: false,
            key: 'superior',
            type: 'text',
            width: '100%',
            customProps: {
                maxLength: 12
            }
        },
        {
            label: 'Nascimento',
            placeHolder: 'Nascimento',
            required: false,
            disabled: false,
            key: 'birth',
            type: 'date',
            customProps: {
                hoursOffset: 4
            },
            width: '100%',
        },
        {
            label: 'Gênero',
            placeHolder: 'Gênero',
            required: true,
            disabled: false,
            key: 'gender',
            type: 'select',
            customProps: {
                choices: [
                    {key: 'masculino', value: 'Masculino'},
                    {key: 'feminino', value: 'Feminino'},
                    {key: 'Outro', value: 'Outro'}
                ]
            },
            width: '100%',
        },
        {
            label: 'Nacionalidade',
            placeHolder: 'Nacionalidade',
            required: true,
            disabled: false,
            key: 'nationality',
            type: 'text',
            width: '100%',
        },
        {
            label: 'PNE',
            placeHolder: 'PNE',
            required: false,
            disabled: false,
            key: 'pne',
            type: 'text',
            width: '100%',
            customProps: {
                maxLength: 3
            }
        },
        {
            label: 'Data admissão',
            placeHolder: 'Data admissão',
            required: false,
            disabled: false,
            key: 'admission',
            type: 'date',
            customProps: {
                hoursOffset: 4
                },
            width: '100%',
        },
        {
            label: 'Data demissao',
            placeHolder: 'Data demissao',
            required: false,
            disabled: false,
            key: 'resignation',
            type: 'date',
            customProps: {
                hoursOffset: 4
            },
            width: '100%',
        },
        {
            label: 'Ramal',
            placeHolder: 'Ramal',
            required: false,
            disabled: false,
            key: 'extension',
            type: 'text',
            customProps: {
                type: 'number',
                maxLength: 4
            },
            width: '100%',
        },
        {
            label: 'Email pessoal',
            placeHolder: 'Email pessoal',
            required: false,
            disabled: false,
            key: 'personal_email',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Email corporativo',
            placeHolder: 'Email corporativo',
            required: false,
            disabled: false,
            key: 'email',
            type: 'text',
            width: '100%',
        },
        {
            label: 'Grau',
            placeHolder: 'Grau',
            required: false,
            disabled: false,
            key: 'degree',
            type: 'text',
            width: '100%',
        }
    ]
},


    {
        title: 'Relações',
        groups: '3 3',
        rowGap: '4px',
        columnGap: '16px',


        inputs: [
            {
                label: 'Cargo comissionado',
                placeHolder: 'Cargo comissionado',
                required: false,
                disabled: false,
                key: 'commissioned',
                type: 'text',
                width: '100%',

                query: getQuery('commissioned'),
                keys: KEYS.COMMISSIONED,

            },
            {
                label: 'Cargo efetivo',
                placeHolder: 'Cargo efetivo',
                required: false,
                disabled: false,
                key: 'effective',
                type: 'text',
                width: '100%',

                query: getQuery('effective'),
                keys: KEYS.EFFECTIVE,

            },
            {
                label: 'Unidade',
                placeHolder: 'Unidade',
                required: false,
                disabled: false,
                key: 'unit',
                type: 'text',
                width: '100%',

                query: getQuery('unit'),
                keys: KEYS.UNIT,

            },
            {
                label: 'Estado civil',
                placeHolder: 'Estado civil',
                required: false,
                disabled: false,
                key: 'marital_status',
                type: 'text',
                width: '100%',


                query: getQuery('marital_status'),
                keys: KEYS.SIMPLE,

            },
            {
                label: 'Instrução',
                placeHolder: 'Instrução',
                required: false,
                disabled: false,
                key: 'instruction',
                type: 'text',
                width: '100%',

                query: getQuery('instruction'),
                keys: KEYS.SIMPLE,

            },
            {
                label: 'Vínculo',
                placeHolder: 'Vínculo',
                required: false,
                disabled: false,
                key: 'linkage',
                type: 'text',
                width: '100%',


                query: getQuery('linkage'),
                keys: KEYS.SIMPLE
            }
        ]
    }
]