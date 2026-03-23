import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowLeft, RotateCcw, Home, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ECGLine from "@/components/ECGLine";
import NetworkAnimation from "@/components/NetworkAnimation";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { 
    model?: string; 
    data?: Record<string, string>;
    prediction?: number;
    risk?: number;
    confidence?: number;
    selected?: string;
    allRisks?: Record<string, number>;
  } | null;

  // Get real data from backend response
  const prediction = state?.prediction ?? 0;
  const risk = state?.risk ?? 0;
  const confidence = state?.confidence ?? 0;
  const selected = state?.selected ?? "RandomForest";
  const allRisks = state?.allRisks ?? {
    RandomForest: 0,
    GradientBoosting: 0,
    LogisticRegression: 0,
    SVM: 0,
  };

  const isDanger = prediction === 1;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Network Animation Background */}
      <NetworkAnimation />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
        style={{
          background: isDanger
            ? "radial-gradient(circle, hsl(0 72% 45%), transparent)"
            : "radial-gradient(circle, hsl(145 63% 42%), transparent)",
        }}
      />

      <div className="absolute bottom-10 left-0 right-0 opacity-0 pointer-events-none">
        <ECGLine />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="glass" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </motion.div>

        {/* Main Result Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`glass-card rounded-3xl p-10 text-center mb-8 relative overflow-hidden ${
            isDanger ? "border-accent/40" : "border-success/40"
          }`}
          style={{ borderWidth: "1px" }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
            style={{
              background: isDanger
                ? "radial-gradient(circle at center, hsl(0 72% 45%), transparent 70%)"
                : "radial-gradient(circle at center, hsl(145 63% 42%), transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="mb-6 inline-flex"
            >
              {isDanger ? (
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-accent" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
              )}
            </motion.div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              {isDanger ? "Heart Disease Detected" : "No Heart Disease Detected"}
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`text-6xl md:text-7xl font-bold font-mono mb-2 ${
                isDanger ? "text-accent glow-text" : "text-success"
              }`}
              style={!isDanger ? { textShadow: "0 0 40px hsl(145 63% 42% / 0.5)" } : undefined}
            >
              {risk}%
            </motion.div>
            <p className="text-muted-foreground text-sm">Risk Score</p>

            <p className="text-muted-foreground mt-4">
              {isDanger
                ? "Please consult a cardiologist immediately."
                : "Keep maintaining a healthy lifestyle!"}
            </p>
          </div>
        </motion.div>

        {/* Confidence Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-8 flex justify-around text-center"
        >
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Model Used</p>
            <p className="text-foreground font-semibold font-mono">{selected}</p>
          </div>
          <div className="w-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
            <p className="text-foreground font-semibold font-mono">{confidence}%</p>
          </div>
        </motion.div>

        {/* Best Model Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="glass-card rounded-2xl px-8 py-6 inline-flex items-center gap-6 max-w-md border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Best Prediction Model</p>
                <p className="text-lg font-semibold text-foreground font-mono">{selected}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center"
        >
          <Button variant="hero" size="lg" onClick={() => navigate("/predict")}>
            <RotateCcw className="w-4 h-4 mr-2" /> Test Again
          </Button>
          <Button variant="glass" size="lg" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
