<?php
require_once __DIR__ . "/../../classes/GestionCategory.php";
require_once __DIR__ . "/../../classes/Category.php";
$gestion = new GestionCategory();
if($_SERVER["REQUEST_METHOD"]=== "GET"){
    $Categories = $gestion->getALL();
    $data=[];
    foreach($Categories as $cat){
        $data[]=[
            "id"=>$cat->id,
            "nom"=>$cat->nom,
            "description"=>$cat->description
        ];
    }
    echo json_encode($data);
}
elseif($_SERVER["REQUEST_METHOD"]=== "POST"){
    $data = json_decode(file_get_contents("php://input"),true);
    $Category = new Category(
        $data["nom"],
        $data["description"]
    );
    $gestion->create($Category);
    echo json_encode(["message"=>"good"]);
}