import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { error } from '@ant-design/icons-angular';
import { Router } from '@angular/router';
import { FilterConfig } from '../../../shared/models/filter-config.model';
import { UserFilter } from '../../../shared/models/user-filter.model';
import { BaseFilter } from '../../../shared/models/base-filter.model';

@Component({
  selector: 'app-user-list',
  standalone: false,
  
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public users: User[] = [];
  public searchText: string = '';
  public  myFilters: FilterConfig[] = [
    {
      type: 'text',
      label: 'Search',
      property: 'searchText',
      placeholder: 'Search...'
    },
    {
      type: 'checkbox',
      label: 'Show Active Only',
      property: 'isActive',
      defaultValue: false
    }
  ];

  public filters: UserFilter = {
    searchText: '',
    isActive: null
  };

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

  public maskPassword(password: string): string {
      return password ? '••••••' : '';
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
  public handleFilterChange(newFilters: BaseFilter): void {
    if ((newFilters as UserFilter).isActive === false) {
      (newFilters as UserFilter).isActive = null;
    }
    this.filters = newFilters as UserFilter;
  }

  public onSearch(filters: BaseFilter): void {
    const userFilters = filters as UserFilter;
    this.userService.searchUsers(userFilters).subscribe({
      next:(users: User[]) => {
        this.users = users;
      },
      error: (error: any) => {
        console.error('Error searching users', error)
      }
    });
    }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  
}