function CartItemCard({item}) {
    return (
        <li key={item.id} className="flex items-center justify-between bg- p-4 rounded-lg shadow">
            <div>
                <h2 className="text-lg font-semibold text-gray-600">{item.product.name}</h2>
                <p className="text-gray-600">${item.product.price}</p>
            </div>
            <span className="text-gray-500">Quantity: {item.quantity}</span>
        </li>
    )
}

export default CartItemCard;