//creates the global request animation frame function for React to depend on

const requestAnimationFrame = global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
};

export default requestAnimationFrame;