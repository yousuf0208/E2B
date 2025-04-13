# SynoBangla - React App # Author: Yousuf

import { useState, useEffect } from "react"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Sun, Moon, Loader2 } from "lucide-react"; import { motion } from "framer-motion";

export default function SynoBanglaApp() { const [word, setWord] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [dark, setDark] = useState(true); const [history, setHistory] = useState(() => { const saved = localStorage.getItem("synobangla-history"); return saved ? JSON.parse(saved) : []; });

useEffect(() => { localStorage.setItem("synobangla-history", JSON.stringify(history)); }, [history]);

const handleSearch = async () => { if (!word.trim()) return; setLoading(true); setResults([]);

try {
  const [synRes, antRes] = await Promise.all([
    fetch(`https://api.datamuse.com/words?rel_syn=${word}`),
    fetch(`https://api.datamuse.com/words?rel_ant=${word}`)
  ]);

  const synJson = await synRes.json();
  const antJson = await antRes.json();

  const translator = new window.google.translate.TranslateService();
  const translateWord = async (w) => {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${w}`);
    const data = await res.json();
    return data[0][0][0];
  };

  const synonyms = await Promise.all(
    synJson.slice(0, 5).map(async (w) => ({
      type: "Synonym",
      word: w.word,
      meaning: await translateWord(w.word)
    }))
  );

  const antonyms = await Promise.all(
    antJson.slice(0, 3).map(async (w) => ({
      type: "Antonym",
      word: w.word,
      meaning: await translateWord(w.word)
    }))
  );

  const combined = [...synonyms, ...antonyms];
  setResults(combined);
  setHistory(prev => [word, ...prev.filter(w => w !== word)].slice(0, 10));
} catch (e) {
  console.error(e);
} finally {
  setLoading(false);
}

};

return ( <div className={dark ? "bg-gray-900 text-white min-h-screen p-4" : "bg-white text-black min-h-screen p-4"}> <div className="flex justify-between items-center mb-4"> <h1 className="text-2xl font-bold">SynoBangla</h1> <Button onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button> </div>

<div className="flex gap-2 mb-4">
    <Input
      placeholder="Enter an English word..."
      value={word}
      onChange={(e) => setWord(e.target.value)}
    />
    <Button onClick={handleSearch}>Search</Button>
  </div>

  {loading ? (
    <div className="flex justify-center items-center mt-10">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <div className="grid gap-2">
      {results.map((res, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <div className="text-lg font-semibold">{res.type}: {res.word}</div>
              <div className="text-sm italic text-gray-400">{res.meaning}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )}

  {history.length > 0 && (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Search History</h2>
      <div className="flex flex-wrap gap-2">
        {history.map((item, i) => (
          <Button key={i} variant="outline" onClick={() => setWord(item)}>{item}</Button>
        ))}
      </div>
    </div>
  )}

  <footer className="mt-12 text-center text-xs opacity-60">
    Made by Yousuf
  </footer>
</div>

); }

