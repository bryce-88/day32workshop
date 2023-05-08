import { Component, Input, Output } from '@angular/core';
import { Todo } from '../model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input()
  tasks: Todo[] = []

  @Output()
  onDeleteTask = new Subject<Todo>();

  @Output()
  onEditTask = new Subject<Todo>();

  onDelete(todo: Todo) {
    this.onDeleteTask.next(todo);
  }

  onEdit(todo: Todo) {
    this.onEditTask.next(todo);
  }

}
