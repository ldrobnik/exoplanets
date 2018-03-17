import {
    SET_MASS,
    SET_TEMPERATURE,
    SET_DENSITY,
    SET_PLANET_DATA,
    SET_DATA_RELOAD,
    SET_PLANETS_TO_DISPLAY,
    SET_PLANETS_DISPLAYED
} from "../constants";

//changes the mass min and max values
export function setMass(min, max) {
    const action = {
        type: SET_MASS,
        min,
        max
    };
    return action;
}

//changes the temperature min and max values
export function setTemperature(min, max) {
    const action = {
        type: SET_TEMPERATURE,
        min,
        max
    };
    return action;
}

//changes the density min and max values
export function setDensity(min, max) {
    const action = {
        type: SET_DENSITY,
        min,
        max
    };
    return action;
}

//updates info about planets
export function setPlanetData(planetData) {
    const action = {
        type: SET_PLANET_DATA,
        planetData
    };
    return action;
}

//enables or disables API requests
export function setDataReload(dataReload) {
    const action = {
        type: SET_DATA_RELOAD,
        dataReload
    };
    return action;
}

//changes the number of planets that can be displayed
export function setPlanetsToDisplay(planetsToDisplay) {
    const action = {
        type: SET_PLANETS_TO_DISPLAY,
        planetsToDisplay
    };
    return action;
}

//changes the number of planets already displayed
export function setPlanetsDisplayed(planetsDisplayed) {
    const action = {
        type: SET_PLANETS_DISPLAYED,
        planetsDisplayed
    };
    return action;
}

