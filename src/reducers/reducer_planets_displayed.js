import {SET_PLANETS_DISPLAYED} from "../constants";

//reducer for changing the number of planets already displayed, 0 is the default value
export default (state = 0, action) => {
    switch (action.type) {
        case SET_PLANETS_DISPLAYED:
            const {planetsDisplayed} = action;
            return planetsDisplayed;
        default:
            return state;
    }
}