export interface Product {
  id?: string,
  imgUrl: string,
  price: number,
  discount: number,
  main: boolean,
  shop: string,
  name: string,
  description: string,
  shipping: string | null,
  discountUntil: string,
  new: boolean,
  color: Array<string>,
  size:  Array<string>,
  review?: Review[]
}

export interface Review {
  author: string,
  text: string,
  rating: number
}

export interface Order {
  product: {
    id: string
  },
  address: {
    country: string,
    city: string,
    address: string
  },
  paymentMethod: {
    payment: string
  },
  deliveryDate: {
    date: string
  }
}

export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface Shop {
  name: string,
  code: string
}
export interface Shipping {
  name: string,
  code: string
}
export interface Color {
  name: string,
  value: string
}
export interface Size {
  name: string,
  value: string
}

export interface UserRegister {
  displayName: string,
  role: string,
  email: string,
  password: string,
  uid: string
}

export interface AppUser {
  displayName: string,
  email: string,
  role: string
}
