<?php

header("Content-Type: application/json");
require_once __DIR__ . "/Category.php";
$category = new Category();


// GET
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode(
        $category->getCategories()
    );
}
// POST
elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(
        file_get_contents("php://input"),
        true
    );
    $newCategory = $category->addCategory(
        $data["nom"],
        $data["description"]
    );
    echo json_encode($newCategory);
}

?>