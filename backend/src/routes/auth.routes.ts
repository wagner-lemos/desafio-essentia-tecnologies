import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';

export const authRoutes = Router();

authRoutes.post('/register', async (req, res) => {
  const { name,email, password } = req.body;
  try {
    await UserRepository.create({ name, email, password });
    res.json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: (error as Error).message });
  }
});

authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserRepository.findByEmail(email);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
});
