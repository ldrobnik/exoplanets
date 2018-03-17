import React from "react";
import {shallow} from "enzyme";
import {Options} from "./Options";

describe("Options", () => {

    const options = shallow(<Options />);

    it("renders the mass slider", () => {
        expect(options.find("Connect(SliderMass)").exists()).toBe(true);
    });

    it("renders the temperature slider", () => {
        expect(options.find("Connect(SliderTemperature)").exists()).toBe(true);
    });

    it("renders the density slider", () => {
        expect(options.find("Connect(SliderDensity)").exists()).toBe(true);
    });
});