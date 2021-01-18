import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = "#fcfbfa";
    this.lastDiceShot = localStorage.getItem("7thSeaLastShot");
    this.lastLastDiceShot = localStorage.getItem("7thSeaLastLastShot");
    this.lastLastLastDiceShot = localStorage.getItem("7thSeaLastLastLastShot");
  }

  risultatiDadi: number[];
  dadiTirati : number[];
  sommaDadi = 0;
  totalIncr: number;
  lastDiceShot: string;
  lastLastDiceShot: string;
  lastLastLastDiceShot: string;

  incrementCalculator(numeroDadi) {
    this.totalIncr = 0;
    this.risultatiDadi = [];
    this.dadiTirati = [];
    this.sommaDadi = 0;
    for (let i = 0; i < numeroDadi; i++) {
      let temp = Math.floor(Math.random() * 10 + 1);
      this.dadiTirati.push(temp);
      if (temp==10) {
        this.totalIncr++;
        this.sommaDadi += 10;
      } else {
        this.risultatiDadi.push(temp);
      }
    }
    this.risultatiDadi = this.risultatiDadi.sort(this.ordinaArray);
    this.dadiTirati = this.dadiTirati.sort(this.ordinaArray)
    for (let i = 0; i < this.risultatiDadi.length; i++) {
      this.sommaDadi += this.risultatiDadi[i];
    }
    for (let i = 0; i < this.risultatiDadi.length+1; i++) {
      for (let j = 0; j < this.risultatiDadi.length+1; j++) {
        for (let y = 0; y < this.risultatiDadi.length+1; y++) {
          if (i!=y && i!=j && j!=y) {
            (this.calcolatoreIncrementi(i, j, y, 10));
            (this.calcolatoreIncrementi(i, j, y, 11));
            (this.calcolatoreIncrementi(i, j, y, 12));
            (this.calcolatoreIncrementi(i, j, y, 13));
            (this.calcolatoreIncrementi(i, j, y, 14));
            (this.calcolatoreIncrementi(i, j, y, 15));
            (this.calcolatoreIncrementi(i, j, y, 16));
            (this.calcolatoreIncrementi(i, j, y, 17));
            (this.calcolatoreIncrementi(i, j, y, 18));
          }
        }
      }
    }
    let lastShot = "  tiro: [ " + this.dadiTirati + " ]  - somma: " + this.sommaDadi + " - incrementi: " + this.totalIncr
    localStorage.setItem("7thSeaLastLastLastShot", localStorage.getItem("7thSeaLastLastShot"))
    localStorage.setItem("7thSeaLastLastShot", localStorage.getItem("7thSeaLastShot"))
    localStorage.setItem("7thSeaLastShot", lastShot)
    this.lastDiceShot = localStorage.getItem("7thSeaLastShot");
    this.lastLastDiceShot = localStorage.getItem("7thSeaLastLastShot");
    this.lastLastLastDiceShot = localStorage.getItem("7thSeaLastLastLastShot");
  }
  
  private calcolatoreIncrementi(i: number, j: number, y: number, xxx: number) {
    let tempZero = this.risultatiDadi[j] + this.risultatiDadi[y];
    let tempUno = this.risultatiDadi[i] + this.risultatiDadi[y];
    let tempDue = this.risultatiDadi[i] + this.risultatiDadi[j];
    let tempTre = this.risultatiDadi[i] + this.risultatiDadi[j] + this.risultatiDadi[y];
    if (y != j) {
      if (tempZero == xxx) {
        this.totalIncr++;
        if (y > j) {
          this.risultatiDadi.splice(y, 1);
          this.risultatiDadi.splice(j, 1);
          y = y - 2;
          j--;
        }
        else {
          this.risultatiDadi.splice(j, 1);
          this.risultatiDadi.splice(y, 1);
          j = j - 2;
          y--;
        }
      }
    }
    if (i != y) {
      if (tempUno == xxx) {
        this.totalIncr++;
        if (i > y) {
          this.risultatiDadi.splice(i, 1);
          this.risultatiDadi.splice(y, 1);
          i = i - 2;
          y--;
        }
        else {
          this.risultatiDadi.splice(y, 1);
          this.risultatiDadi.splice(i, 1);
          y = y - 2;
          i--;
        }
      }
    }
    if (i != j) {
      if (tempDue == xxx) {
        this.totalIncr++;
        if (i > j) {
          this.risultatiDadi.splice(i, 1);
          this.risultatiDadi.splice(j, 1);
          i = i - 2;
          j--;
        }
        else {
          this.risultatiDadi.splice(j, 1);
          this.risultatiDadi.splice(i, 1);
          j = j - 2;
          i--;
        }
      }
    }
    if (i != j && i != y && j != y) {
      if (tempTre == xxx) {
        this.totalIncr++;
        if (i > j && i > y) {
          this.risultatiDadi.splice(i, 1);
          i = i - 3;
          if (y > j) {
            this.risultatiDadi.splice(y, 1);
            this.risultatiDadi.splice(j, 1);
            y = y - 2;
            j--;
          }
          else {
            this.risultatiDadi.splice(y, 1);
            this.risultatiDadi.splice(j, 1);
            j = j - 2;
            y--;
          }
        } else if (j > i && j > y) {
          this.risultatiDadi.splice(j, 1);
          j = j - 3;
          if (y > i) {
            this.risultatiDadi.splice(y, 1);
            this.risultatiDadi.splice(i, 1);
            y = y - 2;
            i--;
          }
          else {
            this.risultatiDadi.splice(y, 1);
            this.risultatiDadi.splice(i, 1);
            i = i - 2;
            y--;
          }
        } else if (y > i && y > j) {
          this.risultatiDadi.splice(y, 1);
          y = y - 3;
          if (j > i) {
            this.risultatiDadi.splice(j, 1);
            this.risultatiDadi.splice(i, 1);
            j = j - 2;
            i--;
          }
          else {
            this.risultatiDadi.splice(j, 1);
            this.risultatiDadi.splice(i, 1);
            i = i - 2;
            j--;
          }
        }
      }
      if (this.sommaDadi < this.totalIncr*10) {
        this.totalIncr--;
      }
    }
    // return { i, j, y };
  }

  ordinaArray(a, b) {
    a = eval(a);
    b = eval(b);
    return a - b;
}
}


