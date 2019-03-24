import React from "react";
import SliderRadius from "../../containers/Sliders/Slider Radius/SliderRadius"; //component containing the EBC slider
import SliderTemperature from "../../containers/Sliders/Slider Temperature/SliderTemperature"; //component containing the TEMPERATURE slider
import SliderDensity from "../../containers/Sliders/Slider Density/SliderDensity"; //component containing the DENSITY slider

const options = (props) => (
            <div>
                <div className="sliderContainer">
                    <div className="sliderLabel">small</div>
                    <SliderRadius />
                    <div className="sliderLabel">big</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">cold</div>
                    <SliderTemperature />
                    <div className="sliderLabel">hot</div>
                </div>
                <div className="sliderContainer">
                    <div className="sliderLabel">puffy</div>
                    <SliderDensity />
                    <div className="sliderLabel">dense</div>
                </div>
            </div>
        );

export default options;