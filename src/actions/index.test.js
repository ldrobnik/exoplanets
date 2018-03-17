import {
    SET_EBC,
    SET_IBU,
    SET_ABV,
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

    it("creates an action to change the EBC min and max values", () => {

        const expectedAction = {
            type: SET_EBC,
            min,
            max
        };

        expect(actions.setEbc(min, max)).toEqual(expectedAction);
    });

    it("creates an action to change the IBU min and max values", () => {

        const expectedAction = {
            type: SET_IBU,
            min,
            max
        };

        expect(actions.setIbu(min, max)).toEqual(expectedAction);
    });

    it("creates an action to change the ABV min and max values", () => {

        const expectedAction = {
            type: SET_ABV,
            min,
            max
        };

        expect(actions.setAbv(min, max)).toEqual(expectedAction);
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