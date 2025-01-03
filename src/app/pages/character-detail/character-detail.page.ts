import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character = null as any;

  constructor(
    private actRoute: ActivatedRoute,
     private rickAndMortySvc: RickAndMortyService
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
    console.log(this.characterId);
  }

  registerIcons() {
    addIcons(icons);
  }

  ngOnInit() {
    this.registerIcons()
  }

  ionViewWillEnter(){
    this.getCharacter()
  }

  getCharacter(){

    this.rickAndMortySvc.getCharactersById(this.characterId).subscribe({
      
      next: (res: any) => {
        this.character=res;
      },
      error: (error: any)=>{

        }
      })
    }

    getEpisodes(){

      for(let url of this.character.episode){
              this.rickAndMortySvc.getByUrl(url).subscribe({
        
        next: (res: any) => {
          console.log(res);

        },
        error: (error: any)=>{
  
          }
        })
      }
      }
}


