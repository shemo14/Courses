import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../consts';

export const userLogin = ({phone, password, deviceId , device_type }) => {
    return (dispatch) => {

        dispatch({type: 'login_user'});

        axios.post(
            CONST.url + 'signIn',
            {phone, password, device_id: deviceId , device_type})
            .then(
                response => handelLogin(dispatch, response.data)
            )
            .catch(
                error => console.warn(error.data)
            );
    };
};


export const tempAuth = () => {
    return (dispatch) => {
        dispatch({type: 'temp_auth'});
    };
};

const handelLogin = (dispatch, data) => {
    if (!data.success){
        loginFailed(dispatch, data)
    }else{
        loginSuccess(dispatch, data)
    }
};


const loginSuccess = (dispatch, data) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.token))
        .then(() => dispatch({type: 'login_success', data }));
};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error});
};
