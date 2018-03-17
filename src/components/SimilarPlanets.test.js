import React from "react";
import {shallow} from "enzyme";
import {SimilarPlanets} from "./SimilarPlanets";


describe("SimilarPlanets", () => {

    const samplePlanetList = [
        {
            id: 1,
            name: "planet one"
        },
        {
            id: 2,
            name: "planet two"
        },
        {
            id: 3,
            name: "planet three"
        }
    ];

    const similarPlanets = shallow(<SimilarPlanets />);

    beforeEach(() => {
        similarPlanets.setState({
            loading: false, //turns off the loader
        });
    });

    it("displays the right number of similar planets if the list has 3 items", () => {
        similarPlanets.setState({planetList: samplePlanetList});
        expect(similarPlanets.find('.similarPlanetTile').length).toEqual(samplePlanetList.length);
    });

    it("displays the right number of similar planets if the list has fewer than 3 items", () => {
        const shortenedPlanetList = samplePlanetList.slice(0, 2);
        similarPlanets.setState({planetList: shortenedPlanetList});
        expect(similarPlanets.find('.similarPlanetTile').length).toEqual(shortenedPlanetList.length);
    });

});