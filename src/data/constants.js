
// export const BASE_URL = "https://api.punkapi.com/v2/beers"; //basic URL address

export const BASE_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json"; //basic URL address

export const SELECTION = "&select=pl_hostname,pl_letter,pl_radj,pl_rade,pl_dens,pl_eqt,pl_discmethod,pl_pnum,pl_orbper,pl_orbeccen,pl_orbincl,pl_bmassj,pl_bmasse,st_dist,st_optmag,rowupdate"; //bit of the URL address to select the needed columns

export const WHERE = "&where="; //bit of the URL to specify parameter ranges

export const RADIUS = "pl_radj"; //name of the column specifying planet radius (Jupiter radii)
export const TEMP = "pl_eqt"; //name of the column specifying planet equilibrium temperature [K]
export const DENSITY = "pl_radj"; //name of the column specifying planet density (g/cm**3)

export const LIMIT = "st_dist<20";