import { Injectable } from '@angular/core';
import {TodoItem, TodoList} from "../types/todo";
import {BehaviorSubject, Subject, tap} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {TabsService} from "./tabs.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #todos: TodoItem[] = [];
  #allTodos: TodoList[] = [];
  todos$ = new BehaviorSubject(this.#todos);
  allTodos$ = new BehaviorSubject(this.#allTodos);
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly tabsService: TabsService
  ) { }

  loadTodos() {

    if (!this.localStorageService.getItem('todoLists')) {
      this.localStorageService.setItem('todoLists', [{ todoListId: this.tabsService.initialStartTodoId, todoList: [] }]);
    }
    this.#allTodos = [this.localStorageService.getItem('todoLists')];
    this.allTodos$.next(this.#allTodos);
  }

  addTodo(todo: TodoItem) {
    this.#todos.push(todo);
    this.todos$.next(this.#todos);
  }

  deleteTodo(todo: TodoItem) {
    this.#todos = [...this.#todos].filter(t => t.id !== todo.id);
    this.todos$.next(this.#todos);
  }

  toggleTodo(todo: TodoItem) {
    this.#todos = [...this.#todos].map(t => {
      if (t.id === todo.id) {
        return {
          ...t,
          done: !t.done
        }
      }
      return t;
    })
    this.todos$.next(this.#todos);
  }
}
