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



    //takes the name and tagline from the props, shortens them if necessary and updates the state
    handleDetails() {


        if (this.props.hostname !== undefined) {


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