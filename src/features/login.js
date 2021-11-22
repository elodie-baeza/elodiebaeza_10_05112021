import { createSlice } from "@reduxjs/toolkit"
import apiProvider from "data/apiProvider";
import { selectLogin } from "utils/selectors"

const initialState = {
    status: 'void',
    isConnected: false,
    data: null,
    error: null,
}

export function submitForm(userLogin, remember) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status;
        if (status === 'pending' || status ==='updating'){
            return;
        }
        dispatch(actions.fetching(userLogin))
        apiProvider.login(userLogin)
            .then(response => {
                dispatch(actions.resolved(response.data.body.token))
                return response.data.body.token
            })
            .catch(error => {
                dispatch(actions.rejected(error))
                return error
            })
    }
}

const {actions, reducer} = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetching: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                if (draft.status === 'void') {
                    draft.status = 'pending'
                    draft.data = action.payload.data
                    return
                }
                if (draft.status === 'rejected') {
                    draft.error = null
                    draft.status = 'pending'
                    return
                }
                if (draft.status === 'resolved') {
                    draft.status = 'updating'
                    return
                }
                draft.status = 'updating'
                draft.data = action.payload.data
            },
        },
        resolved: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                if (draft.data !== action.payload.data) {
                    draft.data.token = action.payload.data
                    draft.isConnected = true
                    return
                }
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.data.token = action.payload.data
                    draft.status = 'resolved'
                    return
                }
                return   
            } 
        },  
        rejected: {
            prepare: (error) => ({
                payload: { error },
            }),
            reducer: (draft, action) => {
                if (draft.error !== action.payload.error){
                    draft.error = action.payload.error.message
                    return
                }
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.error = action.payload.error.message
                    draft.data = null
                    draft.status = 'rejected'
                    return
                }
                return    
            }
        },
        logout: () => {
            return initialState
        }
    }
})

export default reducer