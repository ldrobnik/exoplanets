import React, {Component} from "react";
import {connect} from "react-redux";
import {Grid, Row} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner
import InfoPanel from "./InfoPanel";
import Options from "./Options"; //component containing sliders adjusting the radius, temperature and density values
import Planets from "./Planets"; //component containing the list of planets
import {BASE_URL, SELECTION, WHERE, RADIUS, TEMP, DENSITY, ORDER, LIMIT} from "../data/constants"; //constants to create URL for fetching planets
import {
    setPlanetData, //updates info about stored planet data
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay, //changes the numbers of planets that need to be displayed
    setPlanetsDisplayed //updates the number of planets already displayed
} from "../actions";


export class Home extends Component {

    constructor(props) {
        super(props);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.getPlanets = this.getPlanets.bind(this);

        this.state = {
            loading: true, //specifies whether the spinner should be visible
            message: "", //specifies the content of the message at the bottom of the page
            allDataLoaded: false, //specifies whether all planet data has been loaded or only that from the initial, limited fetch
        }
    }


    //updates planet data
    updatePlanetData(planetData) {
        this.props.setPlanetData(planetData);
    }


    //specifies whether data can be reloaded
    updateDataReload(reload) {
        this.props.setDataReload(reload);
    }


    //specifies the number of planets to be displayed
    updatePlanetsToDisplay(number) {
        this.props.setPlanetsToDisplay(number);
    }


    //specifies the number of planets currently displayed
    updatePlanetsDisplayed(number) {
        this.props.setPlanetsDisplayed(number);
    }


    //specifies the message content
    updateMessage(message) {
        this.setState({message});
    }

    //specifies whether API requests are allowed
    updateDataReload(reload) {
        this.props.setDataReload(reload);
    }

    //sets the message if no more planets can be found
    handleMessage(json) {

        if (this.state.allDataLoaded) {

            //if no planets or no planets matching the specified criteria can be found, display a message
            if (json.length === 0) {

                //if no planets have been fetched, update the message to:
                this.updateMessage("no planets matching the specified criteria!");

            } else if (json.length <= this.props.planetsToDisplay) {

                //if all planets have been loaded, update the message to:
                this.updateMessage("no more planets matching the specified criteria!");

            } else {

                //in the remaining cases, clear the message
                this.updateMessage("");

            }
        } else {
            //if all data has not been yet loaded, display a message about loading data
            this.updateMessage("loading planet data…");
        }
    }


    //fetches planets from the NASA Exoplanet Archive
    getPlanets() {

        //fetch data only if API requests are allowed (dataReload is true)
        if (this.props.dataReload === true) {


            // get the radius, temperature and density min and max values as specified by the sliders
            const {radius, temperature, density} = this.props;

            /*
             minimum and maximum values for the currently available exoplanets:

             radius: min - 0.03, max - 6.9
             temperature: min - 50, max - 4050
             density: min - 0.03, max - 77.7


             values for the slider:
                radius - range: 0-4, step: 1
                temperature - range: 0-2000, step: 500
                density - range: 0-60, step: 15

            */

            //based on the above values, set radius, temperature and density min and max values to be used to fetch planet data
            const radiusMin = radius.min;
            const radiusMax = (radius.max === 2) ? 10000 : radius.max; //if the slider is set to maximum, account for all planets with radius over the maximum value

            const temperatureMin = temperature.min;
            const temperatureMax = (temperature.max === 2000) ? 10000 : temperature.max; //if the slider is set to maximum, account for all planets with temperature over the maximum value

            const densityMin = density.min;
            const densityMax = (density.max === 60) ? 10000 : density.max; //if the slider is set to maximum, account for all planets with density over the maximum value

            //if the radius slider is not in the default position, add a radius range to the request
            let radiusRange = ((this.props.radius.min === 0) && (this.props.radius.max === 60)) ? "" : `${RADIUS}>${radiusMin}&${RADIUS}<${radiusMax}`;

            //if the temperature slider is not in the default position, add a temperature range to the request
            let temperatureRange = ((this.props.temperature.min === 0) && (this.props.temperature.max === 120)) ? "" : `&${TEMP}>${temperatureMin}&${TEMP}<${temperatureMax}`;

            //if the density slider is not in the default position, add a density range to the request
            let densityRange = ((this.props.density.min === 0) && (this.props.density.max === 12)) ? "" : `&${DENSITY}>${densityMin}&${DENSITY}<${densityMax}`;


            //the initial URL address to fetch planets within specified radius, temperature and density ranges, limited by distance to the planetary system, so the fetch doesn't take too long
            const INITIAL_URL = `${BASE_URL}${SELECTION}${WHERE}${radiusRange}${temperatureRange}${densityRange}${LIMIT}${ORDER}`;


            //the proper URL address to fetch all planets within specified radius, temperature and density ranges
            const FETCH_URL = `${BASE_URL}${SELECTION}${WHERE}${radiusRange}${temperatureRange}${densityRange}${ORDER}`;

            // fetch initial planet data from the API, limited by distance to the planetary system
            fetch(INITIAL_URL, {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => {
                    this.updatePlanetData(json); //replace stored planet data with data just fetched from the API
                    this.handleMessage(json); //display message if no more planets can be found
                    this.setState({loading: false}); //hide the spinner
                    this.updateDataReload(false); //disable API requests
                    this.updatePlanetsDisplayed(this.props.planetsToDisplay); //set the number of planets currently displayed equal to the number of planets that were supposed to be displayed
                    console.log('initial fetch', json);

                })
                .catch(() => {
                    //in case of an error:
                    this.updatePlanetsToDisplay(0); //set the number of planets that should be displayed to 0
                    this.updateMessage("error connecting to the server. please check your internet connection or try again later."); //display an error message
                    this.setState({loading: false}); //hide the spinner
                });

            //fetch all planet data and substitute them for the limited planet data
            fetch(FETCH_URL, {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => {

                    this.updatePlanetData(json); //replace stored planet data with data just fetched from the API
                    this.handleMessage(json); //display message if no more planets can be found
                    this.setState({loading: false}); //hide the spinner
                    this.updateDataReload(false); //disable API requests
                    this.updatePlanetsDisplayed(this.props.planetsToDisplay); //set the number of planets currently displayed equal to the number of planets that were supposed to be displayed
                    this.setState({allDataLoaded: true}); //let the module know that all planet data has been loaded
                    console.log('proper fetch', json);

                    // //temporary code to check the min and max values
                    // let min = {
                    //     temp: 1000,
                    //     dens: 1000,
                    //     rad: 1000
                    // };
                    // let max = {
                    //     temp: 0,
                    //     dens: 0,
                    //     rad: 0
                    // };
                    // let current = {
                    //     temp: 0,
                    //     dens: 0,
                    //     rad: 0
                    // };
                    //
                    // for (let i = 0; i < json.length; i++) {
                    //
                    //     current = {
                    //         temp: json[i].pl_eqt,
                    //         dens: json[i].pl_dens,
                    //         rad: json[i].pl_radj
                    //     };
                    //
                    //     console.log('current', current);
                    //
                    //     if (current.temp > 0) {
                    //
                    //         min.temp = (current.temp < min.temp) ? current.temp : min.temp;
                    //         max.temp = (current.temp > max.temp) ? current.temp : max.temp;
                    //
                    //     }
                    //
                    //     if (current.dens > 0) {
                    //
                    //         min.dens = (current.dens < min.dens) ? current.dens : min.dens;
                    //         max.dens = (current.dens > max.dens) ? current.dens : max.dens;
                    //
                    //     }
                    //
                    //     if (current.rad > 0) {
                    //
                    //         min.rad = (current.rad < min.rad) ? current.rad : min.rad;
                    //         max.rad = (current.rad > max.rad) ? current.rad : max.rad;
                    //
                    //     }
                    //
                    // }
                    //
                    // console.log('min', min, 'max', max);

                })
                .catch(() => {
                    //in case of an error:
                    this.updatePlanetsToDisplay(0); //set the number of planets that should be displayed to 0
                    this.updateMessage("error connecting to the server. please check your internet connection or try again later."); //display an error message
                    this.setState({loading: false}); //hide the spinner
                });

        }

    }


    //loads more planets when the user scrolls to the bottom of the page
    handleOnScroll() {

        //check whether the user has scrolled to the bottom of the page - two methods to increase browser compatibility

        //method one
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop; //scroll top position
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight; //scroll height
        const clientHeight = document.documentElement.clientHeight || window.innerHeight; //client height

        //if the sum of scroll top and client height reaches the scroll height, it means the user has scrolled to the bottom
        const scrolledToBottom1 = Math.ceil(scrollTop + clientHeight) >= scrollHeight;


        //method two
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight; //window height - if innerHeight not supported, use documentElement.offsetHeight
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); //document height equal to the highest of these values

        //if the sum of window height and page Y offset reaches document height, it means the user has scrolled to the bottom
        const scrolledToBottom2 = (windowHeight + window.pageYOffset >= docHeight);


        //if the user has scrolled to the bottom as detected with either of the above methods, expand the planet list;
        if (scrolledToBottom1 || scrolledToBottom2) {

            //increase the number of planets to be displayed by 20
            const newPlanetsToDisplay = this.props.planetsToDisplay + 20;
            this.updatePlanetsToDisplay(newPlanetsToDisplay); //update the number of planets to be displayed with the increased number

            //if there is not enough planets stored in memory and all planet data have been already fetched and API requests are enabled, get more from the API;
            if (this.state.allDataLoaded && this.props.dataReload && (this.props.planetData.length < newPlanetsToDisplay)) {
                this.getPlanets(); //get planets from the api
                console.log('planet data', this.props.planetData);
            }
        }
    }


    componentDidMount() {

        //load planet data when the component has mounted
        setTimeout(this.getPlanets, 800); //set timeout for smoother behaviour

        //detect scrolling
        window.addEventListener("scroll", this.handleOnScroll);
    }


    componentWillReceiveProps() {

        //load data when the component receives new props
        setTimeout(this.getPlanets, 800); //set timeout for smoother behaviour

    }


    componentWillUnmount() {

        //remove scroll event listener
        window.removeEventListener("scroll", this.handleOnScroll);

        //clear timeout
        clearTimeout(this.turnOnRequests);
    }


    render() {

        if (this.state.loading) {
            return (
                <div className="loaderMainContainer">
                    <ScaleLoader
                        color={"#ffd892"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }

        return (
            <Grid>
                <Row className="titlePanel">
                    <h1>you like your exoplanets&hellip;</h1>
                    <Options />
                </Row>
                <Row>
                    <InfoPanel />
                </Row>
                <Row>
                    <Planets />
                </Row>
                <Row className="messageContainer">
                    <div>{this.state.message}</div>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {

    const {
        radius, //radius min and max values
        temperature, //temperature min and max values
        density, //density min and max values
        planetData, //planet details
        dataReload, //specifies whether API requests are allowed
        planetsToDisplay, //number of planets to be displayed
        planetsDisplayed, //number of planets currently displayed
    } = state;

    return {
        radius,
        temperature,
        density,
        planetData,
        dataReload,
        planetsToDisplay,
        planetsDisplayed
    }
}

export default connect(mapStateToProps, {
    setPlanetData, //updates info about stored planet data
    setDataReload, //enables/disables API requests
    setPlanetsToDisplay, //changes the numbers of planets that need to be displayed
    setPlanetsDisplayed //updates the number of planets already displayed
})(Home);