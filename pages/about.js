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

function createProfile(data) {
    let container = document.createElement("div");
    container.className = "profile";
    container.innerHTML = `<img draggable="false" src=${data.profile_picture} class="profile-picture"></img>
    <span id="person">
        <span class="name">${data.name}</span>
        <span class="role">${data.role}</span>
    </span>
    <span class="bio-html">${data.bio_html}</span>`;

    if (data.has_socials) {
        links = document.createElement("span");
        links.className = "links";

        for (let i=0; i<data.socials.length; i++) {
            links.innerHTML += `<a href=${data.socials[i][1]} target="_blank" style="color:${data.accent_color}">${data.socials[i][0]}</a>`;
        };

        container.append(links);
    };

    return container;
};

async function main(file) {
    const data = await getJson(file);
    data.sort(function (a, b) {
        // sort alphabetically so no one complains :3
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    for (let i=0; i<data.length; i++) {
        document.getElementById("people").appendChild(createProfile(data[i]));
    };
};

main("about.json");