import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



const wordList = [
  'palavra',
  'cavalo',
  'melancia',
  'viagem',
  'caminhonete',
  'cachorro',
  'vinagre',
  'taxi',
  'pelicano',
  'cotonete',
  'navio',
  'cadeira',
  'filme',
]


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Forca';

  turno = 0;
  palavra = wordList[this.turno];
  palavraArray:any = [];
  errorMessage:any = '';
  

  currentLetter:any = '';

  completed = false;

  //tentativas = ['z','t','y','i','d','o','p','a','v'];
  tentativas:any = [];
  mistakes:any = [];

  status = '';

  constructor(){
    this.palavraArray = this.palavra.split('');
    console.log(this.palavraArray);
  }


  arrayIncludes(ar:any,val:any)
  {
      return(ar.includes(val));
  }

  arrayNotIncludes(ar:any,val:any)
  {
      return (ar.includes(val)) ? false : true;
  }

  numErrors()
  {
    return this.mistakes.length;
  }

  validateLetter()
  {
    var myregexp = /^[a-zA-Z\ç]+$/;

    try {
      if(this.arrayIncludes(this.tentativas,this.currentLetter)) throw "Você já tentou essa letra";
      if(myregexp.exec(this.currentLetter) == null) throw "Use somente letras";          
      }
      catch(err) {
          this.errorMessage = err;
          console.log(this.errorMessage);
          return false;
      }
      return true;
  }

  isWordComplete():boolean
  {
    let numCorrectLetters = 0;
    let lengthWord = this.palavraArray.length;
    for(let l of this.palavraArray){
      if(this.arrayIncludes(this.tentativas, l)) numCorrectLetters++;
    }

    if(numCorrectLetters == lengthWord) return true;
    return false;
  }

  isLetterInWord(letter:string)
  {
    return this.arrayIncludes( this.palavra, letter);
  }

  

  updateGameStatus()
  {

    if( ! this.isLetterInWord(this.currentLetter) ) this.mistakes.push(this.currentLetter);
    
    this.errorMessage = '';
    this.currentLetter = '';

    if( this.mistakes.length >=8) {
      this.defeat();
      return;
    }

    
    if(this.isWordComplete()){
      this.win();
      return;
    }
   
  }

  defeat():void
  {
    this.completed = true;
    this.status = 'Você morreu!';
  }

  win():void
  {
    this.completed = true;
    this.status ="Você ganhou!!";
  }

  submitLetter():void
  {
    console.log(this.tentativas);
      if(this.validateLetter()){
        this.tentativas.push(this.currentLetter);
        
        
        this.updateGameStatus();
      }

    
  }


  restart():void
  {
    this.turno++;
    if(!wordList[this.turno]){
      alert('vocẽ completou o jogo!');
      return;
    }
    this.palavra = wordList[this.turno];
    this.palavraArray = [];
    this.errorMessage = '';
    this.currentLetter = '';

    this.completed = false;

    this.tentativas = [];
    this.mistakes = [];

    this.status = '';

    this.palavraArray = this.palavra.split('');
  }


}
