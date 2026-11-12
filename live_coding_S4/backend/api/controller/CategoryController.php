<?php
require_once __DIR__ . "/../../service/CategoryService.php";

// COUCHE 1 : PRÉSENTATION (API) -> reçoit la requête, appelle le service, répond en JSON
header("Content-Type: application/json; charset=utf-8");

$service = new CategoryService(new CategoryDAO());

try {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        echo json_encode($service->getAll());
    }
    elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true) ?? [];
        $service->create($data);
        http_response_code(201);
        echo json_encode(["message" => "Catégorie ajoutée avec succès"]);
    }
    else {
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(["message" => $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur serveur"]);
}