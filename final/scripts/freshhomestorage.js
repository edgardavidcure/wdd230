document.querySelector("form").addEventListener("submit", function(event) {
    // Update the submission count in local storage
    let submissionCount = localStorage.getItem("submission_count");
    if (!submissionCount) {
      submissionCount = 0;
    } else {
      submissionCount = parseInt(submissionCount) + 1;
    }
    localStorage.setItem("submission_count", submissionCount);
    
    // Display the submission count to the user
    document.querySelector("#submission-count").textContent = submissionCount;
    
    // Prevent the form from actually submitting
    event.preventDefault();
  });
  