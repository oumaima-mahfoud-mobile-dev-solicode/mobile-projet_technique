<?php
require_once __DIR__ . "/Category.php";
class GestionCategory{
    private static $file= __DIR__ . "/../data/data.json" ;
    public function getALL(){
        $data = json_decode(file_get_contents(self::$file),true);
        $categories = [];

        foreach($data as $item){
            $categories[]= new Category(
                $item["nom"],
                $item["description"],
                $item["id"]
            );
        }
        return $categories;
    }   
    public function create(Category $category){
        $categories = $this->getAll();
        $category->id = count($categories) + 1;
        $categories[] = $category;
        $data=[];
        foreach($categories as $cat){
            $data[] = [
                "id" => $cat->id,
                "nom" => $cat->nom,
                "description" => $cat->description
            ];
        }
        file_put_contents(self::$file,
        json_encode($data , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $category;
    }
}