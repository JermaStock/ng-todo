import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {TodoItem} from "../../../types/todo";
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  todoForm = this.formBuilder.group({
      todoText: ['', Validators.required],
    }
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private todoService: TodoService,
  ) {
  }

  onSave() {
    if (this.todoForm.invalid) return;
    this.todoService.addTodo({
      id: Date.now().toString(),
      text: this.todoForm.get('todoText')?.value as string,
      done: false,
    });
    this.todoForm.reset();
  }
}
