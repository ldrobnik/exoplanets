# you like your exoplanets…

A simple tool to search through the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/). You can find a demo [here](https://youlikeyourexoplanets.netlify.com/).

## Instructions

The app provides a visual representation of the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/).

Three **draggable sliders** allow the user to filter exoplanets based on the following properties:
* radius (the **small/big** slider);
* equilibrium temperature (the **cold/hot** slider);
* density (the **puffy/solid** slider).

Planets that meet the search criteria are displayed as tiles, ordered by increasing distance from The Solar System.

After clicking one of the tiles, a modal is displayed providing detailed information about a given planet.

## Technicalities

* a single-page app created with **React.js**;
* routes managed with **React-Router**;
* app state controlled with **Redux**;
* neat styles thanks to **SCSS**;
* responsive design utilising **React-Bootstrap**;
* **Moment.js** for nice date formatting.
