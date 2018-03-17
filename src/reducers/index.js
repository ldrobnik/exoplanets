import {combineReducers} from "redux";
import mass from "./reducer_mass"; //reducer for changing the mass min and max values
import ibu from "./reducer_ibu"; //reducer for changing the temperature min and max values
import abv from "./reducer_abv"; //reducer for changing the density min and max values
import planetData from "./reducer_planet_data"; //reducer for updating info about planets
import dataReload from "./reducer_data_reload"; //reducer for enabling or disabling API requests
import planetsToDisplay from "./reducer_planets_to_display"; //reducer for changing the number of planets that can be displayed
import planetsDisplayed from "./reducer_planets_displayed"; //reducer for changing the number of planets already displayed

//combines all reducers
export default combineReducers({
    mass,
    ibu,
    abv,
    planetData,
    dataReload,
    planetsToDisplay,
    planetsDisplayed
});
