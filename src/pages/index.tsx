import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import GithubSearch from "../components/GithubSearch";

const Index: React.FC = () => {
 const [showSplash, setShowSplash] = useState(true);

 const handleContinue = () => {
  setShowSplash(false);
 };

 return (
  <AnimatePresence mode="wait">
   {showSplash ? (
    <SplashScreen key="splash" onContinue={handleContinue} />
   ) : (
    <GithubSearch key="main" />
   )}
  </AnimatePresence>
 );
};

export default Index;
