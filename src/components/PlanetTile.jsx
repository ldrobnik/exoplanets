import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Image, Table} from "react-bootstrap";
import {ScaleLoader} from "react-spinners"; //spinner


export class PlanetTile extends Component {
    constructor(props) {
        super(props);
        this.handleDetails = this.handleDetails.bind(this);
        this.turnOnLoader = this.turnOnLoader.bind(this);
        this.turnOffLoader = this.turnOffLoader.bind(this);

        this.state = {
            loading: true, //specifies whether the spinner should be visible
            name: "",
            tagline: ""
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

        if ((this.props.name !== undefined) && (this.props.tagline !== undefined)) {

            const adjustedName = this.shortenString(this.props.name, 35); //shorten the name if too long
            const adjustedTagline = this.shortenString(this.props.tagline, 35); //shorten the tagline if too long

            this.setState({name: adjustedName}); //update the state with a new name
            this.setState({tagline: adjustedTagline}); //update the state with a new tagline

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

        if (this.props.name !== null) {

            //show a tile if it has details

            const link = "/details/" + this.props.id; //router link path

            return (
                <Link to={link} className="routerLink">
                    <div className="planetTile">

                        <div className={loaderClass}>
                            <ScaleLoader
                                color={"#838383"}
                                loading={this.state.loading}
                            />
                        </div>

                        <Table className={containerClass}>
                            <tbody>
                            <tr>
                                <td className="imageContainer">
                                    <Image
                                        className="planetImage"
                                        src={this.props.image_url}
                                        alt={this.props.name}
                                        onLoad={this.turnOffLoader.bind(this)}
                                    />
                                </td>
                                <td className="planetText">
                                    <p className="planetName">
                                        <strong>{this.state.name}</strong>
                                    </p>
                                    <p className="planetTagline">
                                        {this.state.tagline}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
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