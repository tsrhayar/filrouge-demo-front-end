import {
    USER_REGISTRE_FAIL,
    USER_REGISTRE_REQUEST,
    USER_REGISTRE_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
} from '../constants/userConstants';

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTRE_REQUEST:
            return { loading: true };
        case USER_REGISTRE_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTRE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};