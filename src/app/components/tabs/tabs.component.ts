import {Component, OnInit, Output} from '@angular/core';
import {TuiInputModule, TuiTabsModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TodoTab} from "../../types/todo";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TabsService} from "../../services/tabs.service";
import {switchMap, tap} from "rxjs";

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
export class TabsComponent implements OnInit {
  tabs: Array<TodoTab> = [];

  activeIndex: number;

  limits = {
    minTabs: 1,
    maxTabs: 5,
  }

  constructor(
    private readonly tabsService: TabsService
  ) {
  }

  ngOnInit() {
    this.tabsService.tabs$.pipe(
      tap(res => this.tabs = res ),
      switchMap(() => this.tabsService.activeIndex$),
    ).subscribe((res) => this.activeIndex = res);
  }

  editTab(tab: TodoTab, index: number) {
    this.tabsService.editModeToggle(tab, index)
  }

  onSave(tab: TodoTab, index: number) {
    this.tabsService.onSave(tab, index);
  }

  addTab() {
    this.tabsService.addTab();
  }

  onTabChange(tab: any) {
    this.tabsService.tabChange(tab);
  }
}
