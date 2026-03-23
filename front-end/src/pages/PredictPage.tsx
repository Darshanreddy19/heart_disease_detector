import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Loader, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ECGLine from "@/components/ECGLine";
import NetworkAnimation from "@/components/NetworkAnimation";

const models = ["RandomForest", "GradientBoosting", "LogisticRegression", "SVM"];

const fields = [
  { name: "patientName", label: "Patient Name", type: "text" },
  { name: "age", label: "Age (years)", type: "number", min: 0, max: 150 },
  { name: "sex", label: "Gender", type: "select", options: [{ v: "0", l: "Female" }, { v: "1", l: "Male" }] },
  { name: "cp", label: "Chest Pain Type", type: "select", options: [{ v: "0", l: "None" }, { v: "1", l: "Low" }, { v: "2", l: "Mild" }, { v: "3", l: "High" }] },
  { name: "trestbps", label: "Resting BP (mmHg)", type: "number", min: 80, max: 200 },
  { name: "chol", label: "Cholesterol (mg/dl)", type: "number", min: 100, max: 600 },
  { name: "fbs", label: "Fasting Blood Sugar > 120", type: "radio", options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }] },
  { name: "restecg", label: "Resting ECG", type: "select", options: [{ v: "0", l: "Normal" }, { v: "1", l: "Slight Issue" }, { v: "2", l: "Serious Issue" }] },
  { name: "thalach", label: "Max Heart Rate (bpm)", type: "number", min: 60, max: 220 },
  { name: "exang", label: "Exercise-Induced Pain", type: "radio", options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }] },
  { name: "oldpeak", label: "ST Depression", type: "number", min: 0, max: 6.2, step: 0.1 },
  { name: "slope", label: "Slope of ST Segment", type: "select", options: [{ v: "0", l: "Downsloping" }, { v: "1", l: "Flat" }, { v: "2", l: "Upsloping" }] },
  { name: "ca", label: "Major Vessels (0-4)", type: "number", min: 0, max: 4 },
  { name: "thal", label: "Thalassemia Type", type: "select", options: [{ v: "0", l: "None" }, { v: "1", l: "Stage 1" }, { v: "2", l: "Stage 2" }, { v: "3", l: "Stage 3" }] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const PredictPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState("RandomForest");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const filledFields = Object.keys(formData).length;
  const progressPercent = (filledFields / fields.length) * 100;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields = fields.filter(f => !formData[f.name]);
    if (missingFields.length > 0) {
      toast({
        title: "Missing Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      
      navigate("/result", { 
        state: { 
          model: selectedModel, 
          data: formData,
          prediction: result.prediction,
          risk: result.risk,
          confidence: result.confidence,
          selected: result.selected,
          allRisks: result.all_risks,
        } 
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get prediction. Make sure the backend is running at http://127.0.0.1:5000",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Network Animation Background */}
      <NetworkAnimation />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Gradient Accent */}
      <motion.div
        animate={{
          background: ["radial-gradient(circle at 20% 50%, hsl(0 72% 45% / 0.08), transparent 50%)",
                       "radial-gradient(circle at 80% 50%, hsl(0 72% 45% / 0.08), transparent 50%)"],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px]"
      />

      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <ECGLine />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-start justify-between mb-14"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-accent" />
            </motion.button>
            <div>
              <motion.h1 
                className="font-display text-4xl font-bold text-foreground flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-accent" fill="currentColor" />
                </motion.div>
                Patient Assessment
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-base mt-2 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Enter your medical details for comprehensive heart health analysis
              </motion.p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-right"
          >
            <div className="text-3xl font-bold text-accent">{filledFields}/{fields.length}</div>
            <p className="text-muted-foreground text-sm">Fields Complete</p>
            <motion.div className="w-32 h-2 bg-border rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="space-y-10"
        >
          {/* Input Grid with Staggered Animation */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {fields.map((field) => (
              <motion.div
                key={field.name}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="glass-card rounded-2xl p-5 h-full border border-transparent hover:border-accent/40 transition-all duration-300"
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Label */}
                  <label className="text-xs font-semibold text-accent/80 mb-3 block uppercase tracking-widest font-mono">
                    {field.label}
                  </label>

                  {/* Text Input */}
                  {field.type === "text" && (
                    <motion.input
                      type="text"
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground text-base font-medium focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Enter name"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}

                  {/* Number Input */}
                  {field.type === "number" && (
                    <motion.input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground text-base font-medium focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 placeholder:text-muted-foreground/40"
                      placeholder="Enter value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}

                  {/* Select Input */}
                  {field.type === "select" && (
                    <motion.select
                      required
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground text-base font-medium focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 appearance-none cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <option value="" disabled>Select an option</option>
                      {field.options?.map((o) => (
                        <option key={o.v} value={o.v}>{o.l}</option>
                      ))}
                    </motion.select>
                  )}

                  {/* Radio Input */}
                  {field.type === "radio" && (
                    <div className="flex gap-4 mt-1">
                      {field.options?.map((o) => (
                        <motion.label 
                          key={o.v} 
                          className="flex items-center gap-2 cursor-pointer group relative"
                          whileHover={{ x: 4 }}
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={o.v}
                            required
                            checked={formData[field.name] === o.v}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-4 h-4 accent-accent cursor-pointer"
                          />
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                            {o.l}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Submit Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="pt-6 space-y-4"
          >
            <motion.button
              type="submit"
              disabled={isLoading || filledFields < fields.length}
              className="w-full relative overflow-hidden"
              whileHover={{ scale: filledFields === fields.length && !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: filledFields === fields.length && !isLoading ? 0.98 : 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/50" />
              <motion.div
                className="relative px-6 py-4 rounded-lg font-semibold text-lg text-primary-foreground flex items-center justify-center gap-3"
                animate={{ opacity: 1 }}
              >
                {isLoading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Loader className="w-5 h-5" />
                    </motion.div>
                    <span>Analyzing...</span>
                  </>
                ) : filledFields === fields.length ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                    <span>Predict Now</span>
                  </>
                ) : (
                  <span>Complete All Fields ({filledFields}/{fields.length})</span>
                )}
              </motion.div>
            </motion.button>

            {/* Info Text */}
            <motion.p 
              className="text-center text-xs text-muted-foreground font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ⚠️ <span className="text-accent font-semibold">Disclaimer:</span> This AI tool is for educational purposes only. Always consult with a qualified healthcare professional for medical diagnosis and treatment.
            </motion.p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default PredictPage;
