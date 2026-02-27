import { Component } from '@angular/core';
import { TaskList } from "../task-list/task-list";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  imports: [TaskList,FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  projectToDeleteIndex: number | null = null;
  newProjectName = '';
  newProjectDescription = '';

  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      status: 'En cours',
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    }
  ];

  addProject() {
    if (!this.newProjectName) return;

    this.projects.push({
      name: this.newProjectName,
      description: this.newProjectDescription,
      status: 'En cours',
      tasks: []
    });

    this.newProjectName = '';
    this.newProjectDescription = '';
  }

  openDeleteModal(index: number) {
    this.projectToDeleteIndex = index;
  }

  confirmDelete() {
    if (this.projectToDeleteIndex !== null) {
      this.projects.splice(this.projectToDeleteIndex, 1);
      this.projectToDeleteIndex = null;
    }
  }

  cancelDelete() {
    this.projectToDeleteIndex = null;
  }

}
