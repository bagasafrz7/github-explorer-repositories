import React from "react";
import { motion } from "framer-motion";
import { Github, Code, Search, Star, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
 onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
 return (
  <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   className="min-h-screen flex flex-col items-center justify-center p-6 bg-background dark:from-gray-900 dark:to-gray-950"
  >
   <motion.div
    className="glass-card max-w-3xl w-full p-8 rounded-2xl soft-shadow"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
   >
    <motion.div
     className="flex items-center justify-center mb-6"
     initial={{ y: -20, opacity: 0 }}
     animate={{ y: 0, opacity: 1 }}
     transition={{ duration: 0.5, delay: 0.2 }}
    >
     <Github className="h-12 w-12 mr-4 text-github" />
     <motion.h1
      className="text-4xl font-display font-bold text-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
     >
      GitHub Explorer
     </motion.h1>
    </motion.div>

    <motion.div
     className="space-y-4 mb-8"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 0.4 }}
    >
     <motion.p
      className="text-lg text-center text-gray-700 dark:text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
     >
      Discover GitHub repositories with a simple, elegant interface
     </motion.p>

     <motion.div
      className="flex flex-wrap justify-center gap-4 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
     >
      <FeatureCard
       icon={<Search className="h-6 w-6 text-blue-500" />}
       title="Search"
       description="Find up to 5 GitHub users with similar usernames"
       delay={0.7}
      />
      <FeatureCard
       icon={<Code className="h-6 w-6 text-green-500" />}
       title="Explore"
       description="Browse through user repositories with detailed information"
       delay={0.8}
      />
      <FeatureCard
       icon={<Star className="h-6 w-6 text-yellow-500" />}
       title="Discover"
       description="Find popular repositories and interesting projects"
       delay={0.9}
      />
     </motion.div>
    </motion.div>

    <motion.div
     className="flex justify-center"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 1 }}
    >
     <Button
      className="px-8 py-6 rounded-xl text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-none subtle-glow cursor-pointer"
      onClick={onContinue}
     >
      <span className="mr-2">Get Started</span>
      <GitBranch className="h-5 w-5" />
     </Button>
    </motion.div>
   </motion.div>

   <motion.p
    className="mt-6 text-sm text-gray-500 dark:text-gray-400"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 1.1 }}
   >
    Powered by the GitHub API • Designed with{" "}
    <a
     href="http://bagasafrizal.com"
     target="_blank"
     rel="noopener noreferrer"
     className=" text-primary underline"
    >
     Bagas Afrizal
    </a>
   </motion.p>
  </motion.div>
 );
};

interface FeatureCardProps {
 icon: React.ReactNode;
 title: string;
 description: string;
 delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
 icon,
 title,
 description,
 delay,
}) => {
 return (
  <motion.div
   className="glass-effect rounded-xl p-4 max-w-[250px]"
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5, delay }}
  >
   <div className="flex items-center mb-2">
    {icon}
    <h3 className="ml-2 text-lg font-semibold">{title}</h3>
   </div>
   <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
 );
};

export default SplashScreen;
