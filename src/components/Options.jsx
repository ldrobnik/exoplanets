import React, {Component} from "react";
import SliderRadius from "./SliderRadius"; //component containing the EBC slider
import SliderDensity from "./SliderDensity"; //component containing the DENSITY slider

export class Options extends Component {

    render() {
        return (
            <div>
                <div className="sliderContainer">
                    <div className="sliderLabel">small</div>
                    <SliderRadius />
                    <div className="sliderLabel">big</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">puffy</div>
                    <SliderDensity />
                    <div className="sliderLabel">solid</div>
                </div>
            </div>
        );
    }
}

export default Options;