import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  // Add New Contact
  addContact(): void {
    this.router.navigate(['addContact'])
  }




}
