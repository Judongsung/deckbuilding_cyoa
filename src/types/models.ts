// src/types/models.ts

export interface BaseStats {
    hp: number;
    attack: number;
    attackCap: number;
    attackGrowth: number;
    defense: number;
    defenseCap: number;
    defenseGrowth: number;
    deployment: number;
}

export interface EffectCondition {
    type: string;
    value?: number | string;
}

export interface CardEffect {
    trigger: string;
    target: string;
    action: string;
    statType?: string;
    value?: number;
    multiplier?: number;
    sourceStat?: string;
    targetKeyword?: string;
    condition?: EffectCondition;
}

export interface Card {
    id: string;
    name: string;
    tier: string;
    image?: string;
    flavor?: string;
    keywords?: string[];
    currentKeywords?: string[];
    baseStats: BaseStats;
    upgradedBaseStats: BaseStats;
    effects?: CardEffect[];
    upgradedEffects?: CardEffect[];
    isUpgraded?: boolean;
}

export interface Enemy {
    id: string;
    name: string;
    type: string;
    hp: number;
    hpGrowth?: number;
    baseStats?: {
        attack: number;
        defense: number;
    };
    attackGrowth?: number;
    defenseGrowth?: number;
    keywords?: string[];
    passive?: string;
}

export interface EventAction {
    type: string;
    value?: number;
}

export interface EventChoice {
    text: string;
    actions: EventAction[];
}

export interface GameEvent {
    id: string;
    title: string;
    desc: string;
    choices: EventChoice[];
}

export interface Relic {
    id: string;
    name: string;
    desc: string;
    tier: string;
    action?: string;
    statType?: string;
    stat?: string;
    value?: number;
    trigger?: string;
    price?: number;
}

export interface Potion {
    id: string;
    name: string;
    desc: string;
    tier: string;
    action: string;
    statType?: string;
    value?: number;
    price?: number;
}

export interface Character {
    id: string;
    name: string;
    description: string;
    baseStats: BaseStats & { gold: number };
    startingDeck: string[];
}
