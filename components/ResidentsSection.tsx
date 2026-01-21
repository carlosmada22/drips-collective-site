import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENTS, RESIDENT_MARQUEE_NAMES } from '../constants';

const ResidentsSection: React.FC = () => {
  return (
    <section id="residents" className="bg-black text-white py-24 overflow-hidden w-full">
      
      {/* Section Title */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-2xl font-heading tracking-widest uppercase">Our Residents</h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full mb-20 py-8 border-y border-white/10 bg-white/5">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            {RESIDENT_MARQUEE_NAMES.map((name, index) => (
              <span key={`${name}-${index}`} className="text-6xl md:text-8xl font-heading font-bold uppercase tracking-widest mx-8 md:mx-16 text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity duration-300" style={{ WebkitTextStroke: '1px white' }}>
                {name} •
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {RESIDENT_MARQUEE_NAMES.map((name, index) => (
              <span key={`${name}-${index}-dup`} className="text-6xl md:text-8xl font-heading font-bold uppercase tracking-widest mx-8 md:mx-16 text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity duration-300" style={{ WebkitTextStroke: '1px white' }}>
                {name} •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Residents Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
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
        </div>
      </div>

    </section>
  );
};

export default ResidentsSection;
