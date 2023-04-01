let submissionCount = localStorage.getItem("submission_count");

if (!submissionCount) {
  submissionCount = 0;
}
localStorage.setItem("submission_count", submissionCount);

document.querySelector("#submission-count").textContent = submissionCount;

const now = new Date();

const year = now.getFullYear();

document.getElementById(
  "webInfo"
).innerHTML = `&copy; ${year} | Edgar Cure | WDD 230 Project | Last Modified on: ${document.lastModified}`;
