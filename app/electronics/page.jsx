"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import CategorySidebar from "@/components/ui/CategorySidebar";
import ShoppingCart from "@/components/ui/ShoppingCart";
import CheckoutModal from "@/components/ui/CheckoutModal";
import NotificationSystem from "@/components/ui/NotificationSystem";
import FloatingChat from "@/components/ui/FloatingChat";

export default function ElectronicsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use mock data instead of fetching
        const mockData = {
          products: [
            {
              id: 1,
              name: "iPhone 15 Pro Max",
              price: 1299,
              originalPrice: 1499,
              image:
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              rating: 4.8,
              reviews: 2456,
              category: "smartphones",
              description:
                "The most advanced iPhone ever with titanium design, A17 Pro chip, and revolutionary camera system.",
              inStock: true,
              featured: true,
              tags: ["New", "Popular"],
              specs: [
                "6.7-inch display",
                "A17 Pro chip",
                "48MP camera",
                "5G ready",
              ],
              brand: "Apple",
            },
            {
              id: 2,
              name: "MacBook Pro 16-inch",
              price: 2499,
              originalPrice: 2799,
              image:
                "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              rating: 4.9,
              reviews: 1834,
              category: "laptops",
              description:
                "Supercharged by M3 Pro and M3 Max chips for demanding workflows.",
              inStock: true,
              featured: true,
              tags: ["Professional", "High Performance"],
              specs: [
                "M3 Pro chip",
                "18GB RAM",
                "512GB SSD",
                "Liquid Retina XDR",
              ],
              brand: "Apple",
            },
            {
              id: 3,
              name: "Samsung Galaxy S24 Ultra",
              price: 1199,
              originalPrice: 1399,
              image:
                "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              rating: 4.7,
              reviews: 1923,
              category: "smartphones",
              description: "AI-powered smartphone with S Pen and 200MP camera.",
              inStock: true,
              featured: false,
              tags: ["AI Powered", "S Pen"],
              specs: [
                "6.8-inch display",
                "200MP camera",
                "S Pen included",
                "5000mAh battery",
              ],
              brand: "Samsung",
            },
            {
              id: 4,
              name: "Dell XPS 13",
              price: 999,
              originalPrice: 1199,
              image:
                "https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              rating: 4.6,
              reviews: 1456,
              category: "laptops",
              description:
                "Ultra-portable laptop with stunning InfinityEdge display.",
              inStock: true,
              featured: false,
              tags: ["Portable", "Business"],
              specs: ["Intel i7", "16GB RAM", "512GB SSD", "13.3-inch display"],
              brand: "Dell",
            },
            {
              id: 5,
              name: "Sony WH-1000XM5",
              price: 399,
              originalPrice: 449,
              image:
                "https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              rating: 4.8,
              reviews: 892,
              category: "audio",
              description:
                "Industry-leading noise canceling headphones with premium sound.",
              inStock: true,
              featured: true,
              tags: ["Noise Canceling", "Premium"],
              specs: [
                "30hr battery",
                "Quick charge",
                "Multipoint connection",
                "Touch controls",
              ],
              brand: "Sony",
            },
          ],
          categories: [
            { id: "smartphones", name: "Smartphones", icon: "📱" },
            { id: "laptops", name: "Laptops", icon: "💻" },
            { id: "audio", name: "Audio", icon: "🎧" },
            { id: "gaming", name: "Gaming", icon: "🎮" },
          ],
        };

        setProducts(mockData.products);
        setCategories(mockData.categories);
      } catch (error) {
        console.error("Error loading electronics data:", error);
      }
    };

    fetchData();

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    }

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlist([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products].sort((a, b) => b.id - a.id);
      default:
        return [...products].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
  };

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Show notification
    if (window.showNotification) {
      window.showNotification({
        type: "success",
        title: "Added to Cart",
        message: `${product.name} has been added to your cart`,
      });
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const handleQuickView = (product) => {
    // Add to recently viewed
    const recentProducts = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    const existing = recentProducts.filter((p) => p.id !== product.id);
    const updated = [product, ...existing].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsShoppingCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    localStorage.removeItem("cartItems");
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        )}
        wishlistCount={wishlist.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartOpen={() => setIsShoppingCartOpen(true)}
        products={products}
        onAddToCart={addToCart}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Electronics</h1>
          <p className="text-xl text-gray-600">
            Discover the latest in technology and innovation
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            productCount={products.length}
          />

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
              {searchTerm && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    Search results for:
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    "{searchTerm}"
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  onQuickView={handleQuickView}
                  isInWishlist={wishlist.includes(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Floating Components */}
      <FloatingChat />
      <NotificationSystem />

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isShoppingCartOpen}
        onClose={() => setIsShoppingCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cart}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
