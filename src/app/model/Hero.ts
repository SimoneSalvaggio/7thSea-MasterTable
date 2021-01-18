import { Hubris } from "./Hubris";
import { Vantaggio } from "./Vantaggio";
import { Virtu } from "./Virtu";
import { Tratti } from "./Tratti";
import { Abilita } from "./Abilita";
import { Background } from "./Background";

export class Hero {
    id: number;
    nome: string;
    nazione: string;
    vita: number;
    tratti: Tratti;
    abilita: Abilita;
    vantaggi: Vantaggio[];
    virtu: Virtu;
    hubris: Hubris;
    background: Background[];
    incrementi: number;
    giocatore: string;
    pe: number;
    note: string;
}