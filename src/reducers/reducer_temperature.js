import {SET_TEMPERATURE} from "../constants";

//default min and max values
let temperature = {
    min: 0,
    max: 120
};

//reducer for changing the TEMPERATURE min and max values
export default (state = temperature, action) => {
    switch (action.type) {
        case SET_TEMPERATURE:
            const {min, max} = action;
            temperature = {
                min,
                max
            };
            return temperature;
        default:
            return state;
    }
}