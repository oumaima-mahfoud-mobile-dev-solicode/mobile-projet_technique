<?php

class Category
{
    private $nom;
    private $description;
    private $file;

    public function __construct()
    {
        $this->file = "../backend/data/categories.json";
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getCategories()
    {
        $data = file_get_contents($this->file);

        return json_decode($data, true);
    }

    public function addCategory($nom, $description)
    {
        $categories = $this->getCategories();

        $this->setNom($nom);
        $this->setDescription($description);

        $newCategory = [
            "id" => count($categories) + 1,
            "nom" => $this->getNom(),
            "description" => $this->getDescription()
        ];

        $categories[] = $newCategory;

        file_put_contents(
            $this->file,
            json_encode(
                $categories,
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
            )
        );

        return $newCategory;
    }
}