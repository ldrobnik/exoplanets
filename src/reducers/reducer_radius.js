import {SET_RADIUS} from "../constants";

//default min and max values
let radius = {
    min: 0,
    max: 60
};

//reducer for changing the radius min and max values
export default (state = radius, action) => {
    switch (action.type) {
        case SET_RADIUS:
            const {min, max} = action;
            radius = {
                min,
                max
            };
            return radius;
        default:
            return state;
    }
}