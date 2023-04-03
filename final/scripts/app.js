const now = new Date();

const year = now.getFullYear();

document.getElementById(
  "webInfo"
).innerHTML = `&copy; ${year} | Edgar Cure | WDD 230 Project | Last Modified on: ${document.lastModified}`;
