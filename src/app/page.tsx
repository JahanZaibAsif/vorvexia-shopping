// app/page.js
"use client";
import Image from 'next/image';
import { useState} from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/footer';
import Hero from '../components/ui/hero';
import BenfitSection from '../components/BenfitSection';
import NewsLatter1 from '../components/ui/NewsLatter1';
import ProductQuickView from '../components/ui/ProductQuickView';
import ProductCategory from '../components/ui/productCategory';
import TreandingProduct from '../components/ui/teandingProduct';
import LatestProduct from '../components/ui/LatestProduct';


export default function Home() {
const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

const openQuickView = (productId: string | number) => {
    setSelectedProductId(productId);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white px-3 ">
     
     <Header/>

      {/* Hero Section */}
      <Hero/>
      
      
    
      <ProductCategory />
    
      <TreandingProduct onProductClick={openQuickView} />
      
      <LatestProduct onProductClick={openQuickView} />


      <BenfitSection />

      <NewsLatter1 />

      <Footer />
       <ProductQuickView 
        productId={selectedProductId}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />

    </div>
  );
}