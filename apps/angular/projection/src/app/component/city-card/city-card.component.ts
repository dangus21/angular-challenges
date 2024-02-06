import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
	FakeHttpService,
	randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
	selector: 'app-city-card',
	template: `
		<app-card
			[list]="cities$ | async"
			(add)="addStudent()"
			class="bg-light-green">
			<img src="assets/img/city.png" width="200px" />
			<ng-template #rowRef let-city>
				<app-list-item (delete)="deleteStudent(city.id)">
					{{ city.country }}
				</app-list-item>
			</ng-template>
		</app-card>
	`,
	standalone: true,
	styles: [
		`
			.bg-light-green {
				background-color: rgba(100, 100, 250, 0.1);
			}
		`,
	],
	imports: [CommonModule, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
	constructor(
		private http: FakeHttpService,
		private store: CityStore,
	) {}

	cities$ = this.store.cities$;

	ngOnInit(): void {
		this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
	}

	addStudent() {
		this.store.addOne(randomCity());
	}

	deleteStudent(id: number) {
		this.store.deleteOne(id);
	}
}
