import { Router } from 'express';
import { TaskRepository } from '../repository/task.repository';
import { authenticate, AuthRequest } from '../middlewares/auth.middlewares';

export const taskRoutes = Router();
taskRoutes.use(authenticate);

taskRoutes.get('/', async (req: AuthRequest, res) => {
  const tasks = await TaskRepository.getAll(req.user.id);
  res.json(tasks);
});

taskRoutes.post('/', async (req: AuthRequest, res) => {
  const { title } = req.body;
  const newTask = await TaskRepository.create({
    user_id: req.user.id,
    title,
    status: false,
  });
  res.json({ message: 'Registro criado com sucesso!', newTask });
});

taskRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  await TaskRepository.update(Number(id), req.body);
  res.json({ message: 'Registro atualizado com sucesso!' });
});

taskRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await TaskRepository.delete(Number(id));
  res.json({ message: 'Registro excluído com sucesso!' });
});
