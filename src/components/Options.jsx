import React, {Component} from "react";
import SliderEbc from "./SliderEbc"; //component containing the EBC slider
import SliderIbu from "./SliderIbu"; //component containing the IBU slider
import SliderAbv from "./SliderAbv"; //component containing the ABV slider

export class Options extends Component {

    render() {
        return (
            <div>
                <div className="sliderContainer">
                    <div className="sliderLabel">light</div>
                    <SliderEbc />
                    <div className="sliderLabel">dark</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">sweet</div>
                    <SliderIbu />
                    <div className="sliderLabel">bitter</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">weak</div>
                    <SliderAbv />
                    <div className="sliderLabel">strong</div>
                </div>
            </div>
        );
    }
}

export default Options;