import { Component, OnInit } from '@angular/core'; 
import { User } from '../services/user'; 
import { UsersService } from '../services/users.service';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new User ('','','',[]);

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
  }

  onSubmit() {
    alert("User is Logged In!");
  }

  getUser() {    
    this._usersService.getUser(this.userModel.userName);
  }

}

