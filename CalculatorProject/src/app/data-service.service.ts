import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private resultado!: number;
  private numbers!: number[];

  constructor() {}

  setResultado(valor: number): void {
    this.resultado = valor;
  }

  getResultado(): number {
    return this.resultado;
  }

  setResultadoNumber(valor: number[]): void {
    this.numbers = valor;
  }

  getResultadoNumber(){
    return this.numbers;
  }
}
