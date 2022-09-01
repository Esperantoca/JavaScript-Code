const text = document.getElementById("text");
const close = document.getElementById("close");
const container = document.getElementById("container");

text.addEventListener("click", () => {
    container.classList.add("active");
});
close.addEventListener("click", () => {
    container.classList.remove("active");
});