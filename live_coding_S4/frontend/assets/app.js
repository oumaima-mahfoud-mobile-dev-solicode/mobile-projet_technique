const API_URL = "/backend/api/controller/CategoryController.php";
const btnAjouter = document.getElementById("btn-ajouter");
<<<<<<< HEAD
const btnAnnuler = document.getElementById("btn-annuler");
=======
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
const divform = document.getElementById("div_form");
const formcat = document.getElementById("form-categorie");
const nom = document.getElementById("nom");
const description = document.getElementById("description");
const tbody = document.getElementById("tbody");


//toast
function showToast(message , Type="success"){
    const toast = document.createElement("div");
<<<<<<< HEAD
<<<<<<<< HEAD:live_coding_S4/frontend/assets/app.js
    toast.className = "text-white p-3 rounded mb-2 shadow";
    toast.classList.add(type === "success" ? "bg-green-600" : "bg-red-600");
    toast.textContent = message;
    document.getElementById("toast-container").appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Afficher / cacher le formulaire
btnAjouter.addEventListener("click", () => divform.classList.remove("hidden"));
btnAnnuler.addEventListener("click", () => {
    formcat.reset();
    divform.classList.add("hidden");
========
=======
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
    toast.className="text-whitte p-3 ronded mb-2 shodow";
    toast.classList.add(Type=== "success" ? "bg-green-600": "bg-red-600");
    toast.textContent=message;
    document.getElementById("toast-container").appendChild(toast);
    setTimeout(()=>{
        toast.remove();
    },3000);
}



// Afficher le formulaire
btnAjouter.addEventListener("click", function () {
    divform.classList.remove("hidden");
<<<<<<< HEAD
>>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f:prototype/frontend/assets/app.js
=======
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
});

// Charger les catégories
function charger() {
    fetch(API_URL)
        .then(response => response.json())
        .then(categories => {
            tbody.innerHTML = "";
<<<<<<< HEAD
            categories.forEach(cate => {
                tbody.innerHTML += `
                    <tr>
                        <td class="p-4">${cate.id}</td>
                        <td class="p-4">${cate.nom}</td>
                        <td class="p-4">${cate.description}</td>
=======

            categories.forEach(cate => {
                tbody.innerHTML += `
                    <tr>
                        <td>${cate.id}</td>
                        <td>${cate.nom}</td>
                        <td>${cate.description}</td>
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error(error);
            showToast("Erreur lors du chargement", "error");
        });
}

// Ajouter une catégorie
formcat.addEventListener("submit", function (event) {
    event.preventDefault();

<<<<<<< HEAD
    const categorie = {
=======
    const categories = {
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
        nom: nom.value,
        description: description.value
    };

    fetch(API_URL, {
        method: "POST",
<<<<<<< HEAD
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categorie)
    })
        .then(response =>
            // 1) n9raw l-JSON dyal PHP (message dyal succès ola dyal exception)
            response.json().then(data => {
                // 2) ila status 400/500 -> throw b message dyal PHP
                if (!response.ok) {
                    throw new Error(data.message);
                }
                return data;
            })
        )
        .then(data => {
            showToast(data.message);
=======
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            return response.json();
        })
        .then(data => {
            showToast(data.message || "Catégorie ajoutée avec succès");

>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
            charger();
            formcat.reset();
            divform.classList.add("hidden");
        })
        .catch(error => {
<<<<<<< HEAD
            // hna kayjib message dyal PHP: "nom existe deja"
            console.error(error);
<<<<<<<< HEAD:live_coding_S4/frontend/assets/app.js
            showToast(error.message, "error");
========
            showToast("error de connection", error);
            
            
>>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f:prototype/frontend/assets/app.js
=======
            console.error(error);
            showToast("error de connection", error);
            
            
>>>>>>> b42051a12e274d0d7bc66cf6241fcacb1be3f22f
        });
});

// Charger au démarrage
charger();