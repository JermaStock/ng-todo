import {Component, Input, OnInit} from '@angular/core';
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItem, TodoList} from "../../types/todo";
import {TodoService} from "../../services/todo.service";
import {TuiTabsModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {NgForOf} from "@angular/common";
import {TabsComponent} from "../tabs/tabs.component";
import {TabsService} from "../../services/tabs.service";
import {concatMap, switchMap, tap} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

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
  todoLists: TodoList[];
  todos: TodoItem[] = [];
  tabs: any[] = [];

  constructor(
    private readonly todoService: TodoService,
    private readonly tabsService: TabsService,
    private readonly localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
   this.tabsService.tabs$.pipe(
     tap(tabs => this.tabs = tabs),
     tap(() => this.tabsService.loadTabs()),
   ).subscribe();

   this.todoService.allTodos$.pipe(
     tap(todoLists => this.todoLists = todoLists),
     tap(() => this.todoService.loadTodos()),
   ).subscribe()
  }


  test() {

    let todoLists = [
      {
        todoListId: Date.now(),
        todoList: [
          {name: 'delo', done: false},
          {name: 'delo2', done: true},
        ]
      },
      {
        todoListId: Date.now(),
        todoList: [
          {name: 'delo', done: false},
          {name: 'delo2', done: true},
        ]
      }
    ];

    let todoTab = [
      { id: Date.now() },
      { id: Date.now() },
    ];

  }
}
