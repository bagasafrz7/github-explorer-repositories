import React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Calendar, Code, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { GithubRepository } from "@/lib/types";

interface RepositoryCardProps {
 repository: GithubRepository;
 index: number;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
 repository,
 index,
}) => {
 const formattedDate = formatDistanceToNow(new Date(repository.updated_at), {
  addSuffix: true,
 });

 return (
  <motion.div
   className="repository-row glass-card rounded-xl p-4 mb-4 group hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-gray-100 dark:border-gray-800"
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{
    duration: 0.3,
    delay: index * 0.05,
    ease: "easeOut",
   }}
   whileHover={{
    scale: 1.01,
    transition: { duration: 0.2 },
   }}
  >
   <div className="flex items-start justify-between">
    <div className="flex-1">
     <a
      href={repository.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200"
     >
      {repository.name}
      <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
     </a>

     {repository.description && (
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
       {repository.description}
      </p>
     )}

     <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center">
       <Star className="repository-star h-4 w-4 mr-1 transition-colors duration-200" />
       <span>{repository.stargazers_count.toLocaleString()}</span>
      </div>

      <div className="flex items-center">
       <GitFork className="h-4 w-4 mr-1" />
       <span>{repository.forks_count.toLocaleString()}</span>
      </div>

      {repository.language && (
       <div className="flex items-center">
        <Code className="h-4 w-4 mr-1" />
        <span>{repository.language}</span>
       </div>
      )}

      <div className="flex items-center">
       <Calendar className="h-4 w-4 mr-1" />
       <span>{formattedDate}</span>
      </div>
     </div>
    </div>

    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8 text-xs font-medium ml-2">
     {index + 1}
    </div>
   </div>
  </motion.div>
 );
};

export default RepositoryCard;
