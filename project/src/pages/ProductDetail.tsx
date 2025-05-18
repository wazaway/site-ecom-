import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import { mockProducts } from '../data/mockData';
import useCartStore from '../store/cartStore';
import { Product, ProductVariant, CartItem } from '../types';
import useConfigStore from '../store/configStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addItem } = useCartStore();
  const { language } = useConfigStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the product by ID
    const foundProduct = mockProducts.find((p) => p.id === id);
    setProduct(foundProduct);
    
    // Initialize selected variants
    if (foundProduct?.variants) {
      const initialVariants: Record<string, string> = {};
      foundProduct.variants.forEach((variant) => {
        initialVariants[variant.name] = variant.options[0];
      });
      setSelectedVariants(initialVariants);
    }
  }, [id]);
  
  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const handleVariantChange = (variantName: string, optionValue: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: optionValue,
    }));
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    const cartItem: CartItem = {
      productId: product.id,
      quantity,
      variant: Object.keys(selectedVariants).length > 0 ? selectedVariants : undefined,
    };
    
    addItem(cartItem);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p className="text-xl text-gray-600">
          {language === 'fr' ? 'Produit non trouvé' : 'Product not found'}
        </p>
        <Link to="/products" className="text-primary hover:text-primary-dark mt-4 inline-block">
          {language === 'fr' ? 'Retour aux produits' : 'Back to products'}
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">
            {language === 'fr' ? 'Accueil' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">
            {language === 'fr' ? 'Produits' : 'Products'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer border rounded-md overflow-hidden ${
                    idx === selectedImage ? 'border-primary' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={image}
                    alt={`${product.name} image ${idx + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating.toFixed(1)} ({product.reviews.length} {language === 'fr' ? 'avis' : 'reviews'})
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary mr-2">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% {language === 'fr' ? 'de remise' : 'off'}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              <p className={`${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 10
                  ? (language === 'fr' ? 'En stock' : 'In stock')
                  : product.stock > 0
                  ? (language === 'fr' ? `Plus que ${product.stock} en stock` : `Only ${product.stock} left in stock`)
                  : (language === 'fr' ? 'Épuisé' : 'Out of stock')}
              </p>
            </div>
            
            {/* Short Description */}
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            {/* Variants */}
            {product.variants?.map((variant: ProductVariant) => (
              <div key={variant.id} className="mb-6">
                <h3 className="font-semibold mb-2">{variant.name}:</h3>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`px-4 py-2 rounded-md border ${
                        selectedVariants[variant.name] === option
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary'
                      }`}
                      onClick={() => handleVariantChange(variant.name, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">
                {language === 'fr' ? 'Quantité' : 'Quantity'}:
              </h3>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                />
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<ShoppingCart size={20} />}
                onClick={handleAddToCart}
                isLoading={isAddingToCart}
                disabled={product.stock === 0}
                fullWidth
              >
                {language === 'fr' ? 'Ajouter au panier' : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Heart size={20} />}
              >
                {language === 'fr' ? 'Ajouter aux favoris' : 'Add to Wishlist'}
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="text-primary mr-2" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Livraison gratuite' : 'Free Shipping'}
                  </span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="text-primary mr-2" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Garantie qualité' : 'Quality Guarantee'}
                  </span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="text-primary mr-2" />
                  <span className="text-sm">
                    {language === 'fr' ? 'Retours sous 30 jours' : '30-Day Returns'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mb-12 border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'description'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              {language === 'fr' ? 'Description' : 'Description'}
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              {language === 'fr' ? 'Avis' : 'Reviews'} ({product.reviews.length})
            </button>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  {language === 'fr'
                    ? 'Ce produit de haute qualité est fabriqué avec les meilleurs matériaux disponibles. Conçu pour durer, il vous offrira des années de satisfaction.'
                    : 'This high-quality product is made with the finest materials available. Designed to last, it will provide you with years of satisfaction.'}
                </p>
                <h3>
                  {language === 'fr' ? 'Caractéristiques du produit' : 'Product Features'}
                </h3>
                <ul>
                  <li>
                    {language === 'fr'
                      ? 'Conçu pour une utilisation quotidienne'
                      : 'Designed for everyday use'}
                  </li>
                  <li>
                    {language === 'fr'
                      ? 'Matériaux de haute qualité'
                      : 'High-quality materials'}
                  </li>
                  <li>
                    {language === 'fr'
                      ? 'Facile à entretenir'
                      : 'Easy to maintain'}
                  </li>
                  <li>
                    {language === 'fr'
                      ? 'Design élégant et moderne'
                      : 'Sleek and modern design'}
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.userName}</span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {language === 'fr'
                      ? 'Ce produit n\'a pas encore de commentaires.'
                      : 'This product has no reviews yet.'}
                  </p>
                )}
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    {language === 'fr'
                      ? 'Laisser un commentaire'
                      : 'Leave a Review'}
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Votre note' : 'Your Rating'}
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="text-gray-300 hover:text-yellow-400"
                          >
                            <Star className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Votre commentaire' : 'Your Review'}
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={
                          language === 'fr'
                            ? 'Partagez votre expérience avec ce produit...'
                            : 'Share your experience with this product...'
                        }
                      />
                    </div>
                    
                    <Button variant="primary">
                      {language === 'fr' ? 'Soumettre' : 'Submit'}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;