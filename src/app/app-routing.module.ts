import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiceComponent } from './components/dice/dice.component';
import { GuidaUtilizzoComponent } from './components/guida-utilizzo/guida-utilizzo.component';
import { MainDicesComponent } from './components/main-dices/main-dices.component';
import { MainListComponent } from './components/main-list/main-list.component';
import { MainNoteComponent } from './components/main-note/main-note.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { VillainListComponent } from './components/villain-list/villain-list.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/hero',
    pathMatch: 'full'
  },
  {
    path: 'hero',
    component: MainListComponent
  },
  {
    path: 'villain',
    component: VillainListComponent
  },
  {
    path: 'table',
    component: MainTableComponent
  },
  {
    path: 'note',
    component: MainNoteComponent
  },
  {
    path: 'dices',
    component: MainDicesComponent
  },
  {
    path: 'guide',
    component: GuidaUtilizzoComponent
  },
  // {
  //   path: 'dashboard',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: '/strutturesanitarie',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'strutturesanitarie',
  //       component: StrSanitarieMainComponent
  //     },
  //     {
  //       path: 'compagnieassicurative',
  //       component: CompAssMain
  //     }
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
