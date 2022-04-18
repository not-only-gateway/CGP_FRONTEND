import env from "../.env";

export default async function SOLIDES(cpf, make, id) {
    const exists = id ? null : await make({
        url: 'https://system.solides.com/pt-BR/api/v1/colaboradores/existe/' + cpf,
        method: 'GET',
        headers: env
    }, false, false)
    if ((exists && exists.data) || id) {
        const collaborator = await make({
            url: 'https://system.solides.com/pt-BR/api/v1/colaboradores/' + (id ? id : exists.data.id),
            method: 'GET',
            headers: env
        }, false, false)
        if (collaborator.data) {
            const photo = collaborator.data.photo !== null ? await make({
                url: collaborator.data.photo,
                method: 'GET'
            }, false, false) : null
            return [photo?.data, collaborator?.data, exists?.data]
        } else
            return undefined
    } else
        return undefined
}