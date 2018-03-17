import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner

export class SimilarPlanetTile extends Component {
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

//takes the name from the props, shortens it if necessary and updates the state
    handleDetails() {

        if (this.props.name !== undefined) {

            const adjustedName = this.shortenString(this.props.name, 20); //shorten the name if too long
            this.setState({name: adjustedName}); //update the state with a new name

        }

    }

    componentDidMount() {

        this.handleDetails(); //shorten the name if too long

    }

    render() {

        let containerClass = ""; //specifies the class of the container holding the main content
        let loaderClass = ""; //specifies the class of the container holding the spinner

        if (this.state.loading) {
            containerClass = "displayNone"; // hides the tile content when loading
            loaderClass = "loaderSimilarPlanetContainer"; // shows the spinner when loading
        } else {
            containerClass = "contentContainer"; // shows the tile content when loaded
            loaderClass = "displayNone"; // hides the spinner when the content has loaded
        }

        if (this.props.name !== null) {

            //show a tile if it has details


            return (
                <div>
                    <div className={loaderClass}>
                        <ScaleLoader
                            color={"#838383"}
                            loading={this.state.loading}
                        />
                    </div>
                    <Link
                        to={this.props.link}
                        className={containerClass}
                    >
                        <figure>
                            <Image
                                src={this.props.image_url}
                                alt={this.props.name}
                                onLoad={this.turnOffLoader.bind(this)}
                                className="similarPlanetImage"
                            />
                        </figure>
                        <figcaption
                            className="similarPlanetCaption"
                        >
                            {this.state.name}
                        </figcaption>
                    </Link>
                </div>
            )
        } else {

            //don't show a tile if no details present in the props
            return (<div></div>)
        }

    }
}

export default SimilarPlanetTile;