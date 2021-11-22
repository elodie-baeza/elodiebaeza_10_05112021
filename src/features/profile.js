import { createSlice } from "@reduxjs/toolkit"
import apiProvider from "data/apiProvider";
import { selectProfile } from "utils/selectors"

const initialState = {
    status: 'void',
    data: {
        firsName: '',
        lastName: '',
    },
    error: null
}

export function fetchOrUpdateProfile(token) {
    return async (dispatch, getState) => {
        const status = selectProfile(getState()).status;
        if (status === 'pending' || status ==='updating'){
            return;
        }
        dispatch(actions.fetching())
        if (token !== undefined) {
            apiProvider.userProfile(token)
                .then ((response) => {
                    dispatch(actions.resolved(response.data))
                    return response.data
                })
                .catch ((error) => {
                    dispatch(actions.rejected(error))
                    throw error
                })
        }
    }
}

const {actions, reducer} = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetching: {
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
                // if (draft.data !== action.payload.data) {
                //     draft.data = action.payload.data.body
                //     return
                // }
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.data = action.payload.data.body
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
        }
    }
})

export default reducer