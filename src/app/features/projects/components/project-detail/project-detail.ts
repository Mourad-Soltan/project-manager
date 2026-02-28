import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [TaskList, CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  @Input() project: any;

  get isOpen() {
    return !!this.project;
  }

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  getProgress() {
    if (!this.project?.tasks?.length) return 0;

    const doneTasks = this.project.tasks.filter(
      (t: any) => t.status === 'Terminé'
    ).length;

    return Math.round((doneTasks / this.project.tasks.length) * 100);
  }

  getDoneCount(): number {
    return this.project?.tasks?.filter((t: any) => t.status.toLowerCase() === 'terminé').length ?? 0;
  }

  getInProgressCount(): number {
    return this.project?.tasks?.filter((t: any) => t.status.toLowerCase() === 'en cours').length ?? 0;
  }

  getPendingCount(): number {
    return this.project?.tasks?.filter((t: any) => t.status.toLowerCase() === 'en attente').length ?? 0;
  }
}
