import {SET_PLANET_DATA} from "../constants";

//reducer for updating info about planets, empty array is the default value
export default (state = [], action) => {
    switch (action.type) {
        case SET_PLANET_DATA:
            const {planetData} = action;
            return planetData;
        default:
            return state;
    }
}