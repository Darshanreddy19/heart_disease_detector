import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import { Heart, Brain, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorks />
      
      {/* Features Section */}
      <div className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Why Choose Our Detector?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Advanced AI Card */}
            <div className="glass-card rounded-xl p-6 border border-border hover:border-accent/40 transition-all hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Brain className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-center">Advanced AI</h3>
              <p className="text-sm text-muted-foreground text-center">
                4 machine learning models working together for accurate predictions
              </p>
            </div>

            {/* Fast Analysis Card */}
            <div className="glass-card rounded-xl p-6 border border-border hover:border-accent/40 transition-all hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-center">Instant Results</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get risk assessment in seconds with detailed analysis
              </p>
            </div>

            {/* Secure & Private Card */}
            <div className="glass-card rounded-xl p-6 border border-border hover:border-accent/40 transition-all hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-center">13 Parameters</h3>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive clinical analysis using 13 key health indicators
              </p>
            </div>

            {/* Evidence-Based Card */}
            <div className="glass-card rounded-xl p-6 border border-border hover:border-accent/40 transition-all hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Heart className="w-8 h-8 text-accent" fill="currentColor" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-center">Evidence-Based</h3>
              <p className="text-sm text-muted-foreground text-center">
                Built on validated medical data and clinical research
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-10 text-center border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative z-10 flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Heart className="w-4 h-4 text-accent" fill="currentColor" />
          <p>This tool is for educational purposes only. Always consult a medical professional.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
