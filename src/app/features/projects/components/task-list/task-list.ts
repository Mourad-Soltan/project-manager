import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true, // ✅ si tu es en standalone
  imports: [CommonModule,FormsModule],
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
      status: 'En attente'
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'En attente':
        return 'border-yellow-500';
      case 'En cours':
        return 'border-blue-500';
      case 'Terminé':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  }
}
