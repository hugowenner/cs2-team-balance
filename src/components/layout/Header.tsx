"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shuffle, Globe, MessageCircle } from "lucide-react";

type HeaderProps = {
  activeTab: string;
  onChangeTab: (tab: string) => void;
};

const navItems = [
  { key: "play", label: "Sortear", icon: Shuffle },
];

export function Header({ activeTab, onChangeTab }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#05080f]/85 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-1/4 h-24 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -top-10 right-1/4 h-24 w-56 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-4">
        <motion.button
          type="button"
          onClick={() => onChangeTab("play")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5"
          aria-label="Voltar para Sortear"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-cyan-400/25 blur-md transition-opacity group-hover:opacity-100 opacity-70" />
            <Image
              src="/image.png"
              alt="No Fear CS2 Logo"
              width={40}
              height={40}
              priority
              className="relative h-10 w-10 rounded-lg object-cover ring-1 ring-white/20"
            />
          </div>

          <span
            className="
              font-[var(--font-rocker)] text-lg sm:text-xl font-black tracking-[0.18em]
              bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent
              transition-all duration-200 group-hover:brightness-110
            "
          >
            NO FEAR CS2
          </span>
        </motion.button>

        <nav className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => onChangeTab(item.key)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-700/30"
                    : "text-white/65 hover:bg-white/10 hover:text-white",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </motion.button>
            );
          })}

          {/* Ações externas */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
            {/* 🌐 Site */}
            <motion.a
              href="https://nofear.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold 
                text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Site</span>
            </motion.a>

            {/* 💬 WhatsApp */}
            <motion.a
              href="https://wa.me/5531971836063?text=Fala!%20Vi%20seu%20site%20do%20CS2%20e%20quero%20trocar%20uma%20ideia!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold 
                bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                shadow-lg shadow-green-500/20 hover:shadow-green-400/30
                transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}