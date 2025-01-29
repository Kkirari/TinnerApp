import { Component, inject, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PhotoComponent } from "./photo/photo.component";
@Component({
  selector: 'app-profile',
  imports: [MatTabsModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, PhotoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private accountService = inject(AccountService)
  user: User
  @ViewChild('form') form?: NgForm
  constructor() {
    this.user = this.accountService.data()!.user
  }

  onSubmit() {
    this.accountService.updateProfile(this.form?.value)
  }
}