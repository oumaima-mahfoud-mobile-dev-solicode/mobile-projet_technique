<?php
class Category{
    public int $id;
    public string $nom;
    public  string $description;

    public function __construct(string $nom , string $description , int $id )
    {
        $this->id=$id;
        $this->nom=$nom;
        $this->description=$description;
    }
}