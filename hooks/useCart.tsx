import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { type } from "os";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    }, [])

    console.log('qty', cartTotalQty)
    console.log('amount', cartTotalAmount)

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const {total, qty}  =  cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
    
                    acc.total += itemTotal
                    acc.qty += item.quantity
    
                    return acc
                } ,
                {
                    total: 0,
                    qty: 0
                })

                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }}
        getTotals()
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;

            if (prev) {
                updateCart = [...prev, product]
            } else {
                updateCart = [product]
            }

            toast.success('Productos agregados al carrito')

            localStorage.setItem('eShopCartItems', JSON.stringify(updateCart))
            return updateCart
        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)
            toast.success('Producto removido del carrito')
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
        }


    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 99) {
            return toast.error('No puedes agregar mas de 99 productos')
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 1) {
            return toast.error('No puedes agregar menos de 1 producto')
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart: () => {
            setCartProducts(null)
            localStorage.removeItem('eShopCartItems')
        }
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context
}