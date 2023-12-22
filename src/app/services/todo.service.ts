import { Injectable } from '@angular/core';
import {TodoItem} from "../types/todo";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #todos: TodoItem[] = [];
  todos$ = new BehaviorSubject(this.#todos);
  constructor() { }

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
