import React from "react";
import {shallow} from "enzyme";
import {Home} from "./Home";

describe("Home", () => {
    let home = shallow(<Home />);

    const sampleMessage = "sample message";

    beforeEach(() => {
        home.setState({
            loading: false, //turns off the loader
            message: sampleMessage //updates the message
        });

    });

    it("renders the app title", () => {
        expect(home.find('h1').text()).toEqual("You like your planet…");
    });

    it("renders the options component", () => {
        expect(home.find("Options").exists()).toBe(true);
    });

    it("renders the planet list", () => {
        expect(home.find("Connect(Planets)").exists()).toBe(true);
    });

    it("updates the message correctly", () => {
        expect(home.find(".messageContainer div").text()).toEqual(sampleMessage);
    })
});
