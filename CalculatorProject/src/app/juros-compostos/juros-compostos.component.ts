import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatWith, map } from 'rxjs';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-juros-compostos',
  templateUrl: './juros-compostos.component.html',
  styleUrls: ['./juros-compostos.component.css']
})
export class JurosCompostosComponent implements OnInit {

  jurosCompostos!: FormGroup;
  tempoMensal!: number;
  valorInvestido?: number;
  typeTaxMonth?: number;


  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router,private dataService: DataService ) {};

  ngOnInit(): void {
    this.jurosCompostos = this.fb.group({
      valorInicial: ['', Validators.required],
      valorMensal: ['', Validators.required],
      taxaJuros: ['', Validators.required],
      typeTax: ['Anual', Validators.required],
      tempo: ['', Validators.required],
      typeTime: ['Anos', Validators.required]
    });

  };

  GetValues(){
    return this.jurosCompostos.value;
  };

  result(){
    const valorInicial = this.GetValues().valorInicial;
    const valorMensal = this.GetValues().valorMensal;
    const taxaJuros = this.GetValues().taxaJuros;
    const tempo = this.GetValues().tempo;
    let taxaDeJurosMensal = taxaJuros / 12;
    let tempoMensal = tempo * 12;
    let resultado;
    let jurosComValorIncial;
    let jurosComValorMensal;
    let juros = 0;

    if(this.GetValues().typeTime == "Anos")
    {
      this.tempoMensal = this.GetValues().tempo * 12;
    }
    else{
      this.tempoMensal = this.GetValues().tempo;
    }

    if(this.GetValues().typeTax == "Mensal")
    {
      this.typeTaxMonth = 1;
    }
    else
    {
      this.typeTaxMonth = 0;
    }

    this.valorInvestido = valorInicial + valorMensal * this.tempoMensal; 


   
      if(this.GetValues().typeTax == "Anual" && this.GetValues().typeTime == "Anos")
      {

        if(valorMensal == 0 || valorMensal == null){
          console.log("entrou valor Inicial")
          juros = (1 + ((taxaJuros/100)))**(tempo);
          resultado = valorInicial * juros;
          return  resultado;
        }

        if(valorInicial == 0 || valorInicial == null){
          console.log("entrou valor mensal");
          juros = ((( 1 + (taxaDeJurosMensal/100)  )**(tempoMensal) ) - 1) / ( (taxaDeJurosMensal/100));
          resultado = valorMensal * juros;
          return resultado;
        };

        juros  =  ( valorInicial * (1 + ((taxaDeJurosMensal/100)))**(tempoMensal) )  +  valorMensal * ((( 1 + (taxaDeJurosMensal/100)  )**(tempoMensal) ) - 1) / ( (taxaDeJurosMensal/100));
        return juros;       
      }
      
      if(this.GetValues().typeTax == "Mensal" && this.GetValues().typeTime == "Meses")
      {
        if(valorMensal == 0 || valorMensal == null){
          console.log("entrou valor Inicial")
          juros = (1 + ((taxaJuros/100)))**(tempo);
          jurosComValorIncial = valorInicial * juros;
          return  jurosComValorIncial;
        }

        if(valorInicial == 0 || valorInicial == null){
          console.log("entrou valor mensal");
          juros = ((( 1 + ((taxaJuros/100))  )**(tempo) ) - 1) / ( (taxaJuros/100) );
          jurosComValorMensal = valorMensal * juros;
          return jurosComValorMensal;
        };

        juros  =  ( valorInicial * (1 + ((taxaJuros/100)))**(tempo) ) +  (valorMensal *((( 1 + ((taxaJuros/100))  )**(tempo) ) - 1) / ( (taxaJuros/100)) );

        return juros;       
      }
      
      if(this.GetValues().typeTax == "Anual" && this.GetValues().typeTime == "Meses")
      {
        if(valorMensal == 0 || valorMensal == null){
          console.log("entrou valor Inicial")
          juros = (1 + ((taxaDeJurosMensal/100)))**(tempo);
          jurosComValorIncial = valorInicial * juros;
          return  jurosComValorIncial;
        }

        if(valorInicial == 0 || valorInicial == null){
          console.log("entrou valor mensal");
          juros = ((( 1 + ((taxaDeJurosMensal/100))  )**(tempo) ) - 1) / ( (taxaDeJurosMensal/100) );
          jurosComValorMensal = valorMensal * juros;
          return jurosComValorMensal;
        };

        juros  =  ( valorInicial * (1 + ((taxaDeJurosMensal/100)))**(tempo) ) +  (valorMensal *((( 1 + ((taxaDeJurosMensal/100))  )**(tempo) ) - 1) / ( (taxaDeJurosMensal/100)) );

        return juros;    
      }

      if(this.GetValues().typeTax == "Mensal" && this.GetValues().typeTime == "Anos")
      {
        if(valorMensal == 0 || valorMensal == null){
          console.log("entrou valor Inicial")
          juros = (1 + ((taxaJuros/100)))**(tempoMensal);
          resultado = valorInicial * juros;
          return  resultado;
        }

        if(valorInicial == 0 || valorInicial == null){
          console.log("entrou valor mensal");
          juros = ((( 1 + (taxaJuros/100)  )**(tempoMensal) ) - 1) / ( (taxaJuros/100));
          resultado = valorMensal * juros;
          return resultado;
        };

        juros  =  ( valorInicial * (1 + ((taxaJuros/100)))**(tempoMensal) )  +  valorMensal * ((( 1 + (taxaJuros/100)  )**(tempoMensal) ) - 1) / ( (taxaJuros/100));
        return juros;     
      }

      return 0;
  };


  submit(){
    const result = this.result();
    this.dataService.setResultado(result);
    this.dataService.setResultadoNumber([this.GetValues().valorInicial, 
                                         this.GetValues().valorMensal, 
                                         this.GetValues().taxaJuros, 
                                         this.tempoMensal, 
                                         this.result(),
                                         this.valorInvestido,
                                         this.typeTaxMonth]);
    console.log(this.result().toFixed(2));
    this.router.navigate(['/result']);
  };

}
