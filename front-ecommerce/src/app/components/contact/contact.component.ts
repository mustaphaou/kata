import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(300)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, private toastService: ToastService) { }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      this.toastService.show(' Demande de contact envoyée avec succès.');
      this.contactForm.reset();
    }
  }
}
