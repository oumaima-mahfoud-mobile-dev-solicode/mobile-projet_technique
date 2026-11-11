<?php
require_once __DIR__ . "/../classes/Category.php";

// COUCHE 3 : DATA (DAO) -> lit/écrit dans data.json, RIEN d'autre
class CategoryDAO {
    private string $file = __DIR__ . "/../data/data.json";

    public function findAll(): array {
        if (!file_exists($this->file)) return [];
        $rows = json_decode(file_get_contents($this->file), true) ?? [];

        $categories = [];
        foreach ($rows as $r) {
            $categories[] = new Category($r["nom"], $r["description"], $r["id"]);
        }
        return $categories;
    }

    public function insert(Category $category): Category {
        $categories = $this->findAll();
        $category->id = $this->nextId($categories);
        $categories[] = $category;
        file_put_contents(
            $this->file,
            json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
        return $category;
    }


    private function nextId(array $categories): int {
        $max = 0;
        foreach ($categories as $c) {
            if ($c->id > $max) $max = $c->id;
        }
        return $max + 1;
    }
}