"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaExpand } from "react-icons/fa";

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

function QuizModal({
  open,
  onClose,
  cards,
  startIndex = 0,
}: {
  open: boolean;
  onClose: () => void;
  cards: Flashcard[];
  startIndex?: number;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [revealed, setRevealed] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [right, setRight] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!open) return null;

  const handleReveal = () => setRevealed(true);

  const handleNext = () => {
    setRevealed(false);
    setCurrent((prev) => (prev + 1 < cards.length ? prev + 1 : prev));
  };
  const handlePrev = () => {
    setRevealed(false);
    setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left") setWrong((w) => w + 1);
    if (dir === "right") setRight((r) => r + 1);
    handleNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) handleSwipe("left");
    if (deltaX > 50) handleSwipe("right");
    touchStartX.current = null;
  };

  const card = cards[current];

  return (
    <div className="fixed inset-0 z-50 bg-[#18183A] bg-opacity-95 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <button onClick={onClose} className="text-white text-2xl">&times;</button>
        <div className="text-lg font-semibold">{current + 1} / {cards.length}</div>
        <button className="text-white"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10h6m-6 0H6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg></button>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1 bg-[#23234A] mb-2">
        <div className="h-1 bg-white" style={{ width: `${((current + 1) / cards.length) * 100}%` }} />
      </div>
      {/* Counters */}
      <div className="flex justify-between items-center px-4 mb-2">
        <div className="flex items-center">
          <span className="bg-[#18183A] border-2 border-[#FF5A5F] text-[#FF5A5F] rounded-full px-3 py-1 font-bold text-lg">{wrong}</span>
        </div>
        <div className="flex items-center">
          <span className="bg-[#18183A] border-2 border-[#00C48C] text-[#00C48C] rounded-full px-3 py-1 font-bold text-lg">{right}</span>
        </div>
      </div>
      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`flip-card large w-[90vw] max-w-md h-[500px] mx-auto ${revealed ? "flipped" : ""}`}
          onClick={() => setRevealed((r) => !r)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: "pointer" }}
        >
          <div className="flip-card-inner h-full">
            <div className="flip-card-front w-[300px] flex flex-col items-center justify-center h-full">
              {card.front}
            </div>
            <div className="flip-card-back w-[300px] flex flex-col items-center justify-center h-full">
              {card.back}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom controls */}
      <div className="flex justify-between items-center px-8 py-4">
        <button onClick={handlePrev} className="text-3xl text-white opacity-70"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <button onClick={handleNext} className="text-3xl text-white opacity-70"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
    </div>
  );
}

export default function ListShowPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const list = mockLists[id] || mockLists["1"];
  const [flipped, setFlipped] = useState(Array(list.cards.length).fill(false));
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStartIndex, setQuizStartIndex] = useState(0);

  const handleFlip = (idx: number) => {
    setFlipped((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleExpand = (idx: number) => {
    setQuizStartIndex(idx);
    setQuizOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#18183A] text-white flex flex-col">
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} cards={list.cards} startIndex={quizStartIndex} />
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
            className={`flip-card small flex-shrink-0 cursor-pointer ${flipped[idx] ? "flipped" : ""}`}
            onClick={() => handleFlip(idx)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front relative flex flex-col items-center justify-center h-40 w-64">
                {card.front}
                <button className="expand-card absolute bottom-3 right-3" onClick={e => { e.stopPropagation(); handleExpand(idx); }}>
                  <FaExpand />
                </button>
              </div>
              <div className="flip-card-back relative flex flex-col items-center justify-center h-40 w-64">
                {card.back}
                <button className="expand-card absolute bottom-3 right-3" onClick={e => { e.stopPropagation(); handleExpand(idx); }}>
                  <FaExpand />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots indicator */}
      <div className="flex justify-center space-x-1 mb-2">
        {list.cards.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-white' : 'bg-[#35356B]'}`}></span>
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
          <span className="mr-3"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"/></svg></span>
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