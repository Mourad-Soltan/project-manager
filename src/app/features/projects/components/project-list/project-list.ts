import { Component } from '@angular/core';
import { TaskList } from '../task-list/task-list';
import { FormsModule } from '@angular/forms';
import { ProjectDetail } from '../project-detail/project-detail';

@Component({
  selector: 'app-project-list',
  imports: [TaskList, FormsModule, ProjectDetail],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  searchTerm: string = '';

  get filteredProjects() {
    return this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
  selectedProject: any = null;

  selectProject(project: any) {
    this.selectedProject = project;
  }
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
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' },
      ],
      newTaskTitle: '',
      newTaskPriority: 'Moyenne'
    },
  ];

  addProject() {
    if (!this.newProjectName) return;

    this.projects.push({
      name: this.newProjectName,
      description: this.newProjectDescription,
      status: 'En cours',
      tasks: [],
      newTaskTitle: '',       // <- important !
      newTaskPriority: 'Moyenne' // <- important !
    });

    this.newProjectName = '';
    this.newProjectDescription = '';
  }

  addTask(project: any) {
    if (!project.newTaskTitle) return;

    if (!project.tasks) {
      project.tasks = [];
    }

    project.tasks.push({
      title: project.newTaskTitle,
      priority: project.newTaskPriority,
      status: 'En attente'
    });

    project.newTaskTitle = '';
    project.newTaskPriority = 'Moyenne';
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
