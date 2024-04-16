async function getJson(url) {
    let result = {};
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        result = data;
    });
    return result;
};

function setPage(folder, file) {
    window.parent.setPage(folder, file);
};

document.getElementById("close").addEventListener("click", function() {
    setPage("downloads", "");
});

function unselectImageSelectors() {
    const imageSelectorSpans = document.querySelectorAll("#images > #image-control > span");
    for (let j=0; j<imageSelectorSpans.length; j++) {
        imageSelectorSpans[j].removeAttribute("class");
    };
};
function hideImages() {
    const images = document.querySelectorAll("#images > img");
    for (let j=0; j<images.length; j++) {
        images[j].className = "invisible";
    };
};

function onHashMatch(data, category) {
    // Location Info
    document.querySelector(".location > #category").textContent = category;
    document.querySelector(".location > #item").textContent = data.title;

    // Image View
    for (let i=0; i<data.images.length; i++) {
        let image = document.createElement("img");
        image.src = data.images[i];
        image.draggable = false;
        document.querySelector("#images").appendChild(image);

        let swapToImage = document.createElement("span");
        swapToImage.addEventListener("click", function() {
            unselectImageSelectors();
            hideImages();

            image.className = "visible";
            swapToImage.className = "selected";
        });

        document.querySelector("#images > #image-control").appendChild(swapToImage);
    };

    unselectImageSelectors();
    hideImages();

    document.querySelector("#images > img").className = "visible"
    document.querySelector("#images > #image-control > span").className = "selected"

    // Content
    document.querySelector("#item-view > .title").textContent = data.title;
    document.querySelector("#item-view > .text-html").innerHTML = data.page_html;

    // Download
    document.querySelector("#item-view > .download > .main-download").addEventListener("click", function() {
        window.open(data.file, "_blank");
    });
    if (data.has_github) {
        document.querySelector("#item-view > .download > .view-github").addEventListener("click", function() {
            window.open(data.github, "_blank");
        });
    } else {
        document.querySelector("#item-view > .download").className = "download no-github";
    };
};

async function main(file) {
    if (window.location.hash == "") {
        setPage("downloads", "");
    };

    const hash = window.location.hash.replace("#", "");
    const data = await getJson(file);

    for (let i=0; i<data.length; i++) {
        for (let j=0; j<data[i].items.length; j++) {
            if (data[i].items[j].id == hash) {
                onHashMatch(data[i].items[j], data[i].title);
                break;
            } else {
                setPage("downloads", "");
                console.log("Non-valid download page");
            };
        };
    };
};

main("downloads.json");