import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {

  @Input() nom:any
  @Input() form:any
  @Input() type:any=1
  @Input() champ:any

  @Input() form2:any

  public validation_messages :any = {


    'nom': [
        { type: 'required', message: 'champ requis' },
        { type: 'minlength', message: 'Ton nom doit comporter au moins 5 caractères.' },
  
        { type: 'pattern', message: 'Ton nom doit comporter uniquement des lettres' },
        { type: 'validUsername', message: 'Ton nom à déja été utiliser.' }
      ],
  
      'adresse': [
        { type: 'required', message: 'Saisissez l\'adresse' },
      
      ],
  
  
  
      'prenom': [
        { type: 'required', message: 'Saisis Ton prénom' },
        { type: 'pattern', message: 'Ton prenom doit comporter uniquement des lettres' },
      ],
  
      'ville': [
        { type: 'required', message: 'Saisis Ta ville de résidence' }
      ],
  
      'login1': [
        { type: 'required', message: 'Saisis Ton nom d\'utilisateur' },
        { type: 'minlength', message: 'Ton nom d\' utilisateur  doit comporter au moins 4 caractères.' },
  
        { type: 'pattern', message: 'Ton nom d\'utilisateur doit commencer par des lettres   ' },
        { type: 'loginused', message: 'Nom d\' utilisateur déja utilisé ' }
      ],
  
  
  
  
  
       'phone': [
          { type: 'required', message: 'Saisr Ton numéro de téléphone .' },
          { type: 'validCountryPhone', message: 'Numéro incorrect' }
        ],
  
         'email': [
          { type: 'required', message: 'L\'adresse e-mail est obligatoire.' },
          { type: 'pattern', message: 'Saisis une adresse e-mail valide.' },
          {  type:'emailused',message: 'Adresse e-mail non disponible'}
        ],
  
        'mp': [
          { type: 'required', message: 'Saisis le mot de passe' },
          { type: 'minlength', message: 'le Mot de passe doit contenir au moins 6 caractères' },
          { type: 'pattern', message: 'Le mot de passe doit comporter des chiffres et des lettres ' },
             ],
        'mp2': [
          { type: 'required', message: 'Confirmer le mot de passe' }
        ],
        'matching_passwords': [
          { type: 'MatchPassword', message: 'Le mot de passe ne correspond pas' }
        ],
        'terms': [
          { type: 'pattern', message: 'Vous devez accepter les CGV et les CGU '}
  
        ],
  
        'terms2': [
          { type: 'pattern', message: 'Vous devez accepter la politique de confidentialité '}
  
        ],
  
  
     //more messages
    };

  constructor() { 

    //console.log(this.champ);

   // console.log(this.validation_messages[this.champ])
  }

  ngOnInit(): void {
  }

  val(nom:string)
  {
  /*   console.log(this.champ);

    console.log(this.validation_messages[this.champ]) */
   return this.form.get(nom)?.invalid && ( this.form.get(nom)?.dirty || this.form.get(nom)?.touched)

  }

  
  val2(nom:string)
  {
   return this.form?.get(this.form2)?.get(nom)?.invalid && (this.form?.get('verif_mp')?.get(nom)?.dirty || this.form?.get('verif_mp')?.get(nom)?.touched)

  }

  val3(nom:string)
  {
   return  (this.form?.get(this.form2)?.get(nom)?.dirty || this.form?.get(this.form2)?.get(nom)?.touched) && this.val(this.form2)

  }


}
