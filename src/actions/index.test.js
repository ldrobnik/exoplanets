import {
    SET_MASS,
    SET_TEMPERATURE,
    SET_DENSITY,
    SET_PLANET_DATA,
    SET_DATA_RELOAD,
    SET_PLANETS_TO_DISPLAY,
    SET_PLANETS_DISPLAYED
} from "../constants";
import * as actions from "./index";
import {samplePlanetDetails} from "../data/fixtures";

describe("actions", () => {

    const min = 15;
    const max = 60;
    const bool = false;
    const number = 20;

    it("creates an action to change the mass min and max values", () => {

        const expectedAction = {
            type: SET_MASS,
            min,
            max
        };

        expect(actions.setMass(min, max)).toEqual(expectedAction);
    });

    it("creates an action to change the temperature min and max values", () => {

        const expectedAction = {
            type: SET_TEMPERATURE,
            min,
            max
        };

        expect(actions.setTemperature(min, max)).toEqual(expectedAction);
    });

    it("creates an action to change the density min and max values", () => {

        const expectedAction = {
            type: SET_DENSITY,
            min,
            max
        };

        expect(actions.setDensity(min, max)).toEqual(expectedAction);
    });

    it("creates an action to update planet details", () => {

        const expectedAction = {
            type: SET_PLANET_DATA,
            planetData: samplePlanetDetails
        };

        expect(actions.setPlanetData(samplePlanetDetails)).toEqual(expectedAction);
    });

    it("creates an action to enable/disable API requests", () => {

        const expectedAction = {
            type: SET_DATA_RELOAD,
            dataReload: bool
        };

        expect(actions.setDataReload(bool)).toEqual(expectedAction);
    });

    it("creates an action to change the number of planets to be displayed", () => {

        const expectedAction = {
            type: SET_PLANETS_TO_DISPLAY,
            planetsToDisplay: number
        };

        expect(actions.setPlanetsToDisplay(number)).toEqual(expectedAction);
    });

    it("creates an action to change the number of planets already displayed", () => {

        const expectedAction = {
            type: SET_PLANETS_DISPLAYED,
            planetsDisplayed: number
        };

        expect(actions.setPlanetsDisplayed(number)).toEqual(expectedAction);
    });
});