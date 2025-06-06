import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@/app/generated/prisma';

interface SetAndGetTypes {
    set: {(partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>), replace?: false): void;
          (state: Store | ((state: Store) => Store), replace: true): void;
        };
    get: () => Store
}

interface Store {
    order: OrderItem[],
    addToOrder: (product: Product) => void,
    increaseQuantity: (productId: Product['id']) => void,
    decreaseQuantity: (productId: Product['id']) => void,
    deleteProduct: (productId: Product['id']) => void,
    clearOrder: () => void,
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => addToOrder(product, {get, set}),
    increaseQuantity: (productId) => increaseQuantity(productId, {get, set}),
    decreaseQuantity: (productId) => decreaseQuantity(productId, {get, set}),
    deleteProduct: (productId) => deleteProduct(productId, {get,set}),
    clearOrder: () => clearOrder({get, set}),
}));

function addToOrder(product: Product, {get, set}: SetAndGetTypes): void {
    const {categoryId, image, ...data} = product;

    let order: OrderItem[] = [];

    if(get().order.find(item => item.id === product.id)) {
        order = get().order.map(item => item.id === product.id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.price * (item.quantity + 1)
        } : item);
    } else {
        order = [...get().order, {
            ...data,
            quantity: 1,
            subtotal: 1 * product.price 
        }]
    }

    set(() => ({
        order 
    }));
}

function increaseQuantity(id: number, {get, set}: SetAndGetTypes): void {
    set((state) => ({
        order: state.order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.price * (item.quantity + 1)
        } : item)
    }));
}

function decreaseQuantity(id: number, {get, set}: SetAndGetTypes): void {
    const order = get().order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity - 1,
        subtotal: item.price * (item.quantity - 1)
    } : item);

    set(() => ({
        order: order
    }));
}

function deleteProduct(id: number, {get,set}: SetAndGetTypes): void {
    const order = get().order.filter((item) => item.id !== id);
    
    set(() => ({
        order: order
    }));
}

function clearOrder({set}: SetAndGetTypes) {
    set(() => ({
        order: []
    }));
}