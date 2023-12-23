import {Injectable, OnInit} from '@angular/core';
import {TodoTab} from "../types/todo";
import {BehaviorSubject, of, Subject, tap} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  #activeIndex: number = 0;
  #tabs: Array<TodoTab> = [];
  public tabs$ = new BehaviorSubject(this.#tabs);
  public activeIndex$ = new BehaviorSubject(this.#activeIndex);
  public initialStartTodoId: number;

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { }

  loadTabs() {
    if (!this.localStorageService.getItem('todoTabs')) {
      this.initialStartTodoId = Date.now();
      const newTabInst = [{ id: this.initialStartTodoId, name: 'Список дел', editMode: false, isActive: true }];
      this.localStorageService.setItem('todoTabs', newTabInst);
    }
    this.#tabs = this.localStorageService.getItem('todoTabs');
    this.activeIndex$.next(this.#tabs.findIndex(t => t.isActive));
    this.tabs$.next(this.#tabs);
  }

  tabChange(tab: any) {
    this.#activeIndex = this.#tabs.findIndex(t => t.id === tab.id);
    this.#tabs = [...this.#tabs].map(t => {
      if (t.id === tab.id) {
        return { ...t, isActive: true }
      }
      return { ...t, isActive: false }
    });

    this.localStorageService.setItem('todoTabs', this.#tabs);
  }

  addTab() {
    const newTab = {
      id: Date.now(),
      name: 'New tab',
      editMode: false,
      isActive: false
    };
    this.#tabs = [...this.#tabs, newTab];
    this.localStorageService.setItem('todoTabs', this.#tabs);
    this.tabs$.next(this.#tabs);
  }

  validateTab(tab: TodoTab) {
    if (!tab.name) {
      this.#tabs = [...this.#tabs.filter(t => t.id !== tab.id)];
      this.localStorageService.setItem('todoTabs', this.#tabs);
      this.tabs$.next(this.#tabs);
    }
    if (tab.name.length > 10) {
      tab.name = tab.name.slice(0, 6) + '...';
    }
  }

  editModeToggle(tab: TodoTab, index: number) {
    if (index !== this.#activeIndex) return;
    tab.editMode = !tab.editMode;
    console.log(this.#tabs);
  }

  onSave(tab: TodoTab, index: number) {
    this.editModeToggle(tab, index);
    this.validateTab(tab);
    this.#tabs = [...this.#tabs].map((t) => {
      if (t.id === tab.id) return {...t, name: tab.name };
      return t
    });
    this.localStorageService.setItem('todoTabs', this.#tabs);
  }
}
