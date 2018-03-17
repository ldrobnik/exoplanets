import React from "react";
import {shallow} from "enzyme";
import {SliderIbu} from "./SliderIbu";

describe("SliderIbu", () => {
    const sliderIbu = shallow(<SliderIbu />);

    it("renders the Range component", () => {
        expect(sliderIbu.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});