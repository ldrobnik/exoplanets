import React from "react";
import {shallow} from "enzyme";
import {PlanetTile} from "./PlanetTile";

const string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
const url = "some_url";

const props = {
    id: 1,
    image_url: url,
    name: string,
    tagline: string
};

describe("PlanetTile", () => {
    const planetTile = shallow(<PlanetTile {...props}/>);

    beforeEach(() => {
        planetTile.setState({loading: false}); //turns off the loader
    });

    it("updates the image source url", () => {
        expect(planetTile.find("Image").at(0).props().src).toEqual(url);
    });

    it("updates the image alt text", () => {
        expect(planetTile.find("Image").at(0).props().alt).toEqual(string);
    });

});
