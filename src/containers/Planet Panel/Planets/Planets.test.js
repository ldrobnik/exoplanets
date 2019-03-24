import React from "react";
import {shallow} from "enzyme";
import {Planets} from "./Planets";
import {samplePlanetDetails} from "../../../data/fixtures";

describe("Planets", () => {

    const props = {
        planetData: samplePlanetDetails,
        planetsToDisplay: 20
    };

    const planets = shallow(<Planets {...props} />);

    beforeEach(() => {
        planets.setState({loading: false}); //turns off the spinner
        });

    it("renders the right number of planet tiles", () => {
        expect(planets.find(".planetTileContainer").length).toEqual(props.planetsToDisplay);
    });

});