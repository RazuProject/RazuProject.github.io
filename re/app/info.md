# This is truly
the MOST

hier was reingeben und ***editieren!!***

<center>MARKDOWNED</center>
<h2 align="center">FILE</h2>

<sub>of all time</sub>
<sub><sub>of all time</sub></sub>
<sub><sub><sub>of all time</sub></sub></sub>

`smol`

inline `code` block

<font color="red">This text is red!</font>

> here is to quote whenever zoid says some stupid nonsense

text between blockquotes <!-- comment -->

> nested
>> block
>>> quote
>>> ```
>>> limit
>>> ```
>>> <svg width="120" height="120">
>>>   <g transform="translate(0 30)">
>>>     <rect fill="red" width="120" height="60" rx="60" ry="30" >
>>>           <animateTransform attributeName="transform"
>>>                           type="rotate"
>>>                           from="0 60 30"
>>>                           to="360 60 30"
>>>                           dur="1"
>>>                           repeatCount="indefinite"/>
>>>     </rect>
>>>     <rect fill="blue" width="120" height="60" rx="60" ry="30" >
>>>       <animateTransform attributeName="transform"
>>>                         type="rotate"
>>>                         from="90 60 30"
>>>                         to="450 60 30"
>>>                         dur="1"
>>>                         repeatCount="indefinite"/>
>>>     </rect>
>>>   </g>
>>> </svg>

[hopefully invisible text?]: #

---

Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla provident optio, earum, iure mollitia amet aperiam voluptates, dolores ipsa ullam quod necessitatibus architecto assumenda labore blanditiis perspiciatis minus ratione!

---

syntax highlighting fully&trade; functional
```python
import random

for i in range(0,20):
    print(random.randrange(0,20))
```
- [x] markdown
- [ ] markdown css
- [ ] publish the website

```css
html {
    background-color: red;
    margin: 0px; 
}
```

```js
// some
// cool
// comments
console.log("ballz");
```

| Month    | Savings |
|:--------:|:-------:|
| January  | $250    |
| February | $80     |
| March    | $420    |

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

heres the entire index.js for funsies
```js
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
```
