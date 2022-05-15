import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person$: Observable<Person[]>;

  displayedColumns = ['cod', 'type', 'name'];

  constructor(private personServ: PersonService) {
    this.person$ = this.personServ.getAllPersons();
      console.log(this.person$);
  }

  ngOnInit(): void {
  }

}
