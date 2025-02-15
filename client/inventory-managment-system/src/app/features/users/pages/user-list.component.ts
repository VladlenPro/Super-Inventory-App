import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { error } from '@ant-design/icons-angular';
import { Router } from '@angular/router';
import { FilterConfig } from '../../../shared/models/filter-config.model';

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
      label: 'Search Input',
      property: 'searchText',
      placeholder: 'Search...'
    },
    {
      type: 'checkbox',
      label: 'Active',
      property: 'isActive',
    }
  ];

  public filters: {[key: string]: any} = {};
  public  items = [
    { name: 'Item 1', active: true },
    { name: 'Item 2', active: false },
    { name: 'Item 3', active: true },
    { name: 'Item 4', active: false }
  ];



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
  public handleFilterChange(newFilters: { [key: string]: any }): void {
    this.filters = newFilters;
  }
  
  public  get filteredItems() {
    return this.items.filter(item => {
      let matches = true;

      // If searchText is provided, filter by item name.
      if (this.filters['searchText']) {
        matches = item.name
          .toLowerCase()
          .includes(this.filters['searchText'].toLowerCase());
      }

      // Filter by active/inactive based on the checkbox.
      if (matches && this.filters['isActive'] !== undefined) {
        matches = item.active === this.filters['isActive'];
      }

      return matches;
    });
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  
}