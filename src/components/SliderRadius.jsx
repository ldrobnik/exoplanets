import React, {Component} from "react";
import {connect} from "react-redux";
import {Range} from "rc-slider"; //range slider
import "rc-slider/assets/index.css"; //slider stylesheet
import {
    setRadius, //sets radius min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the numbers of planets that need to be displayed
} from "../actions";

export class SliderRadius extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 4,
            radius: {min: 0, max: 4},
        };
    }

    //sets the min and max radius values
    updateRadius(min, max) {
        this.props.setRadius(min, max);
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
        this.updatePlanetsToDisplay(20); //set the default number of planets to display
        this.updateRadius(value[0], value[1]); //set radius range
        this.updateDataReload(true); //allow reloading of data
    };

    render() {
        return (
            <Range defaultValue={[0, 4]}
                   min={this.state.min}
                   max={this.state.max}
                   step={1}
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
        radius, //radius min and max values
        dataReload //specifies whether API requests are allowed
    } = state;

    return {
        radius,
        dataReload
    }
}

export default connect(mapStateToProps, {
    setRadius, //sets EBV min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the number of planets that need to be displayed
})(SliderRadius);