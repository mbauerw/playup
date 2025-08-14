const clientId = "fcc754186cae434197475f0ea29ac7c4"; // Replace with your client id
const clientSecret = "d4b6643e62214511b85925f86be11939";



const button = document.getElementById('dataButton')!;
button.addEventListener('click', function(){
    console.log("ok");
    const response = getData();
    console.log("Response is :" + response);
    addList();
});

async function getData() {

    const stuff = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret
            })
    })
    .then(response => response.json())  // Parses JSON body
    .then(data => console.log(data))    // `data` is a JavaScript object
    .catch(error => console.error("Error:", error));
    
    return stuff;
   
}

function addList(){
    const ul = document.getElementById("images");
    const li = document.createElement("list-image");
    const newImage = document.createElement("img");
    newImage.setAttribute("id", "radio-image");
    newImage.src = "src/img/radioheads.png";
    li.appendChild(newImage);
    ul?.appendChild(li);
}

// function processResponse(response){
    


// }

