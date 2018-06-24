import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ScaleLoader} from "react-spinners"; //spinnerimport {


export class PlanetTile extends Component {
    constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
        this.turnOnLoader = this.turnOnLoader.bind(this);
        this.turnOffLoader = this.turnOffLoader.bind(this);

        this.state = {
            // loading: this.props.dataReload, //turn on the spinner when dataReload is enabled (when the initial fetch is performed)
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

        if (this.props.dataReload) {
            containerClass = "displayNone"; //hides the tile content when loading
            loaderClass = "loaderTileContainer"; //shows the loader when loading
        } else {
            containerClass = "contentContainer"; //shows the tile content when loaded
            loaderClass = "displayNone"; //hides the loader when the content has loaded
        }



        let imageSize = ""; //specifies the width of the planet image
        let imageName = ""; //specifies the filename of the planet image shown

        if (this.props.radius !== null) {

            //if the planet has a defined radius, calculate the image width as follows
            imageSize = this.props.radius * 120 + "px";

            //if planet radius is lower than 1/3 of Jupiter radius, load the image of a rocky planet; otherwise -- of a Jovian planet;

            if (this.props.density !== null) {
                //if density is defined, choose the image based on density
                imageName = (this.props.density >= 3) ? "solid.png" : "fluffy.png";

            } else {

                //if density is not defined, choose the image based on radius
                imageName = (this.props.radius < 0.25 && this.props.radius !== null) ? "solid.png" : "fluffy.png";
            }
        } else {

            //if the planet has no definied radius (the value is 'null'), apply the following default width [flaticon font size] and set the image of an unknown planet
            imageSize = "40px";
            imageName = "unknown.png";



            /*
             * if the planet has defined width and is dense, apply smaller size, otherwise bigger size
             *
             * then check for mass
             *
             * in all cases lower alpha so it suggests the size is not known
             *
             * a maximum size can be applied
             * */
        }

        if ((this.props.hostname !== null) && (this.props.letter !== null)) {

            //show a tile if it has details

            const link = "/details/" + this.props.hostname.replace(/ /g, "%20") + "/" + this.props.letter; //router link path

            return (
                <Link to={link} className="routerLink">
                    <div className="planetTile">

                        <div className={loaderClass}>
                            <ScaleLoader
                                color={"#ffab12"}
                                loading={this.props.dataReload}
                            />
                        </div>

                        <div className={containerClass}>
                            <figure className="planetThumbnail">
                                <div className="imageContainer">
                                    <img
                                        src={`/${imageName}`}
                                        alt="planet icon"
                                        className="planetImage"
                                        width={imageSize}
                                    />
                                </div>
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

function mapStateToProps(state) {
    const {
        dataReload //specifies whether API requests are allowed
    } = state;

    return {
        dataReload
    }
}


export default connect(mapStateToProps)(PlanetTile);