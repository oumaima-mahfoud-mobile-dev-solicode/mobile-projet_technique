<?php
class Category{
    private string $nom;
    private string $description;
    private $file;
    public function __construct()
    {
        $this->file = __DIR__ . "/data/data.json";
    }
    public function getNom(){
        return $this ->nom;
    }
    public function getDescription(){
        return $this-> description;
    }
    public function setNom($nom){
        $this->nom=$nom;
    }
    public function setDescription($description){
        $this->description=$description;
    }
    public function get(){
        $data = file_get_contents($this->file);
        return json_decode($data,true);
    }
    public function add($nom , $description){
        $categories= $this->get();
        $newcat = [
            "id" => count($categories) +1,
            "nom" => $nom,
            "description" => $description
        ];
        $categories[]=$newcat;
        file_put_contents($this->file ,json_encode($categories));
        return $newcat;
    }
}