import getQuery from "../utils/getQuery";

const unit = [{key: 'acronym', type: 'string', label: 'Acrônimo', visible: true}, {
    key: 'name',
    type: 'string',
    label: 'Nome',
    visible: true
}], comiss = [{key: 'classification', type: 'string', label: 'Classificação', visible: true}, {
    key: 'level',
    type: 'string',
    label: 'Nível',
    visible: true
}, {key: 'name', type: 'string', label: 'Nome', visible: true},

    {key: 'quantity', type: 'number', label: 'Quantidade', visible: false}, {
        key: 'unitary_value',
        type: 'number',
        label: 'Valor unitário',
        visible: false
    },], effec = [{key: 'name', type: 'string', label: 'Nome', visible: true}, {
    key: 'regime',
    type: 'string',
    label: 'Regime',
    visible: true
},]

export const KEYS = {

    COMMISSIONED: comiss,
    EFFECTIVE: effec,
    VACANCY: [{
        key: 'commissioned',
        type: 'object',
        label: 'Cargo comissionado',
        visible: true,
        subfieldKey: 'name',
        subType: 'string',
        query: {...getQuery('comissioned'), keys: comiss, primaryKey: 'id'}
    }, {
        key: 'unit',
        type: 'object',
        label: 'Unidade',
        visible: true,
        subfieldKey: 'acronym',
        subType: 'string',
        query: {...getQuery('unit'), keys: unit, primaryKey: 'acronym'}
    }, {
        key: 'holder',
        type: 'object',
        label: 'Titular',
        visible: true,
        subfieldKey: 'name',
        query: {...getQuery('collaborator'), keys: unit, primaryKey: 'id'}
    }, {
        key: 'substitute',
        type: 'object',
        label: 'Substituto',
        visible: true,
        subfieldKey: 'name',
        query: {...getQuery('collaborator'), keys: unit, primaryKey: 'id'}
    },

        {key: 'nomef', type: 'string', label: 'Nome função', visible: true}, {
            key: 'nomem',
            type: 'string',
            label: 'Nome M',
            visible: true
        }, {key: 'cargoc', type: 'string', label: 'Cargo comissionado', visible: true},],

    UNIT: [...unit, {
        key: 'parent_unit',
        type: 'object',
        label: 'Unidade superior',
        visible: true,
        subfieldKey: 'acronym',
        query: {...getQuery('unit'), keys: unit, primaryKey: 'acronym'}
    }, {
        key: 'root',
        type: 'object',
        label: 'Raiz',
        visible: true,
        subfieldKey: 'acronym',
        query: {...getQuery('unit'), keys: unit, primaryKey: 'acronym'}
    },],
    SIMPLE: [{key: 'description', type: 'string', label: 'Descrição', visible: true},],

    COLLABORATOR_SIMPLE: [{key: 'name', type: 'string', label: 'Nome', visible: true},


        {key: 'registration', type: 'string', label: 'Matricula', visible: false}, {
            key: 'superior',
            type: 'string',
            label: 'Superior',
            visible: false
        },


        {key: 'email', type: 'string', label: 'Email', visible: true},

        {
            key: 'unit',
            type: 'object',
            subfieldKey: 'acronym',
            label: 'Unidade',
            visible: true,
            query: {...getQuery('unit'), keys: unit, primaryKey: 'acronym'}
        }],
    COLLABORATOR: [{key: 'image', type: 'image', visible: true}, {
        key: 'name',
        type: 'string',
        label: 'Nome',
        visible: true
    }, {key: 'birth', type: 'date', label: 'Data de nascimento', visible: true, hoursOffset: 4},


        {key: 'registration', type: 'string', label: 'Matricula', visible: false}, {
            key: 'superior',
            type: 'string',
            label: 'Superior',
            visible: false
        }, {key: 'gender', type: 'string', label: 'Gênero', visible: false}, {
            key: 'nationality',
            type: 'string',
            label: 'Nacionalidade',
            visible: false
        }, {key: 'pne', type: 'string', label: 'PNE', visible: false}, {
            key: 'admission',
            type: 'date',
            label: 'Data de admissão',
            visible: false
        }, {key: 'extension', type: 'string', label: 'Ramal', visible: true}, {
            key: 'personal_email',
            type: 'string',
            label: 'Email pessoal',
            visible: false
        }, {key: 'email', type: 'string', label: 'Email', visible: true}, {
            key: 'degree',
            type: 'string',
            label: 'Escolaridade',
            visible: false
        }, {
            key: 'unit',
            type: 'object',
            subfieldKey: 'acronym',
            label: 'Unidade',
            visible: true,
            query: {...getQuery('unit'), keys: unit, primaryKey: 'acronym'}
        }]
}