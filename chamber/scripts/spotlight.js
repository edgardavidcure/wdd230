
let validMembers = [];

async function fetchData() {
  const info = await fetch("data.json");
  const response = await info.json();
  displaySpotlights(response.companies);
}

const spotlightElements = [
    {
      title: document.getElementById("businessTitle1"),
      logo: document.getElementById("businessLogo1"),
      email: document.getElementById("businessEmail1"),
      phone: document.getElementById("businessPhone1"),
      website: document.getElementById("businessWebsite1"),
    },
    {
      title: document.getElementById("businessTitle2"),
      logo: document.getElementById("businessLogo2"),
      email: document.getElementById("businessEmail2"),
      phone: document.getElementById("businessPhone2"),
      website: document.getElementById("businessWebsite2"),
    },
    {
      title: document.getElementById("businessTitle3"),
      logo: document.getElementById("businessLogo3"),
      email: document.getElementById("businessEmail3"),
      phone: document.getElementById("businessPhone3"),
      website: document.getElementById("businessWebsite3"),
    },
  ];
  
  let displayedSpotlights = new Set();
  

  function displaySpotlights(companies) {
    validMembers = companies.filter(
        (company) =>
          company.membershiplevel === "Gold" || company.membershiplevel === "Silver"
      );
    
    spotlightElements.forEach((element) => {
      let spotlightIndex;
      do {
        spotlightIndex = getRandomInt(validMembers.length);
      } while (displayedSpotlights.has(spotlightIndex));
  
      const spotlight = validMembers[spotlightIndex];
      displayedSpotlights.add(spotlightIndex);
  
      element.title.textContent = spotlight.name;
      element.logo.src = spotlight.image;
      element.phone.textContent = spotlight.phone;
      element.website.textContent = spotlight.websiteurl;
    });
  }
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  fetchData();
  