import {combineReducers} from "redux";
import radius from "./reducer_radius"; //reducer for changing the radius min and max values
import temperature from "./reducer_temperature"; //reducer for changing the temperature min and max values
import density from "./reducer_density"; //reducer for changing the density min and max values
import planetData from "./reducer_planet_data"; //reducer for updating info about planets
import dataReload from "./reducer_data_reload"; //reducer for enabling or disabling API requests
import planetsToDisplay from "./reducer_planets_to_display"; //reducer for changing the number of planets that can be displayed
import planetsDisplayed from "./reducer_planets_displayed"; //reducer for changing the number of planets already displayed

//combines all reducers
export default combineReducers({
    radius,
    temperature,
    density,
    planetData,
    dataReload,
    planetsToDisplay,
    planetsDisplayed
});
