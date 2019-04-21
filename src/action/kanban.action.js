import { GET_KANBAN } from '../constant'
import { UPDATE_KANBAN } from '../constant'
import { CREATE_KANBAN } from '../constant'
import { HttpService } from '../services/service.http'

export const requestKanban = (bool) => {
    return {
        type: GET_KANBAN.REQUEST,
        payload: bool
    }
}

export const successKanban = (data) => {
    return {
        type: GET_KANBAN.SUCCESS,
        payload: data
    }
}

export const requestUpdateKanban = (bool) => {
    return {
        type: UPDATE_KANBAN.REQUEST,
        payload: bool
    }
}

export const successUpdateKanban = (data) => {
    return {
        type: UPDATE_KANBAN.SUCCESS,
        payload: data
    }
}

export const requestCreateKanban = (bool) => {
    return {
        type: CREATE_KANBAN.REQUEST,
        payload: bool
    }
}

export const successCreateKanban = (data) => {
    return {
        type: CREATE_KANBAN.SUCCESS,
        payload: data
    }
}

export const getAllKanban = (KanbanUrl) => {
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestKanban(true))

        httpService.get(KanbanUrl)
        .then((response) => {
            dispatch(requestKanban(false))
            return response
        })
        .then((response) => {
            dispatch(successKanban(response.data))
        })
        .catch((error) => {
            dispatch(successKanban(error))
        })
    }    
}

export const updateKanban = (KanbanObject) => {
    // console.log(KanbanObject)
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestUpdateKanban(true))

        httpService.post(KanbanObject.url, KanbanObject.body)
        .then((response) => {
            dispatch(requestUpdateKanban(false))
            return response
        })
        .then((response) => {
            dispatch(successUpdateKanban(response.data))
        })
        .catch((error) => {
            dispatch(successUpdateKanban(error))
        })
    }    
}

export const createKanban = (KanbanObject) => {
    // console.log(KanbanObject)
    const httpService = new HttpService()
    return (dispatch) => {
        dispatch(requestCreateKanban(true))

        httpService.post(KanbanObject.url, KanbanObject.body)
        .then((response) => {
            dispatch(requestCreateKanban(false))
            return response
        })
        .then((response) => {
            dispatch(successCreateKanban(response.data))
        })
        .catch((error) => {
            dispatch(successCreateKanban(error))
        })
    }    
}