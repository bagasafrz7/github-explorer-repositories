import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GithubRepository, GithubUser } from '@/lib/types';

export function useGithubSearch() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const searchUsers = async (username: string): Promise<GithubUser[]> => {
        if (!username.trim()) return [];

        try {
            const response = await fetch(
                `https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=5`
            );

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error searching GitHub users:', error);
            throw error;
        }
    };

    const fetchUserDetails = async (username: string): Promise<GithubUser> => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };

    const fetchUserRepositories = async (username: string): Promise<GithubRepository[]> => {
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
            );

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    };

    // Query for users search
    const usersQuery = useQuery({
        queryKey: ['githubUsers', searchTerm],
        queryFn: () => searchUsers(searchTerm),
        enabled: !!searchTerm.trim(),
        staleTime: 60000, // 1 minute
    });

    // Query for selected user details
    const userDetailsQuery = useQuery({
        queryKey: ['githubUserDetails', selectedUser],
        queryFn: () => fetchUserDetails(selectedUser!),
        enabled: !!selectedUser,
        staleTime: 300000, // 5 minutes
    });

    // Query for user repositories
    const userRepositoriesQuery = useQuery({
        queryKey: ['githubRepositories', selectedUser],
        queryFn: () => fetchUserRepositories(selectedUser!),
        enabled: !!selectedUser,
        staleTime: 300000, // 5 minutes
    });

    return {
        // State setters
        setSearchTerm,
        setSelectedUser,
        // State getters
        searchTerm,
        selectedUser,
        // Queries
        usersQuery,
        userDetailsQuery,
        userRepositoriesQuery,
    };
}
