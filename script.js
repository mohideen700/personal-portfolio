

const typingElement = document.getElementById("typing");

const words = [
    "Web Developer",
    "Python Programmer",
    "Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typingEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1400);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 50 : 100
    );
}

typingEffect();


const ghostBtn =
    document.getElementById("ghostBtn");

const natureBtn =
    document.getElementById("natureBtn");


ghostBtn.addEventListener("click", () => {

    document.body.classList.remove("nature-mode");

    document.body.classList.add("ghost-mode");

    localStorage.setItem(
        "portfolioMode",
        "ghost"
    );

});


/* =====================================================
   NATURAL FUTURE MODE
===================================================== */

natureBtn.addEventListener("click", () => {

    document.body.classList.remove("ghost-mode");

    document.body.classList.add("nature-mode");

    localStorage.setItem(
        "portfolioMode",
        "nature"
    );

});


/* =====================================================
   REMEMBER MODE
===================================================== */

const savedMode =
    localStorage.getItem("portfolioMode");

if (savedMode === "nature") {

    document.body.classList.remove("ghost-mode");

    document.body.classList.add("nature-mode");

}


/* =====================================================
   BACKGROUND / ACCENT COLOR CHANGER
===================================================== */

const colorPicker =
    document.getElementById("colorPicker");


colorPicker.addEventListener("input", (event) => {

    const color = event.target.value;

    document.documentElement.style
        .setProperty("--accent", color);

    localStorage.setItem(
        "accentColor",
        color
    );

});


/* =====================================================
   LOAD SAVED COLOR
===================================================== */

const savedColor =
    localStorage.getItem("accentColor");

if (savedColor) {

    document.documentElement.style
        .setProperty(
            "--accent",
            savedColor
        );

    colorPicker.value = savedColor;

}


/* =====================================================
   MOUSE FOLLOWING GLOW
===================================================== */

const mouseGlow =
    document.getElementById("mouseGlow");


document.addEventListener(
    "mousemove",
    (event) => {

        mouseGlow.style.left =
            event.clientX + "px";

        mouseGlow.style.top =
            event.clientY + "px";

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const cards =
    document.querySelectorAll(
        ".glass"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(card);

});


/* =====================================================
   PROJECT POPUP
===================================================== */

const featuredProject = document.querySelector(".mini-project-card");
const featuredLink = featuredProject?.querySelector(".project-btn");

if (featuredProject && featuredLink) {
    const popup = document.createElement("div");
    popup.className = "project-preview project-popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-label", "Featured project preview");
    popup.innerHTML = `
        <div class="project-preview-box">
            <button class="project-popup-close" type="button" aria-label="Close project preview">&times;</button>
            <span class="project-popup-label">FEATURED PROJECT</span>
            <strong>${featuredProject.querySelector("h3")?.textContent || "Project"}</strong>
            <iframe class="project-popup-frame" src="${featuredLink.href}" title="${featuredProject.querySelector("h3")?.textContent || "Project"}" loading="eager"></iframe>
            <a href="${featuredLink.href}" target="_blank" rel="noreferrer">Open Full Page &rarr;</a>
        </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => popup.classList.add("is-hidden");

    popup.querySelector(".project-popup-close")?.addEventListener("click", closePopup);
    popup.addEventListener("click", event => {
        if (event.target === popup) closePopup();
    });

    window.setTimeout(() => popup.classList.add("is-visible"), 450);
}