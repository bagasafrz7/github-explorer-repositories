import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGithubSearch } from "../hooks/useGithubSearch";
import ResultSearch from "./ResultSearch";
import UserDetail from "./UserDetail";

const GithubSearch: React.FC = () => {
 const [inputValue, setInputValue] = useState("");
 const inputRef = useRef<HTMLInputElement>(null);
 const {
  setSearchTerm,
  setSelectedUser,
  selectedUser,
  usersQuery,
  userDetailsQuery,
  userRepositoriesQuery,
 } = useGithubSearch();
 useEffect(() => {
  if (inputRef.current) {
   inputRef.current.focus();
  }
 }, []);

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (inputValue.trim()) {
   setSearchTerm(inputValue.trim());
  }
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
 };

 const handleBackToSearch = () => {
  setSelectedUser(null);
 };

 const onReset = () => {
  setInputValue("");
  setSearchTerm("");
  usersQuery.data = [];
 };

 return (
  <div className="min-h-screen flex flex-col items-center justify-start pt-8 sm:pt-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
   <motion.div
    className="w-full max-w-3xl mx-auto mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
   >
    <div className="flex justify-center mb-8">
     <motion.div
      className="flex items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
     >
      <Github className="h-8 w-8 mr-3 text-github" />
      <h1 className="text-3xl font-display font-bold text-gradient">
       GitHub Explorer
      </h1>
     </motion.div>
    </div>

    <motion.form
     onSubmit={handleSearch}
     className="glass-card p-4 rounded-xl mb-6 soft-shadow"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.4, delay: 0.2 }}
    >
     <div className="flex items-center gap-2">
      <div className="relative flex-1">
       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
       <Input
        ref={inputRef}
        type="text"
        placeholder="Search GitHub users..."
        value={inputValue}
        onChange={handleInputChange}
        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:ring-blue-500 bg-white dark:bg-gray-800"
       />
      </div>
      <Button
       type="submit"
       className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-none cursor-pointer"
      >
       Search
      </Button>
     </div>
    </motion.form>
   </motion.div>

   <AnimatePresence mode="wait">
    <motion.div
     key={selectedUser ? "details" : "results"}
     className="w-full max-w-3xl mx-auto glass-card rounded-xl p-6 soft-shadow overflow-hidden"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: 20 }}
     transition={{ duration: 0.4, delay: 0.3 }}
    >
     {!selectedUser ? (
      // Search Results View
      <ResultSearch
       users={usersQuery.data}
       isLoadingUsers={usersQuery.isLoading}
       setSelectedUser={setSelectedUser}
       inputValue={inputValue}
       onReset={onReset}
      />
     ) : (
      // User Details View
      <UserDetail
       userDetails={userDetailsQuery.data}
       isLoadingUserDetails={userDetailsQuery.isLoading}
       repositories={userRepositoriesQuery.data}
       isLoadingRepositories={userRepositoriesQuery.isLoading}
       handleBackToSearch={handleBackToSearch}
      />
     )}
    </motion.div>
   </AnimatePresence>

   <motion.p
    className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.5 }}
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
  </div>
 );
};

export default GithubSearch;
