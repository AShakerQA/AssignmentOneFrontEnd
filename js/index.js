const createForm = document.getElementById("createForm");

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
         this.reset();
    }).catch(error => console.log(error));
});

function deleteGame(id) {
    fetch("http://localhost:8081/remove/" + id, { //Make request with parameter id
        method: "DELETE" //method delete removes object
    }).then(response => {
        console.log(response);
    }).catch(error => console.error(error));
}