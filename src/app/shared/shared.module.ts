import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CapitalizePipe,
    OnlyNumbersDirective,
    SpinnerComponent,
    PageNotFoundComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [SearchBarComponent,SpinnerComponent]

})
export class SharedModule { }
