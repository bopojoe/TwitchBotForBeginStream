module.exports = (ms) => {
    const end = Date.now() + ms;
    while (end > Date.now()) {}
}