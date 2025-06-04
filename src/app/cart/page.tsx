'use client';
import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const cartItems = Object.values(cart);
  const { lang, setLang, t } = useLanguage();

  const cartT = t.cart;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            className={`px-3 py-1 rounded-l ${lang === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`px-3 py-1 rounded-r ${lang === 'sw' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('sw')}
          >SW</button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow" onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = '/consumer'}>
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{cartT.myCart}</h1>
              <p className="text-gray-600">{cartT.itemsInCart(cartItems.length)}</p>
            </div>
          </div>
          <div className="p-3 rounded-full bg-orange-100">
            <ShoppingBag className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center text-2xl shadow-sm overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full rounded-xl"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <span className="text-gray-400">🍽️</span>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 text-lg truncate" title={item.name}>{item.name}</h3>
                        {item.sellerName && (
                          <p className="text-sm text-gray-500 truncate" title={item.sellerName}>{item.sellerName}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={cartT.remove(item.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity and Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition-colors"
                          disabled={item.quantity <= 1}
                          aria-label={cartT.decrease(item.name)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-gray-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition-colors"
                          aria-label={cartT.increase(item.name)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600 text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} {cartT.each}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{cartT.orderSummary}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{cartT.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>{cartT.discount}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>{cartT.total}</span>
                    <span className="text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                onClick={() => window.location.href = '/checkout'}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{cartT.proceedToCheckout}</span>
              </button>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                  <span>🔒</span>
                  <span>{cartT.secureCheckout}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Cart State (hidden when items exist) */}
        {cartItems.length === 0 && (
          <div className="text-center bg-white p-12 rounded-2xl shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{cartT.emptyCart}</h2>
            <p className="text-gray-600 mb-6">{cartT.emptyCartDesc}</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors" onClick={() => window.location.href = '/consumer'}>
              {cartT.continueShopping}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPageWrapper() {
  return (
    <LanguageProvider>
      <CartPage />
    </LanguageProvider>
  );
}