import React, {Component} from "react";
import {connect} from "react-redux";
import {Range} from "rc-slider"; //range slider
import "rc-slider/assets/index.css"; //slider stylesheet
import {
    setAbv, //sets ABV min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the numbers of planets that need to be displayed
} from "../actions";

export class SliderAbv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 12,
            abv: {min: 0, max: 12},
        };
    }

    //sets the min and max ABV values
    updateAbv(min, max) {
        this.props.setAbv(min, max);
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
        this.updateAbv(value[0], value[1]); //set ABV range
        this.updatePlanetsToDisplay(20); //set the default number of planets to display
        this.updateDataReload(true); //allow reloading of data
    };


    render() {
        return (
            <Range defaultValue={[0, 12]}
                   min={this.state.min}
                   max={this.state.max}
                   step={3}
                   onChange={this.onSliderChange}
                   trackStyle={[{backgroundColor: "#f9db94"}]}
                   handleStyle={[
                       {
                           backgroundColor: "#f9db94",
                           borderColor: "#f9db94"
                       },
                       {
                           backgroundColor: "#f9db94",
                           borderColor: "#f9db94"
                       }]}
                   railStyle={{backgroundColor: "#fdf3dc"}}
                   pushable
            />
        );
    }
}

function mapStateToProps(state) {
    const {
        abv, //ABV min and max values
        dataReload //specifies whether API requests are allowed
    } = state;

    return {
        abv,
        dataReload
    }
}

export default connect(mapStateToProps, {
    setAbv, //sets ABV min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the number of planets that need to be displayed
})(SliderAbv);