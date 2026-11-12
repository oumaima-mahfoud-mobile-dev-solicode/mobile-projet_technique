<?php
require_once __DIR__ . "/../classes/Category.php";
class CategoryDAO{
    private $file= __DIR__ . "/../data/data.json";
    public function findAll(){
        $row = json_decode(file_get_contents($this->file),true) ;
        $categories=[];
        foreach($row as $r){
            $categories[]= new Category(
                $r["nom"],
                $r["description"],
                $r["id"]

            );
        } return $categories;
    }
    public function insert( Category $category): Category{
        $categories=$this->findAll();
        $category->id=count($categories)+1;
        $categories[]=$category;
        file_put_contents($this->file,json_encode($categories));
        return $category;
    }
    // private function nextId($categories){
    //     $max=0;
    //     foreach($categrories as $c){
    //         if($c->id->$max) $max = $c->id;
    //     }
    //     return $max +1;
    // }
}