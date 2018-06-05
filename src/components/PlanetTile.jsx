import React, {Component} from "react";
import {Link} from "react-router-dom";
import {ScaleLoader} from "react-spinners"; //spinner


export class PlanetTile extends Component {
    constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
        this.turnOnLoader = this.turnOnLoader.bind(this);
        this.turnOffLoader = this.turnOffLoader.bind(this);

        this.state = {
            loading: true, //specifies whether the spinner should be visible
            name: ""
        }
    }


    //sets loading to false and thus turns off the loader
    turnOffLoader() {

        this.setState({loading: false});

    }


    //sets loading to true and thus turns on the loader
    turnOnLoader() {

        this.setState({loading: true});

    }


    /* shortens a string based on a lower limit
     - it searches for the next space or full stop after the limit
     and replaces it and the rest of the string with an ellipsis */
    shortenString(string, limit) {

        let shortenedString = string;

        //don't shorten if the string is shorter, equal to or just one character longer than the limit
        if (string.length - limit > 1) {

            //iterate through the remaining part of the string, find the nearest space or full stop and replace it and the rest with an ellipsis
            for (let i = limit; i < string.length - 1; i++) {

                if ((string.substr(i, 1) === " ") || (string.substr(i, 1) === ".")) {
                    shortenedString = string.slice(0, i) + "…";
                    return shortenedString;
                }

            }
        }

        return shortenedString;
    }

    //takes the name and tagline from the props, shortens them if necessary and updates the state
    handleDetails() {


        if (this.props.hostname !== undefined) {

            // const adjustedName = this.shortenString(this.props.name, 35); //shorten the name if too long
            // const adjustedTagline = this.shortenString(this.props.tagline, 35); //shorten the tagline if too long

            const planetName = this.props.hostname + " " + this.props.letter;

            this.setState({name: planetName}); //update the state with a new name

            this.setState({loading: false});

        }

    }


    componentDidMount() {

        this.handleDetails(); //shorten the name and tagline if too long

    }


    componentWillReceiveProps(nextProps) {

        this.handleDetails(); //shorten the name and tagline if too long

        //if the id has changed, turn on the loader
        if (this.props.id !== nextProps.id) {

            this.turnOnLoader();

        }

    }


    render() {

        let containerClass = ""; //specifies the class of the container holding the main content
        let loaderClass = ""; //specifies the class of the container holding the spinner

        if (this.state.loading) {
            containerClass = "displayNone"; //hides the tile content when loading
            loaderClass = "loaderTileContainer"; //shows the loader when loading
        } else {
            containerClass = "contentContainer"; //shows the tile content when loaded
            loaderClass = "displayNone"; //hides the loader when the content has loaded
        }


        let imageName = (this.props.density >= 2) ? "solid.png" : "fluffy.png"; //if planet density is at least 2 g/cm^3, load the image of a rocky planet; otherwise -- of a Jovian planet (also if null)

        let imageSize = ""; //specifies the width of the planet image

        if (this.props.radius !== null) {

            //if the planet has a defined radius, calculate the image width as follows:

            imageSize = 20 * (5 + Math.log(this.props.radius*2)) + "px";

            console.log("radius: ", this.props.radius, "log: ", (3 + Math.log(this.props.radius*2)), "width: ", imageSize);
        } else {

            //if the planet has no definied radius (the value is 'null'), apply the following widht:

            imageSize = "50px";
        }

        if (this.props.name !== null) {

            //show a tile if it has details

            const link = "/details/" + this.props.id; //router link path

            return (
                <Link to={link} className="routerLink">
                    <div className="planetTile">

                        <div className={loaderClass}>
                            <ScaleLoader
                                color={"#ffab12"}
                                loading={this.state.loading}
                            />
                        </div>

                        <div className={containerClass}>
                            <figure className="planetThumbnail">
                                <img
                                    src={imageName}
                                    alt="planet icon"
                                    className="planetImage"
                                    width={imageSize}
                                />
                                <figcaption className="planetName">
                                    <strong>{this.state.name}</strong>
                                </figcaption>
                            </figure>


                        </div>
                    </div>
                </Link>
            )
        } else {

            //don't show a tile if no details are present in the props
            return (<div></div>)
        }
    }
}


export default PlanetTile;