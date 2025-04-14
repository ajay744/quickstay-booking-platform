import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/owner/${path}`]);
  }
}
