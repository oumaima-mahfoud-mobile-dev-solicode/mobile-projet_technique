const btnNouvelle = document.getElementById("btn-nouvelle");
const sectionForm = document.getElementById("section_form");
const btnAnnuler = document.getElementById("btn-annuler");
const formCategorie = document.getElementById("form-categorie");
const tableCategorie = document.getElementById("table-categorie");

console.log("categories.js fonctionne !");



// 1. OUVRIR LE FORMULAIRE

btnNouvelle.addEventListener("click", function () {

    sectionForm.classList.remove("hidden");

});


// 2. FERMER LE FORMULAIRE

btnAnnuler.addEventListener("click", function () {

    sectionForm.classList.add("hidden");

    formCategorie.reset();

});

// 3. CHARGER LES CATÉGORIES

function chargerCategories() {

    fetch("/backend/categories.php")

        .then(response => response.json())

        .then(data => {

            console.log("DATA :", data);

            // Vider le tableau
            tableCategorie.innerHTML = "";

            // Ajouter chaque catégorie dans le tableau
            data.forEach(categorie => {

                const ligne = document.createElement("tr");

                ligne.innerHTML = `
                    <td class="p-4">
                        ${categorie.id}
                    </td>

                    <td class="p-4">
                        ${categorie.nom}
                    </td>

                    <td class="p-4">
                        ${categorie.description}
                    </td>
                `;

                tableCategorie.appendChild(ligne);

            });

        })

        .catch(error => {

            console.error("Erreur :", error);

        });

}

// 4. AJOUTER UNE CATÉGORIE


formCategorie.addEventListener("submit", function (event) {

    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const description = document.getElementById("description").value;


    const categorie = {

        nom: nom,
        description: description

    };


    console.log("Nouvelle catégorie :", categorie);


    fetch("/backend/categories.php", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(categorie)

    })

    .then(response => response.json())

    .then(data => {

        console.log("Catégorie ajoutée :", data);


        // Recharger le tableau
        chargerCategories();


        // Fermer le formulaire
        sectionForm.classList.add("hidden");


        // Vider le formulaire
        formCategorie.reset();

    })

    .catch(error => {

        console.error("Erreur :", error);

    });

});
// 5. CHARGER LES CATÉGORIES AU DÉBUT
// ===============================

chargerCategories();