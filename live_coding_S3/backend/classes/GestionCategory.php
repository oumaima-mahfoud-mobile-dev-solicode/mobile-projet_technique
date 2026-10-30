<?php
class GestionCategory{
    private static $file = __DIR__ . "/../data/data.json";
    public function getAll(){
        $data = json_decode(file_get_contents(self::$file),true);
        $Categories=[];
        foreach($data as $item){
            $Categories[]=new Category(
                
                $item["nom"],
                $item["description"],
                $item["id"]
            );
        } return $Categories;
    }
    public function create(Category $Category){
        $Categories=$this->getAll();
        $Category->id= count($Categories) +1;
        $Categories[]=$Category;
        $data=[];
        foreach($Categories as $cat){
            $data[]=[
                "id"=>$cat->id,
                "nom"=>$cat->nom,
                "description"=>$cat->description
            ];
        }
        file_put_contents(self::$file , json_encode($data));
        return $Category;

    }
    
}