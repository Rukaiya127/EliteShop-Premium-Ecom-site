"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/ui/ProductCard"
import CategorySidebar from "@/components/ui/CategorySidebar"
import ShoppingCart from "@/components/ui/ShoppingCart"
import CheckoutModal from "@/components/ui/CheckoutModal"
import NotificationSystem from "@/components/ui/NotificationSystem"
import FloatingChat from "@/components/ui/FloatingChat"

export default function FashionPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use mock data instead of fetching
        const mockData = {
          products: [
    {
      "id": 101,
      "name": "Premium Cotton Hoodie",
      "price": 89,
      "originalPrice": 129,
      "image": "https://images.unsplash.com/photo-1685328403732-64be6bb9d112?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "rating": 4.5,
      "reviews": 892,
      "category": "hoodies",
      "description": "Ultra-soft premium cotton hoodie with modern fit and sustainable materials.",
      "inStock": true,
      "featured": true,
      "tags": ["Sustainable", "Comfort"],
      "specs": ["100% organic cotton", "Unisex fit", "Machine washable", "Available in 8 colors"],
      "brand": "EcoWear",
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
      "colors": ["Black", "White", "Gray", "Navy", "Olive"]
    },
    {
      "id": 102,
      "name": "Designer Denim Jacket",
      "price": 159,
      "originalPrice": 199,
      "image": "https://images.unsplash.com/photo-1587565062870-79a48d577485?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "rating": 4.4,
      "reviews": 567,
      "category": "jackets",
      "description": "Classic denim jacket with modern cuts and premium finishing.",
      "inStock": true,
      "featured": false,
      "tags": ["Classic", "Trendy"],
      "specs": ["Premium denim", "Vintage wash", "Multiple pockets", "Tailored fit"],
      "brand": "UrbanStyle",
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["Blue", "Black", "Light Blue"]
    },
    {
      "id": 103,
      "name": "Athletic Running Shoes",
      "price": 129,
      "originalPrice": 179,
      "image": "https://images.unsplash.com/photo-1627137727320-4a7c6782102a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "rating": 4.7,
      "reviews": 1234,
      "category": "shoes",
      "description": "High-performance running shoes with advanced cushioning technology.",
      "inStock": true,
      "featured": true,
      "tags": ["Athletic", "Comfort"],
      "specs": ["Breathable mesh", "Advanced cushioning", "Lightweight", "Non-slip sole"],
      "brand": "SportMax",
      "sizes": ["7", "8", "9", "10", "11", "12"],
      "colors": ["Black", "White", "Red", "Blue"]
    }
  ],
          categories: [
            { id: "shirts", name: "Shirts", icon: "👔" },
            { id: "pants", name: "Pants", icon: "👖" },
            { id: "shoes", name: "Shoes", icon: "👟" },
            { id: "hoodies", name: "Hoodies", icon: "🧥" },
            { id: "jackets", name: "Jackets", icon: "🧥" },
            { id: "accessories", name: "Accessories", icon: "👜" },
          ],
        }

        setProducts(mockData.products)
        setCategories(mockData.categories)
      } catch (error) {
        console.error("Error loading fashion data:", error)
      }
    }

    fetchData()

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
        setCart([])
      }
    }

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Error loading wishlist:", error)
        setWishlist([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart))
  }, [cart])

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price)
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating)
      case "newest":
        return [...products].sort((a, b) => b.id - a.id)
      default:
        return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    }),
  )

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    // Show notification
    if (window.showNotification) {
      window.showNotification({
        type: "success",
        title: "Added to Cart",
        message: `${product.name} has been added to your cart`,
      })
    }
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]

      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      return newWishlist
    })
  }

  const handleQuickView = (product) => {
    // Add to recently viewed
    const recentProducts = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
    const existing = recentProducts.filter((p) => p.id !== product.id)
    const updated = [product, ...existing].slice(0, 10)
    localStorage.setItem("recentlyViewed", JSON.stringify(updated))
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    setIsShoppingCartOpen(false)
    setIsCheckoutModalOpen(true)
  }

  const handleOrderComplete = () => {
    setCart([])
    localStorage.removeItem("cartItems")
    setIsCheckoutModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)}
        wishlistCount={wishlist.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartOpen={() => setIsShoppingCartOpen(true)}
        products={products}
        onAddToCart={addToCart}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Fashion</h1>
          <p className="text-xl text-gray-600">Express your style with our curated fashion collection</p>
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
              <p className="text-gray-600">{filteredProducts.length} products found</p>
              {searchTerm && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Search results for:</span>
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
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
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
  )
}
