import { Component, OnInit } from '@angular/core';
import { Todo } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks: Todo[] = []

  onEdit: boolean = false;

  toEdit!: Todo;

  ngOnInit(): void {
    let taskHistory = localStorage.getItem('tasks');
    if (taskHistory)
      this.tasks = JSON.parse(taskHistory);
  }

  addTodo(todo: Todo) {
    if (this.onEdit) {
      let indexToEdit = this.tasks.findIndex(i => i.description == this.toEdit.description);
      this.tasks.splice(indexToEdit, 1, todo);
      this.onEdit = false;
    } else {
      this.tasks.push(todo);
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  //when clicked on 'Edit' on task.component, event will trigger to update toEdit
  //toEdit will then be used in addTodDo method to findIndex
  editTodo(todo: Todo) {
    this.onEdit = true;
    this.toEdit = todo;
  }

  deleteTodo(todo: Todo) {
    this.tasks.splice(0, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
