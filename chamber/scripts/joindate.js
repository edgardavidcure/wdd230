const d = new Date();
const currentDate = d.toDateString();
const hour = d.getHours();
const mins = d.getMinutes();
const seconds = d.getSeconds();
document.getElementById(
  "date"
).value = `${currentDate}, ${hour}:${mins}:${seconds}`;
