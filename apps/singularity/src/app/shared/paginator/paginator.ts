import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  template: `
  <div class="my-2 w-fit flex">
  @if ( page() <= 1) {
        <button disabled (click)="decrementPage()" type="button" class="bg-slate-300 p-2 px-3 rounded-l-xl"> < </button>
    } @else {
        <button (click)="decrementPage()" type="button" class="p-2 px-3 rounded-l-xl bg-cyan-500"> < </button>
    }
    
    
    <p class="p-2 bg-slate-200">Page {{ page() }}</p>
    @if (page() >= numberOfPages()) {

        <button disabled (click)="incrementPage()" type="button" class="bg-slate-300 p-2 px-3 rounded-r-xl"> > </button>
    } @else {
        <button (click)="incrementPage()" type="button" class="p-2 px-3 rounded-r-xl bg-cyan-500"> > </button>
    }
  </div>
  `,
})
export default class Paginator {


    @Output() pageChangeEvent = new EventEmitter<number>();


    public defaultPage = input<number>(1)
    public pageSize = input<number>(5);
    public dataSize = input<number>(0);

    public page = computed(() => this.defaultPage());
    public numberOfPages = computed(() => Math.ceil(this.dataSize() / this.pageSize()))


    incrementPage() {
        this.onPageChangeHandler(this.page() + 1);
    }

    decrementPage() {
        this.onPageChangeHandler(this.page() - 1);
    }

    onPageChangeHandler(page: number) {
        this.pageChangeEvent.emit(page);
    }
}
