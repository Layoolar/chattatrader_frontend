import { useState, useEffect  } from "react";
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle} from "../reuseables/Card";
import { Badge } from "../reuseables/badge";
import { Label } from "../reuseables/label";
import { Tabs, TabsList, TabsTrigger } from "../reuseables/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../reuseables/button";
import { Input } from "../reuseables/input";
import { toast } from 'sonner';
import {
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Copy,
  Check,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import TokenModal from "../reuseables/TokenModal";
import ChainCard from "../reuseables/ChainCard";

interface Token {
  name: string;
  symbol: string;
  logoURI: string;
}

interface FormData {
  amount: number;
}

const WalletPage: React.FC = ({ selectedChains }: { selectedChains: string }) => {
  const [customTokens, setCustomTokens] = useState<{ [ chain: string]: any[]; }>({ etherum: [], base: [] });
   const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeChain, setActiveChain] = useState<"ethereum" | "base" | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [selectedChain, setSelectedChain] = useState("sol");
  const [copiedAddress, setCopiedAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'sell'>('buy');
  const [contractAddress, setContractAddress] = useState("");
  const [tokenInfo, setTokenInfo] = useState<{ symbol: string; decimals: number} | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!contractAddress || !activeChain) return;

    const fetchTokenInfo = async () => {
      setIsFetching(true);

      try {
           // TODO: preparing logic for the actual web3 logic API
           const mockResponse = {
            symbol: "SOL",
            decimals: 18,
           };

           // Simulate network delay
           await new Promise((res) => setTimeout(res, 1000));

           // Replace later with api endpoints for Ethereum chains
           setTokenInfo(mockResponse);
      } catch(err) {
        console.error("Failed to fetch token info", err);
        setTokenInfo(null);
      } finally {
        setIsFetching(false)
      }
    };
    fetchTokenInfo();
  }, [contractAddress, activeChain]);


  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(text);
      setTimeout(() => setCopiedAddress(""), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted:", data);
    toast.success(`Token ${modalType} of ${data.amount} ${selectedToken.symbol}`);
    setIsModalOpen(false);
  };

  const selectedToken: Token = {
    name: 'Bonk',
    symbol: 'Bonk',
    logoURI: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  };

  const baseTokens = {
    solana: [
      {
       name: 'Solana',
       amountHeld: 542789349.22,
      amountUSD: 542789349.22,
       amountChain: '50 SOL',
       logo: 'https://wsrv.nl/?w=32&h=32&url=https%3A%2F%2Fipfs.io%2Fipfs%2FQmbi9jsNn718gvh85C2vuj4CSsu5JmuYq1W7B1vk2ys88W&dpr=2',
       decimals: 10,
       contractAddress: "kndjndj930i9i30i0"
      }
    ],
    ethereum: [
     {
      name: 'Ethereum',
      amountHeld: 542789349.22,
     amountUSD: 542789349.22,
      amountChain: '1.2 ETH',
      logo: 'https://wsrv.nl/?w=32&h=32&url=https%3A%2F%2Fbafkreidlwyr565dxtao2ipsze6bmzpszqzybz7sqi2zaet5fs7k53henju.ipfs.nftstorage.link%2F&dpr=2',
      decimals: 20,
       contractAddress: "kndjndj930i9i30i0"
     },
    ],
    base: [
      {
        name: 'Base',
       amountHeld: 542789349.22,
       amountUSD: 542789349.22,
       amountChain: '1000 BASE',
       logo: 'https://wsrv.nl/?w=32&h=32&url=https%3A%2F%2Fipfs.io%2Fipfs%2FQmbi9jsNn718gvh85C2vuj4CSsu5JmuYq1W7B1vk2ys88W&dpr=2',
       decimals: 15,
        contractAddress: "kndjndj930i9i30i0"
      }
    ]
  };

  const handleDelete = (chain: string, idx: number) => {
     setCustomTokens((prev) => ({
       ...prev,
       [chain]: prev[chain].filter((_, i) => i !== idx),
     }));
  };

  return (
    <>
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="flex-1 space-y-6">
          <Card className="bg-[#008080] rounded-[8px]">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-medium text-white truncate max-w-[160px] sm:max-w-[200px]">
                      Chattatrader Balance
                    </h2>
                    <Eye
                      className="h-5 w-5 cursor-pointer text-white hover:opacity-80"
                      onClick={() => setShowBalance(!showBalance)}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-right text-[#FFFFFF99] ml-auto">
                    <div>
                      <span className="text-sm font-[500] block">Value Risk</span>
                      <p className="text-base font-semibold">******</p>
                    </div>
                    <div>
                      <span className="text-sm font-[500] block">Your Risk</span>
                      <p className="text-base font-semibold">*******</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <Tabs defaultValue={selectedChain} onValueChange={setSelectedChain}>
                      <TabsList className="bg-[#ec57571a]">
                        <TabsTrigger value="sol" className="text-white data-[state=active]:bg-[#FFFFFF33]">Solana</TabsTrigger>
                        <TabsTrigger value="eth" className="text-white data-[state=active]:bg-[#FFFFFF33]">Ethereum</TabsTrigger>
                        <TabsTrigger value="base" className="text-white data-[state=active]:bg-[#FFFFFF33]">Base</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <AnimatePresence>
                      {showBalance && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-2 p-3 rounded-lg bg-[#03A0A0]">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-white">{selectedChain.toUpperCase()}</span>
                                <Badge variant="secondary" className="bg-white/20">Native</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard("wallet-address")}
                              >
                                {copiedAddress ? (
                                  <Check className="h-4 w-4 text-white" />
                                ) : (
                                  <Copy className="h-4 w-4 text-white" />
                                )}
                              </Button>
                            </div>
                            <div className="flex justify-between text-white">
                              <span className="text-sm opacity-70">Amount</span>
                              <span className="font-medium">{Number(0).toFixed(6)}</span>
                            </div>
                            <div className="flex justify-between text-white">
                              <span className="text-sm opacity-70">USD Value</span>
                              <span className="font-medium">${Number(0).toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-medium text-white">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="bg-[#FAFAFA] text-black rounded-[8px]">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                      <Button className="bg-[#FAFAFA] text-black rounded-[8px]">
                        <ArrowDownRight className="mr-2 h-4 w-4" />
                        Receive
                      </Button>
                      <Button className="bg-[#FAFAFA] text-black rounded-[8px]" onClick={() => { setModalType('buy'); setIsModalOpen(true); }}>
                        <Wallet className="mr-2 h-4 w-4" />
                        Buy
                      </Button>
                      <Button className="bg-[#FAFAFA] text-black rounded-[8px]" onClick={() => { setModalType('sell'); setIsModalOpen(true); }}>
                        <ArrowDownRight className="ml-2 h-4 w-4" />
                        Sell
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
      {/* Trending Tokens Section */}
      <Card>
       <CardHeader>
        <CardTitle>Trending Tokens</CardTitle>
     </CardHeader>
     <CardContent>
        <Tabs defaultValue="all" onValueChange={setSelectedChain}>
         <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="solana">Solana</TabsTrigger>
          <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
          <TabsTrigger value="base">Base</TabsTrigger>
        </TabsList>
      </Tabs>


      {/* Import/Delete buttons only on selected chain tabs */}
          {["ethereum", "base", "solana"].includes(selectedChain) && (
            <div className="flex justify-end gap-4 mb-4">
              <Button
                className="bg-[#FF9500] text-[14px] text-[#FAFAFA]  text-white px-4 py-2 rounded transition"
                onClick={() => {
                  setActiveChain(selectedChain as "ethereum" | "base" | "solana");
                  setShowImportModal(true);
                }}
              >
                Import Token
              </Button>
              <Button
                className="bg-red-600  text-[14px] text-[#FAFAFA] text-white px-4 py-2 rounded transition"
                onClick={() => setIsDeleteMode((prev) => !prev)}
              >
                {isDeleteMode ? "Exit Delete Mode" : "Delete Token"}
              </Button>
            </div>
          )}

          {/* Tokens display */}
          {selectedChain === "all" ? (
            // ALL chains combined view
            <div
              className="
                flex flex-col space-y-6 
                sm:grid sm:grid-cols-2 sm:gap-6 
                md:grid-cols-3
              "
            >
              {["solana", "ethereum", "base"].flatMap((chain) => {
                const tokens = [...(baseTokens[chain] || []), ...(customTokens[chain] || [])];
                return tokens.map((token, idx) => (
                  <div key={`${chain}-${idx}`} className="relative">
                    <ChainCard {...token} />
                    {isDeleteMode && idx >= baseTokens[chain].length && (
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                        onClick={() => handleDelete(chain, idx - baseTokens[chain].length)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ));
              })}
            </div>
          ) : (
            // Single chain selected
            ["solana", "ethereum", "base"]
              .filter((chain) => selectedChain === chain)
              .map((chain) => {
                const tokens = [...(baseTokens[chain] || []), ...(customTokens[chain] || [])];

                return (
                  <div key={chain} className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">{chain.toUpperCase()}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {tokens.map((token, idx) => (
                        <div key={idx} className="relative">
                          <ChainCard 
                            name={token.name}
                            symbol={token.symbol}
                            decimals={token.decimals}
                            amountHeld={token.amountHeld}
                            amountUSD={token.amountUSD}
                            amountChain={token.amountChain}
                            contractAddress={token.contractAddress}
                            logo={token.logo}
                           />
                          {isDeleteMode && idx >= baseTokens[chain].length && (
                            <button
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                              onClick={() => handleDelete(chain, idx - baseTokens[chain].length)}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          )}

          {/* Import Modal Code (unchanged) */}
          {showImportModal && (
            // modal code here ...
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Import Token - {activeChain?.toUpperCase()}</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newToken = {
                      name: tokenInfo?.name || "Chains",
                      symbol: tokenInfo?.symbol,
                      decimals: tokenInfo?.decimals,
                      contractAddress: contractAddress,
                      amountHeld: 0,
                      amountUSD: 0,
                      amountChain: activeChain!,
                      logo: tokenInfo?.logo || ""
                    };
                    setCustomTokens((prev) => ({
                      ...prev,
                      [activeChain!]: [...(prev[activeChain!] || []), newToken],
                    }));
                    setShowImportModal(false);
                    setContractAddress("");
                    setTokenInfo(null);
                  }}
                >
                 <div className="space-y-3">
                    <div>
                       <Label htmlFor="contract" className="text-[#7B7B7B] text-[16px] font-[400]">
                         Contract Address
                        </Label>
                       <Input 
                         name="contract" 
                         value={contractAddress}
                         onChange={(e) => setContractAddress(e.target.value)}
                         required
                         className="w-full p-2 border rounded border-[1px] border-[#E9E9E9]"
                        placeholder="0x..."
                       />
                    </div>
                    {isFetching ? (
                      <p className="text-sm text-gray-500">Fetching token info....</p>
                    ): (
                      tokenInfo && (
                        <>
                          <div>
                            <Label htmlFor="tokenSymbol" className="text-[#7B7B7B] text-[16px] font-[400]">Token Symbol</Label>
                            <Input 
                               name="symbol"
                               value={tokenInfo.symbol}
                               readOnly
                               className="w-full p-2 border rounded border-[#E9E9E9] bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tokenDecimals" className="text-[#7B7B7B] text-[16px] font-[400]">
                               Token Decimals
                              </Label>
                              <Input 
                                 type="number"
                                 name="decimals"
                                 value={tokenInfo.decimals}
                                 className="w-full p-2 border rounded border-[#E9E9E9] bg-gray-100"
                              />
                          </div>
                        </>
                      )
                    )}
                 </div>
                 <div className="flex justify-end mt-4 gap-3">
                  <Button 
                     type="button" 
                     className="px-4 py-2 cursor-pointer border-[1px] border-[#E9E9E9]" 
                     onClick={() => {
                      setShowImportModal(false);
                      setContractAddress("");
                      setTokenInfo(null);
                     }}>
                     Cancel
                   </Button>
                    <Button 
                       type="submit"
                       disabled={!tokenInfo}
                       className="bg-green-600 text-white px-4 py-2 rounded">
                     Import
                  </Button>
              </div>
                </form>
              </div>
            </div>
          )}
     </CardContent>
      </Card>
      </div>

      {/* Token Modal */}
      <TokenModal
        type={modalType}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedToken={selectedToken}
        selectedChain={selectedChain}
        isProcessing={false}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default WalletPage;
