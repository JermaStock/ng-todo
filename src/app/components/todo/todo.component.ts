import {Component, Input, OnInit} from '@angular/core';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItem} from "../../types/todo";
import {TodoService} from "../../services/todo.service";

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
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => this.todos = todos);
  }

  addTodo(todo: TodoItem) {
    this.todoService.addTodo(todo);
  }
}
