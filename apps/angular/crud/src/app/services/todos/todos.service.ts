import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';

export type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	private baseUrl = 'https://jsonplaceholder.typicode.com/todos';
	private todos = new BehaviorSubject<Todo[]>([]);

	http = inject(HttpClient);
	todos$ = this.todos.asObservable();

	getTodos() {
		this.http.get<Todo[]>(this.baseUrl).subscribe((todos) => {
			this.todos.next(todos);
		});
	}

	updateTodo(todo: Todo) {
		this.http
			.put<Todo>(
				`${this.baseUrl}/${todo.id}`,
				JSON.stringify({
					...todo,
					title: randText(),
				}),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				},
			)
			.subscribe((todoUpdated: Todo) => {
				const newTodos = [
					...this.todos.value.filter((t) => t.id !== todoUpdated.id),
					todoUpdated,
				].sort((a, b) => (a.id > b.id ? 1 : -1));
				console.log('LOG ~ newTodos:', newTodos.length);

				this.todos.next(newTodos);
			});
	}
}
