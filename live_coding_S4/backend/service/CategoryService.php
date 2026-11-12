<?php
require_once __DIR__ . "/../dao/CategoryDAO.php";

class CategoryService {
    private CategoryDAO $dao;
    public function __construct(CategoryDAO $dao)
    {
        $this->dao = $dao;
    }
    public function getAll(){
        return $this->dao ->findAll();
    }
    public function create($data){
        $nom = trim($data["nom"] ?? "");
        $description = trim($data["description"] ?? "");
        if($nom === "" || $description === ""){
            throw new InvalidArgumentException("nom et description obligatoire");
        }
        foreach($this->dao->findAll() as $c){
            if(strtolower($c->nom) === strtolower($nom)){
                throw new InvalidArgumentException("nom existe deja");
            }
        } 
        return $this->dao->insert(new Category($nom , $description));
    }

}