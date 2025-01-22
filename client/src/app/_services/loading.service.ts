import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequestCount = 0

  private spinner = inject(NgxSpinnerService)
  constructor() { }

  loading() {
    this.loadingRequestCount++
    this.spinner.show(undefined, {
      type: "timer",
      bdColor: 'rgb(0,0,0,50)',
      color: '#F2EFE7',
      fullScreen: true,
    })
  }

  idle() {
    this.loadingRequestCount--
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0
      this.spinner.hide()
    }
  }
}
