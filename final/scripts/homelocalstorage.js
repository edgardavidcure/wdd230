let submissionCount = localStorage.getItem("submission_count");

if (!submissionCount) {
  submissionCount = 0;
}
localStorage.setItem("submission_count", submissionCount);

document.querySelector("#submission-count").textContent = submissionCount;

