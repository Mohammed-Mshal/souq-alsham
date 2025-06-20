/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
let locale = 'en'

// Update locale when component mounts
export const updateLocale = (newLocale: string) => {
    locale = newLocale
    axios.defaults.headers.common['Accept-Language'] = locale
}

const apiBase = () => `/api/v1`
axios.defaults.baseURL = apiBase()
axios.defaults.headers.common['Accept-Language'] = locale || 'en'


const ApiService = {
    query(resource: string, params: any, pk?: string | number, authRequired = false) {
        return axios.get(`${resource}/${pk}`, {
            params,
            headers: {
                Authorization: authRequired ? `Bearer ${localStorage.getItem('token')}` : null
            }
        })
    },
    get(resource: string, pk?: string | number, authRequired = false) {
        return axios.get(`${resource}/${pk ? pk : ''}`, {
            headers: {
                Authorization: authRequired ? `Bearer ${localStorage.getItem('token')}` : null
            }
        })
    },
    post(resource: string, params: any, authRequired = false) {
        return axios.post(`${resource}`, params, {
            headers: {
                Authorization: authRequired ? `Bearer ${localStorage.getItem('token')}` : null
            }
        })
    },
    update(resource: string, pk: string | number, params: any, authRequired = false) {
        return axios.put(`${resource}/${pk}`, params, {
            headers: {
                Authorization: authRequired ? `Bearer ${localStorage.getItem('token')}` : null
            }
        })
    },
    put(resource: string, params: any) {
        return axios.put(`${resource}`, params)
    },
    delete(resource: string) {
        return axios.delete(`${resource}`)
    },
    fileUpload(resource: string, params: any) {
        const formData = new FormData()
        formData.append('file', params.file)
        return axios.post(`${resource}`, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
}

export const cleanParams = (params: any) => {
    const cleaned: any = {}
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            cleaned[key] = params[key]
        }
    })
    return cleaned
}

export default ApiService