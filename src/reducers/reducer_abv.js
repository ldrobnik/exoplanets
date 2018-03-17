import {SET_DENSITY} from "../constants";

//default min and max values
let abv = {
    min: 0,
    max: 12
};

//reducer for changing the density min and max values
export default (state = abv, action) => {
    switch (action.type) {
        case SET_ABV:
            const {min, max} = action;
            abv = {
                min,
                max
            };
            return abv;
        default:
            return state;
    }
}