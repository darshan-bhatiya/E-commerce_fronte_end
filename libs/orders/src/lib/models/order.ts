import { OrderItem } from './order-item';
import { User } from '@bluebites/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: 0 | 1 | 2 | 3 ;
  totalPrice?: string;
  user?: User | string;
  dateOrdered?: string;
}