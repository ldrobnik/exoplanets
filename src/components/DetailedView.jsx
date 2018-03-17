import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Image} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner
import SimilarPlanets from "./SimilarPlanets"; //component containing a list of similar planets
import {BASE_URL} from "../data/constants"; //basic URL for fetching planets

export class DetailedView extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getPlanetDetails = this.getPlanetDetails.bind(this);

        this.state = {
            show: false, //specifies whether the detailed view modal should be visible
            loading: true, //specifies whether the spinner should be visible
            showSecondaryInfo: true, //specifies whether certain text (such as the 'Brewer’s Tips' heading) should be present; hide when an error is encountered to display an error message
            name: "", //planet name
            tagline: "", //planet tagline
            description: "", //planet description
            image_url: "", //planet image url
            food_pairing: [], //food pairing suggestions
            brewers_tips: "", //brewer’s tips
            mass: 0, //planet mass value
            temperature: 0, //planet temperature value
            density: 0 //planet density value
        };
    }

    //sets loading to false and thus turns off the loader
    turnOffLoader() {

        this.setState({loading: false});

    }


    //sets loading to true and thus turns on the loader
    turnOnLoader() {

        this.setState({loading: true});

    }


    //turns the detailed view modal on
    handleShow() {

        this.setState({show: true});

    }


    //closes the modal and routes back to the home component
    handleClose() {

        this.props.history.push("/"); //go to the home component
        this.setState({show: false}); //hide the modal

    }


    //checks if the requested planet is already in the memory
    searchPlanetInMemory(id) {

        // check if a planet with a given id is in the memory
        for (let i = 0; i < this.props.planetData.length; i++) {
            if (this.props.planetData[i].id === Number(id)) return i;
        }
    }

    //updates the state with all the details
    setDetails(name, tagline, description, image_url, food_pairing, brewers_tips, mass, temperature, density) {
        this.setState({
            name, //planetn ame
            tagline, //planet tagline
            description, //planet description
            image_url, //planet image url
            food_pairing, //food pairing suggestions
            brewers_tips, //brewer’s tips
            mass, //planet EBC value
            temperature, //planet TEMPERATURE value
            density //planet DENSITY value
        });
    }


    //handles fetch errors
    handleErrors(response) {


        if (!response.ok) {

            throw Error(response.status);
        }

        return response;
    }

    //gets planet details from memory or fetches them from the API
    getPlanetDetails() {

        //show the modal
        this.handleShow();

        //show the secondary info (such as the “Brewer’s Tips” heading)
        this.setState({showSecondaryInfo: true});

        //planet id
        const planetId = this.props.match.params.id;

        //checks if this planet is already loaded in the memory:
        const idInPlanetData = this.searchPlanetInMemory(planetId);

        if (idInPlanetData !== undefined) {

            //if the planet is already loaded, take all the details from memory
            let {name, tagline, description, image_url, food_pairing, brewers_tips, mass, temperature, density} = this.props.planetData[idInPlanetData];

            //update the detailed view data
            this.setDetails(name, tagline, description, image_url, food_pairing, brewers_tips, mass, temperature, density);

        } else {

            //if the planet is not in the memory, fetch it from the API
            // const BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json"; //basic URL address
            const FETCH_URL = `${BASE_URL}${planetId}`; //URL address to get planets of the specified id

            //fetch planet data from the API
            fetch(FETCH_URL, {
                method: "GET"
            })
                .then(this.handleErrors)
                .then(response => response.json())
                .then(json => {
                    const planetDetails = json;
                    if (planetDetails[0] !== undefined) {

                        //get planet details from the single-item array containing the details of the requested planet
                        let {name, tagline, description, image_url, food_pairing, brewers_tips, mass, temperature, density} = planetDetails[0];

                        //update planet details with data fetched from the API
                        this.setDetails(name, tagline, description, image_url, food_pairing, brewers_tips, mass, temperature, density);
                    }
                })
                .catch(() => {
                    //hide unnecessary information (such as the “Brewer’s Tips” heading)
                    this.setState({showSecondaryInfo: false});

                    //set the title to 'Error', description to an error message and clear all the other details
                    this.setDetails("Error", "", "Error fetching planet details. Please check your Internet connection and make sure you have typed a correct URL.", "", [], "", "", "", "");

                    //hide spinner after a short while
                    setTimeout(() => {
                        this.turnOffLoader()
                    }, 1000);

                });
        }

    }


    componentDidMount() {

        //get planet details
        setTimeout(() => {
            this.getPlanetDetails()
        }, 500); //timeout allows loading of a correct planet

    }


    componentWillReceiveProps() {

        this.setState({show: false}); //hide the modal when new data received

        this.setState({image_url: ""}); //clear the planet image url (as turning the spinner off depends on loading the image)

        this.setState({loading: true}); //show the spinner


        //get planet details
        setTimeout(() => {
            this.getPlanetDetails()
        }, 500); //timeout allows loading of a correct planet
    }


    render() {

        let containerClass = ""; //specifies the class of the container holding the main content
        let loaderClass = ""; //specifies the class of the container holding the spinner

        if (this.state.loading) {
            containerClass = "displayNone"; //hides the modal content when loading
            loaderClass = "loaderViewContainer"; //shows the loader when loading
        } else {
            containerClass = "contentContainer"; //shows the modal content when loaded
            loaderClass = "displayNone"; //hides the loader when the content has loaded
        }

        //if error is displayed, hide secondary info (such as the “Brewer’s Tips” heading)
        let secondaryInfoClass = "";

        if (!this.state.showSecondaryInfo) {
            secondaryInfoClass = "displayNone";
        }

        //Wikipedia links explaining the meaning of EBC, TEMPERATURE and DENSITY
        const massLink = "https://en.wikipedia.org/";
        const temperatureLink = "https://en.wikipedia.org/";
        const densityLink = "https://en.wikipedia.org/";

        //rel parameter - precaution against reverse tabnabbing
        const rel = "noopener noreferrer";

        //Food pairing suggestions array

        const foodPairingSuggestions = this.state.food_pairing;

        return (

            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                dialogClassName="planetView"

            >
                <div className={loaderClass}>
                    <ScaleLoader
                        color={"#F7CB63"}
                        loading={this.state.loading}
                    />
                </div>
                <div className={containerClass}>
                    <Modal.Header closeButton>
                        <Modal.Title><strong>{this.state.name}</strong></Modal.Title>
                        <p>{this.state.tagline}</p>
                    </Modal.Header>
                    <Modal.Body className="detailBody">
                        <div className="detailContentContainer">
                            <div className={secondaryInfoClass}>
                                <Image
                                    className="detailImage"
                                    src={this.state.image_url}
                                    alt={this.state.name}
                                    onLoad={this.turnOffLoader.bind(this)}
                                />
                            </div>
                            <p className={secondaryInfoClass}>
                                <strong>
                                    <a href={massLink} target="_blank" rel={rel}>
                                        EBC:&nbsp;
                                    </a>
                                </strong>
                                {this.state.mass} &#124;
                                <span> </span>
                                <strong>
                                    <a href={temperatureLink} target="_blank" rel={rel}>
                                        TEMPERATURE:&nbsp;
                                    </a>
                                </strong>
                                {this.state.temperature} &#124;
                                <span> </span>
                                <strong><a href={densityLink} target="_blank" rel={rel}>
                                    DENSITY:&nbsp;
                                </a>
                                </strong>{this.state.density}
                            </p>
                            <p>{this.state.description}</p>
                            <p className={secondaryInfoClass}><strong>Brewer&#8217;s
                                Tips: </strong>{this.state.brewers_tips}</p>
                            <div className="foodPairingContainer">
                                <p className={secondaryInfoClass}><strong>Best served with:</strong></p>
                                <ul className="foodPairingList">
                                    {foodPairingSuggestions.map((foodPairingSuggestion, k) => {
                                        return (
                                            <li key={k}>
                                                {foodPairingSuggestion}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={secondaryInfoClass}>
                            <SimilarPlanets
                                id={this.props.match.params.id}
                                mass={this.state.mass}
                                temperature={this.state.temperature}
                                density={this.state.density}
                            />
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    const {
        planetData //planet details
    } = state;

    return {
        planetData
    }
}

export default connect(mapStateToProps, null)(DetailedView);