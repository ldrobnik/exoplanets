import React, {Component} from "react";
import {connect} from "react-redux";
import {Range} from "rc-slider"; //range slider
import "rc-slider/assets/index.css"; //slider stylesheet
import {
    setEbc, //sets EBV min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the numbers of planets that need to be displayed
} from "../actions";

export class SliderEbc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: 60,
            ebc: {min: 0, max: 60},
        };
    }

    //sets the min and max ABV values
    updateEbc(min, max) {
        this.props.setEbc(min, max);
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
        this.updateEbc(value[0], value[1]); //set EBC range
        this.updateDataReload(true); //allow reloading of data
    };

    render() {
        return (
            <Range defaultValue={[0, 60]}
                   min={this.state.min}
                   max={this.state.max}
                   step={15}
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
        ebc, //EBC min and max values
        dataReload //specifies whether API requests are allowed
    } = state;

    return {
        ebc,
        dataReload
    }
}

export default connect(mapStateToProps, {
    setEbc, //sets EBV min and max values
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay //changes the number of planets that need to be displayed
})(SliderEbc);