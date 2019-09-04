import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { ToDo } from './to-do';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent {
  newTodo: string = '';
  constructor(
    private todoService: TodoService
  ) { }

  /**
   * add todo
   * @memberof TodoAppComponent
   */
  addTodo(): void {
    if (!this.newTodo) {
      return alert('What do you need to write?');
    }
    this.todoService.addTodo(new ToDo({
      value: this.newTodo
    }));
    this.newTodo = '';
  }

  /**
   * destroy todo
   * @memberof TodoAppComponent
   */
  destroyTodo(todo: ToDo): void {
    this.todoService.deleteTodoById(todo.id);
  }

  /**
   * destroy done todo
   * @memberof TodoAppComponent
   */
  destroyAllTodo(): void {
    if (!this.clearCount) {
      return;
    }
    if (!confirm('Do you need to delete the selected one?')) {
      return;
    }
    this.todoService.deleteAllTodo();
  }

  /**
   * toggle todo done
   * @memberof TodoAppComponent
   */
  toggleDoneTodo(todo: ToDo): void {
    this.todoService.toggleTodoDone(todo);
  }

  /**
   * toggle all todo done
   * @memberof TodoAppComponent
   */
  toggleAllTodoDone(event: boolean): void {
    this.todos.forEach(item => item.done = event);
  }

  /**
   * editing todo
   * @memberof TodoAppComponent
   */
  editingTodo(todo: ToDo): void {
    if (!todo.done) {
      todo.edit = true;
    }
  }

  /**
   * cancel editing todo
   * @memberof TodoAppComponent
   */
  cancelEditingTodo(todo: ToDo): void {
    todo.edit = false;
  }

  /**
   * edited todo
   * @memberof TodoAppComponent
   */
  editedTodo(todo: ToDo, input: HTMLInputElement): void {
    todo.value = input.value;
    todo.edit = false;
  }

  /**
   * get todos
   * @memberof TodoAppComponent
   */
  get todos(): ToDo[] {
    return this.todoService.getAllTodos();
  }

  /**
   * get todos all done be get todos
   * @memberof TodoAppComponent
   */
  get allDone(): boolean {
    const todos = this.todos;
    return todos.length && todos.filter(item => item.done).length === todos.length;
  }

  /**
   * get todos all not done number
   * @memberof TodoAppComponent
   */
  get todoCount(): number {
    return this.todos.filter(item => !item.done).length;
  }

  /**
   * get todos all done number
   * @memberof TodoAppComponent
   */
  get clearCount(): number {
    return this.todos.filter(item => item.done).length;
  }

}
