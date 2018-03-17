import {SET_DATA_RELOAD} from "../constants";

//reducer for enabling or disabling API requests, true is the default value
export default (state = true, action) => {
    switch (action.type) {
        case SET_DATA_RELOAD:
            const {dataReload} = action;
            return dataReload;
        default:
            return state;
    }
}