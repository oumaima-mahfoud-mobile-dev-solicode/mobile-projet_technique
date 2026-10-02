<?php
class Categories {
    private $nom;
    private $description;
    private $file;

    public function __construct()
    {
        $this -> file ="/backend/data/categories.json";
    }
    public function getnom(){
        return $this -> nom;
    }
    public function getdescription(){
        return $this -> description;
    }
    public function setnom(){
        return $this -> nom;
    }
    public function setdescription(){
        return $this -> description;
    }
    public function getCategories(){
        $data = file_get_contents( $this-> file );
        return json_decode($data, true);
    }
    public function addCategories($nom , $description){
        $Category =$this->getCategories();
        $this -> setnom($nom);
        $this -> setdescription($description);

        $newCategories =[
            "id" => count($Category) + 1,
            "nom" => $this ->getnom(),
            "desription" => $this -> getdescription(),
        ] ;
        $Categorys[] = $newCategories ;
        file_put_contents($this -> file ,
         json_encode(
            $Category ,
          JSON_PRETTY_PRINT |JSON_UNESCAPED_UNICODE) 
            
        ) ; return $newCategories ;

    }
}
