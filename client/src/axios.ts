import ax from "axios";

const baseURL = `http://${window.location.hostname}:5000`;

console.log(`API url = ${baseURL} window.location = `)
console.dir(window.location);

const axios = ax.create({
    baseURL
});

export default axios;