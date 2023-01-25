export interface Details{
  ProductId:number;
  productName:string;
  quantity:Number;
}

export interface Order{
  name:string;
  shippingAddress:string;
  city:string;
  date:string;
  isDelivery:boolean;
  id:number;
}
export interface DetailsOrder{
  details: Details[];
  orderID:number;
}
