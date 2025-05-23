// src/components/TrendingList.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./button";
import { motion } from "framer-motion";

interface TrendingItem {
  id: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
}

interface Props {
  chain: "solana" | "ethereum" | "base";
  loading: boolean;
  onDetails: (item: TrendingItem) => void;
  onTrade: (item: TrendingItem) => void;
}

export const TrendingList: React.FC<Props> = ({
  chain,
  loading,
  onDetails,
  onTrade,
}) => {
  const [items, setItems] = useState<TrendingItem[]>([]);

  useEffect(() => {
    // Simulate API data
    const dummyData: TrendingItem[] = Array.from({ length: 4 }, (_, i) => ({
      id: `${chain}-${i}`,
      name: `${chain.toUpperCase()} Coin ${i + 1}`,
      price: `$${(Math.random() * 100).toFixed(2)}`,
      marketCap: `$${(Math.random() * 1_000_000_000).toFixed(0)}`,
      volume: `$${(Math.random() * 10_000_000).toFixed(0)}`,
    }));

    setItems(dummyData);
  }, [chain]);

  if (loading) {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="h-28 bg-[#1E293B] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {items.map((item) => (
        <Card
          key={item.id}
          className="bg-[#1E293B] hover:shadow-lg hover:shadow-[#38BDF850] transition-all"
        >
          <CardContent className="flex flex-col gap-3 text-sm text-white">
            <div className="font-semibold text-lg">{item.name}</div>
            <div className="text-[#38BDF8] font-mono">Price: {item.price}</div>
            <div className="flex justify-between items-center mt-2">
              <Button
                onClick={() => onDetails(item)}
                className="bg-[#334155] hover:bg-[#475569] rounded-full px-3 py-1 text-xs"
              >
                Details
              </Button>
              <Button
                onClick={() => onTrade(item)}
                className="bg-[#38BDF8] hover:bg-[#0EA5E9] rounded-full px-3 py-1 text-xs"
              >
                Trade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};
