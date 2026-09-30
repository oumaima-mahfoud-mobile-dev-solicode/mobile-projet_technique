<?php

header("Content-Type: application/json");

$file = "../data/categories.json";

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $data = file_get_contents($file);

    echo $data;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = file_get_contents($file);

    $categories = json_decode($data, true);

    $input = json_decode(file_get_contents("php://input"), true);

    $newCategory = [
        "id" => count($categories) + 1,
        "nom" => $input["nom"],
        "description" => $input["description"]
    ];

    $categories[] = $newCategory;

    file_put_contents(
        $file,
        json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );

    echo json_encode($newCategory);
}