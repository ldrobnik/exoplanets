import rootReducer from "./index";
import radius from "./reducer_radius"; //reducer for changing the radius min and max values
import temperature from "./reducer_temperature"; //reducer for changing the temperature min and max values
import density from "./reducer_density"; //reducer for changing the density min and max values
import planetData from "./reducer_planet_data"; //reducer for updating info about planets
import dataReload from "./reducer_data_reload"; //reducer for enabling or disabling API requests
import planetsToDisplay from "./reducer_planets_to_display"; //reducer for changing the number of planets that can be displayed
import planetsDisplayed from "./reducer_planets_displayed"; //reducer for changing the number of planets already displayed
import {
    SET_RADIUS,
    SET_TEMPERATURE,
    SET_DENSITY,
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
            "density": {"max": 12, "min": 0},
            "planetData": [],
            "planetsDisplayed": 0,
            "planetsToDisplay": 20,
            "dataReload": true,
            "radius": {"max": 60, "min": 0},
            "temperature": {"max": 120, "min": 0}
        });
    });
});


describe("radius reducer", () => {

    it("changes the radius min and max values", () => {

        expect(radius({}, {type: SET_RADIUS, min, max})).toEqual({min, max});

    });
});


describe("temperature reducer", () => {

    it("changes the temperature min and max values", () => {

        expect(temperature({}, {type: SET_TEMPERATURE, min, max})).toEqual({min, max});

    });
});


describe("density reducer", () => {

    it("changes the density min and max values", () => {

        expect(density({}, {type: SET_DENSITY, min, max})).toEqual({min, max});

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