import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriorityColorPipe } from '../../../../../../priority-color.pipe';
import { HighlightStatusDirective } from '../../../../../../highlight-status.directive';

@Component({
  selector: 'app-task-list',
  standalone: true, // ✅ si tu es en standalone
  imports: [CommonModule, FormsModule, PriorityColorPipe,HighlightStatusDirective],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  taskToDeleteIndex: number | null = null;
  @Input() tasks: any[] = [];

  newTaskTitle = '';
  newTaskPriority = 'Moyenne';

  addTask() {
    if (!this.newTaskTitle) return;

    this.tasks.push({
      title: this.newTaskTitle,
      priority: this.newTaskPriority,
      status: 'En attente',
    });

    this.newTaskTitle = '';
  }

  openDeleteModal(index: number) {
    this.taskToDeleteIndex = index;
  }

  confirmDelete() {
    if (this.taskToDeleteIndex !== null) {
      this.tasks.splice(this.taskToDeleteIndex, 1);
      this.taskToDeleteIndex = null;
    }
  }

  cancelDelete() {
    this.taskToDeleteIndex = null;
  }
}
