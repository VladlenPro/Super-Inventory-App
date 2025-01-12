import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { error } from '@ant-design/icons-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadUsers();
  }

  public addNewUser(): void {
    this.router.navigate(['/users/add']);
  }

  public editUser(userId: string): void {
    this.router.navigate(['/users/edit', userId]);
    }

  public toggleStatus(user: User): void {
    const previousStatus = user.isActive;
    user.isActive = !user.isActive;
    this.userService.toggleUserStatus(user.id, user.isActive).subscribe({
      next:() => console.log(`${user.username} status updated to ${user.isActive ? 'Active' : 'Inactive'}`),
      error: (error) => {
        user.isActive = previousStatus; 
        console.error('Error updating status', error);   
      },
      complete: () => this.loadUsers()
      }
     
    );
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  
}