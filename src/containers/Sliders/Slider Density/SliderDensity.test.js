import React from "react";
import {shallow} from "enzyme";
import {SliderDensity} from "./SliderDensity";

describe("SliderDensity", () => {
    const sliderDensity = shallow(<SliderDensity />);

    it("renders the Range component", () => {
        expect(sliderDensity.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});