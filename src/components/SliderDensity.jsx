import React, {Component} from "react";
import {connect} from "react-redux";
import {Range} from "rc-slider"; //range slider
import "rc-slider/assets/index.css"; //slider stylesheet
import {
    setDensity, //sets DENSITY min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the numbers of planets that need to be displayed
} from "../actions";

export class SliderDensity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 60,
            density: {min: 0, max: 60},
        };
    }

    //sets the min and max DENSITY values
    updateDensity(min, max) {
        this.props.setDensity(min, max);
    }

    //specifies whether API requests are allowed
    updateDataReload(reload) {
        this.props.setDataReload(reload);
    }

    //specifies how many planets should be displayed
    updatePlanetsToDisplay(number) {
        this.props.setPlanetsToDisplay(number);
    }


    //specifies what happens when the slider position changes
    onSliderChange = (value) => {
        this.updateDensity(value[0], value[1]); //set DENSITY range
        this.updatePlanetsToDisplay(20); //set the default number of planets to display
        this.updateDataReload(true); //allow reloading of data
    };


    render() {
        return (
            <Range defaultValue={[0, 60]}
                   min={this.state.min}
                   max={this.state.max}
                   step={15}
                   onChange={this.onSliderChange}
                   trackStyle={[{backgroundColor: "#f2bc5b"}]}
                   handleStyle={[
                       {
                           backgroundColor: "#f2bc5b",
                           borderColor: "#f2bc5b"
                       },
                       {
                           backgroundColor: "#f2bc5b",
                           borderColor: "#f2bc5b"
                       }]}
                   railStyle={{backgroundColor: "#ffd892"}}
                   pushable
            />
        );
    }
}

function mapStateToProps(state) {
    const {
        density, //DENSITY min and max values
        dataReload //specifies whether API requests are allowed
    } = state;

    return {
        density,
        dataReload
    }
}

export default connect(mapStateToProps, {
    setDensity, //sets DENSITY min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the number of planets that need to be displayed
})(SliderDensity);