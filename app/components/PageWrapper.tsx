"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion"; // Sugestão para um portfólio de alto nível

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        w-full max-w-7xl mx-auto
        flex flex-col flex-1
        px-4 sm:px-6 lg:px-8
        py-8 sm:py-12
      "
    >
      {children}
    </motion.div>
  );
}
