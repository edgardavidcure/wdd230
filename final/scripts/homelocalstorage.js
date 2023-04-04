let submissionCount = localStorage.getItem("submission_count");
const text = document.getElementById("card-message");
if (!submissionCount) {
  submissionCount = 0;
  text.innerText = "NO DRINKS YET?! LET US TAKE CARE OF YOU"
} 
if(submissionCount === 1){
  text.innerText = "I BET YOU LIKED THAT FIRST DRINK, LETS GET YOU ANOTHER ONE"
} else{
  text.innerText = "A FEW DRINKS ALREADY, HUH? LETS GET YOU ANOTHER ONE"
}
localStorage.setItem("submission_count", submissionCount);

document.querySelector("#submission-count").textContent = submissionCount;
