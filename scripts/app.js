const date = new Date(document.lastModified);
document.getElementById("lastmodified").innerHTML = date

const d = new Date();
const year = date.getFullYear();

document.querySelector("#footercopyright").innerHTML = `&copy; ${year} .:|:. Edgar Cure .:|:. California`

