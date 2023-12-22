import {Component, Input} from '@angular/core';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItem} from "../../types/todo";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todoItem: TodoItem = {
    id: null,
    text: '',
    done: false,
  };
  todoItems: TodoItem[] = [];

  constructor() {
  }

  addTodo(todo: TodoItem) {
    this.todoItems.push(todo);
  }
}
