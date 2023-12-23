import { Component } from '@angular/core';
import {TuiInputModule, TuiTabsModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TodoTab} from "../../types/todo";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    TuiTabsModule,
    TuiButtonModule,
    NgForOf,
    TuiInputModule,
    FormsModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  tabs: Array<TodoTab> = [
    {id: Date.now(), name: 'First', editMode: false},
    {id: Date.now() + 1, name: 'Second', editMode: false},
  ];

  activeIndex = 0;

  limits = {
    minTabs: 1,
    maxTabs: 5,
  }

  constructor() {
  }

  editTab(tab: TodoTab, index: number) {
    if (index !== this.activeIndex) return;
    tab.editMode = !tab.editMode ;
  }

  validateTab(tab: TodoTab, index: number) {
    if (!tab.name) {
      this.tabs = [...this.tabs.filter(t => t.id !== tab.id)];
    }
    if (tab.name.length > 10) {
      tab.name = tab.name.slice(0, 6) + '...';
    }
  }

  onSave(tab: TodoTab, index: number) {
    this.editTab(tab, index);
    this.validateTab(tab, index);
  }

  log(tab: TodoTab) {
    console.log(tab);
  }

  addTab() {
    this.tabs.push({
      id: Date.now(),
      name: 'New tab',
      editMode: false,
    });
  }

  onTabChange(tab: any) {
    this.activeIndex = this.tabs.findIndex(t => t.id === tab.id);
  }
}
