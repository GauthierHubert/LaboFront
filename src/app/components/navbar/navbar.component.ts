import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenDTO } from 'src/app/services/auth/token';
import { DataService } from 'src/app/services/data/data.service';
import { DifficultyService } from 'src/app/services/difficulty/difficulty.service';
import { Difficulty } from 'src/app/services/models/difficulty';
import { Type } from 'src/app/services/models/type';
import { QuizzService } from 'src/app/services/quizz/quizz.service';
import { User } from 'src/app/services/models/user';
import { Quizz } from 'src/app/services/models/quizz';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDisplay : boolean = true;
  storedUser ?: User;
  storedQuizz !: Quizz;
  items !: MenuItem[];

  mapDifficulties !: Map<String, Set<Difficulty>>;

  constructor(private _dataService : DataService, private _authService : AuthService, private _difficultyService : DifficultyService, private _quizzService : QuizzService, private _router : Router){

  }

  ngOnInit(){
        
    this._quizzService.data$.subscribe(
        (rQuizz) => {
          
          console.log(rQuizz);
          
          if(rQuizz === undefined){  
            this._difficultyService.$mappedDifficulties.subscribe(
              (rDifficulty) => {
                this.initMenuItem();   
                let i = 0;
                // Itérer sur les entrées (clé-valeur) de la carte
                rDifficulty.forEach((value, key) => {
                  i++;
                  // Créer un nouvel élément pour chaque entrée
                  const newItem = {
                    label: key.toString(), // Utiliser la clé comme libellé de l'élément
                    items: [] as MenuItem[] // Initialiser un tableau d'éléments vides pour les sous-éléments
                  };

                  // Itérer sur les éléments du set et les ajouter comme sous-éléments
                  value.forEach((difficulty) => {
                    const subItem : MenuItem = {

                      label: difficulty.name.toString(),

                      command :() => this.createRouterLink(difficulty, subItem),
                    };
                    newItem.items.push(subItem); // Ajouter le sous-élément à la liste des sous-éléments
                  });

                  // Ajouter le nouvel élément à la liste 'items' existante
                  this.items.at(1)?.items?.push(newItem);
                  console.log(this.items);
                  
                })
            });
          }else{
            this.initMenuItem()
            const newItem : MenuItem = {
              label: 'Continue',
              routerLink : [`quizz/${rQuizz.id}`]
            }
            this.items[1].items?.push(newItem)
        
            const newItem2 : MenuItem = {
              label : 'Reset',
              command :() => {this._quizzService.clear(this.storedQuizz)
              this._router.navigateByUrl("home")
            }
            }
            this.items[1].items?.push(newItem2)
          }},


        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      )
  

    this._authService.$auth.subscribe({
      next : (result : TokenDTO | undefined) =>{
        if(result){
        this.storedUser = result.user;
      }
      }
    })
  }

  displayNavbar(){
    this.isDisplay = !this.isDisplay;
    this._dataService.updateVariable(this.isDisplay);
  }
  closeNavbar(event : MouseEvent){
    if(this.isDisplay==true && event.clientX>300){
      this.isDisplay=false;
      this._dataService.updateVariable(this.isDisplay);
    }
  }

  createRouterLink(difficulty : Difficulty, subItem : MenuItem){

    this._quizzService.createQuizz(difficulty).subscribe((result) => {
      this._quizzService.start(result);
      this._router.navigateByUrl(`quizz/${result.id}`)
    })
  }

  initMenuItem(){
    this.items = [
      {
          label: 'User',
          items: [{
                  label: 'New',
                  icon: 'pi pi-user-plus',
                  routerLink: ['/user/add']
              },
              {label: 'Index',
              icon: 'pi pi-users',
              routerLink: ['user/index']
            },
          ]
      },
      {
          label: 'Quizz',
          items: [

          ]
      },
      {
        label: 'Question',
        items: [{
                label: 'New',
                icon: 'pi pi-search-plus',
                routerLink: ['/question/add']
            },
            {label: 'Index',
            icon: 'pi pi-search',
            routerLink: ['question']
          },
        ]
    },
  ];
  }

}
