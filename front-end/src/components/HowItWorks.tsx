import { motion } from "framer-motion";
import { ClipboardList, Brain, Activity, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Enter Health Data",
    description: "Provide 13 key clinical values — blood pressure, cholesterol, heart rate, and more.",
    number: "01",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    description: "Our ML models process your data against thousands of cardiac patterns in real-time.",
    number: "02",
  },
  {
    icon: Activity,
    title: "Get Results",
    description: "Receive an instant risk percentage with confidence scores and model comparisons.",
    number: "03",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10"
        style={{ background: "radial-gradient(circle, hsl(0 72% 45%), transparent)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
            Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Three simple steps to understand your cardiac health risk
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:border-primary/30 group-hover:glow-red">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="font-mono text-5xl font-bold text-muted/50 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-card border border-border items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
