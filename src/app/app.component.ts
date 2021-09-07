import { Component } from '@angular/core';


import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  ngOnInit() {   
    //teste data   
    this.contadorAulas("2021-09-02 21:20:00", "2021-09-02 23:50:00", "2021-09-02  23:15"); 
    //teste momento aleatório
    this.momentoAleatorio();   
  }

   momentoAleatorio() {

    var inicio: any = moment().format("YYYY-MM-DD HH:mm:ss");       

    console.log("Horário de início:" + inicio);
  
    
    var horario_aleatorio: any = [];
    var rMinuto: any = [];
    var rSegundo: any = [];
        
    var qtdFotos = Math.floor(Math.random() * 4) + 5;
    console.log(qtdFotos);

    for(let i = 0; i < qtdFotos; i++){
      rMinuto[i] = (Math.random() * 50) + 1;
      rSegundo[i] = Math.floor(Math.random() * 60) + 1;
      horario_aleatorio[i] = moment().add(Math.floor(rMinuto[i]), 'minutes').add(Math.floor(rSegundo[i]),'seconds').format("YYYY-MM-DD HH:mm:ss")      
    }

    var val = horario_aleatorio.sort();    

    for (let item of val){
      setTimeout(()=> {
        console.log(val[val], item);
      })
    }    
  }


  contadorAulas(horario_abertura:any, horario_fechamento:any, horario_entrada_aluno: any){   
    
    horario_abertura = moment(horario_abertura);
    horario_fechamento = moment(horario_fechamento);    
    horario_entrada_aluno = moment(horario_entrada_aluno);

    var duracao = (horario_fechamento.diff(horario_abertura, 'minutes'))/50;    

    var faixaAula: any = {
      inicio1:'',
      inicio2:'',
      inicio3:'',
      termino1:'',
      termino2:'',
      termino3:''
    };
        
    //verificar quantidade de aulas
    if (duracao < 1){
      duracao = 0;  
      console.log("qtdAulas: " + duracao);
    }   

    if (duracao <= 3 && duracao >= 1){      
      duracao = Math.trunc(duracao);      
      console.log("qtdAulas: " + duracao);
    }     

    else if(duracao > 3){      
      duracao = 3;
      console.log("qtdAulas: " + duracao);
    }    
    
    //verificar periodo de tolerância das aulas e horário que aluno entrou
    switch (duracao){
      case 1:
        faixaAula.inicio1 = moment(horario_abertura).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino1 = moment(horario_abertura.add(15, 'minutes')).format("YYYY-MM-DD HH:mm:ss"); 
        var aux_abertura = new Date(faixaAula.inicio1);
        var aux_fechamento = new Date(faixaAula.termino1);
        var aux_aluno = new Date(horario_entrada_aluno);

        if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento))){
          horario_entrada_aluno = faixaAula.inicio1;
          return horario_entrada_aluno;
        }
        else
          return null;
      break;

      case 2:
        faixaAula.inicio1 = moment(horario_abertura).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino1 = moment(horario_abertura.add(15, 'minutes')).format("YYYY-MM-DD HH:mm:ss");   
        faixaAula.inicio2 = moment(horario_abertura.add(35, 'minutes')).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino2 = moment(horario_abertura.add(15,'minutes')).format("YYYY-MM-DD HH:mm:ss");      

        
        var aux_abertura1 = new Date(faixaAula.inicio1);
        var aux_fechamento1 = new Date(faixaAula.termino1);
        var aux_abertura2 = new Date(faixaAula.inicio2);
        var aux_fechamento2 = new Date(faixaAula.termino2);
        var aux_aluno = new Date(horario_entrada_aluno);
        
        if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura1)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento1))){
          horario_entrada_aluno = faixaAula.inicio1;
          return horario_entrada_aluno;
        }
        else if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura2)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento2))){
          horario_entrada_aluno = faixaAula.inicio2;
          return horario_entrada_aluno;
        } 
        else
          return null;        
      break;

      case 3:
        faixaAula.inicio1 = moment(horario_abertura).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino1 = moment(horario_abertura.add(15, 'minutes')).format("YYYY-MM-DD HH:mm:ss");        
        faixaAula.inicio2 = moment(horario_abertura.add(35, 'minutes')).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino2 = moment(horario_abertura.add(15,'minutes')).format("YYYY-MM-DD HH:mm:ss");     
        faixaAula.inicio3 = moment(horario_abertura.add(35, 'minutes')).format("YYYY-MM-DD HH:mm:ss");
        faixaAula.termino3 = moment(horario_abertura.add(15, 'minutes')).format("YYYY-MM-DD HH:mm:ss");

        var aux_abertura1 = new Date(faixaAula.inicio1);
        var aux_fechamento1 = new Date(faixaAula.termino1);
        var aux_abertura2 = new Date(faixaAula.inicio2);
        var aux_fechamento2 = new Date(faixaAula.termino2);
        var aux_aluno = new Date(horario_entrada_aluno);
        var aux_abertura3 = new Date(faixaAula.inicio3);
        var aux_fechamento3 = new Date(faixaAula.termino3);

        if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura1)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento1))){
          horario_entrada_aluno = faixaAula.inicio1;
          return horario_entrada_aluno;
        }
        else if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura2)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento2))){
          horario_entrada_aluno = faixaAula.inicio2;
          return horario_entrada_aluno;
        }
        else if((this.converterHoraMinuto(aux_aluno) >= this.converterHoraMinuto(aux_abertura3)) && (this.converterHoraMinuto(aux_aluno) <= this.converterHoraMinuto(aux_fechamento3))){
          horario_entrada_aluno = faixaAula.inicio3;
          return horario_entrada_aluno;
        }
        else
          return null;        
      break;

    }        
}

converterHoraMinuto(data:Date){ 
  return (data.getHours() * 60) + data.getMinutes(); 
} 


}