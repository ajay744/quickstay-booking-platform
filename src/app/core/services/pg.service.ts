import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PgService {

  constructor() { }

  // Search and filter method
  filterAndSortPgList(pgList: any[], searchText: string, sortOption: string): any[] {
    let list = [...pgList]; // Create a copy of the original list to avoid mutating it.
  
    // Search Filtering
    if (searchText) {
      const search = searchText.toLowerCase();
      list = list.filter(pg => {
        // Check for location or address property and search accordingly
        const location = pg.location || pg.address; // Address for Boys PG and location for Girls PG
        return location.toLowerCase().includes(search) || pg.city.toLowerCase().includes(search);
      });
    }
  
    // Sorting
    if (sortOption === 'low') {
      list = list.sort((a, b) => (a.price || a.rent) - (b.price || b.rent)); // Sorting by price/rent
    } else if (sortOption === 'high') {
      list = list.sort((a, b) => (b.price || b.rent) - (a.price || a.rent)); // Sorting by price/rent
    } else if (sortOption === 'popular') {
      list = list.sort((a, b) => b.rating - a.rating); // Sorting by rating (popular first)
    }
  
    return list;
  }
  
}
