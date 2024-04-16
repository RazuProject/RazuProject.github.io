let pageFrame = document.querySelector("iframe#page");
let shouldBe = "/";

function setPage(sub, file) {
    let filePath = "";
    if (sub == "") {
        filePath = "pages/" + file;
    } else {
        filePath = "pages/" + sub + "/" + file;
    };
    shouldBe = sub + "/" + file;
    pageFrame.src = filePath;
    window.location.hash = sub + "/" + file;
};

if (window.location.hash == "") {
    setPage("", "")
} else {
    const hash = window.location.hash.replace("#", "")
    let [folder, ...files] = hash.split("/")
    let file = files.join("/")

    setPage(folder, file)
};

window.onhashchange = function() {
    if (shouldBe != window.location.hash.replace("#", "")) {
        window.location.reload()
    };
};