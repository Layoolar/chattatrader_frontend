import { useState } from "react";
import { Button } from "../reuseables/button";
import { Modal } from "../reuseables/Modal";
import { TrendingList } from "../reuseables/TrendingList";
import { AnimatePresence } from "framer-motion";

interface TrendingItem {
  id: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
}

type Chain = "solana" | "ethereum" | "base";

const Discovery: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [showDetails, setShowDetails] = useState<TrendingItem | null>(null);
  const [showTradeModal, setShowTradeModal] = useState<TrendingItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChainClick = (chain: Chain) => {
    if (selectedChain === chain) {
      setSelectedChain(null);
    } else {
      setLoading(true);
      setTimeout(() => {
        setSelectedChain(chain);
        setLoading(false);
      }, 800); // simulate API loading
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6 bg-[#0F172A] min-h-screen text-white">
      {/* Search Bar & Connect */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-[639px]">
            <input
              type="text"
              placeholder="Search by Address / txn hash / block / token"
              className="w-full px-4 pr-10 py-2 border border-[#334155] bg-[#1E293B] placeholder-[#94A3B8] text-white rounded-[24px] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-sm sm:text-base"
            />
            <img
              src="/images/Search.svg"
              alt="Search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
          </div>
          <Button className="w-full sm:w-[140px] bg-[#38BDF8] hover:bg-[#0EA5E9] text-white rounded-[24px] text-[16px]">
            Connect
          </Button>
        </div>
      </div>

      {/* Trending Lists */}
      <div className="w-full max-w-7xl mx-auto">
        {(["solana", "ethereum", "base"] as Chain[]).map((chain) => (
          <div key={chain} className="mt-6">
            <div
              className="cursor-pointer text-xl font-semibold hover:text-[#38BDF8] transition"
              onClick={() => handleChainClick(chain)}
            >
              Trending on {chain.charAt(0).toUpperCase() + chain.slice(1)}
            </div>
            <AnimatePresence>
              {selectedChain === chain && (
                <TrendingList
                  chain={chain}
                  loading={loading}
                  onDetails={setShowDetails}
                  onTrade={setShowTradeModal}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showDetails && (
        <Modal onClose={() => setShowDetails(null)} title={`Details for ${showDetails.name}`}>
          <div className="space-y-2 text-white text-sm animate-fade-in">
            <p><strong>Price:</strong> {showDetails.price}</p>
            <p><strong>Market Cap:</strong> {showDetails.marketCap}</p>
            <p><strong>Volume:</strong> {showDetails.volume}</p>
          </div>
        </Modal>
      )}

      {showTradeModal && (
        <Modal onClose={() => setShowTradeModal(null)} title={`Trade ${showTradeModal.name}`}>
          <div className="flex flex-col gap-3 animate-slide-up">
            <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg">Buy</Button>
            <Button className="bg-red-600 hover:bg-red-500 text-white rounded-lg">Sell</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Discovery;
