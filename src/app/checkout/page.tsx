'use client'; // For using hooks like useSearchParams

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

// Icons
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const MpesaIcon = () => (
  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm">
    M
  </div>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6-3.75h3.75a1.125 1.125 0 011.125 1.125v8.25M6 14.25a1.125 1.125 0 011.125-1.125H9.75a1.125 1.125 0 011.125 1.125v8.25M9.75 12V7.5a1.125 1.125 0 011.125-1.125h3.75a1.125 1.125 0 011.125 1.125V12m-6 0h6" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// Fallback UI Components
const TempLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`} {...props} />
);

interface RadioChildProps {
  value: string;
  checked?: boolean;
  onChange?: () => void;
}

const TempRadioGroup: React.FC<{
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ value, onValueChange, children, className }) => (
  <div role="radiogroup" className={`grid gap-3 ${className || ''}`}>
    {React.Children.map(children, (child) => {
      if (
        React.isValidElement<RadioChildProps>(child) &&
        typeof child.props.value !== 'undefined'
      ) {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onValueChange?.(child.props.value),
        });
      }
      return child;
    })}
  </div>
);

const TempRadioGroupItem: React.FC<{ 
  value: string; 
  id: string; 
  checked?: boolean; 
  onChange?: () => void; 
  children: React.ReactNode;
  className?: string;
}> = ({ value, id, checked, onChange, children, className }) => (
  <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
    checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
  } ${className || ''}`} onClick={onChange}>
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const TempCheckbox: React.FC<{ 
  id: string; 
  checked?: boolean; 
  onChange?: (checked: boolean) => void; 
  children: React.ReactNode;
  className?: string;
}> = ({ id, checked, onChange, children, className }) => (
  <div className={`flex items-center space-x-2 ${className || ''}`}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <TempLabel htmlFor={id} className="cursor-pointer">
      {children}
    </TempLabel>
  </div>
);

function CheckoutPage() {
  const { lang, setLang, t } = useLanguage();
  const searchParams = useSearchParams();
  const dealId = searchParams.get('dealId');
  const isDonation = searchParams.get('donate') === 'true';

  // State management
  const { cart } = useCart();
  const cartItems = Object.values(cart);
  const [collectionType, setCollectionType] = useState<'pickup' | 'delivery' | 'donation'>('pickup');
  const [deliveryCost, setDeliveryCost] = useState(50);
  const [payOnPickup, setPayOnPickup] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('+2547XX XXX XXX');
  const [selectedNGO, setSelectedNGO] = useState('auto-match');
  const [pickupNotes, setPickupNotes] = useState('');

  useEffect(() => {
    if (isDonation) {
      setCollectionType('donation');
    }
  }, [isDonation]);

  if (!cartItems.length) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div>Your cart is empty. <a href="/consumer" className="text-blue-600 underline">Continue shopping</a></div>
      </div>
    );
  }

  // Calculate total for all cart items
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateTotal = () => {
    let total = subtotal;
    if (collectionType === 'delivery') {
      total += deliveryCost;
    }
    return total;
  };

  const handleConfirm = () => {
    console.log('Checkout confirmed:', {
      dealId: dealId,
      collectionType,
      total: calculateTotal(),
      payOnPickup,
      mpesaNumber: !payOnPickup ? mpesaNumber : null,
      selectedNGO: collectionType === 'donation' ? selectedNGO : null,
      pickupNotes
    });
  };

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
        <header className="bg-white shadow-sm p-4 sticky top-0 z-40 border-b">
          <div className="container mx-auto flex items-center">
            <Link 
              href={dealId ? `/deal/${dealId}` : "/consumer"} 
              className="text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <BackArrowIcon />
            </Link>
            <h1 className="font-bold text-xl text-gray-900">
              {collectionType === 'donation' ? 'Confirm Donation' : 'Checkout'}
            </h1>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column: Order Summary & Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Order Summary
                    {collectionType === 'donation' && <HeartIcon />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Item Details */}
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                          {item.sellerName && <p className="text-sm text-gray-600 mt-1">From: {item.sellerName}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg text-gray-900">Ksh {item.price} x {item.quantity}</p>
                          <p className="text-gray-600">Subtotal: Ksh {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Collection/Delivery/Donation Options */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-900 border-b pb-2">
                      {collectionType === 'donation' ? 'Donation Options' : 'Collection Options'}
                    </h4>
                    
                    <TempRadioGroup value={collectionType} onValueChange={(value) => setCollectionType(value as any)}>
                      <TempRadioGroupItem value="pickup" id="pickup">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">📍</span>
                          </div>
                          <div>
                            <div className="font-medium">Collect at {cartItems[0].sellerName}</div>
                            <div className="text-sm text-gray-500">Free pickup</div>
                          </div>
                        </div>
                      </TempRadioGroupItem>

                      <TempRadioGroupItem value="delivery" id="delivery">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TruckIcon />
                          </div>
                          <div>
                            <div className="font-medium">Boda Delivery</div>
                            <div className="text-sm text-gray-500">+Ksh {deliveryCost} delivery fee</div>
                          </div>
                        </div>
                      </TempRadioGroupItem>

                      <TempRadioGroupItem value="donation" id="donation">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <HeartIcon />
                          </div>
                          <div>
                            <div className="font-medium">Donate this item</div>
                            <div className="text-sm text-gray-500">Help someone in need</div>
                          </div>
                        </div>
                      </TempRadioGroupItem>
                    </TempRadioGroup>

                    {/* Delivery Details */}
                    {collectionType === 'delivery' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <TruckIcon />
                          <span className="font-medium text-green-800">Boda delivery selected</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Estimated delivery time: 30-45 minutes after preparation
                        </p>
                        <Link href="#" className="text-green-600 underline text-sm hover:text-green-700">
                          View delivery area coverage
                        </Link>
                      </div>
                    )}

                    {/* Donation Details */}
                    {collectionType === 'donation' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-3">
                        <div className="flex items-center gap-3">
                          <HeartIcon />
                          <span className="font-medium text-red-800">Donation selected</span>
                        </div>
                        <div>
                          <TempLabel htmlFor="ngo-select" className="block text-sm font-medium text-red-700 mb-2">
                            Select NGO (Optional):
                          </TempLabel>
                          <select 
                            id="ngo-select" 
                            value={selectedNGO}
                            onChange={(e) => setSelectedNGO(e.target.value)}
                            className="w-full p-2 border border-red-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="auto-match">Auto-Match to Needy</option>
                            <option value="kibera-shelter">Kibera Shelter</option>
                            <option value="mathare-outreach">Mathare Outreach</option>
                            <option value="dandora-community">Dandora Community Center</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pickup Notes */}
                  <div className="space-y-2">
                    <TempLabel htmlFor="pickup-notes" className="text-sm font-medium text-gray-700">
                      Note for Seller/Pickup (Optional)
                    </TempLabel>
                    <Input 
                      id="pickup-notes" 
                      value={pickupNotes}
                      onChange={(e) => setPickupNotes(e.target.value)}
                      placeholder="e.g., I'm wearing a red cap, I'll be at the main entrance"
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Payment */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span>Item Cost</span>
                      <span>Ksh {subtotal}</span>
                    </div>
                    {collectionType === 'delivery' && (
                      <div className="flex justify-between text-base text-gray-600">
                        <span>Delivery Fee</span>
                        <span>Ksh {deliveryCost}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>Ksh {calculateTotal()}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  {collectionType !== 'donation' && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-lg">Payment Method</h4>
                      
                      {/* M-PESA Payment */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border-2 border-green-200 rounded-lg bg-green-50">
                          <MpesaIcon />
                          <div className="flex-1">
                            <div className="font-medium text-green-800">Pay with M-PESA</div>
                            <div className="text-sm text-green-600">Instant payment</div>
                          </div>
                        </div>
                        
                        {!payOnPickup && (
                          <div className="space-y-2">
                            <TempLabel htmlFor="mpesa-number" className="text-sm font-medium">
                              M-PESA Phone Number
                            </TempLabel>
                            <Input
                              id="mpesa-number"
                              type="tel"
                              value={mpesaNumber}
                              onChange={(e) => setMpesaNumber(e.target.value)}
                              placeholder="+254XXXXXXXXX"
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>

                      {/* Pay on Pickup Option */}
                      <TempCheckbox 
                        id="pay-on-pickup" 
                        checked={payOnPickup}
                        onChange={setPayOnPickup}
                      >
                        Pay on Pickup (Cash/M-PESA)
                      </TempCheckbox>
                    </div>
                  )}

                  {/* Donation Message */}
                  {collectionType === 'donation' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <HeartIcon />
                        <span className="font-medium text-blue-800">Thank you for your generosity!</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Your donation will help someone in need. No payment required.
                      </p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                    onClick={handleConfirm}
                  >
                    {collectionType === 'donation' ? 'Confirm Donation' : `Confirm & Pay (Ksh ${calculateTotal()})`}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CheckoutPageWrapper() {
  return (
    <LanguageProvider>
      <CheckoutPage />
    </LanguageProvider>
  );
}