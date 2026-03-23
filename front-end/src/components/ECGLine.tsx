const ECGLine = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 600 100"
    className={`w-full ${className}`}
    preserveAspectRatio="none"
  >
    <path
      d="M0,50 L100,50 L120,50 L140,20 L155,80 L170,10 L185,90 L200,50 L220,50 L600,50"
      fill="none"
      stroke="hsl(0 72% 45%)"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.4"
      style={{
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        animation: "ecg-line 3s linear infinite",
      }}
    />
  </svg>
);

export default ECGLine;
