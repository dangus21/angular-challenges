import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Todo, TodosService } from './services/todos';

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'app-root',
	template: `
		<div
			*ngFor="let todo of todos"
			class="flex gap-4 p-2 transition hover:bg-slate-300">
			<p class="w-3/5">{{ todo.title }}</p>
			<button (click)="todosService.updateTodo(todo)">Update</button>
		</div>
	`,
	styles: [],
})
export class AppComponent implements OnInit {
	todosService = inject(TodosService);
	todos: Todo[] = [];

	ngOnInit(): void {
		this.todosService.getTodos();
		this.todosService.todos$.subscribe((todos) => {
			this.todos = todos;
		});
	}
}
