import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskFilterService } from '../../../core/services/task-filter.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private filterService = inject(TaskFilterService);

 
  searchQuery = this.filterService.searchQuery;

  onSearch(query: string) {
    console.log('1. Header input changed:', query);
    this.filterService.setSearchQuery(query);
  }
}