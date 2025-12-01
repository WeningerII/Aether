
import React, { useState, useRef, Suspense } from 'react';
import GridMap from './components/GridMap';
import ChatPanel from './components/ChatPanel';
import DiceRoller from './components/DiceRoller';
// Lazy load TokenManager to offload SRD data and large forms from main bundle
const TokenManager = React.lazy(() => import('./components/TokenManager'));
import CharacterSheet from './components/CharacterSheet';
import ActionMenu from './components/ActionMenu';
import InitiativeTracker from './components/InitiativeTracker';
import MonsterCompendium from './components/MonsterCompendium';
import ItemCompendium from './components/ItemCompendium';
import AIToolsModal from './components/AIToolsModal';
import EncounterModal from './components/EncounterModal';
import { useGameEngine } from './hooks/useGameEngine';
import { Settings, Users, Plus, Map as MapIcon, Loader2, FileText, Skull, MessageSquare, Sparkles, PenTool, StickyNote, MapPin, Square, Eraser, Swords, Save, Menu, X, RotateCcw, Download, Upload, Mountain, Shield, AlertOctagon, Droplet, Link as LinkIcon, Backpack, BrickWall } from 'lucide-react';
import { compressImage } from './utils/imageCompression';
import { DrawingData } from './types';
import { TERRAIN_PRESETS } from './constants';

// Visual indicator for system processing
const SystemStatus = ({ isProcessing, status }: { isProcessing: boolean; status: string }) => {
  if (!isProcessing) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-fade-in">
        <div className="bg-slate-950/90 backdrop-blur-md border border-amber-500/30 text-amber-100 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center gap-4 ring-1 ring-amber-500/20">
            <div className="relative flex items-center justify-center">
                <Sparkles size={18} className="text-amber-400 animate-pulse" />
                <div className="absolute inset-0 animate-ping opacity-30 scale-150">
                    <Sparkles size={18} className="text-amber-400" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold font-serif tracking-widest text-amber-500 uppercase">System Processing</span>
                <span className="text-xs text-slate-300 font-mono">{status || 'Consulting the Weave...'}</span>
            </div>
            <Loader2 size={16} className="animate-spin text-slate-500" />
        </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isTokenManagerOpen, setTokenManagerOpen] = useState(false); 
  const [isMonsterCompendiumOpen, setMonsterCompendiumOpen] = useState(false);
  const [isItemCompendiumOpen, setItemCompendiumOpen] = useState(false);
  const [isCharacterSheetOpen, setCharacterSheetOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(true); 
  const [isAIToolsOpen, setAIToolsOpen] = useState(false);
  const [isMapToolsOpen, setMapToolsOpen] = useState(false);
  const [isEncounterModalOpen, setEncounterModalOpen] = useState(false);

  // Map Tool State
  const [activeMapTool, setActiveMapTool] = useState<'zone' | 'note' | 'marker' | 'terrain' | null>(null);
  const [toolColor, setToolColor] = useState('#ef4444');
  const [toolText, setToolText] = useState('');
  const [terrainType, setTerrainType] = useState<'difficult' | 'cover_half' | 'cover_three_quarters' | 'hazard_fire' | 'hazard_acid' | 'hazard_web' | 'hazard_spikes' | 'obstacle_wall'>('difficult');

  const { gameState, gridSize, isAILoading, loadingStatus, isStorageLoading, actions } = useGameEngine();
  const mapInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const selectedToken = gameState.tokens.find(t => t.id === gameState.selectedTokenId) || null;

  const handleMapUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      try {
        // Compress map to reasonable size (1920px max, 0.6 quality)
        const compressed = await compressImage(file, 1920, 0.6);
        actions.handleSetMapBackground(compressed);
      } catch (error) {
        console.error("Failed to process map image:", error);
        alert("Failed to process image. Please try a smaller file.");
      }
  };

  const handleMapInteraction = (x: number, y: number) => {
      if (activeMapTool) {
          let data: DrawingData = {
              type: activeMapTool,
              color: toolColor,
              text: toolText
          };

          if (activeMapTool === 'terrain') {
              // Apply preset based on selection
              const preset = TERRAIN_PRESETS[terrainType];
              if (preset) {
                  data = { 
                      ...preset,
                      mechanics: preset.mechanics ? { ...preset.mechanics } : undefined
                  };
              }
          }
          
          // Opacity for zones
          if (activeMapTool === 'zone') data.opacity = 0.4;
          
          actions.handleAddDrawing(x, y, data);
          
          // Reset text after note placement
          if (activeMapTool === 'note') setToolText('');
          return;
      }
      actions.handleCellClick(x, y);
  };

  if (isStorageLoading) {
      return (
          <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 gap-4 font-sans">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
              <div className="text-lg font-bold animate-pulse font-serif tracking-widest">ACCESSING ARCHIVES...</div>
              <div className="text-xs text-slate-500 font-mono">Initializing High-Capacity Database</div>
          </div>
      );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
      
      <SystemStatus isProcessing={isAILoading} status={loadingStatus} />

      {/* --- Map Layer (Background) --- */}
      <div className="absolute inset-0 z-0">
          <GridMap 
              gridSize={gridSize} 
              tokens={gameState.tokens}
              selectedTokenId={gameState.selectedTokenId}
              isTargeting={gameState.combatMode.active || !!activeMapTool}
              targetingAction={gameState.combatMode.action}
              activeSpellName={gameState.combatMode.spellName}
              activeMapTool={activeMapTool}
              pendingTarget={gameState.combatMode.pendingTarget}
              mapBackgroundImage={gameState.mapBackgroundImage}
              floatingTexts={gameState.floatingTexts}
              onCellClick={handleMapInteraction}
              onTokenClick={actions.handleTokenClick}
              onMoveToken={actions.moveToken}
          />
      </div>

      {/* --- Floating UI Layer --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
          
          {/* Top Left HUD: Info & Tools */}
          <div className="absolute top-4 left-4 flex flex-col gap-4 pointer-events-auto items-start">
              {/* Session Info Card */}
              <div className="glass-panel p-4 rounded-xl shadow-2xl min-w-[220px] group">
                  <h1 className="text-lg font-bold text-amber-100 leading-none drop-shadow-sm tracking-wide font-serif">The Cursed Ruins</h1>
                  <div className="text-xs text-slate-400 mt-3 flex items-center gap-3">
                      <span className="font-mono bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700 shadow-inner">Round {gameState.round}</span>
                      {gameState.combatMode.active && (
                          <span className="text-red-400 font-bold animate-pulse flex items-center gap-1 px-2 py-1 bg-red-950/30 rounded border border-red-900/50">
                              <Swords size={12} />
                              {gameState.combatMode.spellName 
                                  ? `CASTING: ${gameState.combatMode.spellName.toUpperCase()}` 
                                  : 'COMBAT ACTIVE'}
                          </span>
                      )}
                  </div>
              </div>

              {/* Floating Toolbar (Left Dock) */}
              <div className="flex flex-col gap-2 glass-panel p-2 rounded-xl shadow-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <NavButton icon={Users} label="Heroes" onClick={() => setTokenManagerOpen(true)} color="text-amber-500" />
                  <NavButton icon={Skull} label="Bestiary" onClick={() => setMonsterCompendiumOpen(true)} color="text-red-500" />
                  <NavButton icon={Backpack} label="Items" onClick={() => setItemCompendiumOpen(true)} color="text-blue-400" />
                  <NavButton icon={Swords} label="Encounter" onClick={() => setEncounterModalOpen(true)} color="text-orange-500" />
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <NavButton icon={FileText} label="Sheet" onClick={() => setCharacterSheetOpen(!isCharacterSheetOpen)} active={isCharacterSheetOpen} color="text-indigo-400" />
                  <NavButton icon={PenTool} label="Map Tools" onClick={() => { setMapToolsOpen(!isMapToolsOpen); setActiveMapTool(null); }} active={isMapToolsOpen} color="text-green-400" />
                  <NavButton icon={Sparkles} label="AI Tools" onClick={() => setAIToolsOpen(true)} color="text-purple-400" />
                  
                  {/* Hidden Inputs */}
                  <input type="file" accept="image/*" ref={mapInputRef} className="hidden" onChange={handleMapUpload} />
                  <input type="file" accept=".json" ref={importInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && actions.handleImportGame(e.target.files[0])} />
                  
                  <NavButton icon={MapIcon} label="Upload Map" onClick={() => mapInputRef.current?.click()} color="text-blue-400" />
                  
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <NavButton icon={Save} label="Quick Save" onClick={actions.handleManualSave} color="text-emerald-400" />
                  <NavButton icon={RotateCcw} label="Revert" onClick={actions.handleLoadGame} color="text-yellow-400" />
                  <NavButton icon={Download} label="Export JSON" onClick={actions.handleExportGame} color="text-blue-400" />
                  <NavButton icon={Upload} label="Import JSON" onClick={() => importInputRef.current?.click()} color="text-purple-400" />
                  <NavButton icon={Settings} label="Reset" onClick={actions.resetGame} color="text-red-400" />
              </div>
          </div>

          {/* Top Right: Initiative & Chat Toggle */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-4 pointer-events-auto">
              {!isChatOpen && (
                  <button 
                      onClick={() => setChatOpen(true)}
                      className="p-3 glass-panel text-slate-400 hover:text-amber-500 rounded-xl shadow-xl transition-all hover:scale-105 group"
                      title="Open Log"
                  >
                      <MessageSquare size={20} className="group-hover:fill-amber-500/20" />
                  </button>
              )}
              
              <InitiativeTracker 
                  tokens={gameState.tokens}
                  onRollInitiative={actions.handleRollInitiative}
                  onNextTurn={actions.handleNextTurn}
                  selectedTokenId={gameState.selectedTokenId}
                  activeTurnId={gameState.activeTurnId}
                  onSelectToken={actions.setSelection}
                  onUseInspiration={actions.handleUseInspiration}
                  onUpdateInitiative={actions.handleUpdateInitiative}
              />
          </div>

          {/* Bottom Right: Dice Tray */}
          <div className="absolute bottom-4 right-4 pointer-events-auto scale-90 origin-bottom-right">
              <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
                  <DiceRoller onRoll={actions.handleRoll} />
              </div>
          </div>

          {/* Bottom Center: Action Menu (HUD) */}
          {!gameState.combatMode.active && !isMapToolsOpen && selectedToken && !selectedToken.drawingData && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
                  <ActionMenu 
                      token={selectedToken}
                      onAction={actions.handleAction} 
                      onToggleEffect={actions.handleToggleStatus}
                      onDelete={() => actions.handleRemoveToken(selectedToken.id)}
                      onToggleAI={actions.handleToggleAI}
                      onStartLinking={actions.handleStartLinking}
                      onRemoveLink={actions.handleRemoveLink}
                  />
              </div>
          )}

          {/* Map Tools Bar (Conditional) */}
          {isMapToolsOpen && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 glass-panel rounded-full shadow-2xl p-2 flex items-center gap-3 animate-fade-in pointer-events-auto px-4">
                     {/* Standard Drawing */}
                     <button 
                        onClick={() => setActiveMapTool('zone')}
                        className={`p-2 rounded-full hover:bg-slate-800 transition ${activeMapTool === 'zone' ? 'text-green-400 bg-slate-800 ring-1 ring-green-500' : 'text-slate-400'}`}
                        title="Draw Zone"
                     >
                         <Square size={20} />
                     </button>
                     <button 
                        onClick={() => setActiveMapTool('marker')}
                        className={`p-2 rounded-full hover:bg-slate-800 transition ${activeMapTool === 'marker' ? 'text-red-400 bg-slate-800 ring-1 ring-red-500' : 'text-slate-400'}`}
                        title="Place Marker"
                     >
                         <MapPin size={20} />
                     </button>
                     <button 
                        onClick={() => setActiveMapTool('note')}
                        className={`p-2 rounded-full hover:bg-slate-800 transition ${activeMapTool === 'note' ? 'text-yellow-400 bg-slate-800 ring-1 ring-yellow-500' : 'text-slate-400'}`}
                        title="Add Note"
                     >
                         <StickyNote size={20} />
                     </button>
                     
                     <div className="w-px h-6 bg-white/10" />

                     {/* Terrain Tools */}
                     <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-2 py-1">
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('obstacle_wall'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'obstacle_wall' ? 'text-slate-200 bg-slate-600/50 ring-1 ring-slate-400' : 'text-slate-400'}`}
                            title="Wall / Obstacle"
                         >
                             <BrickWall size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('difficult'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'difficult' ? 'text-amber-500 bg-amber-900/20' : 'text-slate-400'}`}
                            title="Difficult Terrain (2x Cost)"
                         >
                             <Mountain size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('cover_half'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'cover_half' ? 'text-blue-400 bg-blue-900/20' : 'text-slate-400'}`}
                            title="Half Cover (+2 AC)"
                         >
                             <Shield size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('cover_three_quarters'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'cover_three_quarters' ? 'text-blue-300 bg-blue-900/20' : 'text-slate-400'}`}
                            title="3/4 Cover (+5 AC)"
                         >
                             <Shield size={18} fill="currentColor" />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('hazard_fire'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'hazard_fire' ? 'text-red-500 bg-red-900/20' : 'text-slate-400'}`}
                            title="Hazard (Fire)"
                         >
                             <AlertOctagon size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('hazard_acid'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'hazard_acid' ? 'text-lime-500 bg-lime-900/20' : 'text-slate-400'}`}
                            title="Hazard (Acid)"
                         >
                             <Droplet size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('hazard_web'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'hazard_web' ? 'text-slate-200 bg-slate-600/20' : 'text-slate-400'}`}
                            title="Web (Restrained)"
                         >
                             <LinkIcon size={18} />
                         </button>
                         <button 
                            onClick={() => { setActiveMapTool('terrain'); setTerrainType('hazard_spikes'); }}
                            className={`p-1.5 rounded-full hover:bg-slate-700 transition ${activeMapTool === 'terrain' && terrainType === 'hazard_spikes' ? 'text-slate-400 bg-slate-700/50' : 'text-slate-400'}`}
                            title="Spikes (Damage)"
                         >
                             <Mountain size={18} className="rotate-45" />
                         </button>
                     </div>
                     
                     <div className="w-px h-6 bg-white/10" />
                     
                     <input 
                        type="color" 
                        value={toolColor} 
                        onChange={e => setToolColor(e.target.value)}
                        className="w-8 h-8 rounded-full bg-transparent cursor-pointer border-none"
                        title="Tool Color"
                        disabled={activeMapTool === 'terrain'}
                     />
                     
                     {activeMapTool === 'note' && (
                         <input 
                            type="text" 
                            value={toolText}
                            onChange={e => setToolText(e.target.value)}
                            placeholder="Note text..."
                            className="bg-slate-800 border border-slate-600 rounded-full px-3 py-1 text-xs text-white w-32 focus:border-amber-500 outline-none"
                         />
                     )}

                     <div className="w-px h-6 bg-white/10" />
                     
                     <button 
                        onClick={() => {
                             if (selectedToken?.drawingData) {
                                 actions.handleRemoveToken(selectedToken.id);
                             }
                        }}
                        disabled={!selectedToken?.drawingData}
                        className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-500 disabled:opacity-30 transition"
                        title="Delete Selected Drawing"
                     >
                         <Eraser size={20} />
                     </button>
                </div>
            )}
      </div>

      {/* --- Side Panels (Overlays) --- */}
      
      {/* Right Chat Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 w-[400px] bg-slate-950 shadow-2xl transform transition-transform duration-300 ease-out z-20 border-l border-slate-800 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ChatPanel 
              logs={gameState.logs} 
              onSendMessage={actions.handleSendMessage}
              isTyping={isAILoading}
              onClose={() => setChatOpen(false)}
          />
      </div>

      {/* Left Character Sheet */}
      <div className={`absolute top-0 left-0 bottom-0 w-[480px] bg-slate-950 shadow-2xl transform transition-transform duration-300 ease-out z-20 border-r border-slate-800 ${isCharacterSheetOpen && selectedToken ? 'translate-x-0' : '-translate-x-full'}`}>
          <CharacterSheet 
                token={selectedToken} 
                isOpen={isCharacterSheetOpen} 
                onClose={() => setCharacterSheetOpen(false)}
                onAddItem={actions.handleAddItem}
                onRemoveItem={actions.handleRemoveItem}
                onEquipItem={actions.handleEquipItem}
                onUseItem={actions.handleUseItem}
                onManageSpell={actions.handleSpellManagement}
                onAdjustQuantity={actions.handleAdjustQuantity}
                onAddStatus={actions.handleAddStatusEffect}
                onRemoveStatus={actions.handleRemoveStatusEffect}
                onAction={actions.handleAction}
            />
      </div>

      {/* --- Modals --- */}
      {isAIToolsOpen && (
          <AIToolsModal 
             onClose={() => setAIToolsOpen(false)}
             onSetMap={(url) => {
                 actions.handleSetMapBackground(url);
                 setAIToolsOpen(false);
             }}
          />
      )}

      {isEncounterModalOpen && (
          <EncounterModal
              onClose={() => !isAILoading && setEncounterModalOpen(false)}
              isLoading={isAILoading}
              loadingStatus={loadingStatus}
              onGenerate={async (theme, mode, difficulty, partyLevel, prompt) => {
                  await actions.handleGenerateEncounter(theme, mode, difficulty, partyLevel, prompt);
                  setEncounterModalOpen(false);
              }}
          />
      )}

      {isTokenManagerOpen && (
        <Suspense fallback={
            <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3 text-amber-500 animate-pulse">
                    <Loader2 size={48} className="animate-spin" />
                    <span className="text-lg font-bold font-serif">Summoning Heroes...</span>
                </div>
            </div>
        }>
            <TokenManager 
                onAddToken={(token) => {
                    actions.handleAddToken(token);
                    setTokenManagerOpen(false);
                }}
                onRemoveToken={actions.handleRemoveToken}
                onClose={() => setTokenManagerOpen(false)}
            />
        </Suspense>
      )}

      {isMonsterCompendiumOpen && (
          <MonsterCompendium
             onAddMonster={(monster, count, autoCombat) => {
                 actions.handleAddMonster(monster, count, autoCombat);
             }}
             onClose={() => setMonsterCompendiumOpen(false)}
             selectedTokenId={gameState.selectedTokenId}
             onApplyMonster={actions.handleApplyMonsterData}
          />
      )}

      {isItemCompendiumOpen && (
          <ItemCompendium
             onAddItem={(item) => {
                 if (gameState.selectedTokenId) {
                     actions.handleAddItem(gameState.selectedTokenId, item);
                 }
             }}
             onClose={() => setItemCompendiumOpen(false)}
             selectedTokenId={gameState.selectedTokenId}
          />
      )}
    </div>
  );
};

// Helper for Nav Buttons
const NavButton = ({ icon: Icon, label, onClick, active = false, color = "text-white" }: any) => (
    <button 
        onClick={onClick}
        className={`p-3 rounded-xl transition-all duration-200 group relative w-full flex justify-center
            ${active ? 'bg-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]' : 'hover:bg-white/5'}
        `}
    >
        <Icon size={24} className={`transition-colors duration-300 filter drop-shadow-md ${active ? 'text-white' : color} ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-50 translate-x-2 group-hover:translate-x-0 uppercase tracking-wider">
            {label}
        </span>
    </button>
);

export default App;
