import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method      : 'GET',
            url         : CONST.url + 'profile',
            headers     : {Authorization: token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data, props) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'update_profile',
            method      : 'POST',
            headers     : {Authorization: data.token },
            data        : {
                name                : data.name,
				image              : data.image,
            }}).then(response => {

            if (response.data.success) {

                props.navigation.navigate('Profile');

                dispatch({type: 'update_profile', data:response.data.data});

            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'sukar',
                    textAlign       : 'center'
                }
            });

        })
    }
}

export const logout = (token) => {
    return (dispatch) => {
        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'logout',
                method      : 'POST',
                headers     : { Authorization: token },
                data        : { device_id }
            }).then(response => {
                    AsyncStorage.multiRemove(['token', 'auth', 'profile'])
                    dispatch({type: 'logout'})
                }
            )
        });
    }
};

