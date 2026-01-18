import Link from 'next/link';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: 'الباقة الشهرية',
    price: 99,
    duration: 'شهرياً',
    color: 'blue',
    icon: Zap,
    features: [
      'وصول لجميع الدورات',
      'اختبارات غير محدودة',
      'محرك ساهر التكيفي',
      'تقارير أداء مفصلة',
      'دعم فني عبر الإيميل',
    ],
  },
  {
    id: 'quarterly',
    name: 'الباقة ربع السنوية',
    price: 249,
    duration: '3 أشهر',
    color: 'purple',
    icon: Crown,
    popular: true,
    discount: '16%',
    features: [
      'كل مميزات الباقة الشهرية',
      'توفير 48 ريال',
      'جلسات تدريب حية',
      'دعم أولوية',
      'شهادات معتمدة',
    ],
  },
  {
    id: 'yearly',
    name: 'الباقة السنوية',
    price: 799,
    duration: 'سنوياً',
    color: 'green',
    icon: Rocket,
    discount: '33%',
    features: [
      'كل مميزات الباقة ربع السنوية',
      'توفير 389 ريال',
      'استشارات شخصية',
      'وصول مدى الحياة للمحتوى',
      'دعم هاتفي مباشر',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            اختر الباقة المناسبة لك
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            استثمر في مستقبلك الأكاديمي مع أفضل منصة تعليمية في المملكة
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            
            const colorMap = {
              blue: {
                bg: 'from-blue-500 to-blue-600',
                border: 'border-blue-200',
                badge: 'bg-blue-100 text-blue-700',
              },
              purple: {
                bg: 'from-purple-500 to-purple-600',
                border: 'border-purple-200',
                badge: 'bg-purple-100 text-purple-700',
              },
              green: {
                bg: 'from-green-500 to-green-600',
                border: 'border-green-200',
                badge: 'bg-green-100 text-green-700',
              },
            };
            
            const colorClasses = colorMap[plan.color as keyof typeof colorMap] || colorMap.blue;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 font-bold text-sm">
                    الأكثر شعبية 🔥
                  </div>
                )}

                <div className={plan.popular ? 'pt-12' : 'pt-8'}>
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colorClasses.bg} text-white p-8`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-xl">ريال</span>
                    </div>
                    <p className="text-blue-100 mt-2">{plan.duration}</p>
                    {plan.discount && (
                      <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold">
                        وفر {plan.discount}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={`/payment/subscribe?plan=${plan.id}`}
                      className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      اشترك الآن
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            الأسئلة الشائعة
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                هل يمكنني إلغاء الاشتراك في أي وقت؟
              </h3>
              <p className="text-gray-600">
                نعم، يمكنك إلغاء اشتراكك في أي وقت. لن يتم تجديده تلقائياً.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                ما هي طرق الدفع المتاحة؟
              </h3>
              <p className="text-gray-600">
                نقبل جميع البطاقات الائتمانية (Visa, Mastercard, Mada) بالإضافة
                إلى Apple Pay و Google Pay.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                هل توجد فترة تجريبية مجانية؟
              </h3>
              <p className="text-gray-600">
                نعم! نقدم فترة تجريبية مجانية لمدة 7 أيام لجميع الباقات.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                هل الشهادات معتمدة؟
              </h3>
              <p className="text-gray-600">
                نعم، جميع الشهادات معتمدة من وزارة التعليم السعودية.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-semibold"
          >
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
