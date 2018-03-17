import {SET_EBC} from "../constants";

//default min and max values
let ebc = {
    min: 0,
    max: 60
};

//reducer for changing the EBC min and max values
export default (state = ebc, action) => {
    switch (action.type) {
        case SET_EBC:
            const {min, max} = action;
            ebc = {
                min,
                max
            };
            return ebc;
        default:
            return state;
    }
}