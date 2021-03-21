import { CHANGE_BASECODE, CHANGE_SOURCECODE, SELECT_SOURCE_COMPONENT, SELECT_BASE_COMPONENT } from './types'

export function changeSourceCode(code) {
    return {
        type: CHANGE_SOURCECODE,
        payload: code
    }
}

export function changeBaseCode(code) {
    return {
        type: CHANGE_BASECODE,
        payload: code
    }
}

export function selectSourceComponent(name) {
    return {
        type: SELECT_SOURCE_COMPONENT,
        payload: name
    }
}

export function selectBaseComponent(name) {
    return {
        type: SELECT_BASE_COMPONENT,
        payload: name
    }
}