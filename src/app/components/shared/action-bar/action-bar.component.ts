import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Input() public readonly  buttonLabel = 'Nouveau';
  @Output() search = new EventEmitter<string>();
  @Output() addItem = new EventEmitter<void>();

  public readonly faSearch = faSearch;
  public searchControl: FormControl = new FormControl();

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(d => this.search.emit(d));
  }

  public add(): void {
    this.addItem.emit();
  }

}
