const createForm = document.getElementById("createForm");
const readFormOut = document.getElementById("readDiv");
const updateForm = document.getElementById("updateForm");

createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = {
        name: this.name.value,
        genre: this.genre.value,
        price: this.price.value
    }
    fetch("http://localhost:8081/createGame", { //Make the create request, similar to postman
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { // Receive response and then 
        return response.json(); // Convert response body to a json string
    }).then(data => { //json data from previous, then perform this function
        console.log(data);
        renderGames();
         this.reset();
    }).catch(error => console.log(error));
});

function renderGames(){
    fetch("http://localhost:8081/getGame") //getAll
    .then(response => response.json())
    .then(arrayOfGames => {
        console.log("Games: ", arrayOfGames);
        readFormOut.innerHTML = ''; //reset div 
        arrayOfGames.forEach(function(game){
            console.log(game);

            const card = document.createElement("div");
            card.className = "card";
            readFormOut.appendChild(card);

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            card.appendChild(cardBody);

            const title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = game.name;
            cardBody.appendChild(title);

            const genre = document.createElement("p");
            genre.className = "card-body";
            genre.innerText = "Genre: " + game.genre;
            cardBody.appendChild(genre);

            const price = document.createElement("p");
            price.className = "card-body";
            price.innerText = "Price: " + game.price;
            cardBody.appendChild(price);

            
            const deleteButton = document.createElement("a");
            deleteButton.className = "card-link";
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteGame(game.id);
            })
            cardBody.appendChild(deleteButton);

            const updateButton = document.createElement("a");
            updateButton.className = "card-link";
            updateButton.innerText = "update";
            updateButton.addEventListener("click", function (event) {
                const inputPrice = document.createElement("INPUT");
                inputPrice.setAttribute("type", "text");
                cardBody.appendChild(inputPrice);

                const saveButton = document.createElement("button");
                saveButton.innterHTML = "save";
                cardBody.appendChild(saveButton);
                saveButton.addEventListener("click", function()
                {
                    updateGame(game.id, inputPrice);
                })
                price.innterHTML = inputPrice.value;
            }) 
            cardBody.appendChild(updateButton);

        })
    }).catch(error => console.error(error));
}

renderGames();

function updateGame(id, price) { //take id and price
    const data = {
            price: price.value
        }
    fetch("http://localhost:8081/updateGame?id=" +id, { //takes id as query parameter
        method: "PUT", //if it was patch would not have any errors
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
        
    }).then(response => { 
        return response.json(); 
    }).then(data => {
        console.log(data);
        renderGames();
    }).catch(error => console.log(error));
}

function deleteGame(id) {
    fetch("http://localhost:8081/remove/" + id, { //Make request with parameter id
        method: "DELETE" //method delete removes object
    }).then(response => {
        console.log(response);
        renderGames();
    }).catch(error => console.error(error));
}