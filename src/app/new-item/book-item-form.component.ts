import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookItemService } from '../book-item.service';
import { lookupListToken, lookupGenreListToken } from '../providers';

@Component({
  selector: 'mw-book-item-form',
  templateUrl: './book-item-form.component.html',
  styleUrls: ['./book-item-form.component.css']
})
export class BookItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookItemService: BookItemService,
    @Inject(lookupListToken) public lookupLists,
    @Inject(lookupGenreListToken) public lookupGenreLists,
    private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      type: this.formBuilder.control('Books'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      author: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])),
      genre: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator),
    });
  }

  yearValidator(control: FormControl) {
    if (control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1900;
    const maxYear = 2100;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return {
        year: {
          min: minYear,
          max: maxYear
        }
      };
    }
  }

  onSubmit(bookItem) {
    this.bookItemService.add(bookItem)
      .subscribe(() => {
        this.router.navigate(['/', bookItem.type]);
      });
  }
}
