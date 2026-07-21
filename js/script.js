document.querySelectorAll(".bio-toggle").forEach(button => {

    button.addEventListener("click", function () {

        const bio = this.nextElementSibling;

        bio.classList.toggle("open");

        if (bio.classList.contains("open")) {
            this.textContent = "Hide Bio";
        } else {
            this.textContent = "Read Bio";
        }

    });

});