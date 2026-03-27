import { db } from '../config/db';
import { TaskMetadataModel } from '../models/taskMetadata.model';

export interface Task {
  id?: number;
  user_id: number;
  title: string;
  status: boolean;
}

export class TaskRepository {
  static async getAll(user_id: number) {
    const [rows]: any = await db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);

    const taskIds = rows.map((t: any) => t.id);
    const metadata = await TaskMetadataModel.find({ task_id: { $in: taskIds } });

    const merged = rows.map((task: any) => {
      const meta = metadata.find((m) => m.task_id === task.id);
      return {
        ...task,
        created_at: meta?.created_at,
      };
    });

    return merged;
  }

  static async create(task: Task) {
    const [result]: any = await db.query(
      'INSERT INTO tasks (user_id, title, status) VALUES (?, ?, ?)',
      [task.user_id, task.title, task.status]
    );

    const taskId = result.insertId;
    await TaskMetadataModel.create({
        task_id: taskId,
        user_id: task.user_id,
        created_at: new Date(),
    });

    return { id: taskId, ...task };
  }

  static async update(id: number, task: Partial<Task>) {
    await db.query('UPDATE tasks SET ? WHERE id = ?', [task, id]);
    await TaskMetadataModel.updateOne(
      { task_id: id }
    );
  }

  static async delete(id: number) {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    await TaskMetadataModel.deleteOne({ task_id: id });
  }
}
