import React, { useState, useRef } from 'react';
import { X, Sparkles, Image as ImageIcon, MessageSquare, Globe, Upload, Loader2, Map as MapIcon, Scissors, Play, Eye, BookOpen, Scroll } from 'lucide-react';
import { generateMapImage, editImage, analyzeImage, askOracle, searchWorldInfo, analyzeLore } from '../services/gemini';
import { compressImage } from '../utils/imageCompression';
import { Token } from '../types';

interface AIToolsModalProps {
  onClose: () => void;
  onSetMap: (url: string) => void;
}

type Tab = 'create' | 'edit' | 'analyze' | 'lore' | 'maps';

const ASPECT_RATIOS = ["1:1", "3:4", "4:3", "9:16", "16:9"];
const SIZES = ["1K", "2K", "4K"];

const AIToolsModal: React.FC<AIToolsModalProps> = ({ onClose, onSetMap }) => {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Create State
  const [createPrompt, setCreatePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [optimizeForMap, setOptimizeForMap] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Edit/Analyze State
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [editedResult, setEditedResult] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<string>('');

  // Lore/Map State
  const [query, setQuery] = useState('');
  const [loreContext, setLoreContext] = useState('');
  const [oracleResponse, setOracleResponse] = useState('');
  const [mapResponse, setMapResponse] = useState<{text: string, links: any[]} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
          const compressed = await compressImage(file, 1024, 0.8);
          setUploadImage(compressed);
          setEditedResult(null);
          setAnalyzeResult('');
      } catch (err) {
          setError("Failed to process image.");
      }
  };

  const handleCreate = async () => {
      if (!createPrompt) return;
      setLoading(true);
      setError(null);
      try {
          const finalPrompt = optimizeForMap 
            ? `${createPrompt}, top down view, tabletop rpg battle map, high detail, gridless` 
            : createPrompt;
            
          const res = await generateMapImage(finalPrompt, size, aspectRatio);
          if (res) setGeneratedImage(res);
          else setError("Failed to generate image.");
      } catch (e: any) {
          setError(e.message || "Generation failed.");
      } finally {
          setLoading(false);
      }
  };

  const handleEdit = async () => {
      if (!uploadImage || !editPrompt) return;
      setLoading(true);
      setError(null);
      try {
          const res = await editImage(uploadImage, editPrompt);
          if (res) setEditedResult(res);
          else setError("Failed to edit image.");
      } catch (e: any) {
          setError(e.message || "Edit failed.");
      } finally {
          setLoading(false);
      }
  };

  const handleAnalyze = async () => {
      if (!uploadImage) return;
      setLoading(true);
      setError(null);
      try {
          const res = await analyzeImage(uploadImage, editPrompt || "Describe this image.");
          setAnalyzeResult(res);
      } catch (e: any) {
          setError(e.message || "Analysis failed.");
      } finally {
          setLoading(false);
      }
  };

  const handleLore = async () => {
      if (!query && !loreContext) return;
      setLoading(true);
      try {
          let res = "";
          if (loreContext.trim()) {
              res = await analyzeLore(loreContext, query);
          } else {
              res = await askOracle(query);
          }
          setOracleResponse(res);
      } catch (e: any) {
          setError(e.message);
      } finally {
          setLoading(false);
      }
  };

  const handleMapSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
          const res = await searchWorldInfo(query);
          setMapResponse(res);
      } catch (e: any) {
          setError(e.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-amber-900/50 rounded-xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Gemini Tools
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900">
            {[
                { id: 'create', label: 'Generate', icon: ImageIcon },
                { id: 'edit', label: 'Edit Image', icon: Scissors },
                { id: 'analyze', label: 'Analyze', icon: Eye },
                { id: 'lore', label: 'Lore Keeper', icon: BookOpen },
                { id: 'maps', label: 'World Map', icon: Globe },
            ].map((t) => (
                <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as Tab)}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === t.id ? 'text-amber-400 bg-slate-800' : 'text-slate-500 hover:bg-slate-800/50'}`}
                >
                   <t.icon size={16} />
                   {t.label}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 relative">
            {loading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                        <span className="text-amber-200 font-mono text-sm animate-pulse">Dreaming...</span>
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-red-900/30 border border-red-500/50 p-3 rounded text-red-200 text-sm mb-4">
                    Error: {error}
                </div>
            )}

            {/* --- CREATE TAB --- */}
            {activeTab === 'create' && (
                <div className="space-y-4 h-full flex flex-col">
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs uppercase font-bold text-slate-500">Prompt</label>
                            <textarea 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none h-24 resize-none"
                                placeholder="A dark dungeon with glowing mushrooms..."
                                value={createPrompt}
                                onChange={e => setCreatePrompt(e.target.value)}
                            />
                        </div>
                        <div className="w-48 space-y-4">
                            <div>
                                <label className="text-xs uppercase font-bold text-slate-500 block mb-1">Size</label>
                                <select value={size} onChange={(e: any) => setSize(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white">
                                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-slate-500 block mb-1">Aspect Ratio</label>
                                <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white">
                                    {ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="optimizeMap" 
                                    checked={optimizeForMap} 
                                    onChange={e => setOptimizeForMap(e.target.checked)}
                                    className="rounded border-slate-700 bg-slate-900 text-amber-600 focus:ring-amber-500"
                                />
                                <label htmlFor="optimizeMap" className="text-xs text-slate-400 cursor-pointer select-none">
                                    Optimize for Battle Map
                                </label>
                            </div>
                            <button 
                                onClick={handleCreate}
                                disabled={!createPrompt}
                                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded disabled:opacity-50 shadow-lg shadow-amber-900/20"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded flex items-center justify-center overflow-hidden relative group">
                        {generatedImage ? (
                            <>
                                <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                                <div className="absolute bottom-4 flex gap-2">
                                    <button 
                                        onClick={() => { onSetMap(generatedImage); onClose(); }}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-lg font-bold flex items-center gap-2 border border-indigo-400/50"
                                    >
                                        <MapIcon size={16} /> Set as Map
                                    </button>
                                    <a 
                                        href={generatedImage} 
                                        download={`gemini-gen-${Date.now()}.jpg`}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded shadow-lg font-bold border border-slate-600"
                                    >
                                        Download
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center">
                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                <span className="text-sm font-mono opacity-70">Preview Area</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- EDIT & ANALYZE TABS --- */}
            {(activeTab === 'edit' || activeTab === 'analyze') && (
                <div className="space-y-4 h-full flex flex-col">
                    <div className="flex gap-4 items-start">
                         <div className="w-1/3 space-y-2">
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full aspect-video bg-slate-900 border-2 border-dashed border-slate-700 rounded flex flex-col items-center justify-center cursor-pointer hover:border-slate-500 transition overflow-hidden relative group"
                             >
                                 {uploadImage ? (
                                     <img src={uploadImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                 ) : (
                                     <div className="flex flex-col items-center text-slate-500">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs">Upload Image</span>
                                     </div>
                                 )}
                                 <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                             </div>
                         </div>
                         <div className="flex-1 space-y-2">
                            <label className="text-xs uppercase font-bold text-slate-500">Prompt</label>
                            <textarea 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none h-24 resize-none"
                                placeholder={activeTab === 'edit' ? "Change the sky to purple..." : "Describe this image for me..."}
                                value={editPrompt}
                                onChange={e => setEditPrompt(e.target.value)}
                            />
                            <button 
                                onClick={activeTab === 'edit' ? handleEdit : handleAnalyze}
                                disabled={!uploadImage}
                                className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded disabled:opacity-50 float-right shadow-lg"
                            >
                                {activeTab === 'edit' ? 'Edit Image' : 'Analyze'}
                            </button>
                         </div>
                    </div>

                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded flex items-center justify-center overflow-hidden p-4">
                        {activeTab === 'edit' ? (
                            editedResult ? (
                                <div className="relative w-full h-full flex items-center justify-center group">
                                    <img src={editedResult} alt="Edited" className="max-w-full max-h-full object-contain" />
                                    <div className="absolute bottom-2 right-2">
                                        <a 
                                            href={editedResult} 
                                            download={`gemini-edit-${Date.now()}.jpg`}
                                            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white text-xs rounded backdrop-blur-sm"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ) : <div className="text-slate-600 text-sm italic">Result will appear here</div>
                        ) : (
                            analyzeResult ? (
                                <div className="prose prose-invert prose-sm w-full max-w-none overflow-y-auto max-h-full p-2">
                                    <p className="whitespace-pre-wrap">{analyzeResult}</p>
                                </div>
                            ) : <div className="text-slate-600 text-sm italic">Analysis text will appear here</div>
                        )}
                    </div>
                </div>
            )}

            {/* --- LORE KEEPER TAB --- */}
            {activeTab === 'lore' && (
                 <div className="flex gap-4 h-full">
                     <div className="w-1/2 flex flex-col gap-4">
                         <div className="flex-1 flex flex-col gap-2">
                             <label className="text-xs uppercase font-bold text-slate-500 flex items-center gap-2">
                                 <Scroll size={12} /> Lore / Source Text
                             </label>
                             <textarea 
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-amber-500 outline-none resize-none placeholder-slate-600 leading-relaxed"
                                placeholder="Paste campaign notes, book excerpts, or room descriptions here to analyze..."
                                value={loreContext}
                                onChange={e => setLoreContext(e.target.value)}
                             />
                         </div>
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                className="flex-1 bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                placeholder="Ask a question or leave empty for summary..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleLore()}
                             />
                             <button 
                                onClick={handleLore}
                                className="px-6 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold shadow-lg flex items-center gap-2"
                             >
                                 <BookOpen size={18} /> Analyze
                             </button>
                         </div>
                     </div>
                     
                     <div className="w-1/2 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto">
                         <div className="prose prose-invert max-w-none">
                             {oracleResponse ? (
                                 <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{oracleResponse}</p>
                             ) : (
                                 <div className="text-center text-slate-600 italic mt-10">
                                     <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                                     <p>The archives await your inquiry.</p>
                                     <p className="text-xs mt-2 opacity-70">Paste text on the left to analyze specific lore, or just ask a question to consult the Oracle.</p>
                                 </div>
                             )}
                         </div>
                     </div>
                 </div>
            )}

            {/* --- MAPS TAB --- */}
            {activeTab === 'maps' && (
                 <div className="flex flex-col h-full gap-4">
                     <div className="flex gap-2">
                         <input 
                            type="text" 
                            className="flex-1 bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                            placeholder="Search for a real-world location..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleMapSearch()}
                         />
                         <button 
                            onClick={handleMapSearch}
                            className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold shadow-lg flex items-center gap-2"
                         >
                             <Globe size={18} /> Search Map
                         </button>
                     </div>
                     
                     <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto">
                         {mapResponse ? (
                             <>
                                 <p className="text-slate-300 whitespace-pre-wrap">{mapResponse.text}</p>
                                 {mapResponse.links.length > 0 && (
                                     <div className="mt-4">
                                         <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Sources & Locations</h4>
                                         <div className="flex flex-wrap gap-2">
                                             {mapResponse.links.map((link, i) => (
                                                 <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-2 rounded flex items-center gap-1 border border-slate-700">
                                                     <Globe size={12} /> {link.title}
                                                 </a>
                                             ))}
                                         </div>
                                     </div>
                                 )}
                             </>
                         ) : (
                             <div className="text-center text-slate-600 italic mt-10">
                                 <Globe size={48} className="mx-auto mb-4 opacity-20" />
                                 <span>Search for real-world locations to ground your campaign...</span>
                             </div>
                         )}
                     </div>
                 </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default AIToolsModal;