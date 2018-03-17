import React, {Component} from "react";
import {connect} from "react-redux";
import PlanetTile from "./PlanetTile"; //component containing a single item displaying planet data

export class Planets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true //specifies whether the spinner should be visible
        }

    }


    render() {

        //creates the code of planet tiles

        let planetTiles = []; //array to hold all planet tile code


        if (this.props.planetData !== null) {

            for (let i = 0; i < this.props.planetsToDisplay; i++) {

                if (this.props.planetData[i] !== undefined) {

                    //take id, image_url, name and tagline from the props
                    let {id, image_url, name, tagline} = this.props.planetData[i];

                    //update the array with a planet tile containing the above details
                    planetTiles.push(<PlanetTile
                        id={id}
                        image_url={image_url}
                        name={name}
                        tagline={tagline}
                    />);
                }
            }

        }


        return (
            <div className="galleryContainer">
                <div className="tileGallery">
                    {planetTiles.map((planetTile, k) => {
                        return (
                            <div className="planetTileContainer" key={k}>
                                {planetTile}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    const {
        planetData,
        planetsToDisplay
    } = state;

    return {
        planetData, //planet details
        planetsToDisplay //number of planets to be displayed
    }
}

export default connect(mapStateToProps, null)(Planets);

