import {Component, Input} from '@angular/core';
import {TodoItem} from "../../../types/todo";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiButtonModule} from "@taiga-ui/core";
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TuiTableModule,
    TuiButtonModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todos: TodoItem[];
  constructor(
    private todoService: TodoService
  ) {
  }

  toggleTodo(todo: TodoItem) {
    this.todoService.toggleTodo(todo);
  }

  deleteTodo(todo: TodoItem) {
    this.todoService.deleteTodo(todo);
  }
}
