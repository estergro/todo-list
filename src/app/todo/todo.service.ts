import { Injectable } from '@angular/core';
import { ToDo } from './to-do';

@Injectable()
export class TodoService {
  // Placeholder for todo's
  todos: ToDo[] = [];
  /** Used to generate unique ID's */
  nextId = 0;
  constructor() { }
  // Simulate POST /todos
  addTodo(todo: ToDo): ToDo {
    todo.id = ++this.nextId;
    this.todos.unshift(todo);
    return todo;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  // Simulate POST /todos/delete
  deleteAllTodo(): TodoService {
    this.todos = this.todos
      .filter(todo => !todo.done);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): ToDo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): ToDo[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): ToDo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo done
  toggleTodoDone(todo: ToDo): ToDo {
    const updatedTodo = this.updateTodoById(todo.id, {
      done: !todo.done
    });
    return updatedTodo;
  }
}