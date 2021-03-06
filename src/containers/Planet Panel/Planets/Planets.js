import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlanetTile from '../Planet Tile/PlanetTile'; //component containing a single item displaying planet data
import './Planets.css'; //stylesheet
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
                    let {pl_hostname, pl_letter, pl_radj, pl_eqt, pl_dens} = this.props.planetData[i];
                    //update the array with a planet tile containing the above details
                    planetTiles.push(<PlanetTile
                        hostname={pl_hostname}
                        letter={pl_letter}
                        radius={pl_radj}
                        temperature={pl_eqt}
                        density={pl_dens}
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

