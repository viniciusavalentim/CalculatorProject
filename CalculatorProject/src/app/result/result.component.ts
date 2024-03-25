import { Component, Input, OnInit} from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  resultado?: number;
  resultadoNumeros?: number[];

  constructor(private dataService: DataService) {
  }
  
  ngOnInit(): void {
    this.resultado = this.dataService.getResultado();
    this.resultadoNumeros = this.dataService.getResultadoNumber();
    console.log(this.resultado);
    console.log("Teste" + this.resultado);
    console.log(this.resultadoNumeros[1]);
  }
}
