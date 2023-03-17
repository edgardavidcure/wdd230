const datefield = document.querySelector(".date");


const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);


datefield.innerHTML = `<p>${fulldate}</p>`;

const year = now.getFullYear();

document.getElementById("webInfo").innerHTML = `&copy; ${year} | Edgar Cure | WDD 230 Project | Last Modified on: ${document.lastModified}`

function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburguerBtn").classList.toggle("open");

}

const x = document.getElementById("hamburguerBtn");
x.onclick = toggleMenu;

if (now.getDay() === 1 || now.getDay() == 2){
  document.getElementById("banner").style.display = "flex";
} else{
  document.getElementById("banner").style.display = "none";
}

const closeButton = document.getElementById("closeBanner");
closeButton.addEventListener("click", () => {
  document.getElementById("banner").style.display = "none"
}
)
