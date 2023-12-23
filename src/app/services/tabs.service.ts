import { Injectable } from '@angular/core';
import {TodoTab} from "../types/todo";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  #activeIndex = 0;
  #tabs: Array<TodoTab> = [
    {id: Date.now(), name: 'First', editMode: false},
    {id: Date.now() + 1, name: 'Second', editMode: false},
  ];
  public tabs$ = new BehaviorSubject(this.#tabs);
  public activeIndex$ = new BehaviorSubject(this.#activeIndex);
  constructor() { }

  tabChange(tab: any) {
    this.#activeIndex = this.#tabs.findIndex(t => t.id === tab.id);
  }

  addTab() {
    this.#tabs.push({
      id: Date.now(),
      name: 'New tab',
      editMode: false,
    });
    this.tabs$.next(this.#tabs);
  }

  validateTab(tab: TodoTab) {
    if (!tab.name) {
      this.#tabs = [...this.#tabs.filter(t => t.id !== tab.id)];
      this.tabs$.next(this.#tabs);
    }
    if (tab.name.length > 10) {
      tab.name = tab.name.slice(0, 6) + '...';
    }
  }

  editModeToggle(tab: TodoTab, index: number) {
    if (index !== this.#activeIndex) return;
    tab.editMode = !tab.editMode;
  }

  onSave(tab: TodoTab, index: number) {
    this.editModeToggle(tab, index);
    this.validateTab(tab);
  }
}
