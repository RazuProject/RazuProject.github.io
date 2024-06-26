// {
//     "default": "info",
//     "tree": [
//         ["i","info","Information"],
//         "---",
//         ["f","OBB",[
//             ["i","obb_about","About this File"],
//             "---File Contents",
//             ["f","assets",[
//                 ["i","obb_asset_bundles","AssetBundles/"],
//                 ["i","obb_bin_data","bin/Data/"],
//                 ["f","cozmo_resources/",[]],
//                 ["i","obb_localized_strings","LocalizedStrings/"],
//                 ["i","obb_scratch","Scratch/"],
//                 ["i","obb_videos","Videos/"],
//                 ["i","obb_das_config","DASConfig.json"],
//                 ["i","obb_resources","resources.txt"]
//             ]]
//         ]],
//         ["f","APK",[]]
//     ]
// }

async function getJson(url) {
    let result = {};
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        result = data;
    });
    return result;
};

function createItem(name, file) {
    let item = document.createElement("span");
    item.className = "i";
    item.textContent = name;

    return item;
};

function createFolder(name, contents) {
    let folder = document.createElement("div");
    folder.className = "f";

    let folderName = document.createElement("span");
    folderName.className = "f";
    folderName.textContent = name;
    folder.appendChild(folderName);

    let folderContent = document.createElement("div");
    folderItems = createFolderItems(contents);

    for (let i=0;i<folderItems.length;i++) {
        folderContent.appendChild(folderItems[i]);
    };

    folder.appendChild(folderContent);

    console.warn("zoid was here, i eated your code"); // you sneaky bastard

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

let tree = document.getElementById("tree");
let items = [
    ["i","info","Information"],
    "---",
    ["f","OBB",[
        ["i","obb_about","About this File"],
        "---File Contents",
        ["f","assets",[
            ["i","obb_asset_bundles","AssetBundles/"],
            ["i","obb_bin_data","bin/Data/"],
            ["f","cozmo_resources/",[]],
            ["i","obb_localized_strings","LocalizedStrings/"],
            ["i","obb_scratch","Scratch/"],
            ["i","obb_videos","Videos/"],
            ["i","obb_das_config","DASConfig.json"],
            ["i","obb_resources","resources.txt"]
        ]]
    ]],
    ["f","APK",[]]
];
treeItems = createFolderItems(items);
for (let i=0;i<treeItems.length;i++) {
    tree.appendChild(treeItems[i]);
};

async function main() {const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    
    if (urlParameters.has("dir")) {
        console.log("you know where you are");
    } else {
        window.location = "nav";
    };

    const directories = getJson("directories.json");
    console.log("fortnite");
};

main();