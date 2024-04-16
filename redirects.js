const elements = [
    ["logo", "", ""],
    ["projects", "projects", ""],
    ["about", "", "about"],
    ["downloads", "downloads", ""],
    ["documentation", "documentation", ""]
];

for (let i=0; i<elements.length; i++) {
    document.getElementById(elements[i][0]).addEventListener("click", function() {
        setPage(elements[i][1], elements[i][2]);
    });
};