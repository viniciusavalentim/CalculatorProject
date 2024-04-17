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

  valorInicial!: number; 
  valorInicialFormatado?: string;

  valorMensal?: number;
  valorMensalFormatado?: string;

  taxaJuros?: number;
  taxaJurosFormatado?: string;

  periodo?: number;

  valorFinal?: number;
  valorFinalFormatado?: string;

  valorInvestido?: number;
  valorInvestidoFormatado?: string;

  totalJuros?: number;
  totalJurosFormatado?: string;

  typeTaxMonth?: number;
  typeTaxMonthString?: string;


  projectcount: number = 0;
  projectcountstop: any = setInterval(()=>{
    if (this.projectcount == this.valorInicial) {
      clearInterval(this.projectcountstop);
    } else {
      this.projectcount += 0.01;
      this.projectcount = parseFloat(this.projectcount.toFixed(2));
    }
  },1);

  valorFinalAnimation: number = 0;
  valorFinalAnimationStop: any = setInterval(()=>{
    if (this.valorFinalAnimation == this.valorFinal) {
      clearInterval(this.valorFinalAnimationStop);
    } else {
      this.valorFinalAnimation += 0.01;
      this.valorFinalAnimation = parseFloat(this.projectcount.toFixed(2));
    }
  },1);


  constructor(private dataService: DataService) {
  }

  formatarParaReais(numero: number): string {
    const partes = numero.toFixed(2).toString().split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimal = partes[1];
    return `R$ ${inteiro},${decimal}`;
  }

  startCounter() {
    this.projectcountstop = setInterval(() => {
      if (this.projectcount >= this.valorInicial) {
        clearInterval(this.projectcountstop);
      } else {
        this.projectcount += 0.01;
        this.projectcount = parseFloat(this.projectcount.toFixed(2));
      }
    }, 50);
  }
  

  
  ngOnInit(): void {
    this.resultado = this.dataService.getResultado();
    this.resultadoNumeros = this.dataService.getResultadoNumber();
    console.log(this.resultado);
    console.log("Teste" + this.resultado);
    console.log(this.resultadoNumeros);

    this.valorInicial = (this.resultadoNumeros[0]);
    this.valorInicialFormatado = this.valorInicial.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.valorMensal = (this.resultadoNumeros[1]);
    this.valorMensalFormatado = this.valorMensal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.taxaJuros = this.resultadoNumeros[2];
    this.taxaJurosFormatado = (this.taxaJuros/100).toLocaleString('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2, 
    });

    this.periodo = this.resultadoNumeros[3];

    this.valorFinal = this.resultadoNumeros[4];
    const valorFinalFormat = this.valorFinal;
    this.valorFinalFormatado = valorFinalFormat.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      currencyDisplay: 'symbol', 
    });

    this.valorInvestido = this.resultadoNumeros[5];
    this.valorInvestidoFormatado = this.valorInvestido.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.totalJuros = this.resultadoNumeros[4] - this.resultadoNumeros[5];
    this.totalJurosFormatado = this.totalJuros.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });


    this.typeTaxMonth = this.resultadoNumeros[6];
    if(this.typeTaxMonth == 1)
    {
      this.typeTaxMonthString = "Mensal";
    }
    else
    {
      this.typeTaxMonthString = "Anual";
    };



  }

}
