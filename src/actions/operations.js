import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
import { prepareOperations } from "../helpers/prepareOperations";

export const operationStartAddNew = (operation) => {
    return async(dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('operations', operation, 'POST');
            const body = await resp.json();

            if(body.ok) {
                operation.id = body.operation.id;
                operation.user = {
                    id: uid,
                    name: name
                }
                
                dispatch(operationAddNew(operation));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const operationAddNew = (operation) => ({
    type: types.operationAddNew,
    payload: operation
});

export const operationSetActive = (operation) => ({
    type: types.operationSetActive,
    payload: operation
});

export const operationClearActive = () => ({ type: types.operationClearActive });

export const operationStartUpdate = (operation) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`operations/${ operation.id }`, operation, 'PUT');
            const body = await resp.json();

            if(body.ok) {
                dispatch(operationUpdated(operation));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const operationUpdated = (operation) => ({
    type: types.operationUpdate,
    payload: operation
});

export const operationStartDelete = () => {
    return async(dispatch, getState) => {
        const { id } = getState().operation.activeOperation;

        try {
            const resp = await fetchConToken(`operations/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok) {
                dispatch(operationDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const operationDeleted = () => ({ type: types.operationDeleted });

export const operationStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('operation');
            const body = await resp.json();

            const operations = prepareOperations(body.operation);
            dispatch(operationLoaded(operations));
        } catch (error) {
            console.log(error);
        }
    }
}

const operationLoaded = (operation) => ({
    type: types.operationLoaded,
    payload: operation
});

export const operationLogout = () => ({ type: types.operationLogout });