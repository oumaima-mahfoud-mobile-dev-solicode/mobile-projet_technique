const API_URL = "/backend/api/controllers/CategoryController.php";

const btnAjouter = document.getElementById("btn-ajouter");
const divform = document.getElementById("div_form");
const formcat = document.getElementById("form-categorie");
const nom = document.getElementById("nom");
const description = document.getElementById("description");
const tbody = document.getElementById("tbody");



// Afficher le formulaire
btnAjouter.addEventListener("click", function () {
    divform.classList.remove("hidden");
});

// Charger les catégories
function charger() {
    fetch(API_URL)
        .then(response => response.json())
        .then(categories => {
            tbody.innerHTML = "";

            categories.forEach(cate => {
                tbody.innerHTML += `
                    <tr>
                        <td>${cate.id}</td>
                        <td>${cate.nom}</td>
                        <td>${cate.description}</td>
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

    const categories = {
        nom: nom.value,
        description: description.value
    };

    fetch(API_URL, {
        method: "POST",
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

            charger();
            formcat.reset();
            divform.classList.add("hidden");
        })
        .catch(error => {
            console.error(error);
            
        });
});

// Charger au démarrage
charger();