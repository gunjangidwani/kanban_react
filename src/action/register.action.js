import { REGISTER } from '../constant'
import { HttpService } from '../services/service.http'

export const requestRegister = (bool) => {
    return {
        type: REGISTER.REQUEST,
        payload: bool
    }
}

export const successRegister = (data) => {
    return {
        type: REGISTER.SUCCESS,
        payload: data
    }
}

export const doRegister = (registerObject) => {
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestRegister(true))

        httpService.post(registerObject.url, registerObject.body)
        .then((response) => {
            dispatch(requestRegister(false))
            return response
        })
        .then((response) => {
            dispatch(successRegister(response.data))
        })
        .catch((error) => {
            dispatch(successRegister(error))
        })
    }
}