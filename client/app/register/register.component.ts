import { Component, OnInit } from '@angular/core';
import { User } from '../services/user'; 
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  
  userModel = new User('','','',[]); 

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
  }

  onSubmit(){
    alert("New user has been created" +
    "\nEmail: " + this.userModel.email + 
    "\nUsername: " + this.userModel.userName + 
    "\nPassword: " + this.userModel.password);


    this._usersService.createUser(
      this.userModel.userName,
      this.userModel.password,
      this.userModel.email); 
  }

  getAllUsers() {
    this._usersService.getUsers(); 
  }

}
