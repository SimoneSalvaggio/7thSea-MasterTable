import { stringify } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { Hero } from "src/app/model/Hero";
import { Hubris } from "src/app/model/Hubris";
import { Villain } from "src/app/model/Villain";
import { Virtu } from "src/app/model/Virtu";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.css"],
})
export class MainTableComponent implements OnInit {
  puntiPericolo: number;
  heroesArray: Hero[];
  activeVillainsArray: Villain[];
  removeMode: boolean;
  selectedPng: Villain;
  arrayIniziativa: any[];
  positionInHero: number;
  positionInVillain: number;
  isHeroEmpty: boolean;
  isVilEmpty: boolean;

  constructor() {}

  ngOnInit(): void {
    document.body.style.background = "#fcfbfa";
    this.removeMode = false;
    this.positionInHero = 500;
    this.positionInVillain = 500;
    this.puntiPericolo = parseInt(localStorage.getItem("7thSeaPP"));
    if (!this.puntiPericolo) {
      this.puntiPericolo = 5;
    }
    let jsonHeroes = localStorage.getItem("7thSeaHeroes");
    this.heroesArray = JSON.parse(jsonHeroes);
    this.ordinaArray();
    let jsonVillains = localStorage.getItem("7thSeaActiveVillains");
    this.activeVillainsArray = JSON.parse(jsonVillains);
    this.ordinaVillainsArray();
    if (this.heroesArray == null) {
      this.isHeroEmpty = false;
    } else {
      this.isHeroEmpty = true;
    }
    if (this.activeVillainsArray == null) {
      this.isVilEmpty = false;
    } else {
      this.isVilEmpty = true;
      for (let i = 0; i < this.activeVillainsArray.length; i++) {
        this.activeVillainsArray[i].id=i;
        
      }
    }
    if (this.activeVillainsArray == null) {
      this.activeVillainsArray = [];
      this.selectedPng = new Villain();
    } else {
      this.selectedPng = this.activeVillainsArray[0];
    }
    this.setIniziativaArray();
  }

  private setIniziativaArray() {
    this.arrayIniziativa = [];
    for (let i = 0; i < this.activeVillainsArray.length; i++) {
      this.arrayIniziativa.push(this.activeVillainsArray[i]);
    }
    for (let i = 0; i < this.heroesArray.length; i++) {
      this.arrayIniziativa.push(this.heroesArray[i]);
    }
    this.ordinaPerIncrementi();
  }

  setRemoveMode() {
    this.removeMode = !this.removeMode;
  }

  infoModal(png) {
    this.selectedPng = png;
  }

  ordinaVillainsArray() {
    if (this.activeVillainsArray != null) {
      this.activeVillainsArray = this.activeVillainsArray.sort((n1, n2) => {
        if (n1.id > n2.id) {
          console.log(this.activeVillainsArray);
          return 1;
        }

        if (n1.id < n2.id) {
          console.log(this.activeVillainsArray);
          return -1;
        }

          console.log(this.activeVillainsArray);
          return 0;
      });
    }
  }

  ordinaArray() {
    this.heroesArray = this.heroesArray.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
  }

  ordinaPerIncrementi() {
    this.arrayIniziativa = this.arrayIniziativa.sort((n1, n2) => {
      if (n1.incrementi < n2.incrementi) {
        return 1;
      }

      if (n1.incrementi > n2.incrementi) {
        return -1;
      }

      return 0;
    });
  }

  showSelected(p: any) {
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (p.nome == this.heroesArray[i].nome) {
        this.positionInHero = i;
        this.positionInVillain = 500;
      }
    }
    for (let i = 0; i < this.activeVillainsArray.length; i++) {
      if (p.nome == this.activeVillainsArray[i].nome) {
        this.positionInHero = 500;
        this.positionInVillain = i;
      }
    }
  }

  showNobody() {
    this.positionInHero = 500;
    this.positionInVillain = 500;
  }

  spostaSu(i) {
    let tempId = this.activeVillainsArray[i].id;
    this.activeVillainsArray[i].id = tempId - 1;
    this.activeVillainsArray[i - 1].id = tempId;
    this.ordinaVillainsArray();
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
  }

  spostaGiu(i) {
    if (i != this.activeVillainsArray.length + 1) {
      let tempId = this.activeVillainsArray[i].id;
      this.activeVillainsArray[i].id = tempId + 1;
      this.activeVillainsArray[i + 1].id = tempId;
      this.ordinaVillainsArray();
      localStorage.setItem(
        "7thSeaActiveVillains",
        JSON.stringify(this.activeVillainsArray)
      );
    }
  }

  removeFromActive(i) {
    this.activeVillainsArray.splice(i, 1);
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
    this.setIniziativaArray();
  }

  aggiungiPP() {
    this.puntiPericolo++;
    localStorage.setItem("7thSeaPP", stringify(this.puntiPericolo));
  }

  diminuisciPP() {
    this.puntiPericolo--;
    localStorage.setItem("7thSeaPP", stringify(this.puntiPericolo));
  }

  addVitaVil(pos: number) {
    let reloadedPNG = new Villain();
    reloadedPNG = this.activeVillainsArray[pos];
    reloadedPNG.vita = reloadedPNG.vita + 1;
    this.activeVillainsArray.splice(pos, 1);
    this.activeVillainsArray.push(reloadedPNG);
    this.ordinaVillainsArray();
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
  }

  removeVitaVil(pos: number) {
    let reloadedPNG = new Villain();
    reloadedPNG = this.activeVillainsArray[pos];
    reloadedPNG.vita = reloadedPNG.vita - 1;
    this.activeVillainsArray.splice(pos, 1);
    this.activeVillainsArray.push(reloadedPNG);
    this.ordinaVillainsArray();
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
  }

  addIncrementiVil(pos: number) {
    let reloadedPNG = new Villain();
    reloadedPNG = this.activeVillainsArray[pos];
    reloadedPNG.incrementi = reloadedPNG.incrementi + 1;
    this.activeVillainsArray.splice(pos, 1);
    this.activeVillainsArray.push(reloadedPNG);
    this.ordinaVillainsArray();
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
    this.setIniziativaArray();
  }

  removeIncrementiVil(pos: number) {
    let reloadedPNG = new Villain();
    reloadedPNG = this.activeVillainsArray[pos];
    reloadedPNG.incrementi = reloadedPNG.incrementi - 1;
    this.activeVillainsArray.splice(pos, 1);
    this.activeVillainsArray.push(reloadedPNG);
    this.ordinaVillainsArray();
    localStorage.setItem(
      "7thSeaActiveVillains",
      JSON.stringify(this.activeVillainsArray)
    );
    this.setIniziativaArray();
  }

  addVita(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.vita = reloadedPG.vita + 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
  }

  removeVita(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.vita = reloadedPG.vita - 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
  }

  addIncrementi(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.incrementi = reloadedPG.incrementi + 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
    this.setIniziativaArray();
  }

  removeIncrementi(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.incrementi = reloadedPG.incrementi - 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
    this.setIniziativaArray();
  }

  addPE(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.pe = reloadedPG.pe + 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
  }

  removePE(pg: Hero) {
    let change = true;
    let reloadedPG = new Hero();
    for (let i = 0; i < this.heroesArray.length; i++) {
      if (pg == this.heroesArray[i] && change) {
        reloadedPG = this.heroesArray[i];
        reloadedPG.pe = reloadedPG.pe - 1;
        this.heroesArray.splice(i, 1);
        this.heroesArray.push(reloadedPG);
        this.ordinaArray();
        localStorage.setItem("7thSeaHeroes", JSON.stringify(this.heroesArray));
        change = false;
      }
    }
  }
}
