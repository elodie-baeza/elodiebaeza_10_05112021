import { createSlice } from "@reduxjs/toolkit"
import apiProvider from "data/apiProvider";
import { selectLogin } from "utils/selectors"

const initialState = {
    status: 'void',
    isConnected: false,
    data: {token: null},
    error: null,
}

export function submitForm(userLogin, remember) {
    return async (dispatch, getState) => {
        const status = selectLogin(getState()).status;
        if (status === 'pending' || status ==='updating'){
            return;
        }
        dispatch(actions.fetching(userLogin))
        await apiProvider.login(userLogin)
            .then(response => {
                dispatch(actions.resolved(response.data))
            })
            .catch(error => {
                dispatch(actions.rejected(error))
                throw error
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
                return
            },
        },
        resolved: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.data = action.payload.data.body
                    draft.isConnected = true
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