import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then(conn => {
    console.log('MySQL conectado com sucesso!');
    conn.release();
  })
  .catch(err => {
    console.error('Erro ao conectar com o MySQL:', err);
  });
