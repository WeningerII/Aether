
import { useState, useEffect } from 'react';
import { Token, TokenType, AbilityScores, ClassResource, Item, Actor } from '../types';
import { SRD_HERITAGES, SRD_CLASSES, SRD_FEATS, FIGHTING_STYLES, SRD_SPELLS, SRD_BACKGROUNDS } from '../data/srd';
import { getDndBeyondCharacter } from '../services/dndBeyond';
import { DAMAGE_TYPES } from '../constants';
import { getSpellSlots } from '../utils/gameLogic';
import { GeneratedNPC } from '../utils/npcGenerator';

const fuzzyMatch = (target: string, options: string[]): string | null => {
    if (!target) return null;
    const t = target.toLowerCase().replace(/[()]/g, '');
    const tWords = t.split(' ').filter(w => w.length > 2);

    let bestMatch = null;
    let maxScore = 0;

    options.forEach(opt => {
        const o = opt.toLowerCase().replace(/[()]/g, '');
        const oWords = o.split(' ').filter(w => w.length > 2);
        let score = 0;

        tWords.forEach(tw => {
            if (oWords.includes(tw)) score += 1;
        });

        if (tWords[0] === oWords[0]) score += 0.5;
        if (o.includes(t) || t.includes(o)) score += 0.5;

        if (score > maxScore && score > 0) {
            maxScore = score;
            bestMatch = opt;
        }
    });

    return bestMatch;
};

export const useTokenFactory = (onAddToken: (token: Token) => void, onClose: () => void) => {
  const [mode, setMode] = useState<'manual' | 'import'>('manual');
  
  const [newName, setNewName] = useState('');
  const [newSymbol, setNewSymbol] = useState('👤');
  const [newColor, setNewColor] = useState('#3b82f6');
  const [newType, setNewType] = useState<TokenType.PLAYER | TokenType.ENEMY | TokenType.NPC>(TokenType.PLAYER);
  
  const [baseStats, setBaseStats] = useState<AbilityScores>({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
  const [selectedHeritage, setSelectedHeritage] = useState<string>('Human');
  const [selectedClass, setSelectedClass] = useState<string>('Fighter');
  const [selectedSubclass, setSelectedSubclass] = useState<string>('Champion');
  const [selectedBackground, setSelectedBackground] = useState<string>('Soldier');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedFightingStyle, setSelectedFightingStyle] = useState<string>('');
  const [selectedFightingStyle2, setSelectedFightingStyle2] = useState<string>(''); 
  
  const [selectedFeats, setSelectedFeats] = useState<string[]>([]);
  const [selectedSubclassFeatures, setSelectedSubclassFeatures] = useState<string[]>([]);

  const [newHp, setNewHp] = useState(10);
  const [newMaxHp, setNewMaxHp] = useState(10);
  const [newTempHp, setNewTempHp] = useState(0);
  const [newAc, setNewAc] = useState(10);
  const [newInitiative, setNewInitiative] = useState(0);
  const [newAttackBonus, setNewAttackBonus] = useState(2);
  const [newSpeed, setNewSpeed] = useState(6);
  const [critThreshold, setCritThreshold] = useState(20);
  
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [traits, setTraits] = useState<string[]>([]);
  const [extraTraits, setExtraTraits] = useState<string[]>([]); // For NPC Generator flavor
  
  const [resistances, setResistances] = useState<string[]>([]);
  const [immunities, setImmunities] = useState<string[]>([]);
  
  const [importUrl, setImportUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState('');

  useEffect(() => {
      const cls = SRD_CLASSES.find(c => c.name === selectedClass);
      const sub = cls?.subclasses.find(s => s.name === selectedSubclass);
      if (!sub) {
          setSelectedSubclassFeatures([]);
          return;
      }
      const valid = sub.features.filter(f => f.level <= selectedLevel).map(f => f.name);
      setSelectedSubclassFeatures(valid);
  }, [selectedClass, selectedSubclass, selectedLevel]);

  useEffect(() => {
    const heritage = SRD_HERITAGES.find(h => h.name === selectedHeritage);
    const cls = SRD_CLASSES.find(c => c.name === selectedClass);
    const subclass = cls?.subclasses.find(s => s.name === selectedSubclass);

    if (!heritage || !cls) return;

    const newTraits: string[] = [];
    heritage.traits.forEach(t => newTraits.push(`[Race] ${t.name}: ${t.desc}`));
    cls.features.filter(f => f.level <= selectedLevel).forEach(f => newTraits.push(`[Class] ${f.name}: ${f.desc}`));
    
    if (selectedClass === 'Fighter') {
        if (selectedFightingStyle) {
            const style = FIGHTING_STYLES.find(s => s.name === selectedFightingStyle);
            if (style) {
                newTraits.push(`[Fighting Style] ${style.name}: ${style.desc}`);
            }
        }
        if (selectedSubclass === 'Champion' && selectedLevel >= 10 && selectedFightingStyle2) {
            const style = FIGHTING_STYLES.find(s => s.name === selectedFightingStyle2);
            if (style) {
                newTraits.push(`[Fighting Style 2] ${style.name}: ${style.desc}`);
            }
        }
    }

    if (subclass) {
        subclass.features
            .filter(f => selectedSubclassFeatures.includes(f.name))
            .forEach(f => newTraits.push(`[Subclass] ${f.name}: ${f.desc}`));
    }
    
    SRD_FEATS.filter(f => selectedFeats.includes(f.name)).forEach(f => {
        newTraits.push(`[Feat] ${f.name}: ${f.desc}`);
    });
    
    // Append extra traits from generator (Personality etc)
    extraTraits.forEach(t => newTraits.push(t));

    setTraits(newTraits);
    
    if (heritage.resistances) {
        setResistances(prev => {
            const manual = prev.filter(r => !heritage.resistances!.includes(r)); 
            return [...new Set([...manual, ...heritage.resistances!])];
        });
    }
  }, [selectedHeritage, selectedClass, selectedSubclass, selectedLevel, selectedFeats, selectedSubclassFeatures, selectedFightingStyle, selectedFightingStyle2, extraTraits]);

  useEffect(() => {
      const cls = SRD_CLASSES.find(c => c.name === selectedClass);
      if (cls && cls.subclasses.length > 0) {
          const validSubnames = cls.subclasses.map(s => s.name);
          if (!validSubnames.includes(selectedSubclass)) {
            setSelectedSubclass(cls.subclasses[0].name);
          }
      } else {
          setSelectedSubclass('');
      }
  }, [selectedClass]);

  const getRaceMods = () => {
    const h = SRD_HERITAGES.find(r => r.name === selectedHeritage);
    return h ? h.bonuses : {};
  };

  const getTotalStats = (): AbilityScores => {
    const mods = getRaceMods();
    return {
        str: baseStats.str + (mods.str || 0),
        dex: baseStats.dex + (mods.dex || 0),
        con: baseStats.con + (mods.con || 0),
        int: baseStats.int + (mods.int || 0),
        wis: baseStats.wis + (mods.wis || 0),
        cha: baseStats.cha + (mods.cha || 0),
    };
  };

  const getMod = (score: number) => Math.floor((score - 10) / 2);

  useEffect(() => {
    const totals = getTotalStats();
    const dexMod = getMod(totals.dex);
    const conMod = getMod(totals.con);
    const strMod = getMod(totals.str);
    const wisMod = getMod(totals.wis);
    const cls = SRD_CLASSES.find(c => c.name === selectedClass);
    const heritage = SRD_HERITAGES.find(h => h.name === selectedHeritage);
    const hitDie = cls?.hitDie || 8;

    let featHpBonus = 0;
    let featInitBonus = 0;
    let featSpeedBonus = 0;
    let featAcBonus = 0;
    
    const activeFeats = SRD_FEATS.filter(f => selectedFeats.includes(f.name));
    activeFeats.forEach(f => {
        if (f.bonuses?.hpPerLevel) featHpBonus += (f.bonuses.hpPerLevel * selectedLevel);
        if (f.bonuses?.initiative) featInitBonus += f.bonuses.initiative;
        if (f.bonuses?.speed) featSpeedBonus += f.bonuses.speed;
        if (f.bonuses?.ac) featAcBonus += f.bonuses.ac;
    });

    if ((selectedClass === 'Barbarian' && selectedLevel >= 5) || (selectedClass === 'Monk' && selectedLevel >= 2)) {
        featSpeedBonus += 10;
    }
    
    const lv1Hp = hitDie + conMod;
    const avgPerLevel = (hitDie / 2) + 1 + conMod;
    let calculatedHp = selectedLevel === 1 ? lv1Hp : lv1Hp + Math.floor((selectedLevel - 1) * avgPerLevel);
    calculatedHp += featHpBonus;

    if (selectedClass === 'Sorcerer' && selectedSubclass === 'Draconic Bloodline') {
        calculatedHp += selectedLevel;
    }

    let baseSpeed = heritage?.speed || 30;
    let speedFeet = baseSpeed + featSpeedBonus;
    let calculatedSpeed = Math.floor(speedFeet / 5);

    let calculatedAc = 10 + dexMod + featAcBonus;
    let calculatedInit = dexMod + featInitBonus;
    
    const prof = Math.floor((selectedLevel - 1) / 4) + 2;
    let calculatedAtk = prof + Math.max(strMod, dexMod); 
    let calculatedCrit = 20;

    if (selectedClass === 'Fighter') {
        const activeStyles = [selectedFightingStyle];
        if (selectedSubclass === 'Champion' && selectedLevel >= 10) {
            activeStyles.push(selectedFightingStyle2);
        }

        activeStyles.forEach(style => {
            if (style === 'Defense') calculatedAc += 1;
            if (style === 'Archery') calculatedAtk += 2;
        });
        
        if (selectedSubclass === 'Champion') {
            if (selectedLevel >= 3) calculatedCrit = 19;
            if (selectedLevel >= 15) calculatedCrit = 18;
            
            if (selectedLevel >= 7) {
                calculatedInit += Math.ceil(prof / 2);
            }
        }
    }

    if (selectedClass === 'Monk') {
        calculatedAc = 10 + dexMod + wisMod;
    }

    if (selectedClass === 'Sorcerer' && selectedSubclass === 'Draconic Bloodline') {
        calculatedAc = 13 + dexMod;
    }

    if (selectedClass === 'Barbarian') {
        calculatedAc = 10 + dexMod + conMod;
    }

    setNewAc(calculatedAc);
    setNewInitiative(calculatedInit);
    setNewMaxHp(calculatedHp);
    setNewHp(calculatedHp);
    setNewAttackBonus(calculatedAtk);
    setNewSpeed(calculatedSpeed);
    setCritThreshold(calculatedCrit);
    
  }, [baseStats, selectedHeritage, selectedClass, selectedLevel, selectedFeats, selectedFightingStyle, selectedFightingStyle2, selectedSubclass]);

  const handleAdd = (inventory?: Item[]) => {
    const finalName = newName.trim() || "Unnamed Character";
    let finalSymbol = newSymbol.trim();
    if (!finalSymbol) {
        finalSymbol = finalName.charAt(0).toUpperCase();
    }

    let classResource: ClassResource | undefined = undefined;
    let finalStats = getTotalStats();
    
    const classData = SRD_CLASSES.find(c => c.name === selectedClass);
    
    const finalSaves = new Set<string>();
    if (classData?.savingThrows) classData.savingThrows.forEach(s => finalSaves.add(s));

    // --- RESILIENT FEAT LOGIC ---
    if (selectedFeats.includes('Resilient')) {
        const priorities = ['con', 'wis', 'dex', 'str', 'cha', 'int'];
        let added = false;
        for (const stat of priorities) {
            if (!finalSaves.has(stat)) {
                finalSaves.add(stat);
                // Add +1 to the stat
                finalStats = { ...finalStats, [stat]: finalStats[stat as keyof AbilityScores] + 1 };
                added = true;
                break;
            }
        }
    }
    
    const chaMod = getMod(finalStats.cha);
    
    let spellAbility: 'int' | 'wis' | 'cha' | undefined = undefined;
    if (['Wizard', 'Artificer'].includes(selectedClass)) spellAbility = 'int';
    if (['Cleric', 'Druid', 'Ranger', 'Monk'].includes(selectedClass)) spellAbility = 'wis';
    if (['Bard', 'Paladin', 'Sorcerer', 'Warlock'].includes(selectedClass)) spellAbility = 'cha';

    const spellSlots = getSpellSlots(selectedClass, selectedLevel);
    
    let knownSpells: string[] = [];
    if (spellAbility) {
        const spellsToLearn = [];
        
        if (selectedClass === 'Bard') spellsToLearn.push('Vicious Mockery', 'Mage Hand');
        if (selectedClass === 'Cleric') spellsToLearn.push('Sacred Flame', 'Mage Hand');
        if (selectedClass === 'Druid') spellsToLearn.push('Shillelagh', 'Produce Flame'); 
        if (selectedClass === 'Sorcerer') spellsToLearn.push('Fire Bolt', 'Mage Hand', 'Message');
        if (selectedClass === 'Warlock') spellsToLearn.push('Eldritch Blast', 'Mage Hand');
        if (selectedClass === 'Wizard') spellsToLearn.push('Fire Bolt', 'Mage Hand', 'Prestidigation');

        if (selectedLevel >= 1) {
             if (selectedClass === 'Bard') spellsToLearn.push('Healing Word', 'Dissonant Whispers', 'Faerie Fire', 'Thunderwave');
             if (selectedClass === 'Cleric') spellsToLearn.push('Bless', 'Cure Wounds', 'Guiding Bolt', 'Healing Word');
             if (selectedClass === 'Druid') spellsToLearn.push('Entangle', 'Cure Wounds', 'Faerie Fire', 'Thunderwave');
             if (selectedClass === 'Paladin' && selectedLevel >= 2) spellsToLearn.push('Bless', 'Cure Wounds', 'Heroism');
             if (selectedClass === 'Ranger' && selectedLevel >= 2) spellsToLearn.push('Hunter\'s Mark', 'Cure Wounds');
             if (selectedClass === 'Sorcerer') spellsToLearn.push('Magic Missile', 'Shield', 'Burning Hands');
             if (selectedClass === 'Warlock') spellsToLearn.push('Hex', 'Hellish Rebuke');
             if (selectedClass === 'Wizard') spellsToLearn.push('Mage Armor', 'Magic Missile', 'Shield', 'Sleep');
        }

        if (selectedLevel >= 3 || (['Paladin', 'Ranger'].includes(selectedClass) && selectedLevel >= 5)) {
             if (selectedClass === 'Bard') spellsToLearn.push('Shatter', 'Hold Person', 'Invisibility');
             if (selectedClass === 'Cleric') spellsToLearn.push('Hold Person', 'Spiritual Weapon');
             if (selectedClass === 'Druid') spellsToLearn.push('Moonbeam', 'Hold Person');
             if (selectedClass === 'Sorcerer') spellsToLearn.push('Misty Step', 'Shatter');
             if (selectedClass === 'Warlock') spellsToLearn.push('Misty Step', 'Invisibility');
             if (selectedClass === 'Wizard') spellsToLearn.push('Misty Step', 'Shatter', 'Invisibility');
        }
        
        knownSpells = spellsToLearn.filter(name => SRD_SPELLS.some(s => s.name === name));
    }

    if (selectedClass === 'Fighter' && selectedSubclass === 'Battle Master') {
        let diceCount = 4;
        let dieSize = 8;
        if (selectedLevel >= 7) diceCount = 5;
        if (selectedLevel >= 15) diceCount = 6;
        
        if (selectedLevel >= 10) dieSize = 10;
        if (selectedLevel >= 18) dieSize = 12;

        classResource = {
            name: 'Superiority Dice',
            current: diceCount,
            max: diceCount,
            dieSize: dieSize,
            recharge: 'short'
        };
    } else if (selectedClass === 'Barbarian') {
        let rages = 2;
        if (selectedLevel >= 3) rages = 3;
        if (selectedLevel >= 6) rages = 4;
        if (selectedLevel >= 12) rages = 5;
        if (selectedLevel >= 17) rages = 6;
        if (selectedLevel >= 20) rages = 99; 

        classResource = {
            name: 'Rages',
            current: rages,
            max: rages,
            recharge: 'long',
            dieSize: 0 
        };
    } else if (selectedClass === 'Bard') {
        const uses = Math.max(1, chaMod);
        let die = 6;
        if (selectedLevel >= 5) die = 8;
        if (selectedLevel >= 10) die = 10;
        if (selectedLevel >= 15) die = 12;
        
        classResource = {
            name: 'Bardic Inspiration',
            current: uses,
            max: uses,
            dieSize: die,
            recharge: selectedLevel >= 5 ? 'short' : 'long'
        };
    } else if (selectedClass === 'Monk') {
        classResource = {
            name: 'Focus Points',
            current: selectedLevel,
            max: selectedLevel,
            recharge: 'short',
            dieSize: 0
        };
    } else if (selectedClass === 'Druid' && selectedLevel >= 2) {
        classResource = {
            name: 'Wild Shape',
            current: 2,
            max: 2,
            recharge: 'short',
            dieSize: 0
        };
    } else if (selectedClass === 'Cleric' && selectedLevel >= 2) {
        let uses = 1;
        if (selectedLevel >= 6) uses = 2;
        if (selectedLevel >= 18) uses = 3;
        classResource = {
            name: 'Channel Divinity',
            current: uses,
            max: uses,
            recharge: 'short',
            dieSize: 0
        };
    } else if (selectedClass === 'Paladin') {
        const pool = selectedLevel * 5;
        classResource = {
            name: 'Lay on Hands',
            current: pool,
            max: pool,
            recharge: 'long',
            dieSize: 1 
        };
    } else if (selectedClass === 'Sorcerer' && selectedLevel >= 2) {
        classResource = {
            name: 'Sorcery Points',
            current: selectedLevel,
            max: selectedLevel,
            recharge: 'long',
            dieSize: 0
        };
    } else if (selectedClass === 'Warlock') {
        let slots = 1;
        if (selectedLevel >= 2) slots = 2;
        if (selectedLevel >= 11) slots = 3;
        if (selectedLevel >= 17) slots = 4;
        
        classResource = {
            name: 'Pact Magic Slots',
            current: slots,
            max: slots,
            recharge: 'short',
            dieSize: 0
        };
    }

    const heritageData = SRD_HERITAGES.find(h => h.name === selectedHeritage);
    const bgData = SRD_BACKGROUNDS.find(b => b.name === selectedBackground);

    const finalSkills = new Set<string>();
    if (heritageData?.skills) heritageData.skills.forEach(s => finalSkills.add(s));
    if (bgData?.skills) bgData.skills.forEach(s => finalSkills.add(s));
    if (classData?.defaultSkills) classData.defaultSkills.forEach(s => finalSkills.add(s));
    
    const newToken: Actor = {
      id: Date.now().toString(),
      name: finalName,
      type: newType,
      x: 0,
      y: 0,
      color: newColor,
      symbol: finalSymbol,
      hp: newHp,
      maxHp: newMaxHp,
      tempHp: newTempHp,
      ac: newAc,
      stats: finalStats,
      attackBonus: newAttackBonus,
      initiative: newInitiative,
      speed: newSpeed,
      critThreshold: critThreshold,
      avatarUrl: newAvatarUrl,
      heritage: selectedHeritage,
      class: selectedClass,
      subclass: selectedSubclass,
      background: selectedBackground,
      level: selectedLevel,
      hitDiceUsed: 0,
      feats: selectedFeats,
      traits: traits,
      statusEffects: [],
      classResource: classResource,
      damageResistances: resistances,
      damageImmunities: immunities,
      damageVulnerabilities: [],
      inventory: inventory || [],
      skillProficiencies: Array.from(finalSkills),
      savingThrowProficiencies: Array.from(finalSaves),
      spellSlots: spellSlots,
      knownSpells: knownSpells,
      spellAbility: spellAbility,
      deathSaves: { successes: 0, failures: 0 } 
    };
    onAddToken(newToken);
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewSymbol('👤');
    setNewType(TokenType.PLAYER);
    setBaseStats({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
    setNewHp(10);
    setNewMaxHp(10);
    setNewTempHp(0);
    setNewAvatarUrl('');
    setNewAc(10);
    setNewInitiative(0);
    setNewSpeed(6);
    setNewAttackBonus(0);
    setSelectedHeritage('Human');
    setSelectedClass('Fighter');
    setSelectedLevel(1);
    setSelectedFightingStyle('');
    setSelectedFightingStyle2('');
    setSelectedFeats([]);
    setSelectedSubclassFeatures([]);
    setSelectedBackground('Soldier');
    setResistances([]);
    setImmunities([]);
    setExtraTraits([]);
    setImportUrl('');
    setImportError('');
    setIsLoading(false);
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setImportError('');
    setIsLoading(true);
    try {
        const parsed = await getDndBeyondCharacter(importUrl);
        if (parsed) {
            setNewName(parsed.name);
            setNewAvatarUrl(parsed.avatarUrl);
            if (parsed.stats) setBaseStats(parsed.stats);
            if (parsed.level) setSelectedLevel(parsed.level);

            if (parsed.heritage) {
                const heritageNames = SRD_HERITAGES.map(h => h.name);
                const matched = fuzzyMatch(parsed.heritage, heritageNames) || 'Human';
                setSelectedHeritage(matched);
            }

            if (parsed.class) {
                 const classNames = SRD_CLASSES.map(c => c.name);
                 const matched = fuzzyMatch(parsed.class, classNames) || 'Fighter';
                 setSelectedClass(matched);
            }

            if (parsed.subclass) {
                setSelectedSubclass(parsed.subclass);
            }

            if (parsed.feats && parsed.feats.length > 0) {
                const availableFeats = SRD_FEATS.map(f => f.name);
                const matchedFeats = parsed.feats
                    .map(fName => fuzzyMatch(fName, availableFeats))
                    .filter((f): f is string => f !== null);
                setSelectedFeats(prev => [...new Set([...prev, ...matchedFeats])]);
            }

            setNewSymbol(''); 
            setMode('manual');
        } else {
            setImportError('Could not parse character data.');
        }
    } catch (err: any) {
        setImportError(err.message || 'Failed to import.');
    } finally {
        setIsLoading(false);
    }
  };

  const populateForm = (npc: GeneratedNPC) => {
      setNewName(npc.name);
      setSelectedHeritage(npc.race);
      setSelectedClass(npc.class);
      setSelectedBackground(npc.background);
      setBaseStats(npc.stats);
      
      // Add flavor as traits
      setExtraTraits([
          `[Personality] ${npc.flavor}`,
          `[Appearance] ${npc.appearance}`
      ]);
      
      setNewSymbol(npc.name.charAt(0).toUpperCase());
      setMode('manual');
  };

  const toggleResistance = (type: string) => {
      setResistances(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
      setImmunities(prev => prev.filter(t => t !== type));
  };

  const toggleImmunity = (type: string) => {
      setImmunities(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
      setResistances(prev => prev.filter(t => t !== type));
  };

  const toggleFeat = (featName: string) => {
      setSelectedFeats(prev => {
          if (prev.includes(featName)) return prev.filter(f => f !== featName);
          return [...prev, featName];
      });
  };

  const toggleSubclassFeature = (featName: string) => {
      setSelectedSubclassFeatures(prev => {
          if (prev.includes(featName)) return prev.filter(f => f !== featName);
          return [...prev, featName];
      });
  };

  return {
      mode, setMode,
      form: {
          newName, setNewName,
          newSymbol, setNewSymbol,
          newColor, setNewColor,
          newType, setNewType,
          baseStats, setBaseStats,
          selectedHeritage, setSelectedHeritage,
          selectedClass, setSelectedClass,
          selectedSubclass, setSelectedSubclass,
          selectedBackground, setSelectedBackground,
          selectedLevel, setSelectedLevel,
          selectedFightingStyle, setSelectedFightingStyle,
          selectedFightingStyle2, setSelectedFightingStyle2,
          selectedFeats,
          selectedSubclassFeatures,
          newHp, setNewHp,
          newMaxHp, setNewMaxHp,
          newTempHp, setNewTempHp,
          newAc, setNewAc,
          newInitiative, setNewInitiative,
          newAttackBonus, setNewAttackBonus,
          newSpeed, setNewSpeed,
          newAvatarUrl, setNewAvatarUrl,
          traits,
          resistances,
          immunities
      },
      importState: {
          importUrl, setImportUrl,
          isLoading, importError,
          handleImport
      },
      handlers: {
          handleAdd,
          resetForm,
          toggleResistance,
          toggleImmunity,
          toggleFeat,
          toggleSubclassFeature,
          getRaceMods,
          getMod,
          populateForm
      }
  };
};
