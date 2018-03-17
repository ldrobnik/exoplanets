import {SET_PLANETS_TO_DISPLAY} from "../constants";

//reducer for changing the number of planets that can be displayed, 20 is the default value
export default (state = 20, action) => {
    switch (action.type) {
        case SET_PLANETS_TO_DISPLAY:
            const {planetsToDisplay} = action;
            return planetsToDisplay;
        default:
            return state;
    }
}