import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ECGLine from "@/components/ECGLine";
import heroHeart from "@/assets/hero-heart.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-20"
        style={{ background: "radial-gradient(circle, hsl(0 72% 45%), transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
        style={{ background: "radial-gradient(circle, hsl(0 85% 55%), transparent 70%)" }} />

      {/* ECG line decoration */}
      <div className="absolute bottom-20 left-0 right-0 opacity-30">
        <ECGLine />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
              AI-Powered Diagnostics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
          >
            Heart Disease
            <br />
            <span className="text-accent glow-text">Detector</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            Advanced cardiac risk assessment powered by machine learning. 
            Fast, private, and clinically informed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/predict")}
            >
              Start Prediction
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* 3D Heart Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="relative flex items-center justify-center"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-full blur-[80px] opacity-40"
              style={{ background: "radial-gradient(circle, hsl(0 72% 45%), transparent 60%)" }} />
            <img
              src={heroHeart}
              alt="3D Heart Visualization"
              width={1024}
              height={1024}
              className="relative z-10 w-full max-w-md drop-shadow-2xl animate-pulse-heart"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
