import axios from 'axios'

export class HttpService {
    post = (url, body) => {
        return new Promise((resolve, reject) => {
            axios.post(url, body).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get = (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}