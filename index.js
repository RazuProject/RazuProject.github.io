let pageFrame = document.querySelector("iframe#page");
let shouldBe = "/";

let mobileBurger = document.querySelector(".nav > .mobile-burger");
let right = document.querySelector(".nav > .right");
mobileBurger.addEventListener("click", function() {
    if (right.className == "right not-toggled") {
        right.className = "right";
    } else {
        right.className = "right not-toggled";
    };
});

function setPage(sub, file) {
    right.className = "right not-toggled";
    let filePath = "";
    if (file == "../re/" || file == "../re") {
        console.warn("lmao")
    };
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