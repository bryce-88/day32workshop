import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Todo } from '../model';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {

  form!: FormGroup;

  @Input()
  onEdit: boolean = false

  @Input()
  taskToEdit!: Todo

  @Output()
  onAddTodo = new Subject<Todo>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.onEdit) {
        this.form = this.fb.group({
          description: this.fb.control<string>(this.taskToEdit.description, [Validators.required, Validators.minLength(5)]),
          priority: this.fb.control<string>(this.taskToEdit.priority),
          dueDate: this.fb.control<string>(this.taskToEdit.dueDate)
        })
      }
      if (!this.onEdit) {
        this.form.reset();
      }
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>('lo'),
      dueDate: this.fb.control<string>('')
    })
  };

  addTodo() {
    const todo = this.form.value as Todo;
    this.onAddTodo.next(todo);
  }

  invalid() {
    let bInvalid: boolean = true;
    let dd = new Date(this.form.get('dueDate')?.value);
    if (dd > new Date) 
      bInvalid = false;
    if (this.form.invalid || bInvalid)
      return true;
    return false;
  }

}
