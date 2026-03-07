const Hero = ({ 
  title, 
  subtitle, 
  image = '/images/hero/home-hero.jpeg',
  buttons = [],
  height = 'h-screen'
}) => {
  return (
    <section 
      className={`relative ${height} bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-4 
                       animate-fadeIn">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 animate-fadeIn" 
               style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center animate-fadeIn" 
                 style={{ animationDelay: '0.4s' }}>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={button.className}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};
export default Hero;