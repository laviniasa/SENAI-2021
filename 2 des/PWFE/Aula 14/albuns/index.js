var username = document.querySelector("#username");
var albuns= document.querySelector(".albuns");
username.innerHTML = localStorage.getItem("name");

const url = "https://jsonplaceholder.typicode.com/albums?userId=" + localStorage.getItem("id");

fetch(url)
.then(resp => {
    return resp.json();
})
.then(data => {
    data.forEach(album => {
        generateHtml(album.id,album.title);
    });
})
.catch(err => {
    console.log(err);
});
function generateHtml(id, title) {
    let album = document.querySelector(".album").cloneNode(true);
    album.classList.remove("model");
    album.querySelector("h4").innerHTML = title;
    album.addEventListener("click", () => {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".modal").classList.remove("model");
        getPhotos(id);
    });
    albuns.appendChild(album);
}
function getPhotos(id) {
    let urlPhoto = "https://jsonplaceholder.typicode.com/photos?albumId=" + id;

    fetch(urlPhoto)
    .then(resp =>{return resp.json() })
    .then (data =>{
       let lista = document.querySelector(".lista");
       lista.innerHTML = "";
       data.forEach(foto =>{
           let img = document.createElement("img");
           img.style.width = "100%";
           img.src = foto.url;
           lista.appendChild(img);
        })
    })
    .catch(err => {console.log (err) })
}
function closeModal() {
    document.querySelector("body").style.overflow = "visible";
    document.querySelector(".modal").classList.add("model");
}
