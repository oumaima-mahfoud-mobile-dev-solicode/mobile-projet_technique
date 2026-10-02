<?php
header("content-type : application/json");
require_once __DIR__ . "/Category.php" ;
$Category = $newCategories();
if($_SERVER["REQUEST_METHOD"] === "GET"){
    echo json_encode($Category ->getCategory());
} elseif($_SERVER["REQUEST_METHOD"] === "POST"){
    $data= json_decode(file_get_contents("php:/input"), true);
    $newCategories = $Category->addCategories(
        $data["nom"] ,$data["description"]
    );
    echo json_encode($newCategories);
}
