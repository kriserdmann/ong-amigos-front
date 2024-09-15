import fs from 'fs';
import path from 'path';

const volunteersFilePath = path.join(process.cwd(), 'src', 'data', 'volunteers.json');

function getVolunteers() {
  const jsonData = fs.readFileSync(volunteersFilePath, 'utf8');
  return JSON.parse(jsonData);
}

function saveVolunteers(volunteers) {
  fs.writeFileSync(volunteersFilePath, JSON.stringify(volunteers, null, 2));
}

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  console.log('API Request:', method, id, req.body);

  switch (method) {
    case 'GET':
      if (id) {
        const volunteers = getVolunteers();
        const volunteer = volunteers.find(v => v.id === parseInt(id));
        if (volunteer) {
          res.status(200).json(volunteer);
        } else {
          res.status(404).json({ message: 'Voluntário não encontrado' });
        }
      } else {
        const volunteers = getVolunteers();
        res.status(200).json(volunteers);
      }
      break;
    case 'PUT':
      if (id) {
        const volunteers = getVolunteers();
        const index = volunteers.findIndex(v => v.id === parseInt(id));
        if (index !== -1) {
          const updatedVolunteer = { ...volunteers[index], ...req.body };
          
          // Se estamos atualizando as tarefas
          if (req.body.tasks) {
            updatedVolunteer.tasks = req.body.tasks;
          }

          // Se estamos atualizando o histórico de atividades
          if (req.body.activityLog) {
            updatedVolunteer.activityLog = req.body.activityLog;
          }

          volunteers[index] = updatedVolunteer;
          saveVolunteers(volunteers);
          res.status(200).json(updatedVolunteer);
        } else {
          res.status(404).json({ message: 'Voluntário não encontrado' });
        }
      } else {
        res.status(400).json({ message: 'ID do voluntário não fornecido' });
      }
      break;
    case 'POST':
      const newVolunteer = req.body;
      const volunteers = getVolunteers();
      newVolunteer.id = Date.now(); // Gera um ID único
      newVolunteer.status = 'Pendente'; // Define o status inicial
      volunteers.push(newVolunteer);
      saveVolunteers(volunteers);
      res.status(201).json(newVolunteer);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
