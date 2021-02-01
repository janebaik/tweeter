const validText = str => {
    // whether a given string consists of valid input
    return typeof str === 'string' && str.trim().length > 0;
}

module.exports = validText;

