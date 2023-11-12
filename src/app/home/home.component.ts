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

  contactList: Contact[]

  constructor(private router: Router, private contactService: ContactService) { }

  test: string = ''

  ngOnInit() {
    this.contactService.getContacts().subscribe(data => {
      this.contactList = data.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      })
    })
  }

  // Add New Contact
  addContact(): void {
    this.router.navigate(['addContact'])
  }




}
