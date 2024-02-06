import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FakeHttpService,
	randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
	selector: 'app-teacher-card',
	template: `
		<app-card
			[list]="teachers$ | async"
			(add)="addTeacher()"
			class="bg-light-red">
			<img src="assets/img/teacher.png" width="200px" />
			<ng-template #rowRef let-teacher>
				<app-list-item (delete)="deleteTeacher(teacher.id)">
					{{ teacher.firstName }}
				</app-list-item>
			</ng-template>
		</app-card>
	`,
	styles: [
		`
			.bg-light-red {
				background-color: rgba(250, 0, 0, 0.1);
			}
		`,
	],
	standalone: true,
	imports: [CardComponent, CommonModule, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
	constructor(
		private http: FakeHttpService,
		private store: TeacherStore,
	) {}

	teachers$ = this.store.teachers$;

	ngOnInit(): void {
		this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
	}

	addTeacher() {
		this.store.addOne(randTeacher());
	}

	deleteTeacher(id: number) {
		this.store.deleteOne(id);
	}
}
