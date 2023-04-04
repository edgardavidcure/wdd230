document.querySelector("form").addEventListener("submit", function (event) {
  let submissionCount = localStorage.getItem("submission_count");
  if (!submissionCount) {
    submissionCount = 0;
  } else {
    submissionCount = parseInt(submissionCount) + 1;
  }
  localStorage.setItem("submission_count", submissionCount);


  event.preventDefault();
});
