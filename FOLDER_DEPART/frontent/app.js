const btnAjouter = document.getElementById("btn-ajouter")
const divform = document.getElementById("div_form")
const formcat = document.getElementById("form-categorie")
const nom = document.getElementById("nom")
const description = document.getElementById("description")
const tbody = document.getElementById("tbody")

btnAjouter.addEventListener('click',function(){
    divform.classList.remove("hidden")
})
function charger(){
    fetch("/backend/api.php")
    .then(respense=>respense.json())
    .then(categories=>{
        tbody.innerHTML=""
        categories.forEach(cate => {
            tbody.innerHTML +=`
            <tr>
            <td>${cate.id}</td>
            <td>${cate.nom}</td>
            <td>${cate.description}</td></tr>`
        });
    })
    .catch(error =>console.error(error))
}
formcat.addEventListener("submit",function(event){
    event.preventDefault()
    const categories={
        nom:nom.value,
        description:description.value
    }
    fetch("/backend/api.php" , {
        method : "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(categories)
    })
    .then(respense=>respense.json)
    .then(data=>{
        charger()
        divform.classList.add("hidden")

    })
    .catch(error =>console.error(error))
})



charger()