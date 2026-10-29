<?php
header("Content-Type: application/json");
require_once __DIR__ . "/../../classes/GestionCategory.php";
$gestion = new GestionCategory();
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $categories = $gestion->getAll();
    $result = [];

    foreach($categories as $cat){
        $result [] = [
            "id" => $cat->id,
            "nom" => $cat->nom,
            "description"=>$cat->description
        ];
    }
    echo json_encode($result);

}elseif($_SERVER["REQUEST_METHOD"]=== "POST"){
    $data =json_decode(file_get_content("php://input"),true);
    $category= new Category(
        $data["nom"],
        $data["description"]
    );
    $gestion->create($category);
    echo json_encode([
        "message" => "Catégorie ajoutée"
    ]);
}