import { useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Euro,
  Bitcoin,
  CreditCard,
  Wallet,
  X,
  Copy,
} from "lucide-react";

export default function DonationDialog() {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const cryptocurrencies = [
    {
      name: "BNB (Smart Chain - BEP20)",
      address: "0x...",
      details:
        "Please ensure you are sending BNB on the Binance Smart Chain (BEP20).",
      tag: null,
      icon: <DollarSign size={20} />,
    },
    {
      name: "USDT (Tether)",
      address: "0x...",
      details: "Please specify the network (e.g., ERC20, TRC20, BEP20).",
      tag: null,
      icon: <Euro size={20} />,
    },
    {
      name: "XRP (Ripple)",
      address: "rp...",
      details: "Remember to include the Destination Tag for XRP transactions.",
      tag: "12345",
      icon: <Bitcoin size={20} />,
    },
    {
      name: "TON (The Open Network)",
      address: "EQ...",
      details: "Ensure you are sending TON to the correct network.",
      tag: null,
      icon: <CreditCard size={20} />,
    },
  ];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!");
  };

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast.success("Destination Tag copied to clipboard!");
  };

  return (
    <>
      <dialog id="donation_modal" className="modal">
        <div className="modal-box max-h-[calc(100vh-5rem)]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
          </form>
          <h3 className="font-bold text-2xl text-primary mb-4">
            Donate Crypto
          </h3>
          <p className="text-base mb-6">
            Please select a cryptocurrency to view its donation details:
          </p>
          <div
            role="tablist"
            className="tabs tabs-boxed bg-base-300 p-1 rounded-box flex-wrap"
          >
            {cryptocurrencies.map((crypto) => (
              <a
                key={crypto.name}
                role="tab"
                className={`tab tab-lg rounded  -xl flex-grow sm:flex-none gap-2 ${
                  selectedCrypto === crypto.name
                    ? "tab-active bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }`}
                onClick={() => setSelectedCrypto(crypto.name)}
              >
                {crypto.icon}
                <span className="hidden sm:inline">{crypto.name}</span>
                <span className="sm:hidden">{crypto.name.split(" ")[0]}</span>
              </a>
            ))}
          </div>

          {selectedCrypto && (
            <div className="mt-8 p-6 bg-base-100 rounded-box shadow-lg border border-base-300">
              {cryptocurrencies
                .filter((crypto) => crypto.name === selectedCrypto)
                .map((crypto) => (
                  <div key={crypto.name}>
                    <h4 className="font-bold text-xl mb-4 text-secondary">
                      {crypto.name}
                    </h4>
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 bg-base-200 p-3 rounded-md">
                      <p className="flex items-center gap-2 font-medium">
                        <Wallet size={18} className="text-info" />
                      </p>
                      <code className="break-all flex-grow text-sm sm:text-base bg-base-300 p-2 rounded-md">
                        {crypto.address}
                      </code>
                      <button
                        className="btn btn-sm btn-outline btn-primary mt-2 sm:mt-0"
                        onClick={() => handleCopyAddress(crypto.address)}
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    {crypto.tag && (
                      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 bg-base-200 p-3 rounded-md">
                        <p className="flex items-center gap-2 font-medium">
                          <CreditCard size={18} className="text-warning" />{" "}
                          Destination Tag:
                        </p>
                        <code className="flex-grow text-sm sm:text-base bg-base-300 p-2 rounded-md">
                          {crypto.tag}
                        </code>
                        <button
                          className="btn btn-sm btn-outline btn-warning mt-2 sm:mt-0"
                          onClick={() => handleCopyTag(crypto.tag!)}
                        >
                          <Copy size={16} /> Copy
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-base-content/80 mt-4 leading-relaxed">
                      {crypto.details}
                    </p>
                  </div>
                ))}
            </div>
          )}

          <p className="py-6 text-base text-base-content/70 text-center">
            Thank you for your generous support!
          </p>
          <div className="modal-action justify-center">
            <form method="dialog">
              <button className="btn btn-primary btn-lg">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
