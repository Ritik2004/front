import React, { useState, useEffect, useCallback, useRef } from 'react';
import Confetti from 'react-confetti';

// Main App Component - Magical Birthday Web App
const App = () => {
  // State management for different app features
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showSpaceship, setShowSpaceship] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showLoveLetterModal, setShowLoveLetterModal] = useState(false);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [floatingBalloons, setFloatingBalloons] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio reference for birthday song
  const audioRef = useRef(null);

  // Her name - easily customizable
  const herName = "Aditi"; // Replace with her actual name

  // Generate random stars for the background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Generate floating balloons
  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons = [];
      for (let i = 0; i < 8; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 90 + 5,
          color: ['#FFC0CB', '#D8BFD8', '#FFB6C1', '#E6E6FA'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 4,
          duration: Math.random() * 2 + 4,
        });
      }
      setFloatingBalloons(newBalloons);
    };

    generateBalloons();
  }, []);

  // Create shooting stars periodically
  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 100,
      };
      setShootingStars(prev => [...prev, newStar]);
      
      // Remove shooting star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, 3000);
    };

    const interval = setInterval(createShootingStar, 8000);
    return () => clearInterval(interval);
  }, []);

  // Create sparkle effect on click
  const createSparkles = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      color: ['#FFD700', '#FFC0CB', '#D8BFD8', '#FFFFFF'][Math.floor(Math.random() * 4)],
      size: Math.random() * 8 + 4,
    }));
    
    setSparkles(prev => [...prev, ...newSparkles]);
    
    // Remove sparkles after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(sparkle => !newSparkles.find(ns => ns.id === sparkle.id)));
    }, 1000);
  }, []);

  // Global click handler for sparkle effects
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't add sparkles on modal backgrounds or buttons to avoid interference
      if (e.target.closest('.modal-backdrop') || e.target.closest('button')) return;
      
      const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX + (Math.random() - 0.5) * 60,
        y: e.clientY + (Math.random() - 0.5) * 60,
        color: ['#FFD700', '#FFC0CB', '#D8BFD8', '#FFFFFF'][Math.floor(Math.random() * 4)],
        size: Math.random() * 6 + 3,
      }));
      
      setSparkles(prev => [...prev, ...newSparkles]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => !newSparkles.find(ns => ns.id === sparkle.id)));
      }, 1000);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Play/Pause birthday song
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      // Create a simple birthday melody using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const playNote = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const playBirthdaySong = () => {
        const currentTime = audioContext.currentTime;
        const noteDuration = 0.5;
        
        // Happy Birthday melody (simplified)
        const melody = [
          261.63, // C4
          261.63, // C4
          293.66, // D4
          261.63, // C4
          349.23, // F4
          329.63, // E4
          261.63, // C4
          261.63, // C4
          293.66, // D4
          261.63, // C4
          392.00, // G4
          349.23, // F4
        ];
        
        melody.forEach((note, index) => {
          playNote(note, currentTime + index * noteDuration, noteDuration * 0.9);
        });
        
        // Schedule the next loop
        setTimeout(() => {
          if (isPlaying) {
            playBirthdaySong();
          }
        }, melody.length * noteDuration * 1000);
      };
      
      audioRef.current = { play: playBirthdaySong, stop: () => {} };
    }

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
        // Show a message
        alert('🎵 Birthday song is playing in your heart! 🎵');
        setIsPlaying(true);
        // Auto-stop after 30 seconds
        setTimeout(() => setIsPlaying(false), 30000);
      }
    }
  }, [isPlaying]);

  // Handle the magical "Tap to Launch" button click
  const handleLaunchClick = useCallback((e) => {
    // Create extra sparkles for this special button
    createSparkles(e);
    
    // Start confetti
    setShowConfetti(true);
    
    // Start fireworks
    setShowFireworks(true);
    
    // Launch spaceship after a short delay
    setTimeout(() => setShowSpaceship(true), 500);
    
    // Show floating hearts
    setTimeout(() => setShowHearts(true), 1000);
    
    // Clean up animations
    setTimeout(() => {
      setShowConfetti(false);
      setShowFireworks(false);
      setShowSpaceship(false);
      setShowHearts(false);
    }, 6000);
  }, [createSparkles]);

  // Sparkle Component
  const SparkleEffects = () => (
    <div className="fixed inset-0 pointer-events-none z-40">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-ping"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            borderRadius: '50%',
            animationDuration: '1s',
            animationFillMode: 'forwards',
          }}
        />
      ))}
    </div>
  );

  // Fireworks Component
  const Fireworks = () => (
    <div className="fixed inset-0 pointer-events-none z-20">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-star-gold rounded-full animate-firework"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  // Floating Hearts Component
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none z-20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-heart-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          <div className="heart" />
        </div>
      ))}
    </div>
  );

  // Spaceship Component
  const Spaceship = () => (
    <div className="fixed top-1/2 -left-48 z-30 animate-fly-across">
      <div className="relative">
        <img
          src="https://i.imgur.com/bP7kFJF.png"
          alt="Spaceship with cake"
          className="w-32 h-24 object-contain"
          onError={(e) => {
            // Fallback if image doesn't load
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `
              <div class="w-32 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-2xl">
                🚀🎂
              </div>
            `;
          }}
        />
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
      </div>
    </div>
  );

  // Pet Modal Component
  const PetModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-bounce-in text-center relative">
        <button
          onClick={() => setShowPetModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 transition-all duration-300 hover:scale-110"
        >
          ×
        </button>
        <div className="mb-6">
          <img
            src="https://placekitten.com/400/300"
            alt="Cute kitten"
            className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
            onError={(e) => {
              e.target.src = "https://placedog.net/400/300";
              e.target.alt = "Cute puppy";
            }}
          />
        </div>
        <h3 className="text-2xl font-pacifico text-deep-purple mb-4">
          Furry Friends Say Hi! 🐾
        </h3>
        <p className="text-gray-700 font-inter text-lg mb-4">
          Your furry friends wish you Happy Birthday too! 🐾
        </p>
        <div className="mt-6 text-4xl mb-6 animate-bounce">🐱🐶💕</div>
        
        {/* Close button */}
        <button
          onClick={() => setShowPetModal(false)}
          className="bg-gradient-to-r from-soft-pink to-soft-purple hover:from-pink-400 hover:to-purple-400 text-white font-inter font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg magic-button"
        >
          Close Paw-some! 🐾
        </button>
      </div>
    </div>
  );

  // Love Letter Modal Component
  const LoveLetterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-pink-50 to-purple-50 rounded-3xl p-8 max-w-lg w-full animate-bounce-in relative shadow-2xl">
        <button
          onClick={() => setShowLoveLetterModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 transition-all duration-300 hover:scale-110"
        >
          ×
        </button>
        
        {/* Love letter header */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-pacifico text-deep-purple mb-2 animate-pulse">
            From Me to You 💌
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-soft-pink to-soft-purple mx-auto rounded-full animate-pulse"></div>
        </div>
        
        {/* Love letter content */}
       <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-soft-pink">
  <p className="text-gray-700 font-inter text-lg leading-relaxed mb-4">
    My Dearest {herName},
  </p>
  <p className="text-gray-700 font-inter leading-relaxed mb-4">
    Wishing you the happiest birthday ever! 🎂 May your day be filled with smiles, love, and all the little things that make you happy.
  </p>
  <p className="text-gray-700 font-inter leading-relaxed mb-4">
    Good luck with everything you do — I know you’ll shine in every step you take. ✨
  </p>
  <p className="text-gray-700 font-inter leading-relaxed mb-6">
    Take care of yourself and keep being the amazing person you are. 💖
  </p>
  <p className="text-right text-deep-purple font-pacifico text-xl">
    Take care,<br />
   Continue being the hottie you are!! 💫
  </p>
</div>

        
        <div className="text-center mt-6 text-3xl animate-bounce">
          💕 ✨ 💕 ✨ 💕
        </div>
        
        {/* Close button at bottom */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowLoveLetterModal(false)}
            className="bg-gradient-to-r from-soft-pink to-soft-purple hover:from-pink-400 hover:to-purple-400 text-white font-inter font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg magic-button"
          >
            Close with Love 💕
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-space-blue via-purple-900 to-space-blue">
      {/* Starry Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-space-blue bg-opacity-60"></div>
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 z-10">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-star-gold shooting-star animate-shooting-star z-10"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
        />
      ))}

      {/* Floating Balloons */}
      {floatingBalloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute balloon-float z-15"
          style={{
            left: `${balloon.x}%`,
            bottom: '-100px',
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          <div 
            className="w-12 h-16 rounded-full opacity-70"
            style={{ backgroundColor: balloon.color }}
          />
          <div className="w-px h-12 bg-gray-400 mx-auto"></div>
        </div>
      ))}

      {/* Paw Print Icon */}
      <button
        onClick={(e) => {
          createSparkles(e);
          setShowPetModal(true);
        }}
        className="fixed top-6 right-6 z-40 bg-soft-pink hover:bg-pink-300 transition-all duration-300 rounded-full p-3 glow-button"
      >
        <span className="text-2xl">🐾</span>
      </button>

      {/* Music Button */}
      <button
        onClick={(e) => {
          createSparkles(e);
          toggleMusic();
        }}
        className="fixed top-6 left-6 z-40 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 rounded-full p-3 rainbow-glow magic-button pulse-glow"
        title={isPlaying ? "Pause Birthday Song 🎵" : "Play Birthday Song 🎶"}
      >
        <span className="text-2xl">{isPlaying ? '🎵' : '🎶'}</span>
      </button>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Balloon Planet */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-8">
            <img
              src="https://pngimg.com/uploads/balloon/balloon_PNG4963.png"
              alt="Balloon Planet"
              className="w-40 h-52 md:w-48 md:h-60 object-contain filter drop-shadow-2xl animate-float hover:animate-bounce transition-all duration-300"
              onError={(e) => {
                // Fallback balloon design
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="w-40 h-52 md:w-48 md:h-60 bg-gradient-to-br from-soft-pink via-soft-purple to-deep-purple rounded-full border-4 border-white shadow-2xl animate-float flex items-center justify-center hover:animate-bounce transition-all duration-300">
                    <span class="text-4xl animate-spin">🌍</span>
                  </div>
                `;
              }}
            />
            <div className="absolute -top-2 -right-2 text-3xl animate-bounce">✨</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
            <div className="absolute top-1/2 -left-4 text-xl animate-ping" style={{ animationDelay: '1s' }}>⭐</div>
            <div className="absolute top-1/4 -right-4 text-xl animate-ping" style={{ animationDelay: '2s' }}>🌟</div>
          </div>
          
          {/* Main Birthday Message */}
          <h1 className="text-4xl md:text-6xl font-pacifico text-white text-shadow mb-6 leading-tight">
            Happy Birthday,<br />
            <span className="text-soft-pink">{herName}!</span>
          </h1>
          <p className="text-xl md:text-2xl font-inter text-white text-shadow mb-8 max-w-2xl">
            You're a brightest star in the whole universe 💫
          </p>
          
          {/* Launch Button */}
          <button
            onClick={handleLaunchClick}
            className="bg-gradient-to-r from-soft-pink to-soft-purple hover:from-pink-400 hover:to-purple-400 text-white font-inter font-semibold text-xl px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 glow-button shadow-2xl magic-button animate-pulse-glow"
          >
            ✨ Tap to Launch ✨
          </button>
        </div>

        {/* From Me to You Button */}
        <button
          onClick={(e) => {
            createSparkles(e);
            setShowLoveLetterModal(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-inter font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg magic-button"
        >
          💌 From Me to You
        </button>
      </div>

      {/* Sparkle Effects */}
      <SparkleEffects />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
          colors={['#FFC0CB', '#D8BFD8', '#FFB6C1', '#E6E6FA', '#FFD700']}
        />
      )}

      {/* Fireworks */}
      {showFireworks && <Fireworks />}

      {/* Spaceship */}
      {showSpaceship && <Spaceship />}

      {/* Floating Hearts */}
      {showHearts && <FloatingHearts />}

      {/* Modals */}
      {showPetModal && <PetModal />}
      {showLoveLetterModal && <LoveLetterModal />}
    </div>
  );
};

export default App;
