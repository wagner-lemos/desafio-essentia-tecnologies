import { db } from '../config/db';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  static async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword]
    );
    return result;
  }

  static async findByEmail(email: string) {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
}
