import axios from 'axios'
import logger from '../utils/logger.js'
import qs from 'qs'
import { REACT_APP_API_URL } from '@env'

const config = {
    baseURL: REACT_APP_API_URL,
}

const axiosInstance = axios.create(config)


export const getRequestWithFilters = (filters) =>
    Object.keys(filters).reduce((prev, key) => {
        if (typeof filters[key] !== 'undefined') {
            if (typeof filters[key] === 'number') {
                prev += `${key}=${filters[key]}&`
                return prev
            }
            if (filters[key].length > 0) {
                prev += `${key}=${filters[key]}&`
            }
        }
        return prev
    }, '')

export const GET = async (link, filters = {}) => {
    try {
        console.log('filters', getRequestWithFilters(filters))
        const res = await axiosInstance.get(`${link}?${getRequestWithFilters(filters)}`)
        if (res?.status === 200) {
            return res.data
        }
    } catch (error) {
        logger(`error in GET  link = ${link}, ${error}`)

        throw error.response.data?.message || error
    }
}

export const POST = async (link, data = {}) => {
    try {
        console.log(`config`, config, link)
        const res = await axiosInstance.post(link, qs.stringify(data))
        console.log('res => ', res.data)

        if (res?.status === 200) return res.data
    } catch (error) {
        logger(`error in POST link = ${link}`, error)
        throw error.response.data?.message || error
    }
}

export const PATCH = async (link, data = {}) => {
    try {
        const res = await axiosInstance.patch(link, data)

        if (res?.status === 200) return res.data
    } catch (error) {
        logger(`error in PATCH link = ${link}`, error)
        throw error.response.data?.message || error
    }
}

export const DELETE = async (link, data = {}) => {
    try {
        const res = await axiosInstance.delete(link, { data })

        if (res?.status === 204) return res.data
    } catch (error) {
        logger(`error in DELETE link = ${link}`, error)
        throw error.response.data?.message || error
    }
}
