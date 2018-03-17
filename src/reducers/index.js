import {combineReducers} from "redux";
import ebc from "./reducer_ebc"; //reducer for changing the EBC min and max values
import ibu from "./reducer_ibu"; //reducer for changing the IBU min and max values
import abv from "./reducer_abv"; //reducer for changing the ABV min and max values
import planetData from "./reducer_planet_data"; //reducer for updating info about planets
import dataReload from "./reducer_data_reload"; //reducer for enabling or disabling API requests
import planetsToDisplay from "./reducer_planets_to_display"; //reducer for changing the number of planets that can be displayed
import planetsDisplayed from "./reducer_planets_displayed"; //reducer for changing the number of planets already displayed

//combines all reducers
export default combineReducers({
    ebc,
    ibu,
    abv,
    planetData,
    dataReload,
    planetsToDisplay,
    planetsDisplayed
});
