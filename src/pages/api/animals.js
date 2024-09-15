import fs from 'fs';
import path from 'path';

const animalsFilePath = path.join(process.cwd(), 'src', 'data', 'animals.json');

function getAnimals() {
  const jsonData = fs.readFileSync(animalsFilePath, 'utf8');
  return JSON.parse(jsonData);
}

function saveAnimals(animals) {
  fs.writeFileSync(animalsFilePath, JSON.stringify(animals, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const animals = getAnimals();
    if (req.query.id) {
      const animal = animals.find(a => a.id === parseInt(req.query.id));
      if (animal) {
        res.status(200).json(animal);
      } else {
        res.status(404).json({ message: 'Animal não encontrado' });
      }
    } else {
      res.status(200).json(animals);
    }
  } else if (req.method === 'POST') {
    const animals = getAnimals();
    const newAnimal = { id: animals.length + 1, ...req.body };
    animals.push(newAnimal);
    saveAnimals(animals);
    res.status(201).json(newAnimal);
  } else if (req.method === 'PUT') {
    const animals = getAnimals();
    const updatedAnimal = req.body;
    const index = animals.findIndex(a => a.id === updatedAnimal.id);
    if (index !== -1) {
      animals[index] = updatedAnimal;
      saveAnimals(animals);
      res.status(200).json(updatedAnimal);
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } else if (req.method === 'DELETE') {
    const animals = getAnimals();
    const { id } = req.query;
    const filteredAnimals = animals.filter(a => a.id !== parseInt(id));
    if (animals.length !== filteredAnimals.length) {
      saveAnimals(filteredAnimals);
      res.status(200).json({ message: 'Animal removido com sucesso' });
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
