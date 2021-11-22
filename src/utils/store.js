import { configureStore } from "@reduxjs/toolkit";
import loginReducer from 'features/login'
import profileReducer from 'features/profile'

const store = configureStore({
    reducer: {
        login: loginReducer,
        profile: profileReducer,
    }
})

export default store