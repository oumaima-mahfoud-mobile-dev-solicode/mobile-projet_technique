<?php
require_once __DIR__ . "/../dao/CategoryDAO.php";


class CategoryService {
    private CategoryDAO $dao;

    public function __construct(CategoryDAO $dao) {
        $this->dao = $dao;
    }

    public function getAll(): array {
        return $this->dao->findAll();
    }

    public function create(array $data): Category {
        $nom = trim($data["nom"] ?? "");
        $description = trim($data["description"] ?? "");

        
        if ($nom === "" || $description === "") {
            throw new InvalidArgumentException("Nom et description obligatoires");
        }
        foreach ($this->dao->findAll() as $c) {
            if (strtolower($c->nom) === strtolower($nom)) {
                throw new InvalidArgumentException("Cette catégorie existe déjà");
            }
        }

        return $this->dao->insert(new Category($nom, $description));
    }
}
