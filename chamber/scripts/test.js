function myFunction() {
    // Declare variables
    const sections = document.querySelectorAll("section");
    const sectionTitles = [];
    const noBusiness = document.getElementById("noBusinessFound")

    sections.forEach(section => {
        const title = section.querySelector("h2").textContent;
        sectionTitles.push(title);
        
    });

    const filterInput = document.getElementById("myInput");

    filterInput.addEventListener("input", () => {
        const inputValue = filterInput.value.toLowerCase();
        const filteredTitles = sectionTitles.filter(title => title.toLowerCase().includes(inputValue));
    


        sections.forEach(section => {
            const title = section.querySelector("h2").textContent;
            if (filteredTitles.includes(title)){
                section.style.display = ""
            } else {
                section.style.display = "none"
            }
        });
        const allHidden = [...sections].every(section => section.style.display === 'none');

        if (allHidden) {
            noBusiness.style.display = 'block';
        } else {
            noBusiness.style.display = 'none';
        }
    });

    
}



