<?php
header("Content-type: application/json");
require_once  __DIR__ . "/class.php"  ;
$cat = new Category();
if($_SERVER["REQUEST_METHOD"] === "GET"){
    echo json_encode($cat->get(),JSON_PRETTY_PRINT,  JSON_UNESCAPED_UNICODE)  ;
    
}
if($_SERVER["REQUEST_METHOD"] === "POST"){
   $data = json_decode(file_get_contents("php://input"),true);
   $categories = $cat->add(
    $data["nom"],
    $data["description"]

   );
   echo json_encode($categories);


}