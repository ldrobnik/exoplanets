import React from "react";
import {shallow} from "enzyme"
import {SimilarPlanetTile} from "./SimilarPlanetTile";

const string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
const url = "some_url";

const props = {
    link: url,
    image_url: url,
    name: string
};

describe("SimilarPlanetTile", () => {
    const similarPlanetTile = shallow(<SimilarPlanetTile {...props}/>);

    beforeEach(() => {
        similarPlanetTile.setState({loading: false}); //turns off the loader
    });

    it("updates the image source url", () => {
        expect(similarPlanetTile.find("Image").at(0).props().src).toEqual(url);
    });

    it("updates the image alt text", () => {
        expect(similarPlanetTile.find("Image").at(0).props().alt).toEqual(string);
    });

});