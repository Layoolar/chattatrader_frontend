"use client";

import { motion } from "framer-motion";
import { Button } from "./button";
import { ChevronRight } from 'lucide-react';

interface TrendingCardProps {
  name: string;
  symbol: string;
  decimals: number;
  amountHeld: number;
  amountUSD: number;
  amountChain: string;
  logo?: string;
  contractAddress: string;
}

const ChainCard: React.FC<TrendingCardProps> = ({
  name,
  symbol,
  decimals,
  amountHeld,
  amountUSD,
  amountChain,
  logo,
  contractAddress,
}) => {
  return (
    <motion.div
      className="border-[1px] border-[#E9E9E9] p-4 rounded-[8px] shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="flex items-center mb-4">
        {logo && <img src={logo} alt={name} className="w-8 h-8 mr-2" /> }
        <h4 className="text-[#4F4F4F] font-[500] text-[14px] md:text-[18px] font-semibold">
           {name}
           <br />
         </h4>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex flex-row gap-4">
          <div className="font-[400] text-[12px]">
             <p className="text-[#4F4F4F99]">Volume 24h</p>
             <strong className="text-[#4F4F4F]">${amountHeld.toLocaleString()}</strong> 
          </div>
          <div className="font-[400] text-[12px]">
             <p className="text-[#4F4F4F99]">Liquidity</p>
             <strong className="text-[#4F4F4F]">${amountUSD.toLocaleString()}</strong>
          </div>
        </div>
        <p className="text-[#4F4F4F99] font-[400] text-[12px]"><strong></strong>{amountChain}</p>
         <Button
          variant='outline'
          className='w-full md:w-[270px] text-[#4F4F4F] font-[400] text-[18px] cursor-pointer border-[1px] border-[#E9E9E9] mt-4'
        >
          Trade Now
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
        {/* <p><strong>Decimals:</strong>{decimals}</p>
        <p className="truncate"><strong>Contract Address:</strong> {contractAddress}</p> */}
      </div>
    </motion.div>
  );
};

export default ChainCard;
