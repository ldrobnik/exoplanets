import React from "react";
import {shallow} from "enzyme";
import {SliderAbv} from "./SliderAbv";

describe("SliderAbv", () => {
    const sliderAbv = shallow(<SliderAbv />);

    it("renders the Range component", () => {
        expect(sliderAbv.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});