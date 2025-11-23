import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight, ShoppingBag, MessageCircle, MapPin, Calculator, PlusCircle, Utensils, Drumstick, Truck, Store, ChevronDown } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'meat' | 'size' | 'quantity' | 'details' | 'confirmation';

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  // Changed initial step to 'meat'
  const [step, setStep] = useState<Step>('meat');
  const [direction, setDirection] = useState(1);
  
  const [orderData, setOrderData] = useState({
    size: '',
    meat: '',
    quantity: 1,
    extras: [] as string[],
    name: '',
    phone: '',
    address: '',
    deliveryType: 'amman',
    governorate: '' // Added governorate field
  });

  // Reset step to meat when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('meat');
      // Reset selection
      setOrderData(prev => ({ 
        ...prev, 
        meat: '', 
        size: '', 
        quantity: 1, 
        extras: [],
        deliveryType: 'amman',
        governorate: ''
      }));
    }
  }, [isOpen]);

  const meatSizes = ['1 كيلو', '2 كيلو', '3 كيلو', '4 كيلو'];
  const chickenSizes = ['1 جاجه', '2 جاجات', '3 جاجات', '4 جاجات'];
  
  const meats = ['بلدي', 'روماني', 'مستورد'];
  const quantities = [1, 2, 3, 4, 5, 6];

  const extrasOptions = [
    { id: 'rice', label: 'إضافة رز', price: 1.00 },
    { id: 'jameed', label: 'إضافة جميد كركي سائل', price: 2.00 },
    { id: 'almonds', label: 'إضافة لوز', price: 0.70 },
  ];

  const deliveryOptions = [
    { id: 'pickup', label: 'استلام من المطعم', price: 0, icon: <Store size={20} />, sub: 'من فرع صويلح' },
    { id: 'sweileh', label: 'توصيل داخل صويلح', price: 1.50, icon: <Truck size={20} />, sub: '1.50 دينار' },
    { id: 'amman', label: 'توصيل داخل عمان', price: 3.00, icon: <Truck size={20} />, sub: '3.00 دينار' },
    { id: 'amman_far', label: 'توصيل أطراف عمان', price: 3.50, icon: <Truck size={20} />, sub: '3.50 دينار' },
    { id: 'outside', label: 'توصيل محافظات', price: 0, icon: <MapPin size={20} />, sub: 'حسب المحافظة' },
  ];

  const governorates = [
    { name: 'الزرقاء', price: 6.00 },
    { name: 'البلقاء (السلط)', price: 6.00 },
    { name: 'مأدبا', price: 7.00 },
    { name: 'إربد', price: 10.00 },
    { name: 'جرش', price: 10.00 },
    { name: 'عجلون', price: 11.00 },
    { name: 'المفرق', price: 11.00 },
    { name: 'الكرك', price: 12.00 },
    { name: 'الطفيلة', price: 14.00 },
    { name: 'معان', price: 16.00 },
    { name: 'العقبة', price: 17.00 },
  ];

  // Pricing Logic Configuration
  const pricing: Record<string, Record<string, number>> = {
    'بلدي': {
      '1 كيلو': 20,
      '2 كيلو': 38,
      '3 كيلو': 55,
      '4 كيلو': 70
    },
    'روماني': {
      '1 كيلو': 18,
      '2 كيلو': 34,
      '3 كيلو': 50,
      '4 كيلو': 65
    },
    'مستورد': {
      '1 كيلو': 15,
      '2 كيلو': 29,
      '3 كيلو': 42,
      '4 كيلو': 54
    },
    'جاج': {
      '1 جاجه': 14,
      '2 جاجات': 26,
      '3 جاجات': 38,
      '4 جاجات': 48
    }
  };

  // Helper to calculate unit price
  const getUnitPrice = (meat: string, size: string) => {
    if (!meat || !size) return 0;
    return pricing[meat]?.[size] || 0;
  };

  const toggleExtra = (id: string) => {
    setOrderData(prev => {
      const exists = prev.extras.includes(id);
      if (exists) {
        return { ...prev, extras: prev.extras.filter(e => e !== id) };
      } else {
        return { ...prev, extras: [...prev.extras, id] };
      }
    });
  };

  // Calculate Totals
  const unitPrice = getUnitPrice(orderData.meat, orderData.size);
  const basePrice = unitPrice * orderData.quantity;
  
  const extrasTotal = orderData.extras.reduce((total, extraId) => {
    const extra = extrasOptions.find(e => e.id === extraId);
    return total + (extra ? extra.price : 0);
  }, 0);

  const selectedDelivery = deliveryOptions.find(d => d.id === orderData.deliveryType) || deliveryOptions[2];
  
  // Calculate delivery price based on governorate if type is outside
  let deliveryPrice = selectedDelivery.price;
  if (orderData.deliveryType === 'outside') {
      const gov = governorates.find(g => g.name === orderData.governorate);
      deliveryPrice = gov ? gov.price : 0;
  }

  const totalPrice = basePrice + extrasTotal + deliveryPrice;

  const handleNext = (nextStep: Step) => {
    if (step === 'meat' && !orderData.meat) return;
    if (step === 'size' && !orderData.size) return;
    
    // Validate Details Step
    if (step === 'details') {
        if (!orderData.name || !orderData.phone) return;
        // If delivery is outside, force governorate selection
        if (orderData.deliveryType === 'outside' && !orderData.governorate) return;
    }
    
    setDirection(1);
    setStep(nextStep);
  };

  const handleBack = (prevStep: Step) => {
    setDirection(-1);
    setStep(prevStep);
  };

  const handleWhatsappRedirect = () => {
    const selectedExtras = orderData.extras.map(id => extrasOptions.find(e => e.id === id)?.label).join('، ');
    
    const deliveryLabel = orderData.deliveryType === 'outside' 
        ? `محافظات (${orderData.governorate})` 
        : selectedDelivery.label;

    const message = `*طلب جديد من مطبخ أبو محمد* 🇯🇴
------------------
🥩 *النوع:* ${orderData.meat}
${orderData.meat === 'جاج' ? '🍗' : '⚖️'} *الكمية/الحجم:* ${orderData.size}
🔢 *عدد السدور:* ${orderData.quantity}
${selectedExtras ? `➕ *الإضافات:* ${selectedExtras}` : ''}
------------------
🚚 *التوصيل:* ${deliveryLabel}
------------------
💰 *سعر السدر:* ${unitPrice} دينار
${selectedExtras ? `💵 *سعر الإضافات:* ${extrasTotal.toFixed(2)} دينار` : ''}
🛵 *رسوم التوصيل:* ${deliveryPrice.toFixed(2)} دينار
🧾 *الإجمالي الكلي:* ${totalPrice.toFixed(2)} دينار
------------------
👤 *الاسم:* ${orderData.name}
📱 *رقم الهاتف:* ${orderData.phone}
📍 *العنوان:* ${orderData.address}
${orderData.deliveryType === 'outside' ? `🏙️ *المحافظة:* ${orderData.governorate}` : ''}
------------------
الرجاء تأكيد الطلب!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/962772272961?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  if (!isOpen) return null;

  // Determine which sizes array to use
  const currentSizes = orderData.meat === 'جاج' ? chickenSizes : meatSizes;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-sans" dir="rtl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-[650px]"
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-2 text-amber-500">
            <ShoppingBag size={20} />
            <h2 className="font-bold text-lg">ابدأ الطلب</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            
            {/* Step 1: Meat Selection */}
            {step === 'meat' && (
              <motion.div
                key="meat"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">اختر نوع المنسف</h3>
                
                <div className="flex flex-col gap-4 h-full">
                  
                  {/* Chicken Option - Featured Above */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOrderData({ ...orderData, meat: 'جاج', size: '' })} // Clear size when switching type
                    className={`
                      relative rounded-2xl border-2 transition-all duration-300 flex items-center justify-between p-5
                      ${orderData.meat === 'جاج'
                        ? 'border-amber-500 bg-amber-500/20 text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] ring-1 ring-amber-500/50'
                        : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800'
                      }
                    `}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${orderData.meat === 'جاج' ? 'bg-amber-500 text-white' : 'bg-zinc-700 text-zinc-400'}`}>
                           <Drumstick size={24} />
                        </div>
                        <div className="text-right">
                           <span className="block font-bold text-xl">منسف جاج</span>
                           <span className="text-sm opacity-70">خيار اقتصادي وشهي</span>
                        </div>
                     </div>
                     
                     {orderData.meat === 'جاج' && (
                        <div className="text-amber-500 bg-amber-500/20 rounded-full p-1">
                           <Check size={20} />
                        </div>
                     )}
                  </motion.button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-zinc-900 text-zinc-500">أو اختر نوع اللحمة</span>
                    </div>
                  </div>

                  {/* Meat Options Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {meats.map((m, index) => {
                      const isLast = index === meats.length - 1;
                      return (
                        <motion.button
                          key={m}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setOrderData({ ...orderData, meat: m, size: '' })}
                          className={`
                            relative rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4
                            ${isLast ? 'col-span-2 flex-row gap-4 h-24' : 'aspect-square'}
                            ${orderData.meat === m
                              ? 'border-amber-500 bg-amber-500/20 text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] ring-1 ring-amber-500/50'
                              : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800'
                            }
                          `}
                        >
                          {orderData.meat === m && (
                              <div className="absolute top-3 left-3 text-amber-500 bg-amber-500/20 rounded-full p-1">
                                  <Check size={16} />
                              </div>
                          )}

                          <span className={`font-bold ${isLast ? 'text-2xl' : 'text-xl'}`}>{m}</span>
                          {/* Label for context */}
                          <span className="text-xs text-zinc-500">{m === 'بلدي' ? 'الأفخم' : m === 'روماني' ? 'المميز' : 'الاقتصادي'}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Size/Count Selection */}
            {step === 'size' && (
              <motion.div
                key="size"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full p-6 flex flex-col"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {orderData.meat === 'جاج' ? 'اختر عدد الجاجات' : 'اختر حجم السدر'}
                </h3>
                 {/* Show selected meat context */}
                 <div className="text-center mb-4 text-zinc-400 text-sm">
                    النوع المختار: <span className="text-amber-500 font-bold">{orderData.meat}</span>
                 </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentSizes.map((s) => {
                     const currentPrice = getUnitPrice(orderData.meat, s);
                     return (
                        <motion.button
                        key={s}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOrderData({ ...orderData, size: s })}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative shadow-lg h-32 ${
                            orderData.size === s
                            ? 'border-amber-500 bg-amber-500/20 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                            : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                        }`}
                        >
                        <span className="text-lg font-bold mb-2">{s}</span>
                        <span className="text-sm font-mono bg-black/30 px-2 py-1 rounded text-amber-500">{currentPrice} دينار</span>
                        
                        {orderData.size === s && (
                            <div className="absolute top-3 left-3 text-amber-500 bg-amber-500/20 rounded-full p-1">
                            <Check size={14} />
                            </div>
                        )}
                        </motion.button>
                     )
                  })}
                </div>

                {/* Dynamic Price Display */}
                <div className="mt-auto bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-center backdrop-blur-sm">
                    {orderData.size ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="text-zinc-400 text-sm block mb-1">السعر المبدئي</span>
                            <span className="text-3xl font-bold text-amber-500">{unitPrice} دينار</span>
                        </motion.div>
                    ) : (
                        <span className="text-zinc-500">اختر الحجم لعرض السعر</span>
                    )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Quantity & Extras */}
            {step === 'quantity' && (
              <motion.div
                key="quantity"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full p-6 flex flex-col"
              >
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">الإضافات والعدد</h3>
                    
                    {/* Quantity Selector - Restored to Grid */}
                    <div className="mb-8">
                        <label className="block text-zinc-400 mb-3 font-medium">عدد السدور:</label>
                        <div className="grid grid-cols-3 gap-3">
                           {quantities.map((q) => (
                              <button
                                key={q}
                                onClick={() => setOrderData(p => ({ ...p, quantity: q }))}
                                className={`
                                  py-3 rounded-xl border font-bold text-lg transition-all
                                  ${orderData.quantity === q
                                    ? 'border-amber-500 bg-amber-500/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                                    : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800'
                                  }
                                `}
                              >
                                {q}
                              </button>
                           ))}
                        </div>
                        {/* New Button for Larger Quantities */}
                        <button
                            onClick={() => window.open('https://wa.me/962772272961', '_blank')}
                            className="mt-4 w-full py-3 rounded-xl border border-zinc-700 border-dashed text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <MessageCircle size={16} />
                            <span>للكميات الأكبر (عزائم)؟ تواصل معنا عبر الواتساب</span>
                        </button>
                    </div>

                    {/* Extras */}
                    <div>
                        <label className="block text-zinc-400 mb-3 font-medium">إضافات أخرى:</label>
                        <div className="space-y-3">
                            {extrasOptions.map((extra) => (
                                <div 
                                    key={extra.id}
                                    onClick={() => toggleExtra(extra.id)}
                                    className={`
                                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                                        ${orderData.extras.includes(extra.id) 
                                            ? 'border-amber-500 bg-amber-500/10' 
                                            : 'border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                                            orderData.extras.includes(extra.id) 
                                                ? 'bg-amber-500 border-amber-500' 
                                                : 'border-zinc-500'
                                        }`}>
                                            {orderData.extras.includes(extra.id) && <Check size={14} className="text-white" />}
                                        </div>
                                        <span className="font-medium text-white">{extra.label}</span>
                                    </div>
                                    <span className="text-amber-500 font-bold">+{extra.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-lg font-bold">
                    <span>المجموع الحالي:</span>
                    <span className="text-amber-500">{(basePrice + extrasTotal).toFixed(2)} دينار</span>
                </div>
              </motion.div>
            )}

            {/* Step 4: Details & Delivery */}
            {step === 'details' && (
              <motion.div
                key="details"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full p-6 overflow-y-auto custom-scrollbar"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">معلومات التوصيل</h3>
                
                <div className="space-y-6">
                    {/* Delivery Options */}
                    <div className="grid grid-cols-2 gap-3">
                        {deliveryOptions.map((option) => (
                             <div 
                                key={option.id}
                                onClick={() => setOrderData(prev => ({...prev, deliveryType: option.id, governorate: ''}))}
                                className={`
                                    cursor-pointer p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all
                                    ${orderData.deliveryType === option.id 
                                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50' 
                                        : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800'
                                    }
                                `}
                             >
                                 <div className={orderData.deliveryType === option.id ? 'text-amber-500' : 'text-zinc-500'}>
                                     {option.icon}
                                 </div>
                                 <div className="text-sm font-bold">{option.label}</div>
                                 <div className="text-xs opacity-70 bg-black/20 px-2 py-0.5 rounded">{option.sub}</div>
                             </div>
                        ))}
                    </div>

                    {/* Governorate Selection if 'Outside' is selected */}
                    <AnimatePresence>
                    {orderData.deliveryType === 'outside' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <label className="block text-amber-500 mb-2 font-medium text-sm">اختر المحافظة:</label>
                            <div className="relative">
                                <select 
                                    value={orderData.governorate}
                                    onChange={(e) => setOrderData({...orderData, governorate: e.target.value})}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white appearance-none focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="" disabled>اختر المحافظة...</option>
                                    {governorates.map((gov) => (
                                        <option key={gov.name} value={gov.name}>
                                            {gov.name} (+{gov.price} دينار)
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Personal Details */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-zinc-400 mb-2 text-sm">الاسم الكريم:</label>
                            <input
                                type="text"
                                value={orderData.name}
                                onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                                placeholder="أبو فلان..."
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-zinc-400 mb-2 text-sm">رقم الهاتف:</label>
                            <input
                                type="tel"
                                value={orderData.phone}
                                onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                                placeholder="079..."
                                dir="ltr"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-right text-white focus:border-amber-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-zinc-400 mb-2 text-sm">العنوان بالتفصيل:</label>
                            <textarea
                                value={orderData.address}
                                onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                                placeholder="اسم الشارع، رقم العمارة، معلم قريب..."
                                rows={2}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Final Confirmation */}
            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full p-6 flex flex-col items-center justify-center text-center"
              >
                 <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
                    <Check size={40} />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">جاهز للإرسال!</h3>
                 <p className="text-zinc-400 mb-8 max-w-xs mx-auto">سيتم تحويلك إلى واتساب لإرسال الطلب مباشرة إلى المطعم</p>
                 
                 <div className="bg-zinc-800/50 p-6 rounded-2xl w-full mb-8 border border-zinc-800 text-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-zinc-400">الإجمالي الكلي:</span>
                        <span className="text-amber-500 font-bold text-xl">{totalPrice.toFixed(2)} دينار</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-700 pt-2 mt-2">
                        <span className="text-zinc-500">يشمل التوصيل والضريبة</span>
                    </div>
                 </div>

                 <button
                    onClick={handleWhatsappRedirect}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/20 transform hover:-translate-y-1"
                 >
                    <MessageCircle size={24} />
                    <span>إرسال الطلب عبر واتساب</span>
                 </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {step !== 'confirmation' && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-between items-center relative z-10">
                {step !== 'meat' ? (
                    <button 
                        onClick={() => {
                            if(step === 'size') handleBack('meat');
                            else if(step === 'quantity') handleBack('size');
                            else if(step === 'details') handleBack('quantity');
                        }}
                        className="p-3 rounded-full hover:bg-zinc-800 text-zinc-400 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                ) : (
                    <div className="w-12"></div> // Spacer
                )}

                {/* Step Indicators */}
                <div className="flex gap-2">
                    {['meat', 'size', 'quantity', 'details'].map((s, i) => (
                        <div 
                            key={s} 
                            className={`h-2 rounded-full transition-all duration-300 ${
                                ['meat', 'size', 'quantity', 'details'].indexOf(step) >= i 
                                ? 'w-6 bg-amber-500' 
                                : 'w-2 bg-zinc-800'
                            }`}
                        />
                    ))}
                </div>

                <button 
                    onClick={() => {
                        if(step === 'meat') handleNext('size');
                        else if(step === 'size') handleNext('quantity');
                        else if(step === 'quantity') handleNext('details');
                        else if(step === 'details') handleNext('confirmation');
                    }}
                    disabled={
                        (step === 'meat' && !orderData.meat) ||
                        (step === 'size' && !orderData.size) ||
                        (step === 'details' && (!orderData.name || !orderData.phone || (orderData.deliveryType === 'outside' && !orderData.governorate)))
                    }
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                    <span>{step === 'details' ? 'تأكيد' : 'التالي'}</span>
                    <ChevronLeft size={20} />
                </button>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderModal;