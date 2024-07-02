// titlebar nav stuff
document.querySelector(".title-bar > #discord").addEventListener("click", function() {
    window.open("https://discord.gg/mkbx4B4de2", "_blank").focus();
});
document.querySelector(".title-bar > #navigator").addEventListener("click", function() {
    window.location = "nav";
});

// ---

let queryString = window.location.search;
let urlParameters = new URLSearchParams(queryString);

let directory = {};
const content = document.getElementById("content");

async function setMarkdownPage(file) {
    content.innerHTML = await getMarkdown(directory.folder_path + file);
    window.history.pushState({}, "", "?dir=" + directory.dir_id + "&file=" + file);
    window.Prism.highlightAll();
};

async function getJson(url) {
    let result = {};
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        result = data;
    });
    return result;
};

async function getMarkdown(url) {
    let result = "";
    await fetch(url)
    .then(response => response.text())
    .then(data => {
        result = marked.parse(data);
    });
    return result;
};

function createItem(name, file) {
    let item = document.createElement("span");
    item.className = "i";
    item.textContent = name;
    item.addEventListener("click", async function() {
        setMarkdownPage(file);
    });

    return item;
};

function createFolder(name, contents) {
    let folder = document.createElement("div");
    folder.className = "f";

    let folderName = document.createElement("span");
    folderName.className = "f";
    folderName.textContent = name;
    folderName.addEventListener("click", function() {
        if (folder.className == "f") {
            folder.className = "f closed";
        } else {
            folder.className = "f";
        };
    });
    folder.appendChild(folderName);

    let folderContent = document.createElement("div");
    folderItems = createFolderItems(contents);

    for (let i=0;i<folderItems.length;i++) {
        folderContent.appendChild(folderItems[i]);
    };

    folder.appendChild(folderContent);

    // console.warn("zoid was here, i eated your code"); // you sneaky bastard

    return folder;
};

function createFolderItems(tree) {
    let items = [];
    for (let i=0;i<tree.length;i++) {
        if (tree[i] == "---") {
            let divider = document.createElement("span");
            divider.className = "d";
            items.push(divider);
        } else {
            switch (tree[i][0]) {
                case "i":
                    let item = createItem(tree[i][2], tree[i][1]);
                    items.push(item);
                    break;
                case "f":
                    let folder = createFolder(tree[i][1], tree[i][2]);
                    items.push(folder);
                    break;
            };
        };
    };
    return items;
};

async function main() {
    const directories = await getJson("directories.json");

    if (!urlParameters.has("dir")) {
        window.location = "nav";
    };

    for (let i=0;i<directories.length+1;i++) {
        if (i == directories.length) {
            console.warn(`Unmatched "${urlParameters.get("dir")}"`)
            window.location = "nav";
            break;
        } else if (urlParameters.get("dir") == directories[i].dir_id) {
            console.log("Matched with", directories[i]);
            directory = directories[i];
            break;
        }
    };

    const directoryTree = await getJson(directory.folder_path + "tree.json")
    console.log("Got tree", directoryTree)
    
    if (urlParameters.has("file")) {
        setMarkdownPage(urlParameters.get("file"))
    } else {
        setMarkdownPage(directoryTree.default)
    };

    window.addEventListener("popstate", async function() {
        let queryString = window.location.search;
        let urlParameters = new URLSearchParams(queryString);
        if (urlParameters.has("file")) {
            setMarkdownPage(urlParameters.get("file"))
        };
    });

    treeItems = createFolderItems(directoryTree.tree);
    for (let i=0;i<treeItems.length;i++) {
        tree.appendChild(treeItems[i]);
    };
};

main();