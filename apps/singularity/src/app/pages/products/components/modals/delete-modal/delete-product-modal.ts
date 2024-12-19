import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import CustomDialog from '../../../../../shared/dialog/custom-dialog';
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import Product from '../../../classes/product.class';
import ProductService from '../../../services/product-service';
import { ErrorAlert } from '../../../../../shared/alerts/error-alert';
import { take } from 'rxjs';
import { Loader } from "../../../../../shared/loader/loader";
@Component({
  selector: 'app-delete-product-modal',
  imports: [CustomDialog, DialogToggler, ErrorAlert, Loader],
  templateUrl: `./delete-product-modal.html`
})
export default class DeleteProductModal {

  @Output() onUpdate = new EventEmitter();

  public product = input.required<Product>();
  public dialogId = computed(() => `delete-product-modal-${this.product().id}`);


  public loading = signal(false);
  public errorMessage = signal("");

  constructor(
    private readonly service: ProductService
  ) {}


  onClickHandler() {
    this.loading.set(true);
    this.errorMessage.set("");
    this.service.delete(this.product().id).pipe(take(1)).subscribe((result) => {
      setTimeout(() => {
        this.loading.set(false);
        if (result === "") {
          this.onUpdate.emit();
          return;
        }
        this.errorMessage.set("No se pudo eliminar");
      }, 1000);
    })
  }
}