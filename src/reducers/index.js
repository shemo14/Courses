import { combineReducers } from 'redux';
import lang from './LangReducer';
import profile from './ProfileReducer';
import auth from './AuthReducer';

export default combineReducers({
    auth,
    profile,
    lang,
});

