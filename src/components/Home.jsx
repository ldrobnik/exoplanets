import React, {Component} from "react";
import {connect} from "react-redux";
import {Grid, Row} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner
import Options from "./Options"; //component containing sliders adjusting the EBC, IBU and ABV values
import Planets from "./Planets"; //component containing the list of planets
import {BASE_URL} from "../data/constants"; //basic URL for fetching planets
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
            message: "" //specifies the content of the message at the bottom of the page
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


    //fetches planets from punkapi.com
    getPlanets() {

        //fetch data only if API requests are allowed (dataReload is true)
        if (this.props.dataReload === true) {

            // get the EBC, IBU and ABV min and max values as specified by the sliders
            const {mass, ibu, abv} = this.props;

            //based on the above values, set EBC, IBU and ABV min and max values to be used to fetch planet data
            const massMin = mass.min;
            const massMax = (mass.max === 60) ? 2000 : mass.max; //if the slider is set to maximum, account for all planets with mass over 60

            const ibuMin = ibu.min;
            const ibuMax = (ibu.max === 120) ? 2000 : ibu.max; //if the slider is set to maximum, account for all planets with ibu over 150

            const abvMin = abv.min;
            const abvMax = (abv.max === 12) ? 2000 : abv.max; //if the slider is set to maximum, account for all planets with abv over 20

            // const BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json"; //basic URL address

            let urls = []; //array holding all fetch urls

            //if more than 80 planets need to be displayed, create multiple urls, each for 80 planets
            const numberOfRequests = Math.floor(this.props.planetsToDisplay / 80) + 1; //required number of API requests

            for (let i = 1; i <= numberOfRequests; i++) {

                //if the EBC slider is not in the default position, add an EBC range to the request
                let massRange = ((this.props.mass.min === 0) && (this.props.mass.max === 60)) ? "" : `&mass_gt=${massMin}&mass_lt=${massMax}`;

                //if the IBU slider is not in the default position, add an IBU range to the request
                let ibuRange = ((this.props.ibu.min === 0) && (this.props.ibu.max === 120)) ? "" : `&ibu_gt=${ibuMin}&ibu_lt=${ibuMax}`;

                //if the ABV slider is not in the default position, add an ABV range to the request
                let abvRange = ((this.props.abv.min === 0) && (this.props.abv.max === 12)) ? "" : `&abv_gt=${abvMin}&abv_lt=${abvMax}`;

                //URL addresses to get planets from a given page, within specified EBC, IBU and ABV ranges
                urls[i - 1] = `${BASE_URL}?page=${i}&per_page=80${massRange}${ibuRange}${abvRange}`;

            }


            // fetch planet data from the API using the array of URLs created above
            Promise.all(urls.map(url => fetch(url, {
                method: "GET"
            })))
                .then(response => Promise.all(response.map(r => r.json())))
                .then(result => {

                    let fetchedPlanets = []; //an empty array to hold all planets

                    //merge the results into a single array
                    for (let i = 0; i < result.length; i++) {
                        fetchedPlanets = fetchedPlanets.concat(result[i]);
                    }

                    //if no planets or no planets matching the specified criteria can be found, display a message
                    if (fetchedPlanets.length === 0) {

                        //if no planets have been fetched, update the message to:
                        this.updateMessage("no planets matching the specified criteria!");

                    } else if (fetchedPlanets.length <= this.props.planetsToDisplay) {

                        //if all planets have been loaded, update the message to:
                        this.updateMessage("no more planets matching the specified criteria!");

                    } else {

                        //in the remaining cases, clear the message
                        this.updateMessage("");

                    }

                    this.updatePlanetData(fetchedPlanets); //replace stored planet data with data just fetched from the API
                    this.setState({loading: false}); //hide the spinner
                    this.updateDataReload(false); //disable API requests
                    this.updatePlanetsDisplayed(this.props.planetsToDisplay); //set the number of planets currently displayed equal to the number of planets that were supposed to be displayed
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

            //if there is not enough planets stored in memory, get more from the API;
            if (this.props.planetData.length <= newPlanetsToDisplay) {
                this.updateDataReload(true); //enable api requests
                this.getPlanets(); //get planets from the api
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
                        color={"#F7CB63"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }

        return (
            <Grid>
                <Row className="titlePanel">
                    <h1>You like your exoplanets&hellip;</h1>
                    <Options />
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
        mass, //mass min and max values
        ibu, //temperature min and max values
        abv, //density min and max values
        planetData, //planet details
        dataReload, //specifies whether API requests are allowed
        planetsToDisplay, //number of planets to be displayed
        planetsDisplayed, //number of planets currently displayed
    } = state;

    return {
        mass,
        ibu,
        abv,
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