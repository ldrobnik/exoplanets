import {SET_IBU} from "../constants";

//default min and max values
let ibu = {
    min: 0,
    max: 120
};

//reducer for changing the IBU min and max values
export default (state = ibu, action) => {
    switch (action.type) {
        case SET_IBU:
            const {min, max} = action;
            ibu = {
                min,
                max
            };
            return ibu;
        default:
            return state;
    }
}