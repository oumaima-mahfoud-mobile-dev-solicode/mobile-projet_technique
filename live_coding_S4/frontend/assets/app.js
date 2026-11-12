const API_URL = "/backend/api/controller/CategoryController.php";
const btnAjouter = document.getElementById("btn-ajouter");
const btnAnnuler = document.getElementById("btn-annuler");
const divform = document.getElementById("div_form");
const formcat = document.getElementById("form-categorie");
const nom = document.getElementById("nom");
const description = document.getElementById("description");
const tbody = document.getElementById("tbody");

// Toast
function showToast(message, type = "success") {
    const toast = document.createElement("div");
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
                        <td class="p-4">${cate.id}</td>
                        <td class="p-4">${cate.nom}</td>
                        <td class="p-4">${cate.description}</td>
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

    const categorie = {
        nom: nom.value,
        description: description.value
    };

    fetch(API_URL, {
        method: "POST",
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
            charger();
            formcat.reset();
            divform.classList.add("hidden");
        })
        .catch(error => {
            // hna kayjib message dyal PHP: "nom existe deja"
            console.error(error);
            showToast(error.message, "error");
        });
});

// Charger au démarrage
charger();