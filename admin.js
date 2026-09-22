document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   PAGE TABS
========================================================= */

const tabs = document.querySelectorAll(".page-tab");
const pages = document.querySelectorAll(".admin-page");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const pageName = tab.dataset.page;

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        pages.forEach(page => {
            page.classList.remove("active");
        });

        tab.classList.add("active");

        const selectedPage = document.getElementById(
            `${pageName}-page`
        );

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

    });

});


/* =========================================================
   VIEW LIVE SITE
========================================================= */

const previewButton = document.querySelector(".preview-btn");

if (previewButton) {

    previewButton.addEventListener("click", () => {

        window.open(
            "https://j38-dev.github.io/Loud-Ads/",
            "_blank"
        );

    });

}


/* =========================================================
   IMAGE PREVIEWS
========================================================= */

const imageInputs = document.querySelectorAll(
    ".image-input, .portfolio-image-input"
);

imageInputs.forEach(input => {

    input.addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            input.value = "";

            return;
        }

        const card = input.closest(
            ".content-card, .portfolio-card"
        );

        if (!card) return;

        const image = card.querySelector("img");

        if (!image) return;

        const imageURL = URL.createObjectURL(file);

        image.src = imageURL;

    });

});


/* =========================================================
   LOCAL STORAGE
========================================================= */

const storageKey = "loudAdsManagerData";


function getSavedData() {

    const saved = localStorage.getItem(storageKey);

    if (!saved) {
        return {};
    }

    try {
        return JSON.parse(saved);
    } catch (error) {

        console.error(
            "Could not read saved Loud Ads data.",
            error
        );

        return {};

    }

}


function saveData(data) {

    localStorage.setItem(
        storageKey,
        JSON.stringify(data)
    );

}


let savedData = getSavedData();


/* =========================================================
   SAVE LANDING PAGE CONTENT
========================================================= */

const saveButtons = document.querySelectorAll(
    ".content-card .save-btn"
);

saveButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const card = button.closest(".content-card");

        if (!card) return;

        const linkInput = card.querySelector(".link-input");
        const labelInput = card.querySelector(
            'input[type="text"]'
        );

        const image = card.querySelector("img");

        savedData[`landing_${index + 1}`] = {

            link: linkInput
                ? linkInput.value.trim()
                : "",

            label: labelInput
                ? labelInput.value.trim()
                : "",

            image: image
                ? image.getAttribute("src")
                : ""

        };

        saveData(savedData);

        showSavedMessage(button);

    });

});


/* =========================================================
   SAVE PORTFOLIO PROJECTS
========================================================= */

const portfolioSaveButtons = document.querySelectorAll(
    ".portfolio-card .save-btn"
);

portfolioSaveButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const card = button.closest(".portfolio-card");

        if (!card) return;

        const inputs = card.querySelectorAll("input");

        const image = card.querySelector("img");

        savedData[`portfolio_${index + 1}`] = {

            name: inputs[1]
                ? inputs[1].value.trim()
                : "",

            link: inputs[2]
                ? inputs[2].value.trim()
                : "",

            image: image
                ? image.getAttribute("src")
                : ""

        };

        saveData(savedData);

        showSavedMessage(button);

    });

});


/* =========================================================
   SAVED MESSAGE
========================================================= */

function showSavedMessage(button) {

    const originalText = button.textContent;

    button.textContent = "SAVED";

    button.style.background = "#dc143c";
    button.style.borderColor = "#dc143c";

    setTimeout(() => {

        button.textContent = originalText;

        button.style.background = "";
        button.style.borderColor = "";

    }, 1500);

}


/* =========================================================
   RESTORE SAVED TEXT
========================================================= */

function restoreLandingData() {

    const cards = document.querySelectorAll(
        ".content-card"
    );

    cards.forEach((card, index) => {

        const data = savedData[
            `landing_${index + 1}`
        ];

        if (!data) return;

        const linkInput = card.querySelector(
            ".link-input"
        );

        const labelInput = card.querySelector(
            'input[type="text"]'
        );

        if (linkInput && data.link) {
            linkInput.value = data.link;
        }

        if (labelInput && data.label) {
            labelInput.value = data.label;
        }

    });

}


function restorePortfolioData() {

    const cards = document.querySelectorAll(
        ".portfolio-card"
    );

    cards.forEach((card, index) => {

        const data = savedData[
            `portfolio_${index + 1}`
        ];

        if (!data) return;

        const inputs = card.querySelectorAll("input");

        if (inputs[1] && data.name) {
            inputs[1].value = data.name;
        }

        if (inputs[2] && data.link) {
            inputs[2].value = data.link;
        }

    });

}


restoreLandingData();
restorePortfolioData();


/* =========================================================
   ADD NEW PORTFOLIO PROJECT
========================================================= */

const addProjectButton = document.querySelector(
    ".add-project-btn"
);

if (addProjectButton) {

    addProjectButton.addEventListener("click", () => {

        const portfolioPage = document.querySelector(
            "#portfolio-page"
        );

        if (!portfolioPage) return;

        const cards = portfolioPage.querySelectorAll(
            ".portfolio-card"
        );

        const newNumber = String(cards.length + 1)
            .padStart(2, "0");

        const newCard = document.createElement("article");

        newCard.className = "portfolio-card";

        newCard.innerHTML = `

            <div class="portfolio-number">
                ${newNumber}
            </div>

            <div class="portfolio-preview">

                <img
                    src=""
                    alt="New Portfolio Project"
                >

            </div>

            <div class="portfolio-details">

                <label>
                    PROJECT IMAGE

                    <input
                        type="file"
                        class="portfolio-image-input"
                        accept="image/*"
                    >

                </label>

                <label>
                    PROJECT NAME

                    <input
                        type="text"
                        placeholder="Project name"
                    >

                </label>

                <label>
                    PROJECT LINK

                    <input
                        type="url"
                        placeholder="https://..."
                    >

                </label>

                <button
                    class="save-btn"
                    type="button"
                >
                    SAVE PROJECT
                </button>

            </div>

        `;

        addProjectButton.before(newCard);

        attachNewProjectEvents(newCard);

    });

}


/* =========================================================
   NEW PROJECT EVENTS
========================================================= */

function attachNewProjectEvents(card) {

    const imageInput = card.querySelector(
        ".portfolio-image-input"
    );

    const saveButton = card.querySelector(
        ".save-btn"
    );

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {

                    alert(
                        "Please select an image file."
                    );

                    imageInput.value = "";

                    return;
                }

                const image =
                    card.querySelector("img");

                if (image) {

                    image.src =
                        URL.createObjectURL(file);

                }

            }
        );

    }


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const inputs =
                    card.querySelectorAll("input");

                const image =
                    card.querySelector("img");

                const cards =
                    document.querySelectorAll(
                        ".portfolio-card"
                    );

                const index =
                    Array.from(cards)
                        .indexOf(card) + 1;

                savedData[
                    `portfolio_${index}`
                ] = {

                    name:
                        inputs[1]
                            ? inputs[1].value.trim()
                            : "",

                    link:
                        inputs[2]
                            ? inputs[2].value.trim()
                            : "",

                    image:
                        image
                            ? image.getAttribute("src")
                            : ""

                };

                saveData(savedData);

                showSavedMessage(
                    saveButton
                );

            }
        );

    }

}


/* =========================================================
   AUTO-SAVE TEXT WHILE TYPING
========================================================= */

const textInputs = document.querySelectorAll(
    ".link-input, .portfolio-details input[type='text'], .portfolio-details input[type='url']"
);

textInputs.forEach(input => {

    input.addEventListener("input", () => {

        input.dataset.changed = "true";

    });

});


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "s"
    ) {

        event.preventDefault();

        const activePage =
            document.querySelector(
                ".admin-page.active"
            );

        if (!activePage) return;

        const buttons =
            activePage.querySelectorAll(
                ".save-btn"
            );

        buttons.forEach(button => {
            button.click();
        });

    }

});

});
