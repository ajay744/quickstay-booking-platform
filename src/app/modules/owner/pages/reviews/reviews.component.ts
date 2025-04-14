import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews = [
    {
      name: 'Ravi Kumar',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      comment: 'Great property! Had a comfortable stay.',
      date: 'April 10, 2025'
    },
    {
      name: 'Pooja Sharma',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'Very clean and well maintained. Highly recommended!',
      date: 'April 8, 2025'
    },
    {
      name: 'Ali Khan',
      avatar: 'https://i.pravatar.cc/150?img=7',
      rating: 3,
      comment: 'Average experience. Can be improved.',
      date: 'April 5, 2025'
    },
    {
      name: 'Sneha Joshi',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      comment: 'Felt like home! Very responsive owner.',
      date: 'April 1, 2025'
    }
  ];
}
