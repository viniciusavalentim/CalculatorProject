import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatWith, map } from 'rxjs';

@Component({
  selector: 'app-juros-compostos',
  templateUrl: './juros-compostos.component.html',
  styleUrls: ['./juros-compostos.component.css']
})
export class JurosCompostosComponent implements OnInit {

  jurosCompostos!: FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {};

  ngOnInit(): void {
    this.jurosCompostos = this.fb.group({
      valorInicial: ['', Validators.required],
      valorMensal: ['', Validators.required],
      taxaJuros: ['0', Validators.required],
      typeTax: ['Anual', Validators.required],
      tempo: ['0', Validators.required],
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
    let quantidadeDeJurosObtido;
    let totalInvestido;
    let juros = 0;
    let calculo = 0;

   
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

          console.log(juros)
          console.log(valorMensal)

          return resultado;
        };

        juros  =  ( valorInicial * (1 + ((taxaJuros/100)))**(tempo) ) +  (valorMensal *((( 1 + ((taxaJuros/100))  )**(tempo) ) - 1) / ( (taxaJuros/100) ) );

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

          quantidadeDeJurosObtido = calculo - (valorMensal * tempo*12);
          console.log(quantidadeDeJurosObtido);

          totalInvestido = calculo - quantidadeDeJurosObtido;
          console.log(totalInvestido);

          return jurosComValorMensal;
        };

        juros  =  ( valorInicial * (1 + ((taxaJuros/100)))**(tempo) ) +  (valorMensal *((( 1 + ((taxaJuros/100))  )**(tempo) ) - 1) / ( (taxaJuros/100)) );

        return juros;       
      }
      
      if(this.GetValues().typeTax == "Anual" && this.GetValues().typeTime == "Meses")
      {
        juros = (1 + ((taxaJuros/100)/12))**(tempo);
        console.log("Anual/meses")
      }

      if(this.GetValues().typeTax == "Mensal" && this.GetValues().typeTime == "Anos")
      {
        juros = (1 + ((taxaJuros/100)))**(tempo*12);
        console.log("Mensal/Anos")
      }

      return 0;
  };


  submit(){
    console.log(this.jurosCompostos.value);

    const dados = this.GetValues();
    console.log(this.result().toFixed(2));
  };



}
