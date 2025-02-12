import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface FadeInAnimationProps {
  children: React.ReactNode;
  visible: boolean;
  className: string;
}

const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
  children,
  visible,
  className,
}) => {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={`${className}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            opacity: { duration: 0.3 },
            height: { duration: 0.5, ease: "easeInOut" },
          }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 0, height: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            opacity: { duration: 0.3 },
            height: { duration: 0.5, ease: "easeInOut" },
          }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeInAnimation;
