import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DiceComponent } from './components/dice/dice.component';
import { CommonModule } from '@angular/common';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { MainListComponent } from './components/main-list/main-list.component';
import { MainNoteComponent } from './components/main-note/main-note.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VillainListComponent } from './components/villain-list/villain-list.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { MainDicesComponent } from './components/main-dices/main-dices.component';
import { GuidaUtilizzoComponent } from './components/guida-utilizzo/guida-utilizzo.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceComponent,
    MainBodyComponent,
    MainListComponent,
    MainNoteComponent,
    NavbarComponent,
    VillainListComponent,
    MainTableComponent,
    MainDicesComponent,
    GuidaUtilizzoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
