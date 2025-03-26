const Hero = () => {
  return (
    <div className="relative h-screen max-h-[400px] overflow-hidden
      bg-cover bg-center pb-16 pt-10 md:pt-20"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6')",
    }}
    >

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t 
    from-black/70 via-black/40 to-transparent z-0" />

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold
        text-white mb-4 animate-fadeIn font-display">
        Discover Your Perfect Stay
      </h1>
      <p className="text-xl md:text-2xl text-white/90
        mb-8 max-w-2xl mx-auto animate-fadeIn delay-100 font-body">
        Luxury villas, cozy cabins, and unforgettable experiences await
      </p>
    
    </div>

    {/* Scroll indicator */}
    {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div> */}
    
  </div>
</div>
  );
};

  
  export default Hero;