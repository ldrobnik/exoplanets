import React, {Component} from "react";
import SliderMass from "./SliderMass"; //component containing the EBC slider
import SliderIbu from "./SliderIbu"; //component containing the IBU slider
import SliderAbv from "./SliderAbv"; //component containing the ABV slider

export class Options extends Component {

    render() {
        return (
            <div>
                <div className="sliderContainer">
                    <div className="sliderLabel">small</div>
                    <SliderMass />
                    <div className="sliderLabel">big</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">cold</div>
                    <SliderIbu />
                    <div className="sliderLabel">hot</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">puffy</div>
                    <SliderAbv />
                    <div className="sliderLabel">solid</div>
                </div>
            </div>
        );
    }
}

export default Options;