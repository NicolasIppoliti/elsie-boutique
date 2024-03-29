import React, { useContext } from 'react'
import { CartContext } from '../../CartContext';	
import { Link } from 'react-router-dom';
import { addDoc, getFirestore, collection } from 'firebase/firestore';

const CartView = () => {

    const { cart, removeProduct, totalPrice, totalProducts } = useContext(CartContext);

    const order = {
        buyer: {
            name: 'Nombre ejemplo',
            email: 'email@ejemplo.com',
            phone: '123456789',
            address: 'Calle de Ejemplo 123'
        },
        products: cart.map(product => ({ id: product.id, name: product.name, price: product.discount, quantity: product.quantity })),
        total: totalPrice(),
        date: new Date(),
    }

    const handleClick = () => {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        addDoc(ordersCollection, order).then(({id}) => 
            alert(`Su pedido se ha realizado con éxito. Su número de pedido es: ${id}`));
    }

    if(cart.length === 0) {
        return (
            <div className="pt-28 w-3/4 px-10 py-10">
                <h1>Tu carrito esta vacio.</h1>
                <Link to='/' className="flex font-semibold text-indigo-600 text-sm mt-10">
                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                    Volver al inicio
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto mt-20 w-full">
            <div className="shadow-md my-10">
                <div className="w-full bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Tu Carrito</h1>
                        <h2 className="font-semibold text-2xl">{totalProducts()} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 sm:w-2/5">Producto</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5 sm:w-1/5">Cantidad</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Precio</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Subtotal</h3>
                    </div>
                    {cart.map(item => (
                    <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div className="flex w-full sm:w-2/5">
                            <div className="w-20">
                                <img className="h-24" src={item.img} alt="" />
                            </div>
                            <div className="flex flex-col justify-between ml-1 flex-grow">
                                <span className="font-bold text-xs sm:text-sm">{item.name}</span>
                                <span className="text-gray-500 text-xs uppercase">{item.category}</span>
                                <button onClick={() => removeProduct(item.id)}>
                                    <span className="font-semibold hover:text-red-500 text-gray-500 text-xs float-left">Eliminar</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center w-2/5 sm:w-1/5">
                            <input className="mr-4 sm:mx-2 border text-xs sm:text-sm text-center w-8" type="text" value={item.quantity} readOnly/>
                        </div>
                        <span className="text-center w-2/5 sm:w-1/5 font-semibold text-xs sm:text-sm">${item.discount}</span>
                        <span className="text-center w-2/5 sm:w-1/5 font-semibold text-xs sm:text-sm">${item.discount * item.quantity}</span>
                    </div>
                    ))}
                <Link to='/' className="flex font-semibold text-indigo-600 text-sm mt-10">
                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                    Seguir Comprando
                </Link>
                </div>
                <div id="summary" className="w-full px-8 pt-10 pb-8">
                    <h1 className="font-semibold text-2xl border-b pb-8">Resumen de Compra</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items: {totalProducts()}</span>
                        <span className="font-semibold text-sm">${totalPrice()}</span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">Envio</label>
                        <select className="block p-2 text-gray-600 w-full text-sm">
                            <option>Envio a domicilio - GRATIS</option>
                        </select>
                    </div>
                {/* <div className="py-10">
                    <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Codigo de Promocion</label>
                    <input type="text" id="promo" placeholder="CODERHOUSE" className="p-2 text-sm w-full"/>
                </div>
                <button onClick={() => } className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Aplicar</button> */}
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Costo total</span>
                            <span>${totalPrice()}</span>
                        </div>
                        <button onClick={handleClick} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartView