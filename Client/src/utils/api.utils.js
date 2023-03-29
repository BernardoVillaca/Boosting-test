import axios from 'axios'
import { getUserIdToken } from './firebase.utils'


export const manualSync = async () => {
    const response = await axios.post('http://localhost:5000/noname-c54d3/us-central1/app/manual-sync')
    console.log(response.data)

}

export const verifyCurrentUserClaims = async (currentUser) => {
    const idToken = await getUserIdToken()
    if (!idToken) return
    const response = await axios.post('http://localhost:5000/noname-c54d3/us-central1/app/verifyCurrentUserClaims', {
        currentUser,
    },
        { headers: { Authorization: `Bearer ${idToken}` } }
    )
    return response.data
}


export const verifyTokenById = async (id) => {
    if (!id) return
    const response = await axios.post('http://localhost:5000/noname-c54d3/us-central1/app/verifyTokenById', {
        id
    })
    return response.data
}

export const fetchClientId = async () => {
    const response = await axios.get('http://localhost:5000/noname-c54d3/us-central1/app/paypal-config')
    const { client_id } = response.data
    return client_id
}


export const createPaypalOrder = async (cartItems, currentUser) => {
    const response = await axios.post('http://localhost:5000/noname-c54d3/us-central1/app/create-paypal-order', {
        cartItems,
        currentUser
    },
        { headers: { 'Content-Type': 'application/json' } })
    const { id } = response.data
    if (response.statusText === 'OK') return id
}

export const axiosRequest = async (endpoint, body) => {
    const response = await axios.post(`http://localhost:5000/noname-c54d3/us-central1/app/${endpoint}`,
        body
    )
    return response
}

export const axiosRequesthWithToken = async (endpoint, body) => {
    const token = await getUserIdToken()
    const response = await axios.post(`http://localhost:5000/noname-c54d3/us-central1/app/${endpoint}`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response
}
