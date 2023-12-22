import {Component, Input, OnInit} from '@angular/core';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItem} from "../../types/todo";
import {TodoService} from "../../services/todo.service";
import {TuiTabsModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {NgForOf} from "@angular/common";
import {TabsComponent} from "../tabs/tabs.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent,
    TuiTabsModule,
    TuiSvgModule,
    NgForOf,
    TuiButtonModule,
    TabsComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  activeItemIndex = 0;
  items = Array.from({length: 5}, (_, i) => `Item #${i}`);

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => this.todos = todos);
  }
}
