import { Avatar } from "@radix-ui/react-avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, RotateCcw, Users } from "lucide-react";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { GithubUser } from "@/lib/types";

interface ResultSearchProps {
 users: GithubUser[] | undefined;
 isLoadingUsers: boolean;
 setSelectedUser: (username: string | null) => void;
 inputValue: string;
 onReset: () => void;
}

const ResultSearch: React.FC<ResultSearchProps> = ({
 users,
 isLoadingUsers,
 setSelectedUser,
 inputValue,
 onReset,
}) => {
 const handleUserSelect = (username: string) => {
  setSelectedUser(username);
 };
 return (
  <AnimatePresence mode="wait">
   <motion.div
    key="search-results"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
   >
    <div className="mb-6">
     <motion.div
      className="flex justify-between mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
     >
      <div className="flex items-center">
       <Users className="h-5 w-5 mr-2 text-blue-500" />
       <h2 className="text-lg font-medium">Search Results</h2>
      </div>
      {inputValue && (
       <RotateCcw
        color="red"
        className=" border rounded-md p-1 cursor-pointer"
        onClick={() => onReset()}
       />
      )}
     </motion.div>

     {isLoadingUsers ? (
      <div className="flex justify-center items-center py-8">
       <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
     ) : users && users.length > 0 ? (
      <div className="space-y-3">
       {users.map((user, index) => (
        <motion.div
         key={user.id}
         className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-slate-200"
         onClick={() => handleUserSelect(user.login)}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, delay: index * 0.1 }}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
        >
         <div className="flex items-center bo">
          <Avatar className="h-10 w-10 mr-3 border border-gray-200 dark:border-gray-700">
           <AvatarImage src={user.avatar_url} alt={user.login} />
           <AvatarFallback>
            {user.login.substring(0, 2).toUpperCase()}
           </AvatarFallback>
          </Avatar>
          <div>
           <div className="font-medium">{user.login}</div>
           <div className="text-sm text-gray-500 dark:text-gray-400">
            View repositories
           </div>
          </div>
         </div>
        </motion.div>
       ))}
      </div>
     ) : (
      <motion.div
       className="text-center py-8 text-gray-500 dark:text-gray-400"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 0.2 }}
      >
       No users found. Try a different search term.
      </motion.div>
     )}
    </div>
   </motion.div>
  </AnimatePresence>
 );
};

export default ResultSearch;
