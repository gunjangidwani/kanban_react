import { LOGIN } from '../constant'
import { HttpService } from '../services/service.http'

export const requestLogin = (bool) => {
    return {
        type: LOGIN.REQUEST,
        payload: bool
    }
}

export const successLogin = (data) => {
    return {
        type: LOGIN.SUCCESS,
        payload: data
    }
}

export const doLogin = (loginObject) => {
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestLogin(true))

        httpService.post(loginObject.url, loginObject.body)
        .then((response) => {
            dispatch(requestLogin(false))
            return response
        })
        .then((response) => {
            dispatch(successLogin(response.data))
        })
        .catch((error) => {
            dispatch(successLogin(error))
        })
    }    
}