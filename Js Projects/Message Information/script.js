const btn = document.getElementById("btn");
const container = document.getElementById("container");

btn.addEventListener("click", () => {
    createNotification();
});

function createNotification() {
    const notif = document.createElement("div");

    notif.classList.add("text");

    notif.innerText = " Added To Basket !! ";

    container.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 2000);
}