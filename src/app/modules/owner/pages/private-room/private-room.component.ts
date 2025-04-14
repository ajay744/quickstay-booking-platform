import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.scss']
})
export class PrivateRoomComponent  implements OnInit {
  pgForm!: FormGroup;
  isSubmitting = false;
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.pgForm = this.fb.group({
      pgType: ['Private Room'],
      name: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(100)]],
      image: [''],
      description: [''],
      features: this.fb.group({
        ac: [false],
        wifi: [false],
        food: [false],
        laundry: [false]
      }),
      rating: [null, [Validators.min(1), Validators.max(5)]],
      contact: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pgForm.invalid) {
      this.snackbar.warn('Please fill all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    this.apiService.post(environment.apiEndpoints.privateRoom.post, this.pgForm.value).subscribe({
      next: () => {
        this.snackbar.success('Private Room added successfully!');
        this.pgForm.reset({ pgType: 'Boys PG', features: {} });
        this.imagePreview = '';
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error submitting Private Room:', err);
        this.snackbar.error('Failed to add Private Room. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.pgForm.get('image')?.setValue(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }
}
