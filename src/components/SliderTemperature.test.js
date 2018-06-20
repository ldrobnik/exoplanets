import React from "react";
import {shallow} from "enzyme";
import {SliderTemperature} from "./SliderTemperature";

describe("SliderTemperature", () => {
    const sliderTemperature = shallow(<SliderTemperature />);

    it("renders the Range component", () => {
        expect(sliderTemperature.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});