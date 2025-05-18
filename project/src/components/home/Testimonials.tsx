import React from 'react';
import useConfigStore from '../../store/configStore';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Client Fidèle',
    roleEn: 'Loyal Customer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    quote: 'La qualité des produits est exceptionnelle. Je suis cliente depuis plus d\'un an et je n\'ai jamais été déçue. Le service client est également remarquable !',
    quoteEn: 'The quality of the products is exceptional. I\'ve been a customer for over a year and have never been disappointed. The customer service is also remarkable!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Acheteur Régulier',
    roleEn: 'Regular Buyer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    quote: 'Livraison rapide et produits conformes à la description. Je recommande vivement WaZWay Drop pour leur professionnalisme et leur réactivité.',
    quoteEn: 'Fast delivery and products that match the description. I highly recommend WaZWay Drop for their professionalism and responsiveness.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Claire Leroy',
    role: 'Nouvelle Cliente',
    roleEn: 'New Customer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    quote: 'J\'ai découvert cette boutique récemment et je suis impressionnée par la variété des produits proposés. Le rapport qualité-prix est imbattable !',
    quoteEn: 'I recently discovered this store and I\'m impressed by the variety of products offered. The value for money is unbeatable!',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const { language } = useConfigStore();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Ce Que Disent Nos Clients' : 'What Our Customers Say'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Découvrez les témoignages de nos clients satisfaits et rejoignez notre communauté grandissante.'
              : 'Discover testimonials from our satisfied customers and join our growing community.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr' ? testimonial.role : testimonial.roleEn}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 italic">
                {language === 'fr' ? testimonial.quote : testimonial.quoteEn}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;