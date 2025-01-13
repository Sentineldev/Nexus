import { Component, computed, EventEmitter, Inject, input, Output, signal } from '@angular/core';
import CustomDialog from '../../../../../shared/dialog/custom-dialog';
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import Product from '../../../classes/product.class';
import ProductService from '../../../services/product-service';
import { ErrorAlert } from '../../../../../shared/alerts/error-alert';
import { Loader } from "../../../../../shared/loader/loader";
import ProductRepository from '../../../../../shared/interfaces/product-repository.interface';
import { SuccessAlert } from "../../../../../shared/alerts/success-alert";
import ApiProductRepository from '../../../../../shared/repositories/api/product-api.repository';
@Component({
  selector: 'app-delete-product-modal',
  imports: [CustomDialog, DialogToggler, ErrorAlert, Loader, SuccessAlert],
  templateUrl: `./delete-product-modal.html`
})
export default class DeleteProductModal {


  public product = input.required<Product>();
  public dialogId = computed(() => `delete-product-modal-${this.product().id}`);


  public loading = signal(false);
  public errorMessage = signal("");
  public successMessage = signal("");

  constructor(
    @Inject(ApiProductRepository)
    private readonly repository: ProductRepository,
    private readonly service: ProductService
  ) {}


  onClickHandler() {
    this.loading.set(true);
    this.errorMessage.set("");
    this.repository.delete(this.product().id).subscribe((result) => {
      setTimeout(() => {
        this.loading.set(false);
        if (result === "") {
          this.successMessage.set("Eliminado correctamente");
          this.service.refreshPage();
          return;
        }
        this.errorMessage.set("No se pudo eliminar");
      }, 1000);
    })
  }
}