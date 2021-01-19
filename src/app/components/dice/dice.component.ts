import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.d1 = 0;
    this.d2 = 0;
    this.d3 = 0;
    document.body.style.background = "#fcfbfa";
    this.lastDiceShot = localStorage.getItem("7thSeaLastShot");
    this.lastLastDiceShot = localStorage.getItem("7thSeaLastLastShot");
    this.lastLastLastDiceShot = localStorage.getItem("7thSeaLastLastLastShot");
  }

  d1: number;
  d2: number;
  d3: number;
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
      let dado = Math.floor(Math.random() * 10 + 1);
      this.dadiTirati.push(dado);
      if (dado==10) {
        this.totalIncr++;
        this.sommaDadi += 10;
      } else {
        this.risultatiDadi.push(dado);
      }
    }
    this.risultatiDadi = this.risultatiDadi.sort(this.ordinaArray);
    this.dadiTirati = this.dadiTirati.sort(this.ordinaArray)
    for (let i = 0; i < this.risultatiDadi.length; i++) {
      this.sommaDadi += this.risultatiDadi[i];
    }
    for (let i = 0; i < this.risultatiDadi.length+1; i++) {
      this.d1 = i;
      for (let j = 0; j < this.risultatiDadi.length+1; j++) {
        this.d2 = j;
        for (let y = 0; y < this.risultatiDadi.length+1; y++) {
          this.d3 = y;
          if (this.d1!=this.d3 && this.d1!=this.d2 && this.d2!=this.d3) {
            for (let k = 10; k < 19; k++) {
              let temp = this.totalIncr;
              this.calcolatoreIncrementi(k);
              if (temp != this.totalIncr) {
                k = 10;
              }
            }
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

  calcolatoreIncrementi(k){
    let tempZero = this.risultatiDadi[this.d1] + this.risultatiDadi[this.d2];
    let tempUno = this.risultatiDadi[this.d1] + this.risultatiDadi[this.d3];
    let tempDue = this.risultatiDadi[this.d2] + this.risultatiDadi[this.d3];
    let tempTre = this.risultatiDadi[this.d1] + this.risultatiDadi[this.d2] + this.risultatiDadi[this.d3];
    if (this.d1!=this.d2 && this.d1!=this.d3 && this.d2!=this.d3) {
      if (tempZero == k) {
        this.totalIncr++;
        if (this.d1>this.d2) {
          this.risultatiDadi.splice(this.d1, 1);
          this.risultatiDadi.splice(this.d2, 1);
        } else {
          this.risultatiDadi.splice(this.d2, 1);
          this.risultatiDadi.splice(this.d1, 1);
        }
        this.reset();
      }
    }
    if (this.d1!=this.d2 && this.d1!=this.d3 && this.d2!=this.d3) {
      if (tempUno == k) {
        this.totalIncr++;
        if (this.d1>this.d3) {
          this.risultatiDadi.splice(this.d1, 1);
          this.risultatiDadi.splice(this.d3, 1);
        } else {
          this.risultatiDadi.splice(this.d3, 1);
          this.risultatiDadi.splice(this.d1, 1);
        }
        this.reset();
      }
    }
    if (this.d1!=this.d2 && this.d1!=this.d3 && this.d2!=this.d3) {
      if (tempDue == k) {
        this.totalIncr++;
        if (this.d3>this.d2) {
          this.risultatiDadi.splice(this.d3, 1);
          this.risultatiDadi.splice(this.d2, 1);
        } else {
          this.risultatiDadi.splice(this.d2, 1);
          this.risultatiDadi.splice(this.d3, 1);
        }
        this.reset();
      }
    }
    if (this.d1!=this.d2 && this.d1!=this.d3 && this.d2!=this.d3) {
      if (tempTre == k) {
        this.totalIncr++;
        if (this.d1>this.d2 && this.d1>this.d3) {
          if (this.d2>this.d3) {
            this.risultatiDadi.splice(this.d1, 1);
            this.risultatiDadi.splice(this.d2, 1);
            this.risultatiDadi.splice(this.d3, 1);
          } else{
            this.risultatiDadi.splice(this.d1, 1);
            this.risultatiDadi.splice(this.d3, 1);
            this.risultatiDadi.splice(this.d2, 1);
          }
        } else if (this.d2>this.d1 && this.d2>this.d3) {
          if (this.d1>this.d3) {
            this.risultatiDadi.splice(this.d2, 1);
            this.risultatiDadi.splice(this.d1, 1);
            this.risultatiDadi.splice(this.d3, 1);
          } else{
            this.risultatiDadi.splice(this.d2, 1);
            this.risultatiDadi.splice(this.d3, 1);
            this.risultatiDadi.splice(this.d1, 1);
          }
        } else if (this.d3>this.d1 && this.d3>this.d2) {
          if (this.d1>this.d2) {
            this.risultatiDadi.splice(this.d3, 1);
            this.risultatiDadi.splice(this.d1, 1);
            this.risultatiDadi.splice(this.d2, 1);
          } else{
            this.risultatiDadi.splice(this.d3, 1);
            this.risultatiDadi.splice(this.d2, 1);
            this.risultatiDadi.splice(this.d1, 1);
          }
        }
        this.reset();
      }
    }
  }

  reset(){
    this.d1=0;
    this.d2=0;
    this.d3=0;
  }

  ordinaArray(a, b) {
    a = eval(a);
    b = eval(b);
    return a - b;
}
}


