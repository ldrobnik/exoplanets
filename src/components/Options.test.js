import React from "react";
import {shallow} from "enzyme";
import {Options} from "./Options";

describe("Options", () => {

    const options = shallow(<Options />);

    it("renders the EBC slider", () => {
        expect(options.find("Connect(SliderEbc)").exists()).toBe(true);
    });

    it("renders the IBU slider", () => {
        expect(options.find("Connect(SliderIbu)").exists()).toBe(true);
    });

    it("renders the ABV slider", () => {
        expect(options.find("Connect(SliderAbv)").exists()).toBe(true);
    });
});