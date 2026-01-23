import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENTS } from '../constants';
import Reveal from './Reveal';

const ResidentsSection: React.FC = () => {
  return (
    <section id="residents" className="bg-black text-white py-24 overflow-hidden w-full">
      
      {/* Section Title */}
      <Reveal as="div" className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-2xl font-heading tracking-widest uppercase">OUR RESIDENTS</h2>
      </Reveal>

      {/* Residents Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <Reveal as="div" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {RESIDENTS.slice(0, 4).map((resident) => (
            <div key={resident.id} className="group flex flex-col items-center">
              <div className="w-full aspect-[3/4] overflow-hidden bg-gray-900 mb-6 relative">
                 <img 
                  src={resident.imageUrl} 
                  alt={resident.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              
              <h3 className="text-xl font-heading uppercase tracking-widest mb-2">{resident.name}</h3>
              
              <Link
                to={`/residents/${resident.slug}`}
                className="text-xs border-b border-transparent group-hover:border-white transition-all duration-300 pb-0.5 tracking-widest text-gray-400 group-hover:text-white uppercase"
              >
                About
              </Link>
            </div>
          ))}
        </Reveal>
        <div className="mt-16 text-center">
          <Link
            to="/residents"
            className="inline-block border-b border-white pb-1 text-sm tracking-widest hover:text-gray-400 transition-colors uppercase"
          >
            View All Residents
          </Link>
        </div>
      </div>

    </section>
  );
};

export default ResidentsSection;
