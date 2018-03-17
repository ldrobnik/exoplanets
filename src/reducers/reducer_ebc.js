import {SET_MASS} from "../constants";

//default min and max values
let mass = {
    min: 0,
    max: 60
};

//reducer for changing the mass min and max values
export default (state = mass, action) => {
    switch (action.type) {
        case SET_MASS:
            const {min, max} = action;
            mass = {
                min,
                max
            };
            return mass;
        default:
            return state;
    }
}