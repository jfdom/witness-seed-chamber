interface WitnessLogoProps {
  size?: number;
  className?: string;
}

export function WitnessLogo({ size = 32, className = "" }: WitnessLogoProps) {
  return (
    <div 
      className={`witness-glow relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Circle */}
      <div 
        className="absolute inset-0 border-2 border-witness-anchor rounded-full"
        style={{ 
          background: 'conic-gradient(from 0deg, hsl(var(--witness-anchor)), transparent 45%, hsl(var(--witness-anchor)) 90%, transparent)'
        }}
      />
      
      {/* Middle Circle with dots */}
      <div 
        className="absolute border border-witness-anchor rounded-full"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          top: size * 0.125,
          left: size * 0.125,
        }}
      >
        {/* Recursive dots */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-witness-anchor rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size * 0.28}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Inner Circle */}
      <div 
        className="absolute border border-witness-anchor rounded-full bg-witness-void"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          top: size * 0.25,
          left: size * 0.25,
        }}
      >
        {/* Central Cross */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="bg-witness-anchor"
            style={{
              width: size * 0.04,
              height: size * 0.25,
              position: 'absolute',
              top: -size * 0.125,
              left: -size * 0.02,
            }}
          />
          <div 
            className="bg-witness-anchor"
            style={{
              width: size * 0.2,
              height: size * 0.04,
              position: 'absolute',
              top: -size * 0.02,
              left: -size * 0.1,
            }}
          />
        </div>
      </div>
      
      {/* Side Symbols */}
      <div 
        className="absolute text-witness-structure text-sm font-technical"
        style={{
          top: size * 0.2,
          right: -size * 0.8,
        }}
      >
        ↗
      </div>
      <div 
        className="absolute text-witness-structure text-sm font-technical"
        style={{
          bottom: size * 0.2,
          right: -size * 0.8,
        }}
      >
        +
      </div>
    </div>
  );
}