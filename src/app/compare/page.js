"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowLeftRightLine,
  RiCoinLine,
  RiSearchLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiExchangeDollarLine,
  RiTrophyLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";

function useCoinSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const search = useCallback((q) => {
    setQuery(q);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    timer.current = setTimeout(() => {
      setSearching(true);
      fetch(`https://api.coingecko.com/api/v3/search?query=${q}`)
        .then((r) => r.json())
        .then((d) => setResults(d.coins?.slice(0, 5) || []))
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 400);
  }, []);

  return { query, search, results, searching, show, setShow };
}

function CoinSearchInput({ label, side, onSelect, selectedCoin }) {
  const { query, search, results, searching, show, setShow } = useCoinSearch();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShow]);

  const sideColor = side === "a" ? "#7c75ff" : "#f7c94b";

  return (
    <div ref={ref} className="relative">
      <label className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-2 block">
        {label}
      </label>
      {selectedCoin ? (
        <div
          className="flex items-center gap-3 p-3.5 rounded-xl border bg-[#0b0c12]"
          style={{ borderColor: `${sideColor}25` }}
        >
          {selectedCoin.image && (
            <img
              src={selectedCoin.image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold">{selectedCoin.name}</p>
            <p className="text-[10px] font-mono text-white/30">
              {selectedCoin.symbol}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-white/30 hover:text-white/60 cursor-pointer px-2 py-1 rounded bg-white/[0.04]"
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search token..."
            value={query}
            onChange={(e) => search(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none text-sm"
            style={{ focusBorderColor: sideColor }}
          />
          <AnimatePresence>
            {show && (results.length > 0 || searching) && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 w-full mt-1 bg-[#0d0f1a] border border-white/10 rounded-xl overflow-hidden py-1"
              >
                {searching ? (
                  <li className="px-4 py-3 text-xs text-white/30 text-center animate-pulse">
                    Searching...
                  </li>
                ) : (
                  results.map((coin) => (
                    <li
                      key={coin.id}
                      onClick={async () => {
                        setShow(false);
                        try {
                          const res = await fetch(
                            `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
                          );
                          const data = await res.json();
                          const md = data.market_data;
                          onSelect({
                            id: coin.id,
                            name: data.name,
                            symbol: data.symbol?.toUpperCase(),
                            image: data.image?.small,
                            price: md?.current_price?.usd,
                            change24h: md?.price_change_percentage_24h,
                            change7d: md?.price_change_percentage_7d,
                            change30d: md?.price_change_percentage_30d,
                            marketCap: md?.market_cap?.usd,
                            volume: md?.total_volume?.usd,
                            rank: data.market_cap_rank,
                            ath: md?.ath?.usd,
                            athChange: md?.ath_change_percentage?.usd,
                            circulatingSupply: md?.circulating_supply,
                            totalSupply: md?.total_supply,
                            maxSupply: md?.max_supply,
                          });
                        } catch {
                          onSelect({
                            id: coin.id,
                            name: coin.name,
                            symbol: coin.symbol,
                            image: coin.thumb,
                          });
                        }
                      }}
                      className="px-4 py-2.5 hover:bg-white/[0.04] cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={coin.thumb}
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-white/80">{coin.name}</span>
                      <span className="text-[10px] font-mono text-white/30 uppercase">
                        {coin.symbol}
                      </span>
                    </li>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function CompareMetric({ label, valueA, valueB, format = "default", icon: Icon }) {
  const fmt = (v) => {
    if (v == null) return "—";
    if (format === "currency")
      return v >= 1e9
        ? `$${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `$${(v / 1e6).toFixed(2)}M`
          : `$${v.toLocaleString()}`;
    if (format === "percent") return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
    if (format === "supply")
      return v >= 1e9
        ? `${(v / 1e9).toFixed(2)}B`
        : v >= 1e6
          ? `${(v / 1e6).toFixed(2)}M`
          : v?.toLocaleString?.() ?? "—";
    if (format === "price")
      return `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    return v?.toString?.() ?? "—";
  };

  const colorA =
    format === "percent" && valueA != null
      ? valueA >= 0
        ? "text-[#2dd4a0]"
        : "text-[#ff6b5b]"
      : "";
  const colorB =
    format === "percent" && valueB != null
      ? valueB >= 0
        ? "text-[#2dd4a0]"
        : "text-[#ff6b5b]"
      : "";

  // Determine which side wins for this metric
  const winA =
    valueA != null && valueB != null && format !== "percent"
      ? valueA > valueB
      : format === "percent" && valueA != null && valueB != null
        ? valueA > valueB
        : false;
  const winB =
    valueA != null && valueB != null && format !== "percent"
      ? valueB > valueA
      : format === "percent" && valueA != null && valueB != null
        ? valueB > valueA
        : false;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.03] last:border-0">
      <div className="flex-1 text-right">
        <p className={`text-sm font-mono ${colorA} ${winA ? "font-bold" : ""}`}>
          {fmt(valueA)}
        </p>
      </div>
      <div className="w-28 sm:w-36 text-center shrink-0">
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider font-medium">
          {Icon && <Icon className="text-xs" />}
          {label}
        </div>
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-mono ${colorB} ${winB ? "font-bold" : ""}`}>
          {fmt(valueB)}
        </p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [coinA, setCoinA] = useState(null);
  const [coinB, setCoinB] = useState(null);

  const bothSelected = coinA && coinB;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Compare <span className="text-gradient">Tokens</span>
          </h1>
          <p className="text-white/35 text-sm">
            Select two tokens and compare their market fundamentals.
          </p>
        </motion.div>

        {/* Coin selectors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <CoinSearchInput
            label="Token A"
            side="a"
            onSelect={setCoinA}
            selectedCoin={coinA}
          />
          <CoinSearchInput
            label="Token B"
            side="b"
            onSelect={setCoinB}
            selectedCoin={coinB}
          />
        </motion.div>

        {/* Comparison Table */}
        <AnimatePresence>
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden"
            >
              {/* Header row */}
              <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-white/[0.06]">
                <div className="flex-1 flex items-center gap-2 justify-end">
                  {coinA.image && (
                    <img
                      src={coinA.image}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-bold">{coinA.symbol}</span>
                </div>
                <div className="w-28 sm:w-36 text-center shrink-0">
                  <RiArrowLeftRightLine className="text-white/20 mx-auto text-lg" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  {coinB.image && (
                    <img
                      src={coinB.image}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-sm font-bold">{coinB.symbol}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="px-4 sm:px-5 py-2">
                <CompareMetric
                  label="Rank"
                  valueA={coinA.rank ? `#${coinA.rank}` : null}
                  valueB={coinB.rank ? `#${coinB.rank}` : null}
                  icon={RiTrophyLine}
                />
                <CompareMetric
                  label="Price"
                  valueA={coinA.price}
                  valueB={coinB.price}
                  format="price"
                  icon={RiCoinLine}
                />
                <CompareMetric
                  label="24h"
                  valueA={coinA.change24h}
                  valueB={coinB.change24h}
                  format="percent"
                  icon={RiExchangeDollarLine}
                />
                <CompareMetric
                  label="7d"
                  valueA={coinA.change7d}
                  valueB={coinB.change7d}
                  format="percent"
                />
                <CompareMetric
                  label="30d"
                  valueA={coinA.change30d}
                  valueB={coinB.change30d}
                  format="percent"
                />
                <CompareMetric
                  label="Market Cap"
                  valueA={coinA.marketCap}
                  valueB={coinB.marketCap}
                  format="currency"
                  icon={RiPieChartLine}
                />
                <CompareMetric
                  label="24h Volume"
                  valueA={coinA.volume}
                  valueB={coinB.volume}
                  format="currency"
                  icon={RiBarChartBoxLine}
                />
                <CompareMetric
                  label="ATH"
                  valueA={coinA.ath}
                  valueB={coinB.ath}
                  format="price"
                  icon={RiTrophyLine}
                />
                <CompareMetric
                  label="From ATH"
                  valueA={coinA.athChange}
                  valueB={coinB.athChange}
                  format="percent"
                />
                <CompareMetric
                  label="Circulating"
                  valueA={coinA.circulatingSupply}
                  valueB={coinB.circulatingSupply}
                  format="supply"
                />
                <CompareMetric
                  label="Max Supply"
                  valueA={coinA.maxSupply}
                  valueB={coinB.maxSupply}
                  format="supply"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!bothSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <RiArrowLeftRightLine className="text-3xl text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/25">
              Select two tokens above to compare
            </p>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
