import { TypePersonService } from './../../services/type-person.service';
import { TypePerson } from './../../models/type-person.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-type-person',
  templateUrl: './type-person.component.html',
  styleUrls: ['./type-person.component.scss']
})
export class TypePersonComponent implements OnInit {
  typePerson$: Observable<TypePerson[]>;

  displayedColumns = ['cod', 'description'];

  constructor(private typePersonServ: TypePersonService) {

    this.typePerson$ = this.typePersonServ.getAllTypes();
    console.log(this.typePerson$);

  }

  ngOnInit(): void {
    // this.typePersonServ.getAllTypes().subscribe(res => {
    //   console.log(res);
    // });
  }

}
