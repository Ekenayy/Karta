"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


type Flashcard = { front: string; back: string };
type List = {
  id: string;
  title: string;
  user: string;
  avatar: string;
  terms: number;
  description: string;
  cards: Flashcard[];
};

// Mock data for demonstration
const mockLists: Record<string, List> = {
  "1": {
    id: "1",
    title: "Igbo Language",
    user: "ekenayy3",
    avatar: "/icons/icon128.png",
    terms: 30,
    description: "English->Igbo and reverse",
    cards: [
      { front: "Nne", back: "Mother" },
      { front: "Nna", back: "Father" },
      { front: "Ụmụaka", back: "Children" },
      { front: "Akwụkwọ", back: "Book" },
      { front: "Ụlọ", back: "House" },
      { front: "Akwụkwọ akwụkwọ", back: "Notebook" },
    ],
  },
};

export default function ListShowPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const list = mockLists[id] || mockLists["1"];
  const [flipped, setFlipped] = useState(Array(list.cards.length).fill(false));
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFlip = (idx: number) => {
    setFlipped((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#18183A] text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <button onClick={() => router.push("/")} className="text-white">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="bg-yellow-400 text-[#18183A] font-semibold rounded-full px-4 py-1 text-sm">Avaliação gratuita</button>
        <div className="flex items-center space-x-3">
          <button><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg></button>
        </div>
      </div>

      {/* Flashcards carousel */}
      <div className="overflow-x-auto flex space-x-4 px-4 pb-2 snap-x snap-mandatory">
        {list.cards.map((card, idx) => (
          <div
            key={idx}
            className={`flip-card flex-shrink-0 cursor-pointer ${flipped[idx] ? "flipped" : ""}`}
            onClick={() => handleFlip(idx)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                {card.front}
              </div>
              <div className="flip-card-back">
                {card.back}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots indicator */}
      <div className="flex justify-center space-x-1 mb-2">
        {list.cards.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-[#35356B]'}`}></span>
        ))}
      </div>

      {/* List info */}
      <div className="px-4 mt-2">
        <h2 className="text-2xl font-bold mb-1">{list.title}</h2>
        <div className="flex items-center mb-2">
          <Image src={list.avatar} alt={list.user} width={28} height={28} className="rounded-full border border-[#35356B]" />
          <span className="ml-2 text-sm text-gray-300">{list.user}</span>
          <span className="mx-2 text-gray-500">|</span>
          <span className="text-sm text-gray-300">{list.terms} termos</span>
        </div>
        <div className="text-gray-300 mb-4">{list.description}</div>
      </div>

      {/* Action buttons (static) */}
      <div className="px-4 space-y-3 mt-2 mb-8">
        <div className="flex items-center bg-[#23234A] rounded-xl px-4 py-3 mb-1">
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#4FC3F7" strokeWidth="2"/><path d="M8 10h8M8 14h5" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
          <span>Cartões</span>
        </div>
        <div className="flex items-center bg-[#23234A] rounded-xl px-4 py-3 mb-1">
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#4FC3F7" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
          <span>Aprender</span>
        </div>
        <div className="flex items-center bg-[#23234A] rounded-xl px-4 py-3 mb-1">
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
          <span>Avaliar</span>
        </div>
        <div className="flex items-center bg-[#23234A] rounded-xl px-4 py-3 mb-1">
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
          <span>Combinar</span>
        </div>
        <div className="flex items-center bg-[#23234A] rounded-xl px-4 py-3 mb-1">
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#4FC3F7" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
          <span>Blast</span>
        </div>
      </div>
    </div>
  );
} 