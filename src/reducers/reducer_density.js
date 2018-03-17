import {SET_DENSITY} from "../constants";

//default min and max values
let density = {
    min: 0,
    max: 12
};

//reducer for changing the density min and max values
export default (state = density, action) => {
    switch (action.type) {
        case SET_DENSITY:
            const {min, max} = action;
            density = {
                min,
                max
            };
            return density;
        default:
            return state;
    }
}