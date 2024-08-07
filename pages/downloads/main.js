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

const page = document.getElementById("downloads")

function generateSectionItem(data) {
    let item = document.createElement("span");
    item.className = "item";
    item.innerHTML = `
        <img class="cover" draggable="false" src=${data.cover}></img>
        <span class="title">${data.title}</span>
        <span class="description">${data.description}</span>
        <button class="view">View</button>
    `;

    item.querySelector(".view").addEventListener("click", function() {
        setPage("downloads", `v#${data.id}`)
    });

    return item;
};
function generateSectionItems(data) {
    let items = document.createElement("div");
    items.className = "items";
    
    for (let i=0; i<data.length; i++) {
        items.appendChild(generateSectionItem(data[i]));
    };

    return items;
};

function generateSectionHeader(data) {
    let section = document.createElement("span");
    section.className = "section";
    section.innerText = `${data.title} (${data.items.length})`;

    page.appendChild(section);
    page.appendChild(generateSectionItems(data.items));
};

function generateSection(data) {
    for (let i=0; i<data.length; i++) {
        generateSectionHeader(data[i]);
    };
};

async function populatePage(file) {
    const data = await getJson(file);
    generateSection(data);
};

populatePage("downloads.json");