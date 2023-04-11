import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule, NgOptimizedImage, FormsModule],
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params: any = {};
  private service = inject(RickMortyService);

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters()
  }

  getCharacters(event?: any) {
    // console.log(event)
    this.params.page += 1;
    this.service.getCharacters(this.params).subscribe({
      next: (data: any) => {
        this.characters.push(...data.results);
        if (event) event.target.complete();
      },
      error: (error: any) => {
        console.log(error)
        if (event) event.target.complete();

      }
    })
  }


  searchCharacters() {
    console.log(1)
    this.params.page = 1;
    this.service.getCharacters(this.params).subscribe({
      next: (data: any) => {
        this.characters = data.results;
      },
      error: (error: any) => {
        this.characters = [];
      }
    })
  }

}
