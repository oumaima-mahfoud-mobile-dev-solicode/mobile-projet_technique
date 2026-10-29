
<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../classes/Category.php";
require_once __DIR__ . "/../../classes/GestionCategory.php";

$gestion = new GestionCategory();

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $categories = $gestion->getAll();
    $result = [];

    foreach ($categories as $cat) {
        $result[] = [
    "id" => $cat->id,
    "nom" => $cat->nom,
    "description" => $cat->description
];
    }

    echo json_encode($result);

} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["nom"], $data["description"])) {
        http_response_code(400);
        echo json_encode([
            "message" => "Nom et description sont obligatoires"
        ]);
        exit;
    }

    $category = new Category(
        $data["nom"],
        $data["description"]
    );

    $gestion->create($category);

    echo json_encode([
        "message" => "Catégorie ajoutée avec succès"
    ]);

} else {

    http_response_code(405);

    echo json_encode([
        "message" => "Méthode non autorisée"
    ]);
}
