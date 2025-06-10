import Image from "next/image";

const flashcards = [
  {
    title: "Igbo Language",
    terms: 30,
    user: "ekenayy3",
    avatar: "/icons/icon128.png",
  },
  {
    title: "Portuguese Common Nouns",
    terms: 31,
    user: "ekenayy3",
    avatar: "/icons/icon128.png",
  },
  {
    title: "Verbs",
    terms: 11,
    user: "yuser",
    avatar: "/icons/icon128.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#18183A] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full rounded-full bg-[#23234A] px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="ml-4">
          <Image
            src="/icons/icon128.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#23234A]"
          />
        </div>
      </header>

      {/* Lists Section */}
      <main className="flex-1 px-4">
        <h2 className="text-lg font-bold mb-2">Listas</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {flashcards.map((card, idx) => (
            <div
              key={idx}
              className="min-w-[250px] bg-[#23234A] rounded-2xl p-4 flex-shrink-0 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base truncate">
                  {card.title}
                </span>
                <span className="bg-[#23234A] text-xs px-2 py-1 rounded-full border border-[#35356B]">
                  {card.terms} termos
                </span>
              </div>
              <div className="flex items-center mt-4">
                <Image
                  src={card.avatar}
                  alt={card.user}
                  width={28}
                  height={28}
                  className="rounded-full border border-[#35356B]"
                />
                <span className="ml-2 text-sm text-gray-300">{card.user}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#23234A] flex justify-around items-center py-3 border-t border-[#35356B] z-10">
        <button className="flex flex-col items-center text-white focus:outline-none">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-xs mt-1">Página inicial</span>
        </button>
        <button className="flex items-center justify-center w-12 h-12 bg-[#18183A] rounded-full border-4 border-[#35356B] -mt-8 shadow-lg">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button className="flex flex-col items-center text-white focus:outline-none">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-xs mt-1">Sua biblioteca</span>
        </button>
      </footer>
    </div>
  );
}
