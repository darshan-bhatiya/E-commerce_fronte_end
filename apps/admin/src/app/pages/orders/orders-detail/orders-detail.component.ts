import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@bluebites/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: []
})

export class OrdersDetailComponent implements OnInit, OnDestroy {
  order!: Order;
  orderStatuses: {id: string, name: string}[] = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();


  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key: any) => {
      return {
        id: key,
        name: this.get_status(key)
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id'])
        .pipe(takeUntil(this.endsubs$))
        .subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event:any) {
    this.orderService.updateOrder({ status: event.value }, this.order.id)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }

  get_status(key : 1 | 2 | 3 | 4) {
    return ORDER_STATUS[key].label
  }
}
