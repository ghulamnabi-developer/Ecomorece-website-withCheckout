import React, { useEffect, useState } from 'react';
import img1 from '../../assets/menwear/img1.jpg';
import img2 from '../../assets/menwear/img2.webp';
import img3 from '../../assets/menwear/img3.jpg';
import img4 from '../../assets/menwear/img4.jpg';
import img5 from '../../assets/menwear/img5.jpg';
import img6 from '../../assets/menwear/img6.jpg';
import Modal from '../Modal/Modal'; // Import the Modal component


const KidsWear = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for animation
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category

  // Hardcoded dummy products for Kids' Wear
  const dummyProducts = [
    {
      id: 1,
      name: "Kids T-Shirt",
      price: 19.99,
      image: img1,
      description: 'Comfortable cotton t-shirt for daily wear.',
      category: 'Tops',
    },
    {
      id: 2,
      name: "Kid's Jeans",
      price: 39.99,
      image: img2,
      description: 'Stylish denim jeans for all occasions.',
      category: 'Bottoms',
    },
    {
      id: 3,
      name: "Kid's Jacket",
      price: 59.99,
      image: img3,
      description: 'Warm jacket for chilly weather.',
      category: 'Outerwear',
    },
    {
      id: 4,
      name: "Kid's Sneakers",
      price: 49.99,
      image: img4,
      description: 'Trendy sneakers for a casual look.',
      category: 'Footwear',
    },
    {
      id: 5,
      name: "Kid's Shorts",
      price: 29.99,
      image: img5,
      description: 'Comfortable shorts for summer.',
      category: 'Bottoms',
    },
    {
      id: 6,
      name: "Kid's Formal Shirt",
      price: 39.99,
      image: img6,
      description: 'Elegant shirt for formal events.',
      category: 'Tops',
    },
  ];

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear']; // Define categories

  useEffect(() => {
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts); // Initialize filtered products
    setIsVisible(true); // Trigger the animation
  }, []);

  // Filter products based on the search term and selected category
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  // Filter products based on selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kids's Wear</h1>
      
      {/* Search and Category Filter Row */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="border p-2 rounded w-1/2 mr-4" // Set width to 50% and add margin-right
        />

        {/* Category Filter */}
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display message if no products found */}
      {filteredProducts.length === 0 && searchTerm && (
        <p className="text-red-500 mb-4">Not found</p>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transform transition-transform duration-500 ${isVisible ? 'translate-x-10' : '-translate-x-full'}`}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 cursor-pointer">
            <div className="overflow-hidden rounded-lg h-48 mb-2" onClick={() => openModal(product)}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">${product.price.toFixed(2)}</p>
            <button 
              onClick={() => openModal(product)} // Open modal instead of add to cart directly
              className="mt-2 bg-blue-500 text-white px-4 py-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      
      {/* Modal Component */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default KidsWear;
