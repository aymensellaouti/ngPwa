import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FirstComponent } from './first/first.component';

const routes: Routes = [
  // { path: '', component: FirstComponent},
  { path: 'test', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
