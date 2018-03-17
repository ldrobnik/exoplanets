import React, {Component} from "react";
import {ScaleLoader} from "react-spinners"; //spinner
import {SimilarPlanetTile} from "./SimilarPlanetTile"; //component containing details of a single similar planet
import {BASE_URL} from "../data/constants"; //basic URL for fetching planets

export class SimilarPlanets extends Component {
    constructor(props) {
        super(props);

        this.getSimilarPlanets = this.getSimilarPlanets.bind(this);

        this.state = {
            planetList: [],
            loading: true
        }
    }


    //finds planets with similar mass, temperature and density values
    getSimilarPlanets() {

        //margins of similarity for mass, temperature and density
        const massMargin = 15;
        const ibuMargin = 15;
        const abvMargin = 5;

        //take mass, temperature and density values from the props
        const {mass, ibu, abv} = this.props;

        //convert strings to integers
        const massVal = Math.round(Number(mass));
        const ibuVal = Math.round(Number(ibu));
        const abvVal = Math.round(Number(abv));

        //set min and max values of mass, temperature and density
        const massMin = (massVal > massMargin) ? massVal - massMargin : 0; //so that the value is not below 0
        const massMax = massVal + massMargin;
        const ibuMin = (ibuVal > ibuMargin) ? ibuVal - ibuMargin : 0; //so that the value is not below 0
        const ibuMax = ibuVal + ibuMargin;
        const abvMin = (abvVal > abvMargin) ? abvVal - abvMargin : 0; //so that the value is not below 0
        const abvMax = abvVal + abvMargin;



        let massRange = (mass !== undefined) ? `&mass_gt=${massMin}&mass_lt=${massMax}` : ""; //if mass is not undefined, add a mass range to the request
        let ibuRange = (ibu !== undefined) ? `&ibu_gt=${ibuMin}&ibu_lt=${ibuMax}` : ""; //if temperature is not undefined, add a temperature range to the request
        let abvRange = (abv !== undefined) ? `&abv_gt=${abvMin}&abv_lt=${abvMax}` : ""; //if density is not undefined, add a density range to the request

        const FETCH_URL = `${BASE_URL}?page=1&per_page=20${massRange}${ibuRange}${abvRange}`; //URL address to get planets of in the specified mass, temperature and density ranges

        //fetch planet data from the API
        fetch(FETCH_URL, {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                const planetDetails = json;

                if (planetDetails !== undefined) {

                    let temporaryPlanetList = []; //temporary container for planets randomly chosen from among the fetched planets
                    let forbiddenPlanetList = [Number(this.props.id)]; //this contains planets that cannot be included in the list, i.e. the displayed planet and any planet that is already added to the list to prevent duplicates
                    let listLength = (planetDetails.length >= 4) ? 3 : planetDetails.length; //set 3 as the maximum number of similar planets to display (compared to '4' because the fetched planets include the currently displayed planet, which will be removed from the list)

                    //create a temporary array of similar planets
                    if (planetDetails.length <= 4) {

                        //if the list has no more than 4 items, just remove the displayed planet from the list
                        for (let i = 0; i < listLength; i++) {

                            if (planetDetails[i] !== undefined) {

                                let {id, name, image_url} = planetDetails[i];

                                //don't place a planet in the list if it is the currently displayed planet
                                if (id !== Number(this.props.id)) {
                                    temporaryPlanetList.push({id, name, image_url});
                                }
                            }
                        }

                    } else {

                        //if the list has more than 4 items, choose random planets from the fetched list, removing the displayed planet and avoiding duplicates
                        while (temporaryPlanetList.length < listLength) {

                            let forbidden = false; //specifies whether it is forbidden to add a given planet

                            //get random planet from the fetched list
                            let randomIndex = Math.floor(planetDetails.length * Math.random());

                            //get details of the randomly chosen planet
                            let {id, name, image_url} = planetDetails[randomIndex];

                            //check whether the chosen planet id is in the forbidden list
                            for (let i = 0; i < forbiddenPlanetList.length; i++) {
                                if (Number(forbiddenPlanetList[i]) === id) forbidden = true;
                            }

                            //if it is not, add the planet to both the temporary list and the forbidden list
                            if (!forbidden) {

                                temporaryPlanetList.push({id, name, image_url}); //add the planet to the temporary list
                                forbiddenPlanetList.push(id); //also add it to the forbidden list, so it is not repeated

                            }
                        }
                    }

                    this.setState({planetList: temporaryPlanetList}); //update planet list
                    this.setState({loading: false}); //hide spinner

                }
            });

    }


    componentDidMount() {

        //get a list of similar planets
        setTimeout(() => {
            this.getSimilarPlanets() //set timeout so that props can load
        }, 200);

    }


    render() {

        let containerClass = ""; //specifies the class of the container holding the main content
        let loaderClass = ""; //specifies the class of the container holding the spinner

        if (this.state.loading) {

            containerClass = "displayNone"; //hides the planet list when loading
            loaderClass = "loaderSimilarPlanetsContainer"; //shows the loader when loading

        } else if (this.state.planetList.length > 1) {

            containerClass = "similarPlanets"; //shows the list when loaded and not empty
            loaderClass = "displayNone"; //hides the loader when the list has loaded

        } else {

            containerClass = "displayNone"; //hides the list when empty
            loaderClass = "displayNone"; //hides the loader when the list has loaded

        }

        //creates the code of planet tiles

        let similarPlanetList = []; //contains the code of each link in the list
        let planetListLength = (this.state.planetList.length >= 3) ? 3 : this.state.planetList.length; //number of planets to display, up to 3

        //check whether any similar planets have been found
        if (this.state.planetList !== []) {

            //iterate through the array of planets and generate the code of the list
            for (let i = 0; i < planetListLength; i++) {

                //check if a given list item exists
                if (this.state.planetList[i] !== undefined) {

                    let similarPlanetDetails = {
                        link: "/details/" + this.state.planetList[i].id, //router link path
                        name: this.state.planetList[i].name, //planet name to be displayed
                        image_url: this.state.planetList[i].image_url //planet image url
                    };

                    //generate the code for a planet list item
                    similarPlanetList.push(
                        <div className="similarPlanetTile">
                            <SimilarPlanetTile {...similarPlanetDetails} />
                        </div>
                    );

                }

            }

        }


        return (
            <div>
                <div className={loaderClass}>
                    <ScaleLoader
                        color={"#F7CB63"}
                        loading={this.state.loading}
                    />
                </div>
                <div className={containerClass}>
                    <p><strong>You might also like:</strong></p>
                    <div className="similarPlanetList">
                        {similarPlanetList.map((similarPlanet, k) => {
                            return (
                                <div key={k}>
                                    {similarPlanet}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default SimilarPlanets;