import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

function getUsers() {
  try {
    const jsonData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Erro ao ler o arquivo users.json:', error);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Erro ao salvar usuários em users.json:', error);
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = getUsers();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const users = getUsers();
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
