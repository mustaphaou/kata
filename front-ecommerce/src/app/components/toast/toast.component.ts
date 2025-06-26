import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',

  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  message: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.message$.subscribe((msg) => {
      this.message = msg;
      setTimeout(() => (this.message = null), 3000);
    });
  }
}
