import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Image} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner
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
            pl_hostname: "", //Host Star Name: Stellar name most commonly used in the literature.
            pl_letter: "", //Planet Letter: Letter assigned to the planetary component of a planetary system.
            pl_radj: 0, //Planet Radius (Jupiter radii):	Length of a line segment from the center of the planet to its surface, measured in units of radius of Jupiter.
            pl_rade: 0, //Planet Radius (Earth radii): Length of a line segment from the center of the planet to its surface, measured in units of radius of the Earth.
            pl_dens: 0, //Planet Density (g/cm**3): Amount of mass per unit of volume of the planet.
            pl_pnum: 0, //	Number of Planets in System	Number of planets in the planetary system.
            pl_discmethod: "", //Discovery Method: Method by which the planet was first identified.
            pl_orbsmax: 0, //Orbit Semi-Major Axis (AU):	The longest radius of an elliptic orbit, or, for exoplanets detected via gravitational microlensing or direct imaging, the projected separation in the plane of the sky.
            pl_eqt: 0, //Planet Equilibrium Temperature [K]	The equilibrium temperature of the planet as modeled by a black body heated only by its host star, or for directly imaged planets, the effective temperature of the planet required to match the measured luminosity if the planet were a black body.
            pl_orbper: 0, //Orbital Period (days): Time the planet takes to make a complete orbit around the host star or system.
            pl_orbeccen: 0, //Eccentricity: Amount by which the orbit of the planet deviates from a perfect circle.
            pl_orbincl: 0, //Inclination (deg): Angular distance of the orbital plane from the line of sight.
            pl_bmassj: 0, //Planet Mass or M*sin(i) [Jupiter mass]: Best planet mass measurement in units of masses of Jupiter. Either Mass, M*sin(i)/sin(i), or M*sin(i). See provenance for source of the measurement.
            pl_bmasse: 0, //Planet Mass or M*sin(i) [Earth mass]: Best planet mass measurement in units of masses of Earth. Either Mass, M*sin(i)/sin(i), or M*sin(i). See provenance for source of the measurement.
            st_dist: 0, //Distance (pc): Distance to the planetary system in units of parsecs.
            st_mass: 0, //	Stellar Mass (solar mass):	Amount of matter contained in the star, measured in units of masses of the Sun.
            st_rad: 0, //
            rowupdate: "" //Date of Last Update:	Date of last update of the planet parameters.

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
    searchPlanetInMemory(hostName, planetLetter) {

        //check whether there are any planet data loaded
        if (this.props.planetData.length > 0) {
            // check if a planet with a given hostname and letter is in the memory
            for (let i = 0; i < this.props.planetData.length; i++) {
                if ((this.props.planetData[i].pl_hostname === hostName) && (this.props.planetData[i].pl_letter === planetLetter)) return i;
                console.log(this.props.planetData);
            }
        }
    }

    //updates the state with all the details (see descriptions above, starting from line 18)
    setDetails(pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate) {
        this.setState({pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate});
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
        const hostName = this.props.match.params.hostName.replace(/%20/g, " "); //replace all '%20's with spaces
        const planetLetter = this.props.match.params.planetLetter;

        console.log(hostName, ", ", planetLetter);
        //checks if this planet is already loaded in the memory:
        const idInPlanetData = this.searchPlanetInMemory(hostName, planetLetter);

        if (idInPlanetData !== undefined) {

            //if the planet is already loaded, take all the details from memory
            let {pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate} = this.props.planetData[idInPlanetData];

            //update the detailed view data
            this.setDetails(pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate);


            //turn off loader
            this.turnOffLoader();

        } else {
            // &where=pl_hostname like 'Kepler-22'
            //if the planet is not in the memory, fetch it from the API
            // const BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json"; //basic URL address
            const FETCH_URL = `${BASE_URL}&where=pl_hostname like ${hostName}&where=pl_letter like ${planetLetter}`; //URL address to get planets of the specified id

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
                        let {pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate} = planetDetails[0];

                        //update planet details with data fetched from the API
                        this.setDetails(pl_hostname, pl_letter, pl_radj, pl_rade, pl_dens, pl_eqt, pl_discmethod, pl_orbsmax, pl_pnum, pl_orbper, pl_orbeccen, pl_orbincl, pl_bmassj, pl_bmasse, st_dist, st_mass, st_rad, rowupdate);

                        //turn off loader
                        this.turnOffLoader();
                    }
                })
                .catch(() => {
                    //hide unnecessary information (such as the “Brewer’s Tips” heading)
                    this.setState({showSecondaryInfo: false});

                    //set the title to 'Error', description to an error message and clear all the other details
                    this.setDetails("Error", "", 0, 0, 0, 0, "Error fetching planet details. Please check your Internet connection and make sure you have typed a correct URL.", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "");

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


        //rel parameter - precaution against reverse tabnabbing
        const rel = "noopener noreferrer";


        let imageSize = ""; //specifies the width of the planet image
        let imageName = ""; //specifies the filename of the planet image shown



        if ((this.state.pl_radj !== null) && (this.state.pl_radj !== 0)) {

            //if the planet has a defined radius, calculate the image width [flaticon font size] as follows
            imageSize = this.state.pl_radj * 180 + "px";

            //if planet radius is lower than 1/3 of Jupiter radius, load the image of a rocky planet; otherwise -- of a Jovian planet;
            imageName = (this.state.pl_radj < 0.25 && this.state.pl_radj !== null) ? "../../solid.png" : "../../fluffy.png";

        } else {

            //if the planet has no definied radius (the value is 'null'), apply the following default width [flaticon font size] and set the image of an unknown planet
            imageSize = "60px";
            imageName = "../../unknown.png";
        }

        console.log("Radius:", this.state.pl_radj, "imageSize", imageSize, "imageName", imageName);

        return (

            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                dialogClassName="planetView"

            >
                <div className={loaderClass}>
                    <ScaleLoader
                        color={"#ffab12"}
                        loading={this.state.loading}
                    />
                </div>
                <div className={containerClass}>
                    <Modal.Header closeButton>
                        <Modal.Title><strong>{this.state.pl_hostname}&nbsp;{this.state.pl_letter}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="detailBody">
                        <div className="detailContentContainer">
                            <div className={secondaryInfoClass}>
                                <figure className="planetLargeView">
                                    <div className="imageContainer">
                                        <img
                                            src={imageName}
                                            alt="planet icon"
                                            className="planetLargeImage"
                                            width={imageSize}
                                        />
                                    </div>
                                    <figcaption className="planetName">
                                        <strong>{this.state.pl_hostname}&nbsp;{this.state.pl_letter}</strong>
                                    </figcaption>
                                </figure>
                            </div>

                            <p>
                                <span className={secondaryInfoClass}><strong>Discovery method:&nbsp;</strong></span>
                                {this.state.pl_discmethod}
                            </p>

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