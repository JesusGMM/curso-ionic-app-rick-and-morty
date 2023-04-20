import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CharacterPage implements OnInit {

  id = '';
  personaje: any;
  episodios: any[] = [];

  private route = inject(ActivatedRoute);
  private service = inject(RickMortyService);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ionViewWillEnter() {
    if (this.id)
      this.getCharacters()
  }

  getCharacters() {
    this.service.getCharacterId(this.id).subscribe({
      next: (data: any) => {
        this.personaje = data;
        this.getEpisodio()
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getEpisodio() {

    for (const url of this.personaje.episode) {
      this.service.getEpisode(url).subscribe({
        next: (data: any) => {
          this.episodios.push(data);
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }
}
