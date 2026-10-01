const btnAjouter = document.getElementById("btn-ajouter");
const divform=document.getElementById("div_form");
const formCategorie =document.getElementById("form-categorie");
const tableCategorie =document.getElementById("table-categorie");
// const btnannuler = document.getElementById("btn-annuler")
btnAjouter.addEventListener("click", function () {
    divform.classList.remove("hidden");
});
function chargerCategories() {
    fetch("/backend/api.php")
        .then(response => response.json())
        .then(categories => {
            tableCategorie.innerHTML = "";
            categories.forEach(category => {
                const ligne =
                    document.createElement("tr");
                ligne.innerHTML = `
                    <td class="p-4">
                        ${category.id}
                    </td>
                    <td class="p-4">
                        ${category.nom}
                    </td>
                    <td class="p-4">
                        ${category.description}
                    </td>
                `;

                tableCategorie.appendChild(ligne);
            });
        });
}
formCategorie.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        const nom =
            document.getElementById("nom").value;
        const description =
            document.getElementById("description").value;
        const category = {
            nom: nom,
            description: description

        };
        fetch("/backend/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ajouté :", data);
            chargerCategories();
            divform.classList.add("hidden");
            formCategorie.reset();
        });
    }
);


// Charger au démarrage

chargerCategories();