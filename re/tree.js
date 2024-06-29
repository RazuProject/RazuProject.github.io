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

function createItem(name, document) {
    let item = document.createElement("span");
    item.className = "i";
    item.textContent = name;
};

function createFolder(name, contents) {
    let folder = document.createElement("div");
    folder.className = "f";

    let folderName = document.createElement("span");
    folderName.className = "f";
    folderName.textContent = name;
    folder.appendChild(folderName);

    let folderContent = document.createElement("div");
    folder.appendChild(folderContent);

    return folder;
};

function createFolderItems(tree) {
    let items = [];
    for (let i=0;i++;i<tree.length) {
        if (tree[i] = "---") {
            items.append(document.createElement("span").className = "d");
        };
        switch (tree[i][0]) {
            case "i":
                items.append(createItem(tree[i][2], tree[i][1]));
            case "f":
                items.append(createFolder(tree[i][1], tree[i][2]));
        };
    };
    return items;
};