import * as firebase from 'firebase';
import { Item, Customization } from './business';

export class User {
  constructor(
      public userRef: firebase.database.Reference,
      public userId: string, 
      public fullName: string, 
      public phoneNumber: string,
      public orders: Order[],
      public cart: Cart
  ) {}
  static async getUser(userRef: firebase.database.Reference): Promise<User> {
    var user = await userRef.once('value').then(snap => snap.val());
    var orders: Order[];
    var cart: Cart = await Cart.getCart(userRef.child('cart'));
    await userRef.child('orders').on('value', snap => {
      snap.forEach(snap => {
        var orderRef = firebase.database().ref('/orders/'+snap.val());
        Order.getOrder(orderRef).then(val => orders.push(val));
      })
    })
    return new User(userRef, user.userId, user.fullName, user.phoneNumber, orders, cart);
  }
}

export class Order {
  constructor(
    public orderRef: firebase.database.Reference,
    public orderId: string,
    public timestamp: string,
    public paymentMethod: string,
    public transanctionId: string,
    public orderItems: OrderItem[],
  ) {}
  static async getOrder(orderRef: firebase.database.Reference): Promise<Order> {
    var order = await orderRef.once('value').then(snap => snap.val());
    var orderItems: OrderItem[];
    await orderRef.child('items').on('value', snap => {
      snap.forEach(snap => {
        var orderItemRef = orderRef.child('items/'+snap.val().itemId);
        OrderItem.getOrderItem(orderItemRef).then(val => orderItems.push(val));
      })
    })
    return new Order(orderRef, order.orderId, order.timestamp, order.paymentMethod, order.transanctionId, orderItems);
  }
}

export class Cart {
  constructor(
    public cartRef: firebase.database.Reference,
    public cartItems: OrderItem[]
  ) {
    cartRef.on('child_added', async snap => {
      await OrderItem.getOrderItem(cartRef.child('items'+snap.key)).then(val => cartItems.push(val));
    });
  };
  static async getCart(cartRef: firebase.database.Reference): Promise<Cart> {
    var cartItems: OrderItem[];
    await cartRef.child('items').on('value', snap => {
      snap.forEach(snap => {
        var cartItemRef = cartRef.child(snap.val().itemId);
        OrderItem.getOrderItem(cartItemRef).then(val => cartItems.push(val));
      })
    })
    return new Cart(cartRef, cartItems);
  }
  addItem(item: Item, customs: Customization[]) {
    this.cartRef.child('items').push({
      orgId: item.orgId,
      name: item.name,
      price: item.price,
      customs: customs,
      vegitarian: item.vegitarian,
    })
  }
}

export class OrderItem {
  constructor(
    public orderItemRef: firebase.database.Reference,
    public orgId: string,
    public name: string,
    public price: string,
    public customs: Customization[],
    public vegitarian: boolean
  ) {}
  static async getOrderItem(orderItemRef: firebase.database.Reference): Promise<OrderItem> {
    var orderItem = await orderItemRef.once('value').then(snap => snap.val());
    var customs: Customization[];
    await orderItemRef.child('customs').on('value', snap => {
      snap.forEach(snap => {
        var customRef = orderItemRef.child('customs'+snap.val().custId);
        Customization.getCustomization(customRef).then(val => customs.push(val));
      })
    })
    return new OrderItem(orderItemRef, orderItem.orgId, orderItem.name, orderItem.price, customs, orderItem.vegitarian);
  }
}