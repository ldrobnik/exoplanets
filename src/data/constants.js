
// export const BASE_URL = "https://api.punkapi.com/v2/beers"; //basic URL address

export const BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json"; //basic URL address

export const SELECTION = "&select=pl_hostname,pl_letter,pl_radj,pl_rade,pl_dens,pl_eqt,pl_discmethod,pl_orbsmax,pl_pnum,pl_pnum,pl_orbper,pl_orbeccen,pl_orbincl,pl_bmassj,pl_bmasse,st_dist,st_mass,st_rad,rowupdate"; //bit of the URL address to select the needed columns

export const WHERE = "&where="; //bit of the URL to specify parameter ranges

export const RADIUS = "pl_radj"; //name of the column specifying planet radius (Jupiter radii)
export const TEMP = "pl_eqt"; //name of the column specifying planet equilibrium temperature [K]
export const DENSITY = "pl_radj"; //name of the column specifying planet density (g/cm**3)


export const LIMIT = "st_dist<20"; //initial limit of the distance to the planetary system in parsecs to be used so that the initial fetch doesn't take too long
export const ORDER = "&order=st_dist"; //order to sort the results by the distance to the planetary system in parsecs (ascending)