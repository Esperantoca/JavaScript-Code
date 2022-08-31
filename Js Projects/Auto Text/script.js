const text = "Hello guys, come and look the text.";

let index = 0;

function writeSomething() {
    document.body.innerText = text.slice(0, index);
    index++;

    if (index > text.length - 1) {
        index = 0;
    }
}

setInterval (writeSomething, 100);