const divSection = document.getElementById("div_section");
const  formCategorie = document.getElementById("form_categorie");
const btnajouter = document.getElementById("btn_ajouter");
const tableCategories = document.getElementById("table_categories");
const btnannuler = document.getElementById("btn_annuler");

// btnajouter.addEventListener("click" ,function() {
//     formCategorie.hidden=false;
//     btnajouter.hidden=true
// })
// btnannuler.addEventListaener("click" , function(){
//     formCategorie.hidden=true;
//     btnannuler.hidden=false
// })

function chargerCategories(){
    fetch("/backend/api.php")
    .then(Response=>Response.json())
    .then(category=>{
        tableCategories.innerHTML="";
        category.forEach(category=>{
            const ligne= document.createElement("tr");
            ligne.innerHTML="" ;
        })
        category.forEach(category =>{
            const ligne=document.createElement("tr");
            ligne.innerHTML = `
            <td>${category.id}</td>
            <td>${category.nom}</td>
            <td>${category.description}</td>
            ` ;
            tableCategories.appendChild(ligne);
        })
    }) .catch(error => console.log("error " .error));
}
formCategorie.addEventListener("submit" , function(event){
    event.preventDefault();
    const nom = document.createElement("nom").value ;
    const description = document.createElement("description").value;
    const category = {nom:nom , description:description};
    fetch("/backend/api.php" ,
    {method:"POST"},
    Headers = { "content-type" : "application.json"} ,
    body = JSON.stringify(category)
    )
} .then(Response=>Response.json())
    .then(data=> {
        chargerCategories();
        divSection.classList.add("hidden");
        formCategorie.reset();
    })    
    .catch(error=>console.log("error" . error)) 
    
) ;
chargerCategories();