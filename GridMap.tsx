import React, { memo, useState, useMemo, useEffect, useRef } from 'react';
import { GridSize, Token, TokenType, FloatingText, Actor, Prop } from '../types';
import { CELL_SIZE_PX } from '../constants';
import { User, Skull, HelpCircle, Box, Crosshair, Flame, Droplet, Zap, AlertCircle, EyeOff, MoveDown, Shield, Eye, Swords, AlertTriangle, Battery, MousePointer2, Music, StickyNote, MapPin, Ghost, Crown, Mountain, AlertOctagon, Hexagon, Moon, BrickWall } from 'lucide-react';
import { hasStatus, checkLineOfSight, getAoECells, getDistance, isActor } from '../utils/gameLogic';
import { SRD_SPELLS } from '../data/srd';

interface GridMapProps {
  gridSize: GridSize;
  tokens: Token[];
  selectedTokenId: string | null;
  isTargeting: boolean;
  targetingAction?: string | null;
  activeSpellName?: string | null;
  activeMapTool?: 'zone' | 'note' | 'marker' | 'terrain' | null;
  pendingTarget?: { x: number, y: number } | null;
  mapBackgroundImage: string | null;
  floatingTexts: FloatingText[];
  onCellClick: (x: number, y: number) => void;
  onTokenClick: (tokenId: string) => void;
  onMoveToken: (tokenId: string, x: number, y: number) => void;
}

const StatusIcon = ({ id }: { id: string }) => {
    switch (id.toLowerCase()) {
        case 'burning': return <Flame size={10} className="text-orange-500 fill-orange-500/20" />;
        case 'poisoned': return <Droplet size={10} className="text-green-500 fill-green-500/20" />;
        case 'stunned': return <Zap size={10} className="text-yellow-400 fill-yellow-400/20" />;
        case 'paralyzed': return <Zap size={10} className="text-yellow-600" />;
        case 'invisible': return <EyeOff size={10} className="text-blue-300" />;
        case 'prone': return <MoveDown size={10} className="text-slate-400" />;
        case 'rage': return <Skull size={10} className="text-red-600" />;
        case 'dodge': return <Shield size={10} className="text-indigo-400 fill-indigo-400/20" />;
        case 'blinded': return <Eye size={10} className="text-slate-500" />;
        case 'frightened': return <Ghost size={10} className="text-purple-400" />;
        case 'exhaustion': return <Battery size={10} className="text-amber-700" />;
        case 'restrained': return <Box size={10} className="text-slate-400" />;
        case 'unconscious': return <Moon size={10} className="text-indigo-300 fill-indigo-300/20" />;
        case 'concentrating': return <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#a855f7]" />;
        case 'bardic_inspiration': return <Music size={10} className="text-pink-400" />;
        case 'bless': return <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />;
        case 'bane': return <div className="w-1.5 h-1.5 rounded-full bg-red-900 shadow-[0_0_6px_#7f1d1d]" />;
        default: return <div className="w-1.5 h-1.5 rounded-full bg-red-500" />;
    }
};

const TokenRenderer = ({ token, isSelected, isMeleeTarget }: { token: Token, isSelected: boolean, isMeleeTarget: boolean }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => { setImageError(false); }, [token.symbol]); // Reset error if symbol/url might change (symbol is proxy for identity here)

    // Render Props (Scenery)
    if (!isActor(token)) {
        const prop = token as Prop;
        // Safety check for drawingData to prevent crashes on malformed tokens
        if (!prop.drawingData) return null;
        
        if (prop.drawingData.type === 'note') return <StickyNote size={28} className="text-yellow-200 drop-shadow-lg" fill={prop.drawingData.color || '#fef08a'} />;
        if (prop.drawingData.type === 'marker') return <MapPin size={28} className="text-red-500 drop-shadow-lg" fill={prop.drawingData.color || '#ef4444'} />;
        return null; // Zones/Terrain handled by grid cells
    }

    const actor = token as Actor;

    const content = (() => {
        if (actor.avatarUrl && !imageError) {
            return <img src={actor.avatarUrl} alt={actor.name} className="w-full h-full object-cover pointer-events-none scale-105" onError={() => setImageError(true)} />;
        }
        if (actor.symbol && actor.symbol.match(/\p{Emoji}/u)) return <span className="text-2xl leading-none select-none filter drop-shadow-sm">{actor.symbol}</span>;
        switch (actor.type) {
            case TokenType.PLAYER: return <User size={20} className="text-white/90" />;
            case TokenType.ENEMY: return <Skull size={20} className="text-white/90" />;
            case TokenType.NPC: return <HelpCircle size={20} className="text-white/90" />;
            default: return <HelpCircle size={20} className="text-white/90" />;
        }
    })();

    const isBoss = actor.monsterData && actor.monsterData.cr >= 5;

    return (
        <div className={`
            relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300 
            ${isSelected ? 'scale-110 z-50' : 'scale-100'}
            ${!isActor(token) ? '' : 'token-shadow'}
        `}>
            
            {/* Glow/Ring Layer */}
            <div className={`absolute -inset-0.5 rounded-full transition-opacity duration-300 
                ${isSelected ? 'opacity-100' : 'opacity-0'}
                ${actor.type === TokenType.PLAYER ? 'bg-gradient-to-tr from-blue-500 to-cyan-400 blur-[2px]' : 
                  actor.type === TokenType.ENEMY ? 'bg-gradient-to-tr from-red-600 to-orange-500 blur-[2px]' : 
                  'bg-white blur-[2px]'}
            `} />

            {/* Melee Target Pulse */}
            {isMeleeTarget && <div className="absolute -inset-2 border-2 border-red-500/50 rounded-full z-20 animate-ping" />}

            {/* Token Body */}
            <div className={`
                relative w-full h-full rounded-full flex items-center justify-center overflow-hidden border-[2px]
                ${actor.avatarUrl ? 'border-slate-800/50' : 'border-white/20'}
                ${isBoss ? 'border-amber-500/50' : ''}
            `} style={{ backgroundColor: actor.avatarUrl ? '#000' : actor.color }}>
                {content}
            </div>

            {/* Boss Crown */}
            {isBoss && !actor.avatarUrl && <div className="absolute -top-2 text-amber-400 drop-shadow-md"><Crown size={12} fill="currentColor" /></div>}
        </div>
    );
};

const GridMap: React.FC<GridMapProps> = memo(({
  gridSize, tokens, selectedTokenId, isTargeting, targetingAction, activeSpellName, activeMapTool, pendingTarget, mapBackgroundImage, floatingTexts, onCellClick, onTokenClick, onMoveToken,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{x: number, y: number} | null>(null);
  const [isShiftHeld, setIsShiftHeld] = useState(false);
  const isMouseDownRef = useRef(false);
  const selectedToken = tokens.find(t => t.id === selectedTokenId);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Shift') setIsShiftHeld(true); };
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === 'Shift') setIsShiftHeld(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Segregate Tokens
  const propsList = useMemo(() => tokens.filter((t): t is Prop => !isActor(t) && !!t.drawingData), [tokens]);
  const actorsList = useMemo(() => tokens.filter(isActor), [tokens]);

  // Fog of War
  const visibleCells = useMemo(() => {
      const visible = new Set<string>();
      if (!selectedToken || !isActor(selectedToken)) return null; 
      const visionRange = 14; // Slight buff to vision for gameplay feel
      const sx = selectedToken.x;
      const sy = selectedToken.y;
      for (let y = -visionRange; y <= visionRange; y++) {
          for (let x = -visionRange; x <= visionRange; x++) {
              const tx = sx + x;
              const ty = sy + y;
              if (tx < 0 || tx >= gridSize.cols || ty < 0 || ty >= gridSize.rows) continue;
              if (Math.round(Math.sqrt(x*x + y*y)) > visionRange) continue;
              if (checkLineOfSight(selectedToken, { x: tx, y: ty } as Token, tokens)) visible.add(`${tx},${ty}`);
          }
      }
      return visible;
  }, [selectedToken, tokens, gridSize]);

  // Terrain & Zones
  const zoneTokens = useMemo(() => propsList.filter(t => t.drawingData?.type === 'zone'), [propsList]);
  const terrainTokens = useMemo(() => propsList.filter(t => t.drawingData?.type === 'terrain'), [propsList]);

  const activeSpell = useMemo(() => SRD_SPELLS.find(s => s.name === activeSpellName), [activeSpellName]);

  const aoeCells = useMemo(() => {
      if (!isTargeting || targetingAction !== 'CAST_SPELL' || !activeSpellName || !selectedToken) return [];
      const targetLoc = pendingTarget || hoveredCell;
      if (!targetLoc) return [];
      const spell = activeSpell;
      if (!spell || (!spell.areaShape && !spell.range.includes('cone') && !spell.range.includes('line') && !spell.range.includes('cube') && !spell.range.includes('sphere'))) return [];
      const isSelfOrigin = spell.range.toLowerCase().includes('self');
      const origin = isSelfOrigin ? { x: selectedToken.x, y: selectedToken.y } : targetLoc;
      const shape = spell.areaShape || (spell.range.includes('cone') ? 'cone' : spell.range.includes('line') ? 'line' : 'sphere');
      const size = spell.areaSize || 15;
      return getAoECells(origin, targetLoc, shape, size, gridSize);
  }, [isTargeting, targetingAction, activeSpellName, pendingTarget, hoveredCell, selectedToken, gridSize, activeSpell]);

  const isInAoE = (x: number, y: number) => aoeCells.some(c => c.x === x && c.y === y);

  // --- Movement Logic with Cost (BFS) ---
  const reachableCells = useMemo(() => {
      if (!selectedToken || !isActor(selectedToken) || isTargeting || !selectedToken.speed) return new Set<string>();
      const actor = selectedToken as Actor;
      if (hasStatus(actor, 'stunned') || hasStatus(actor, 'restrained') || hasStatus(actor, 'paralyzed') || hasStatus(actor, 'unconscious')) return new Set<string>();
      if ((actor.hp ?? 1) <= 0) return new Set<string>();

      const maxMove = actor.speed; 
      const reachable = new Set<string>();
      
      const queue: {x: number, y: number, cost: number}[] = [{x: actor.x, y: actor.y, cost: 0}];
      const visited = new Map<string, number>(); 
      
      visited.set(`${actor.x},${actor.y}`, 0);

      while (queue.length > 0) {
          const { x, y, cost } = queue.shift()!;
          reachable.add(`${x},${y}`);

          const neighbors = [
              { x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 },
              { x: x + 1, y: y + 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y - 1 }, 
              { x: x + 1, y: y - 1 }, { x: x - 1, y: y + 1 } 
          ];

          for (const n of neighbors) {
              if (n.x < 0 || n.x >= gridSize.cols || n.y < 0 || n.y >= gridSize.rows) continue;
              
              const terrainAt = terrainTokens.find(t => t.x === n.x && t.y === n.y);
              
              if (terrainAt?.drawingData?.blocksMovement) continue;

              const moveCost = terrainAt?.drawingData?.mechanics?.moveCost || 1;
              
              const newCost = cost + moveCost;
              
              if (newCost <= maxMove) {
                  const key = `${n.x},${n.y}`;
                  if (!visited.has(key) || visited.get(key)! > newCost) {
                      visited.set(key, newCost);
                      queue.push({ ...n, cost: newCost });
                  }
              }
          }
      }
      return reachable;
  }, [selectedToken, terrainTokens, gridSize, isTargeting]);

  const isReachable = (x: number, y: number) => reachableCells.has(`${x},${y}`);

  const handleDragStart = (e: React.DragEvent, tokenId: string) => {
    if (isTargeting) { e.preventDefault(); return; }
    const token = actorsList.find(t => t.id === tokenId); // Only drag actors
    if (!token) { e.preventDefault(); return; }
    if ((token.hp ?? 1) <= 0 || hasStatus(token, 'stunned') || hasStatus(token, 'unconscious')) { e.preventDefault(); return; }
    
    e.dataTransfer.setData('text/plain', tokenId);
    e.dataTransfer.effectAllowed = 'move';
    onTokenClick(tokenId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isTargeting) return;
    const tokenId = e.dataTransfer.getData('text/plain');
    if (!tokenId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(Math.floor((e.clientX - rect.left) / CELL_SIZE_PX), gridSize.cols - 1));
    const y = Math.max(0, Math.min(Math.floor((e.clientY - rect.top) / CELL_SIZE_PX), gridSize.rows - 1));
    
    const token = actorsList.find(t => t.id === tokenId);
    if (token && token.speed) {
        if (!reachableCells.has(`${x},${y}`)) return;
    }
    onMoveToken(tokenId, x, y);
  };

  // --- Calculate Links ---
  const renderedLinks = useMemo(() => {
      const links: React.ReactNode[] = [];
      tokens.forEach(source => {
          if (source.linkedTokens) {
              source.linkedTokens.forEach(link => {
                  const target = tokens.find(t => t.id === link.targetId);
                  if (target) {
                      const x1 = (source.x * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
                      const y1 = (source.y * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
                      const x2 = (target.x * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
                      const y2 = (target.y * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
                      
                      links.push(
                          <line 
                              key={`${source.id}-${target.id}`}
                              x1={x1} y1={y1} 
                              x2={x2} y2={y2}
                              stroke="rgba(96, 165, 250, 0.6)" 
                              strokeWidth="2"
                              strokeDasharray="6,4"
                              className="animate-pulse"
                          />
                      );
                  }
              });
          }
      });
      return links;
  }, [tokens]);

  // --- Ruler Logic ---
  const rulerData = useMemo(() => {
      if (isShiftHeld && selectedToken && hoveredCell && isActor(selectedToken)) {
          const x1 = (selectedToken.x * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
          const y1 = (selectedToken.y * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
          const x2 = (hoveredCell.x * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
          const y2 = (hoveredCell.y * CELL_SIZE_PX) + (CELL_SIZE_PX / 2);
          const distCells = Math.max(Math.abs(selectedToken.x - hoveredCell.x), Math.abs(selectedToken.y - hoveredCell.y));
          const distFt = distCells * 5;
          
          let color = '#fff';
          const speed = selectedToken.speed || 6;
          if (distCells <= speed) color = '#4ade80'; 
          else if (distCells <= speed * 2) color = '#facc15';
          else color = '#ef4444';

          return { x1, y1, x2, y2, distFt, color };
      }
      return null;
  }, [isShiftHeld, selectedToken, hoveredCell]);

  return (
    <div className="w-full h-full bg-slate-950 flex justify-center items-center relative overflow-hidden shadow-inner select-none" onMouseUp={() => { isMouseDownRef.current = false; }}>
      {/* Background Image Container */}
      <div 
        className="relative shadow-2xl border border-slate-800 rounded-sm overflow-hidden bg-slate-900 transition-all"
        style={{ width: gridSize.cols * CELL_SIZE_PX, height: gridSize.rows * CELL_SIZE_PX }}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
        onDrop={handleDrop}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {mapBackgroundImage ? (
            <img src={mapBackgroundImage} alt="Map" className="absolute inset-0 w-full h-full object-cover z-0 opacity-100" />
        ) : (
            <div className="absolute inset-0 z-0 grid-pattern opacity-20" />
        )}

        {/* Link Layer */}
        <svg className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            {renderedLinks}
            {rulerData && (
                <g>
                    <line 
                        x1={rulerData.x1} y1={rulerData.y1} 
                        x2={rulerData.x2} y2={rulerData.y2} 
                        stroke={rulerData.color} strokeWidth="2" strokeDasharray="4,4" 
                        style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}
                    />
                    <circle cx={rulerData.x2} cy={rulerData.y2} r="3" fill={rulerData.color} />
                </g>
            )}
        </svg>

        {/* Grid Cells & Terrain Layer */}
        <div className="absolute inset-0 z-10 grid" style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize.rows}, 1fr)` }}>
            {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, i) => {
                const x = i % gridSize.cols;
                const y = Math.floor(i / gridSize.cols);
                const reachable = isReachable(x, y);
                const inAoE = isInAoE(x, y);
                const isVisible = visibleCells ? visibleCells.has(`${x},${y}`) : true;
                
                const zoneAtCell = zoneTokens.find(z => z.x === x && z.y === y);
                const terrainAtCell = terrainTokens.find(t => t.x === x && t.y === y);
                const drawingAtCell = terrainAtCell || zoneAtCell;
                const isDrawingSelected = drawingAtCell?.id === selectedTokenId;
                const isHovered = hoveredCell && hoveredCell.x === x && hoveredCell.y === y;

                // Terrain Visuals
                let terrainVisual = null;
                if (terrainAtCell && terrainAtCell.drawingData) {
                    const type = terrainAtCell.drawingData.terrainType;
                    const color = terrainAtCell.drawingData.color;
                    
                    if (type === 'difficult') {
                        terrainVisual = (
                            <div className="absolute inset-0 pointer-events-none opacity-60" 
                                 style={{ 
                                     backgroundImage: `repeating-linear-gradient(45deg, ${color || '#78350f'} 0, ${color || '#78350f'} 2px, transparent 2px, transparent 8px)` 
                                 }} 
                            />
                        );
                    } else if (type === 'cover_half') {
                        terrainVisual = (
                            <div className="absolute inset-0 border-t-2 border-l-2 border-blue-500/50 bg-blue-900/10 pointer-events-none flex items-start justify-start p-0.5">
                                <Shield size={12} className="text-blue-400 opacity-70" />
                            </div>
                        );
                    } else if (type === 'cover_three_quarters') {
                        terrainVisual = (
                            <div className="absolute inset-0 border-4 border-blue-600/60 bg-blue-900/20 pointer-events-none flex items-center justify-center">
                                <Shield size={16} className="text-blue-300" fill="currentColor" />
                            </div>
                        );
                    } else if (type === 'hazard') {
                        terrainVisual = (
                            <div className="absolute inset-0 animate-pulse pointer-events-none flex items-center justify-center" 
                                 style={{ backgroundColor: `${color || '#ef4444'}30`, boxShadow: `inset 0 0 10px ${color || '#ef4444'}60` }}>
                                <AlertOctagon size={14} style={{ color: color || '#ef4444', opacity: 0.8 }} />
                            </div>
                        );
                    } else if (type === 'obstacle') {
                        terrainVisual = (
                            <div className="absolute inset-0 bg-slate-800 border border-slate-600 shadow-inner pointer-events-none flex items-center justify-center" 
                                 style={{ backgroundColor: color || '#334155' }}>
                                 <BrickWall size={16} className="text-white/20" />
                            </div>
                        );
                    }
                }

                return (
                    <div 
                        key={i}
                        onMouseDown={() => { isMouseDownRef.current = true; if (activeMapTool === 'zone' || activeMapTool === 'terrain') onCellClick(x, y); }}
                        onMouseEnter={() => { setHoveredCell({x, y}); if (isMouseDownRef.current && (activeMapTool === 'zone' || activeMapTool === 'terrain')) onCellClick(x, y); }}
                        onClick={(e) => { 
                            e.stopPropagation();
                            if (activeMapTool === 'zone' || activeMapTool === 'terrain') return;
                            
                            if (activeSpellName) { onCellClick(x, y); return; }
                            
                            if (drawingAtCell && !isTargeting) {
                                onTokenClick(drawingAtCell.id);
                                return;
                            }
                            
                            onCellClick(x, y); 
                        }}
                        className={`
                            relative transition-colors duration-150
                            ${isTargeting ? 'cursor-crosshair' : ''}
                            ${reachable && isVisible && !mapBackgroundImage ? 'border-[0.5px] border-indigo-500/10 bg-indigo-500/5' : ''}
                            ${reachable && isVisible && mapBackgroundImage ? 'bg-indigo-500/10' : ''}
                            ${inAoE ? 'bg-red-500/30 animate-pulse' : ''}
                            ${!isVisible ? 'bg-slate-950/90 backdrop-blur-[2px]' : 'hover:bg-white/5'}
                            ${isDrawingSelected ? 'ring-2 ring-amber-400 z-20' : ''}
                        `}
                        style={!mapBackgroundImage && isVisible ? { borderColor: 'rgba(255,255,255,0.03)', borderWidth: '0.5px' } : undefined}
                    >
                        {terrainVisual}
                        {zoneAtCell && zoneAtCell.drawingData && <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundColor: zoneAtCell.drawingData.color, opacity: zoneAtCell.drawingData.opacity }} />}
                        {reachable && !inAoE && isVisible && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-1 h-1 bg-white/30 rounded-full" /></div>}

                        {/* Terrain Tooltip */}
                        {isHovered && terrainAtCell && terrainAtCell.drawingData && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 pointer-events-none whitespace-nowrap animate-fade-in">
                                <div className="bg-slate-950/95 text-white text-[10px] px-2 py-1 rounded border border-white/20 shadow-xl backdrop-blur-sm flex items-center gap-1.5">
                                    {terrainAtCell.drawingData.terrainType === 'hazard' && <AlertOctagon size={12} className="text-red-400" />}
                                    {terrainAtCell.drawingData.terrainType === 'difficult' && <Mountain size={12} className="text-amber-600" />}
                                    {terrainAtCell.drawingData.terrainType?.includes('cover') && <Shield size={12} className="text-blue-400" />}
                                    {terrainAtCell.drawingData.terrainType === 'obstacle' && <BrickWall size={12} className="text-slate-400" />}
                                    <span className="font-bold uppercase tracking-wide">{terrainAtCell.drawingData.text || terrainAtCell.drawingData.terrainType?.replace(/_/g, ' ')}</span>
                                </div>
                                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-950/95 absolute left-1/2 -translate-x-1/2 -bottom-[4px]"></div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* Ruler Label */}
        {rulerData && (
            <div 
                className="absolute z-50 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-lg pointer-events-none"
                style={{ 
                    left: rulerData.x2, 
                    top: rulerData.y2 - 25, 
                    transform: 'translateX(-50%)',
                    color: rulerData.color
                }}
            >
                {rulerData.distFt} ft
            </div>
        )}

        {/* Actor (Token) Layer */}
        {actorsList.map(token => {
            const isVisible = visibleCells ? visibleCells.has(`${token.x},${token.y}`) : true;
            const viewerType = isActor(selectedToken!) ? (selectedToken as Actor).type : TokenType.PLAYER;
            
            if (!isVisible && ((viewerType === TokenType.PLAYER && token.type === TokenType.ENEMY) || (viewerType === TokenType.ENEMY && token.type === TokenType.PLAYER))) return null;
            
            const isFoggedFriend = !isVisible;
            const isSelected = token.id === selectedTokenId;
            const isDead = (token.hp ?? 1) <= 0;
            const hpPercent = token.maxHp ? Math.max(0, Math.min(100, (token.hp || 0) / token.maxHp * 100)) : 100;
            
            let hasLoS = true;
            if (isTargeting && selectedToken && token.id !== selectedTokenId && !activeSpellName) {
                hasLoS = checkLineOfSight(selectedToken, token, tokens);
            }
            const isMeleeTarget = hasLoS && isTargeting && (targetingAction === 'ATTACK' || targetingAction === 'MANEUVER') && selectedToken && token.id !== selectedTokenId && Math.max(Math.abs(token.x - selectedToken.x), Math.abs(token.y - selectedToken.y)) <= 1;
            const isUnconscious = hasStatus(token, 'unconscious');

            return (
                <div 
                    key={token.id} 
                    draggable={!isTargeting && !hasStatus(token, 'stunned') && !hasStatus(token, 'unconscious') && !isDead}
                    onDragStart={(e) => handleDragStart(e, token.id)}
                    onClick={(e) => { e.stopPropagation(); if (isTargeting && !hasLoS && !activeSpellName) return; if (activeSpellName) { onCellClick(token.x, token.y); return; } onTokenClick(token.id); }}
                    className={`absolute flex items-center justify-center transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) z-20 
                        ${isFoggedFriend ? 'opacity-40 grayscale blur-[0.5px]' : ''}
                        ${isDead ? 'grayscale brightness-50 rotate-45 opacity-70' : ''}
                        ${!isTargeting ? 'hover:z-30 cursor-grab active:cursor-grabbing' : 'cursor-crosshair'}
                    `}
                    style={{ 
                        width: CELL_SIZE_PX - 6, height: CELL_SIZE_PX - 6, 
                        left: token.x * CELL_SIZE_PX + 3, top: token.y * CELL_SIZE_PX + 3 
                    }}
                >
                    <TokenRenderer token={token} isSelected={isSelected} isMeleeTarget={isMeleeTarget || false} />
                    
                    {isUnconscious && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
                            <div className="relative">
                                <Moon size={14} className="text-indigo-300 fill-indigo-900/50 animate-pulse" />
                                <div className="absolute -top-1 -right-3 text-xs font-bold text-indigo-200 animate-bounce" style={{ animationDuration: '2s' }}>Zzz</div>
                            </div>
                        </div>
                    )}

                    {!isDead && (
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/10 shadow-sm z-20 backdrop-blur-sm">
                            <div className={`h-full transition-all duration-500 ${hpPercent < 30 ? 'bg-red-500' : hpPercent < 60 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${hpPercent}%` }} />
                        </div>
                    )}

                    {/* Status Orbitals */}
                    <div className="absolute -top-2 -right-2 flex flex-wrap justify-end gap-0.5 w-full pointer-events-none scale-75 origin-top-right">
                        {token.statusEffects?.map((eff, i) => (
                            <div key={i} className="group relative pointer-events-auto">
                                <div className="bg-slate-900 rounded-full p-1 border border-white/20 shadow-lg cursor-help transition-transform hover:scale-110">
                                    <StatusIcon id={eff.id} />
                                </div>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-50 whitespace-nowrap">
                                    <div className="bg-slate-900/95 text-white text-[10px] px-2 py-1.5 rounded border border-white/10 shadow-2xl flex flex-col items-center gap-0.5 backdrop-blur-md min-w-[80px]">
                                        <span className="font-serif font-bold uppercase text-amber-400 tracking-wider text-[9px]">{eff.id.replace(/_/g, ' ')}</span>
                                        <div className="h-px w-full bg-white/10 my-0.5" />
                                        <span className="text-slate-400 text-[9px] font-mono">{eff.duration > 900 ? '∞' : eff.duration} Rounds</span>
                                        {eff.value !== undefined && <span className="text-indigo-300 font-mono text-[9px]">Val: {eff.value}</span>}
                                    </div>
                                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-950/95"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        })}

        {/* Floating Texts */}
        {floatingTexts.map(ft => (
            <div key={ft.id} className={`absolute z-50 pointer-events-none font-serif font-bold whitespace-nowrap ${ft.type === 'crit' ? 'text-3xl animate-crit-scale text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'text-lg animate-float-up'}`}
                style={{ left: ft.x * CELL_SIZE_PX + (CELL_SIZE_PX / 2), top: ft.y * CELL_SIZE_PX, color: ft.color, transform: 'translate(-50%, -50%)', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                {ft.text}
            </div>
        ))}

        {/* Pending Target Marker */}
        {pendingTarget && (
             <div 
                className="absolute pointer-events-none z-40 animate-pulse"
                style={{ left: pendingTarget.x * CELL_SIZE_PX, top: pendingTarget.y * CELL_SIZE_PX, width: CELL_SIZE_PX, height: CELL_SIZE_PX }}
             >
                 <div className="w-full h-full border-2 border-white/80 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.5)] bg-white/10" />
                 <MousePointer2 className="absolute -bottom-4 -right-4 text-white drop-shadow-lg" fill="white" />
             </div>
        )}
        
        {/* Notes/Markers Layer (Props) */}
        {propsList.map(token => (
            <div 
                 key={token.id} 
                 className="absolute z-20 pointer-events-auto flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                 style={{ 
                    width: CELL_SIZE_PX, height: CELL_SIZE_PX, 
                    left: token.x * CELL_SIZE_PX, top: token.y * CELL_SIZE_PX 
                 }}
                 onClick={(e) => { e.stopPropagation(); onTokenClick(token.id); }}
            >
                 <TokenRenderer token={token} isSelected={token.id === selectedTokenId} isMeleeTarget={false} />
            </div>
        ))}
      </div>
    </div>
  );
});

export default GridMap;