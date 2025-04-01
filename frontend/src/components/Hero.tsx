import real from "../assets/real-bg.mp4"

const Hero = () => {
  return (
    <div className="relative h-screen max-h-[400px] overflow-hidden
      pb-16 pt-10 md:pt-20"
    >
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={real} type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img 
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6" 
          alt="Fallback background" 
          className="w-full h-full object-cover"
        />
      </video>
    </div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />

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

  </div>
</div>
  );
};

  
  export default Hero;