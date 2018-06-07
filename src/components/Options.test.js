import React from "react";
import {shallow} from "enzyme";
import {Options} from "./Options";

describe("Options", () => {

    const options = shallow(<Options />);

    it("renders the radius slider", () => {
        expect(options.find("Connect(SliderRadius)").exists()).toBe(true);
    });


    it("renders the density slider", () => {
        expect(options.find("Connect(SliderDensity)").exists()).toBe(true);
    });
});