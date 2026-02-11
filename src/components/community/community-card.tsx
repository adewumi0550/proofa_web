"use client";

import React from "react";
import { Users } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CommunityCardProps {
  id: string;
  name: string;
  members: string;
  color: string;
  description?: string;
  isMember?: boolean;
  onJoinClick?: (id: string, name: string) => void;
}

export function CommunityCard({
  id,
  name,
  members,
  color,
  description,
  isMember = false,
  onJoinClick
}: CommunityCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/communities/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className="group cursor-pointer p-6 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
    >
      <div className={cn("w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white bg-gradient-to-br", color)}>
        <Users className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>

      {description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-1 flex-grow">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="text-sm font-medium text-gray-500">{members} members</span>
        <Button
          size="sm"
          variant={isMember ? "secondary" : "default"}
          className={cn(
            "rounded-full font-bold px-4 transition-all relative z-10",
            !isMember && "bg-blue-600 hover:bg-blue-700 text-white",
            isMember && "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onJoinClick?.(id, name);
          }}
        >
          {isMember ? "Joined" : "Join"}
        </Button>
      </div>
    </motion.div>
  );
}
