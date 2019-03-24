import React from "react";
import {shallow} from "enzyme";
import {SliderRadius} from "./SliderRadius";

describe("SliderRadius", () => {
    const sliderRadius = shallow(<SliderRadius />);

    it("renders the Range component", () => {
        expect(sliderRadius.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});