
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { Send, Sparkles, PanelRightClose, Scroll, Swords, MessageSquare } from 'lucide-react';

interface ChatPanelProps {
  logs: LogEntry[];
  onSendMessage: (msg: string) => void;
  isTyping: boolean;
  onClose?: () => void;
}

type LogFilter = 'all' | 'combat' | 'chat';

const ChatPanel: React.FC<ChatPanelProps> = ({ logs, onSendMessage, isTyping, onClose }) => {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<LogFilter>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, isTyping, filter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const formatCombatContent = (content: string) => {
    if (!content) return null;
    // Split by interesting patterns: Hit/Miss, Damage amounts, AC/DC checks
    const parts = content.split(/(\bHit\b|\bMiss\b|\bCritical\b|\bCrit\b|\bFumble\b|\d+ (?:acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder) damage|\bAC \d+\b|\bDC \d+\b)/gi);
    
    return parts.map((part, i) => {
        if (part.match(/\bHit\b/i)) return <span key={i} className="text-green-400 font-bold">{part}</span>;
        if (part.match(/\bMiss\b/i)) return <span key={i} className="text-slate-500 font-bold">{part}</span>;
        if (part.match(/\b(Crit|Critical)\b/i)) return <span key={i} className="text-amber-400 font-bold animate-pulse">{part}</span>;
        if (part.match(/\bFumble\b/i)) return <span key={i} className="text-red-500 font-bold">{part}</span>;
        if (part.match(/damage/i)) return <span key={i} className="text-red-300 font-medium">{part}</span>;
        if (part.match(/\bAC \d+\b/i)) return <span key={i} className="text-indigo-300">{part}</span>;
        if (part.match(/\bDC \d+\b/i)) return <span key={i} className="text-purple-300">{part}</span>;
        return part;
    });
  };

  const filteredLogs = logs.filter(log => {
      if (filter === 'all') return true;
      if (filter === 'combat') return log.type === 'combat' || log.type === 'roll';
      if (filter === 'chat') return log.type === 'normal' || log.type === 'narrative' || (log.type !== 'combat' && log.type !== 'roll');
      return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800 w-full shadow-2xl relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm flex justify-between items-center z-10">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-widest font-serif">
          <Scroll className="text-amber-500 w-4 h-4" />
          Adventure Log
        </h2>
        {onClose && (
            <button 
                onClick={onClose} 
                className="text-slate-500 hover:text-white hover:bg-slate-800 p-1 rounded transition"
                title="Close Sidebar"
            >
                <PanelRightClose size={18} />
            </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-900 border-b border-slate-800">
          <button 
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${filter === 'all' ? 'text-amber-400 bg-slate-800 border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
          >
              All
          </button>
          <button 
            onClick={() => setFilter('combat')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${filter === 'combat' ? 'text-red-400 bg-slate-800 border-b-2 border-red-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
          >
              <Swords size={12} /> Combat
          </button>
          <button 
            onClick={() => setFilter('chat')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${filter === 'chat' ? 'text-indigo-400 bg-slate-800 border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
          >
              <MessageSquare size={12} /> Chat
          </button>
      </div>

      {/* Logs Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 font-sans custom-scrollbar bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        {filteredLogs.length === 0 && (
            <div className="text-center text-slate-600 mt-20 italic text-sm font-serif">
                {filter === 'all' ? (
                    <>The pages are blank.<br/>History waits to be written.</>
                ) : (
                    <>No {filter} logs yet.</>
                )}
            </div>
        )}
        
        {filteredLogs.map((log) => (
          <div 
            key={log.id} 
            className={`flex flex-col animate-fade-in ${log.sender === 'Player' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 opacity-70">
                <span className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                    log.sender === 'DM' ? 'text-amber-500' : 
                    log.sender === 'System' ? 'text-slate-500' : 'text-indigo-400'
                }`}>
                    {log.sender === 'DM' && <Sparkles className="w-3 h-3" />}
                    {log.type === 'combat' && <Swords className="w-3 h-3 text-red-400" />}
                    {log.sender}
                </span>
                <span className="text-[9px] text-slate-600 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </div>

            <div className={`
              max-w-[95%] rounded-xl p-3.5 text-sm shadow-md border relative overflow-hidden
              ${log.sender === 'Player' ? 'bg-indigo-950/30 border-indigo-500/20 text-indigo-100 rounded-tr-none' : ''}
              ${log.sender === 'DM' ? 'bg-amber-950/20 border-amber-500/20 text-amber-100 italic font-serif leading-relaxed rounded-tl-none pl-6' : ''}
              ${log.sender === 'System' && log.type !== 'combat' ? 'bg-slate-900/50 border-slate-800 text-slate-400 font-mono text-xs py-2 px-3 border-l-2 border-l-slate-600' : ''}
              ${log.type === 'combat' ? 'bg-slate-950/80 border-slate-800 text-slate-300 font-mono text-xs py-2 px-3 border-l-2 border-l-red-500/50 border-r border-y' : ''}
            `}>
                {log.sender === 'DM' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/30" />}
                
                {log.type === 'roll' ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
                            <span className={`font-bold text-lg ${log.isCrit ? 'text-amber-400 animate-pulse' : 'text-white'}`}>
                                {log.rollValue}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-300 font-bold">Check Result</span>
                            <span className="text-[10px] text-slate-500 uppercase">{log.content.replace(/^rolled d\d+\. /, '')}</span>
                        </div>
                    </div>
                ) : log.type === 'combat' ? (
                    <div className="whitespace-pre-wrap">{formatCombatContent(log.content)}</div>
                ) : (
                    <div className="whitespace-pre-wrap">{log.content}</div>
                )}
            </div>
          </div>
        ))}
        
        {isTyping && filter !== 'combat' && (
            <div className="flex items-start gap-2 animate-pulse opacity-70 pl-2">
                 <div className="bg-slate-800/30 rounded-full p-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                 </div>
                 <div className="text-xs text-slate-500 mt-2 font-serif italic">
                    The Dungeon Master is weaving fate...
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900/80 border-t border-slate-800 backdrop-blur-md">
        <div className="relative group">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your action..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner placeholder-slate-600"
            />
            <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 disabled:opacity-30 transition p-2 rounded-lg hover:bg-slate-800"
            >
                <Send size={18} />
            </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
