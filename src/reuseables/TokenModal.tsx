import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Label } from './label';
import { Input } from './input';
import { Button } from './button';
import type {  UseFormRegister, FieldErrors, SubmitHandler } from 'react-hook-form';

interface Token {
  name: string;
  symbol: string;
  logoURI: string;
}

interface TokenModalProps {
  type: 'buy' | 'sell';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedToken: Token | null;
  selectedChain: string;
  isProcessing: boolean;
  onSubmit: SubmitHandler<{ amount: number }>;
  register: UseFormRegister<{ amount: number }>;
  errors: FieldErrors<{ amount: number }>;
}

const TokenModal: FC<TokenModalProps> = ({
  type,
  isOpen,
  onOpenChange,
  selectedToken,
  selectedChain,
  isProcessing,
  onSubmit,
  register,
  errors,
}) => {
  const title = type === 'buy' ? 'Buy' : 'Sell';
  const buttonText = isProcessing ? `${title}ing...` : `${title} Token`;
  const buttonColor = type === 'buy' ? 'bg-[#FF9500]' : 'bg-red-600';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-[8px] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-[#4F4F4F] text-[14px] md:text-[20px] font-[500]">
            {title} {selectedToken?.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Token Info */}
          <div className="space-y-2">
            <Label className="text-[#7B7B7B] text-[16px] font-[400]">Token Information</Label>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#F6F6F6] md:h-[47px]">
              <img
                src="/images/bokChain.svg"
                alt={selectedToken?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-[#4F4F4F] text-[18px]">{selectedToken?.name}</p>
                <p className="text-sm text-[#4F4F4F99] font-[400]">{selectedToken?.symbol}</p>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-[#7B7B7B] text-[16px] font-[400]">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="mt-2 focus:outline-none border-[1px] border-[#E9E9E9] mb-2 placeholder-[#919191] md:h-[40px]"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Minimum amount is 0.01" },
              })}
            />
            <Label htmlFor="address" className="text-[#7B7B7B] text-[16px] font-[400]">Address</Label>
            <Input 
               type="text"
               placeholder="Enter Wallet Address"
               className="bg-[#F6F6F6] focus:outline-none border-none placeholder-[#919191] md:h-[56px]"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`${buttonColor} text-[#FAFAFA] text-[14px] font-[500] px-6 cursor-pointer`}
              disabled={isProcessing}
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TokenModal;
