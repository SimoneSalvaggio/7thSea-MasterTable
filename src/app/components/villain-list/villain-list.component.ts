import { Component, OnInit } from '@angular/core';
import { Hubris } from 'src/app/model/Hubris';
import { Vantaggio } from 'src/app/model/Vantaggio';
import { Villain } from 'src/app/model/Villain';
import { Virtu } from 'src/app/model/Virtu';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit {

  villainsArray: Villain[];
  activeVillains: Villain[];
  newVillain: Villain;
  editedVillain: Villain;
  positionEditing: number;
  deleting: boolean;
  editing: boolean;
  newVantaggio: Vantaggio;
  newVantaggi: Vantaggio[];
  newVirtu: Virtu;
  newHubris: Hubris;

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = "#facaca";
    this.reset();
    let jsonVillains = localStorage.getItem("7thSeaVillains");
    this.villainsArray = JSON.parse(jsonVillains);
    localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
    let jsonActiveVillains = localStorage.getItem("7thSeaActiveVillains");
    this.activeVillains = JSON.parse(jsonActiveVillains);
    if (this.activeVillains==null) {
      this.activeVillains = [];
    }
    if (this.villainsArray==null) {
      this.villainsArray = [];
    } else{
      for (let i = 0; i < this.villainsArray.length; i++) {
        this.villainsArray[i].id=i;
      }
    }
  }

  private reset() {
    this.deleting = false;
    this.editing = false;
    this.newVantaggio = new Vantaggio();
    this.editedVillain = new Villain();
    this.newVillain = new Villain();
    this.newVantaggi = [];
    this.newVirtu = new Virtu();
    this.newHubris = new Hubris();
  }

  addVillain(vill){
    this.newVillain = vill;
    vill.vita = vill.forza*4;
    if (this.villainsArray==null) {
      vill.id = 0;
    } else {
      vill.id = this.villainsArray.length;
    }
    vill.incrementi = 0;
    vill.vantaggi = this.newVantaggi;
    vill.virtu = this.newVirtu;
    vill.hubris = this.newHubris;
    this.villainsArray.push(vill);
    localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
    this.newVillain = new Villain();
    this.newVirtu = new Virtu();
    this.newHubris = new Hubris();
  }

  selectVillainToEdit(i){
    this.editedVillain = this.villainsArray[i];
    this.newVantaggi = this.editedVillain.vantaggi;
    this.newVirtu = this.editedVillain.virtu;
    this.newHubris = this.editedVillain.hubris;
    this.positionEditing = i;
  }

  confirmEditedVillain(){
    this.editedVillain.vantaggi = this.newVantaggi;
    this.editedVillain.virtu = this.newVirtu;
    this.editedVillain.hubris = this.newHubris;
    this.villainsArray[this.positionEditing]=this.editedVillain;
    localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
    this.ordinaArr();
    this.newVantaggi = [];
    this.newVirtu = new Virtu();
    this.newHubris = new Hubris();
  }

  delMode(){
    this.deleting = !this.deleting;
  }

  editMode(){
    this.editing = !this.editing;
    this.setNullNewVantaggi();
  }
  
  setNullNewVantaggi(){
    this.newVantaggi = []
  }

  removeVillain(i){
    this.villainsArray.splice(i, 1);
    localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
    let jsonVillains = localStorage.getItem("7thSeaVillains");
    this.villainsArray = JSON.parse(jsonVillains);
  }

  setActiveVillain(vil){
    this.activeVillains.push(vil);
    this.ordinaArr();
    localStorage.setItem("7thSeaActiveVillains", JSON.stringify(this.activeVillains));
  }

  addNewVantaggio(){
    this.newVantaggi.push(this.newVantaggio);
    this.newVantaggio = new Vantaggio();
  }

  rimuoviVantaggioAdd(i){
    this.newVantaggi.splice(i, 1);
  }

  addEditVantaggio(){
    this.newVantaggi.push(this.newVantaggio);
    this.newVantaggio = new Vantaggio();
  }

  rimuoviVantaggioEdit(i){
    this.newVantaggi.splice(i, 1)
  }

  spostaSu(i){
    let tempId = this.villainsArray[i].id;
    this.villainsArray[i].id = tempId-1;
    this.villainsArray[i-1].id = tempId;
    this.ordinaBaseArr();
    localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
  }

  spostaGiu(i){
    if (i!=(this.villainsArray.length+1)) { 
      let tempId = this.villainsArray[i].id;
      this.villainsArray[i].id = tempId+1;
      this.villainsArray[i+1].id = tempId;
      this.ordinaBaseArr();
      localStorage.setItem("7thSeaVillains", JSON.stringify(this.villainsArray));
    }
  }

  ordinaBaseArr(){
    this.villainsArray = this.villainsArray.sort((n1,n2) => {
      if (n1.id > n2.id) {
          return 1;
      }
  
      if (n1.id < n2.id) {
          return -1;
      }
  
      return 0;
    });
  }

  ordinaArr(){
    if (this.activeVillains!=null) {
      
      this.activeVillains = this.activeVillains.sort((n1,n2) => {
        if (n1.id > n2.id) {
          return 1;
        }
        
        if (n1.id < n2.id) {
          return -1;
        }
        
        return 0;
      });
    }
  }
}
