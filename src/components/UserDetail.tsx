import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import { ExternalLink, GitFork, Loader2, Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import RepositoryCard from "./RepositoryCard";
import { GithubRepository, GithubUser } from "@/lib/types";

interface UserDetailProps {
 userDetails: GithubUser | undefined;
 isLoadingUserDetails: boolean;
 repositories: GithubRepository[] | undefined;
 isLoadingRepositories: boolean;
 handleBackToSearch: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({
 userDetails,
 isLoadingUserDetails,
 repositories,
 isLoadingRepositories,
 handleBackToSearch,
}) => {
 return (
  <AnimatePresence mode="wait">
   <motion.div
    key="user-details"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
   >
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.1 }}
     className="mb-4"
    >
     <Button
      variant="ghost"
      size="sm"
      onClick={handleBackToSearch}
      className="mb-4 cursor-pointer"
     >
      ← Back to search
     </Button>

     {isLoadingUserDetails ? (
      <div className="flex justify-center items-center py-8">
       <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
     ) : userDetails ? (
      <div className="glass-card p-6 rounded-xl mb-6">
       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.2 }}
        >
         <Avatar className="h-20 w-20 border-2 border-blue-100 dark:border-blue-900">
          <AvatarImage src={userDetails.avatar_url} alt={userDetails.login} />
          <AvatarFallback>
           {userDetails.login.substring(0, 2).toUpperCase()}
          </AvatarFallback>
         </Avatar>
        </motion.div>

        <div className="flex-1 text-center sm:text-left">
         <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
         >
          <h2 className="text-2xl font-bold">
           {userDetails.name || userDetails.login}
          </h2>
          <div className="text-blue-600 dark:text-blue-400 mb-2">
           @{userDetails.login}
          </div>
         </motion.div>

         {userDetails.bio && (
          <motion.p
           className="text-gray-600 dark:text-gray-300 mb-3"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
          >
           {userDetails.bio}
          </motion.p>
         )}

         <motion.div
          className="flex flex-wrap gap-3 justify-center sm:justify-start mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
         >
          <Badge variant="secondary" className="flex items-center gap-1">
           <User className="h-3 w-3" />
           <span>{userDetails.followers} followers</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
           <Star className="h-3 w-3" />
           <span>{userDetails.public_repos} repositories</span>
          </Badge>
          {userDetails.location && (
           <Badge variant="outline" className="flex items-center gap-1">
            <span>{userDetails.location}</span>
           </Badge>
          )}
         </motion.div>

         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
         >
          <a
           href={userDetails.html_url}
           target="_blank"
           rel="noopener noreferrer"
           className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
          >
           View on GitHub
           <ExternalLink className="ml-1 h-3 w-3" />
          </a>
         </motion.div>
        </div>
       </div>
      </div>
     ) : null}
    </motion.div>

    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.2 }}
    >
     <div className="flex items-center mb-4">
      <GitFork className="h-5 w-5 mr-2 text-blue-500" />
      <h3 className="text-lg font-medium">Repositories</h3>
     </div>

     {isLoadingRepositories ? (
      <div className="flex justify-center items-center py-8">
       <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
     ) : repositories && repositories.length > 0 ? (
      <div className=" h-screen overflow-y-scroll overflow-x-hidden">
       {repositories.map((repo, index) => (
        <RepositoryCard key={repo.id} repository={repo} index={index} />
       ))}
      </div>
     ) : (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
       No repositories found.
      </div>
     )}
    </motion.div>
   </motion.div>
  </AnimatePresence>
 );
};

export default UserDetail;
