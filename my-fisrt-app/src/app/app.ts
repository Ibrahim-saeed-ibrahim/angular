import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-root',
  imports: [
    UserCard,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 username='';

}
