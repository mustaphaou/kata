import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productForm!: FormGroup;
  productId!: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      image: [''],
      category: [''],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      internalReference: [''],
      shellId: [null],
      inventoryStatus: ['', Validators.required],
      rating: [0],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.productService.getProduct(this.productId).subscribe((product) => {
          this.productForm.patchValue(product);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

    const operation = this.isEditMode
      ? this.productService.updateProduct(this.productId, product)
      : this.productService.createProduct(product);

    const message = this.isEditMode
      ? 'Modifié avec succès !'
      : 'Créé avec succès !';

    operation.subscribe(() => {
      this.toastService.show(message);
      this.router.navigate(['/products']);
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const backendUrl = 'http://localhost:8080';

      this.productService.uploadImage(formData).subscribe({
        next: (relativePath) => {
          const fullUrl = backendUrl + relativePath;
          this.productForm.patchValue({ image: fullUrl });
          this.toastService.show('Image envoyée avec succès');
        },
        error: () => {
          this.toastService.show('Erreur lors de l\'envoi de l\'image');
        }
      });
    }
  }

}
