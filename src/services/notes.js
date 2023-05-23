import axios from "axios"
const baseUrl = "https://chjgut-3001.csb.app/api/notes";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data)
}

const create = newObj => {
    const request = axios.post(baseUrl, newObj);
    return request.then(res => res.data)
}

const update = (id, newObj) => {
    const url = `${baseUrl}/${id}`;
    const request = axios.put(url, newObj);
    return request.then(res => res.data);
}

export default {
    getAll,
    create,
    update
}

