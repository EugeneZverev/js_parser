import { combineReducers } from "redux"
import { CHANGE_SOURCECODE, CHANGE_BASECODE, SELECT_SOURCE_COMPONENT, SELECT_BASE_COMPONENT } from './types'

const initialState = {
    sourceCode: '',
    baseCode: '',
    selectedSourceComponent: null,
    selectedBaseComponent: null
}

const codeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SOURCECODE: 
            return {...state, sourceCode: action.payload}
        case CHANGE_BASECODE: 
            return {...state, baseCode: action.payload}
        case SELECT_SOURCE_COMPONENT: 
            return {...state, selectedSourceComponent: action.payload}
        case SELECT_BASE_COMPONENT: 
            return {...state, selectedBaseComponent: action.payload}
        default: return state
    }
}

export const rootReducer = combineReducers({
    code: codeReducer
})