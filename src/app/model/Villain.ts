import { Hubris } from "./Hubris";
import { Vantaggio } from "./Vantaggio";
import { Virtu } from "./Virtu";

export class Villain {
    id: number;
    nome: string;
    nazione: string;
    vita: number;
    forza: number;
    influenza: number;
    vantaggi: Vantaggio[];
    virtu: Virtu;
    hubris: Hubris;
    incrementi: number;
    note: string;
}