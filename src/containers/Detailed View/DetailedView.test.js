import React from "react";
import {shallow} from "enzyme";
import {DetailedView} from "./DetailedView";

describe("DetailedView", () => {

    const props = {
      match: {
          params: {
              id: 0
          }
      }
    };

    const detailedView = shallow(<DetailedView {...props} />);

    beforeEach(() => {
        detailedView.setState({
            loading: false, //turns off the spinner
            show: true //shows the modal
        });
    });

    it("renders the modal", () => {
        expect(detailedView.find("Modal").exists()).toBe(true);
    });

});