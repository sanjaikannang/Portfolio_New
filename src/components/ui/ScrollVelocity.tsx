import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';

// Wraps a value within [min, max] — used to loop the marquee seamlessly
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface ScrollVelocityProps {
  /** Text to repeat across the marquee */
  text: string;
  /** Base scroll speed (negative = right-to-left) */
  velocity?: number;
  /** Tailwind / className on each text span */
  className?: string;
  /** Number of copies to fill the viewport */
  numCopies?: number;
  /** Spring damping — higher = less wobble */
  damping?: number;
  /** Spring stiffness — higher = snappier */
  stiffness?: number;
}

const ScrollVelocity = ({
  text,
  velocity = -80,
  className = '',
  numCopies = 8,
  damping = 50,
  stiffness = 400,
}: ScrollVelocityProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });

  // Map scroll velocity → multiplier so fast scrolling speeds up the marquee
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  // Wrap between -20% and -45% to loop the repeated text seamlessly
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);

    // Reverse direction when the user scrolls the opposite way
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div className="inline-flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span key={i} className={`inline-block ${className}`}>
            {text}&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollVelocity;
