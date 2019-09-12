// When committing changes to git, make sure node_modules aren't including
// User can re-create it using "npm install"
// Which uses package.json and package-lock.jason to recreate
console.log("client side javascript file is loaded!");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    message1.textContent = "";
    message2.textContent = "";

    // fetch api for client side javascript
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error;
            }

            message1.textContent = data.location;
            message2.textContent = data.forecast;

        })
    });
})
