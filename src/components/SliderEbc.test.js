import React from "react";
import {shallow} from "enzyme";
import {SliderEbc} from "./SliderEbc";

describe("SliderEbc", () => {
    const sliderEbc = shallow(<SliderEbc />);

    it("renders the Range component", () => {
        expect(sliderEbc.find("ComponentEnhancer(Range)").exists()).toBe(true);
    })
});