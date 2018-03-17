import rootReducer from "./index";
import ebc from "./reducer_ebc"; //reducer for changing the EBC min and max values
import ibu from "./reducer_ibu"; //reducer for changing the IBU min and max values
import abv from "./reducer_abv"; //reducer for changing the ABV min and max values
import planetData from "./reducer_planet_data"; //reducer for updating info about planets
import dataReload from "./reducer_data_reload"; //reducer for enabling or disabling API requests
import planetsToDisplay from "./reducer_planets_to_display"; //reducer for changing the number of planets that can be displayed
import planetsDisplayed from "./reducer_planets_displayed"; //reducer for changing the number of planets already displayed
import {
    SET_EBC,
    SET_IBU,
    SET_ABV,
    SET_BEER_DATA,
    SET_DATA_RELOAD,
    SET_BEERS_TO_DISPLAY,
    SET_BEERS_DISPLAYED
} from "../constants";
import {samplePlanetDetails} from "../data/fixtures";


const min = 15;
const max = 60;
const bool = false;
const number = 20;

describe("root reducer", () => {

    it("returns initial state", () => {
        expect(rootReducer({}, {})).toEqual({
            "abv": {"max": 12, "min": 0},
            "planetData": [],
            "planetsDisplayed": 0,
            "planetsToDisplay": 20,
            "dataReload": true,
            "ebc": {"max": 60, "min": 0},
            "ibu": {"max": 120, "min": 0}
        });
    });
});


describe("EBC reducer", () => {

    it("changes the EBC min and max values", () => {

        expect(ebc({}, {type: SET_EBC, min, max})).toEqual({min, max});

    });
});


describe("IBU reducer", () => {

    it("changes the IBU min and max values", () => {

        expect(ibu({}, {type: SET_IBU, min, max})).toEqual({min, max});

    });
});


describe("ABV reducer", () => {

    it("changes the ABV min and max values", () => {

        expect(abv({}, {type: SET_ABV, min, max})).toEqual({min, max});

    });
});

describe("planetData reducer", () => {

    it("updates the planet details", () => {

        expect(planetData({}, {type: SET_BEER_DATA, planetData: samplePlanetDetails})).toEqual(samplePlanetDetails);

    });
});


describe("dataReload reducer", () => {

    it("enables/disables API requests", () => {

        expect(dataReload({}, {type: SET_DATA_RELOAD, dataReload: bool})).toEqual(bool);

    });
});


describe("dataReload reducer", () => {

    it("enables/disables API requests", () => {

        expect(dataReload({}, {type: SET_DATA_RELOAD, dataReload: bool})).toEqual(bool);

    });
});

describe("planetsToDisplay reducer", () => {

    it("sets the number of planets to be displayed", () => {

        expect(planetsToDisplay({}, {type: SET_BEERS_TO_DISPLAY, planetsToDisplay: number})).toEqual(number);

    });
});

describe("planetsDisplayed reducer", () => {

    it("sets the number of planets currently displayed", () => {

        expect(planetsDisplayed({}, {type: SET_BEERS_DISPLAYED, planetsDisplayed: number})).toEqual(number);

    });
});