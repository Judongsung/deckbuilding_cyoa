// src/constants/translations_en.ts

export const TRANSLATIONS = {
    NODE_TYPES: {
        "NORMAL": "Battle",
        "ELITE": "Elite",
        "BOSS": "Boss",
        "SHOP": "Shop",
        "REST": "Rest",
        "TREASURE": "Treasure",
        "UNKNOWN": "Unknown"
    },
    STAT_NAMES: {
        attack: "Base Attack",
        ATTACK: "Base Attack",
        attackGrowth: "Attack Growth",
        ATTACK_GROWTH: "Attack Growth",
        attackCap: "Attack Cap",
        ATTACK_CAP: "Attack Cap",
        defense: "Base Defense",
        DEFENSE: "Base Defense",
        defenseGrowth: "Defense Growth",
        DEFENSE_GROWTH: "Defense Growth",
        defenseCap: "Defense Cap",
        DEFENSE_CAP: "Defense Cap",
        deployment: "Deployment",
        DEPLOYMENT: "Deployment",
        hp: "HP",
        HP: "HP"
    },

    KEYWORDS: {
        "ATTACK": "Attack",
        "DEFENSE": "Defense",
        "BLOODLUST": "Bloodlust",
        "BRAWL": "Brawl",
        "GROWTH": "Growth",
        "ARMORED": "Armored",
        "SWARM": "Swarm",
        "BERSERK": "Berserk",
        "WEAKEN": "Weaken",
        "VULNERABLE": "Vulnerable"
    },

    CARD_TIERS: {
        "BASIC": "Basic",
        "COMMON": "Common",
        "SPECIAL": "Special",
        "RARE": "Rare"
    },

    UI: {
        TITLE_MAIN: "Deck-Building Auto-Battle Prototype",
        SUBTITLE: "Deck-Building Auto-Battler",
        CONFIRM_RESET: "Your current run will be lost. Start a new game?",
        BTN_CONTINUE: "▶ Continue",
        NO_SAVE: "(No save data found)",
        BTN_NEW_GAME: "Start New Adventure",
        SELECT_CLASS: "Choose Class",
        TITLE_MAP: "🗺️ Exploration Map (Floor: {floor})",
        CURRENT_LOCATION: "📍 Floor {floor} - {node}",
        CURRENT_LOCATION_WAITING: "📍 Floor {floor} - Navigating the map",
        ENEMY_INFO_NAME: "⚔️ Enemy: {enemy}",
        ENEMY_INFO_STATS: "HP: {hp} | ATK: {atk} | DEF: {def}",
        BTN_BATTLE_START: "Start Battle Simulation!",
        BTN_REST: "⛺ Rest & Heal (30)",
        BTN_FORGE: "🔨 Upgrade Card",
        BTN_SHOP_BUY: "Buy",
        BTN_SHOP_REMOVE: "Remove",
        BTN_POTION_USE: "Use",
        BTN_SKIP: "Skip",
        BTN_LEAVE: "Leave",
        BTN_NEXT: "Continue",
        MENU_START: "Start Game",
        MENU_TITLE: "Main Menu",
        SHOP_TITLE: "🛒 Wandering Merchant",
        REWARD_TITLE: "✨ Victory Reward",
        REWARD_TITLE_BATTLE: "✨ Battle Victory Reward ✨",
        REWARD_SUBTITLE_CARD: "Choose a card to add to your deck.",
        REWARD_GET_GOLD: "💰 Gained {amount} Gold",
        REWARD_GET_POTION: "🧪 Obtained {item}",
        REWARD_GET_RELIC: "🏺 Obtained {item}",
        REWARD_GET_CARD: "🃏 Card Reward",
        REWARD_BTN_PICK: "Take This Card",
        REWARD_BTN_SKIP: "Skip Reward",
        GAME_OVER_TITLE: "💀 Game Over 💀",
        GAME_OVER_DESC: "Your journey ends here...",
        VICTORY_TITLE: "👑 Victory 👑",
        VICTORY_DESC: "Congratulations! You have conquered the dungeon!",
        BTN_RETURN_MENU: "⬅️ Back to Main Menu",
        VERSION: "Prototype v1.0.0",

        REST_CONFIRM_UPGRADE: "Confirm Upgrade",
        REST_CONFIRM_DESC: "Do you want to upgrade this card?",
        BTN_CONFIRM: "Confirm",
        BTN_CANCEL: "Cancel",

        STATS_TITLE: "My Stats",
        STATS_HP: "HP: {hp}",
        STATS_GOLD: "💰 Gold: <strong>{gold} G</strong>",
        STATS_ATTACK: "Attack: {base} (Growth {growth} / Cap {cap})",
        STATS_DEFENSE: "Defense: {base} (Growth {growth} / Cap {cap})",
        STATS_DEPLOYMENT: "Deployment: {deployment} / Deck Size: {deckSize}",
        STATS_RELICS: "Relics ({count})",
        STATS_NO_RELICS: "No relics in possession.",
        STATS_POTIONS: "Potions ({count}/3)",
        STATS_NO_POTIONS: "No potions in possession.",

        TREASURE_OPEN_PROMPT: "Click the chest to open it!",
        TREASURE_EMPTY: "The chest was empty...",

        EMPTY_SHOP: "Sold Out",
        CARD_ALREADY_UPGRADED: "Upgraded",
        POTION_EMPTY: "Empty",
        SHOP_GOLD: "Gold: 💰 {gold}G",
        SHOP_SECTION_RELIC: "Special Item (Relic)",
        SHOP_SECTION_CARD: "Card Shop",
        SHOP_SECTION_POTION: "Potion Shop",
        SHOP_SECTION_REMOVE: "Deck Purge Service",
        SHOP_REMOVE_DESC: "Remove an unwanted card to slim down your deck.",
        SHOP_BTN_BUY: "Buy for {price}G",
        SHOP_BTN_REMOVE: "Remove {cardName} ({price}G)",
        SHOP_SOLD_OUT_CARD: "All cards are sold out.",
        SHOP_SOLD_OUT_POTION: "All potions are sold out.",
        BTN_SHOP_LEAVE: "Leave Shop",

        DECK_TITLE: "My Deck",
        DECK_COUNT: "{count} card(s) total",
        DECK_EMPTY: "Your deck is empty. Buy cards from the shop!",

        REST_TITLE: "⛺ Cozy Campfire ⛺",
        REST_SUBTITLE: "Warm yourself by the fire and prepare for the next leg of your journey.",
        REST_HEAL_TITLE: "Rest",
        REST_HEAL_DESC: "Recover {amount} HP.",
        REST_FORGE_TITLE: "Forge",
        REST_FORGE_DESC: "Permanently upgrade one card in your deck.",
        REST_CHOOSE_CARD: "Choose a card to upgrade",
        REST_NO_CARDS: "No cards available to upgrade.",

        ALERT_NO_GOLD: "Not enough gold!",
        ALERT_POTION_FULL: "Potion bag is full!",
        ALERT_WRONG_FLOOR: "You must select a node on floor {floor}!",
        ALERT_DISCONNECTED: "That path is not connected to your previous node!",

        TREASURE_TITLE: "💎 Treasure Chest",
        BTN_CLAIM: "Claim",
        BATTLE_ENEMY_HP: "❤️ HP: {hp} / {maxHp}",
        BATTLE_ENEMY_ATTACK: "⚔️ Attack: {attack}",
        BATTLE_ENEMY_DEFENSE: "🛡️ Defense: {defense}",
        BATTLE_RESULT: "Battle Result",
        DECK_SYNERGY: "💡 Current Deck Synergies:",
        // Settings popup
        BTN_SETTINGS: "⚙️ Settings",
        SETTINGS_TITLE: "⚙️ Settings",
        SETTINGS_LANGUAGE: "Language",
        SETTINGS_LANG_KR: "한국어",
        SETTINGS_LANG_EN: "English",
        SETTINGS_APPLY: "Apply & Restart",
        SETTINGS_RELOAD_NOTICE: "The game will reload when the language is changed."
    },

    SCENE: {
        REWARD_CHOOSE: "✨ Victory! Choose your spoils.",
        SHOP_DESC: "Various useful items for sale.",
        REST_DESC: "The campfire crackles warmly. What will you do?"
    },

    LOGS: {
        MAP_START: "A new map has been generated! Choose a starting node on floor 1.",
        BATTLE_ENCOUNTER: "[Floor {floor}] You encountered a fearsome [{enemy}]!",
        BATTLE_UNKNOWN: "[Floor {floor}] You entered a strange, foggy place.",
        BATTLE_START: "⚔️ Battle against [{enemy}] begins!",
        BATTLE_POTION_EFFECT: "🔥 Potion effect activated! {stat} increased by {value} for this battle.",
        BATTLE_TURN_INFO: "[Turn {turn}] Multiplier: {multiplier}x | My ATK: {curAtk}, My DEF: {curDef}",
        BATTLE_DAMAGE: "💥 Dealt {dmgToEnemy} damage to [{enemy}]! / Took {dmgToPlayer} damage!",
        BATTLE_INFINITE_LOOP: "Battle forcibly ended due to infinite loop!",
        SHOP_BUY_CARD: "🛒 Purchased [{card}] for {price}G!",
        SHOP_BUY_RELIC: "🛒 Purchased relic [{relic}] for {price}G!",
        SHOP_BUY_POTION: "🛒 Purchased [{potion}] for {price}G!",
        SHOP_REMOVE_CARD: "🧹 Paid {price}G to remove [{card}] from the deck.",
        REST_HEAL: "⛺ Rested by the campfire. Recovered {amount} HP.",
        REWARD_GOLD: "💰 Defeated [{enemy}] and earned {gold} gold.",
        REWARD_POTION: "🧪 Found [{potion}] on the fallen enemy!",
        REWARD_POTION_FULL: "🧪 Found a potion, but your bag is full.",
        NODE_TREASURE: "💎 You discovered a treasure chest with a good feeling about it!",
        NODE_TREASURE_RELIC: "🎁 Opened the chest and found the [{relic}] relic!",
        NODE_TREASURE_EMPTY: "The chest was empty. (All relics already owned)",
        NODE_SHOP: "🛒 You visited the shop.",
        NODE_REST: "⛺ [Floor {floor}] Arrived at a campsite with a warm fire.",
        NODE_UNKNOWN: "[Floor {floor}] ❓ You arrived at a strange location.",

        POTION_USE_HEAL: "🧪 Drank [{potion}] and recovered {value} HP!",
        POTION_USE_BUFF: "🧪 Drank [{potion}]. The effect will activate in the next battle.",

        GAME_START: "A new adventure begins! Choose a node on floor 1.",

        REWARD_RELIC: "🏺 Obtained the [{relic}] relic!",
        REWARD_CARD: "🎁 Added [{card}] to your deck as a reward!",
        REWARD_SKIP: "Skipped the reward.",

        VICTORY_NORMAL: "Victory! Defeated [{enemy}].",
        VICTORY_FINAL: "🎉 Congratulations! You crushed [{enemy}] and conquered the dungeon! Final Victory!",
        GAME_OVER: "💀 Overwhelmed and defeated by [{enemy}]...",

        REST_UPGRADE: "🔨 Upgraded [{card}] at the campfire!",

        POTION_USE: "🧪 Used [{potion}]! ({desc})",

        DECK_ADD: "🃏 Added [{card}] to the deck.",

        EVENT_TITLE: "❓ Event: {title}",
        EVENT_CHOICE: "Choice: {choice}",
        EVENT_LOSE_HP: "🩸 Lost {damage} HP!",
        EVENT_LOSE_GOLD: "💰 Lost {gold} gold!",
        EVENT_DEATH: "💀 You bled out and collapsed...",
        EVENT_GET_RELIC: "💎 In exchange, obtained the [{relic}] relic!",
        EVENT_GET_RELIC_GOLD: "💎 As a reward for your charity, received the [{relic}] relic!",
        EVENT_GET_GOLD: "💰 Gained {gold} gold!",
        EVENT_HEAL: "🌿 Recovered {amount} HP!",
        EVENT_LEAVE: "You left the area safely.",

        RELIC_EFFECT_HEAL: "🏺 [{relic}] effect triggered! Recovered {value} HP.",
        RELIC_EFFECT_GOLD: "🏺 [{relic}] effect triggered! Gained {value} bonus gold."
    },

    DATA: {
        CARDS: {
            "card_strike_01": { name: "Basic Strike" },
            "card_defend_01": { name: "Stalwart Shield" },
            "card_poison_001": { name: "Poison Coat" }
        },
        ENEMIES: {
            "enemy_goblin_01": { name: "Goblin Horde" },
            "enemy_orc_01": { name: "Orc Berserker" },
            "boss_dragon_01": { name: "Fire Dragon (Boss)" }
        },
        CHARACTERS: {
            "char_warrior": {
                name: "Warrior",
                description: "A well-rounded starter character with balanced offense and defense."
            }
        },
        RELICS: {
            "relic_blood": { name: "Warrior's Blood", desc: "Recover 5 HP at the start of each battle." },
            "relic_whetstone": { name: "Whetstone", desc: "Increases base attack by 3." },
            "relic_golden_idol": { name: "Golden Idol", desc: "Gain 10 extra gold after each battle victory." },
            "relic_mercenary": { name: "Mercenary's Mark", desc: "Increases attack growth by 1 each battle turn." },
            "relic_shell": { name: "Hardened Shell", desc: "Increases base defense by 5." },
            "relic_compass": { name: "Arcane Compass", desc: "Increases deck deployment by 2." }
        },
        POTIONS: {
            "potion_strength": { name: "Strength Potion", desc: "Increases attack by 5 for the next battle." },
            "potion_ironskin": { name: "Ironskin Potion", desc: "Increases defense by 5 for the next battle." },
            "potion_heal": { name: "Healing Potion", desc: "Immediately recover 20 HP." }
        },
        EVENTS: {
            "event_altar": {
                title: "Forgotten Altar",
                desc: "You discovered an old altar with a grotesque statue. Dried bloodstains left by someone long ago mark its surface...",
                choices: [
                    "Offer blood (Lose 15 HP, gain a random relic)",
                    "Sense an ominous aura and turn back"
                ]
            },
            "event_beggar": {
                title: "Suspicious Beggar",
                desc: "A hooded beggar blocks your path. 'Spare some coin... who knows what I might give you in return?'",
                choices: [
                    "Give charity (Lose 50 gold, gain a random relic)",
                    "Ignore and walk past"
                ]
            },
            "event_wagon": {
                title: "Abandoned Wagon",
                desc: "In the middle of a forest path sits a broken wagon, seemingly left behind by a merchant caravan. Something useful might still be inside.",
                choices: [
                    "Search the wagon thoroughly (Lose 20 HP, gain a random relic)",
                    "Pocket the loose coins lying around (Gain 30 gold)",
                    "Walk past"
                ]
            },
            "event_mushroom": {
                title: "Strange Mushroom Cluster",
                desc: "You spotted a cluster of alluring violet mushrooms growing on the cave wall. They look surprisingly appetizing.",
                choices: [
                    "Take a bite (Recover 30 HP)",
                    "Harvest and sell them (Gain 40 gold, lose 10 HP)",
                    "Ignore and move on"
                ]
            },
            "event_checkpoint": {
                title: "Toll Demand",
                desc: "Heavily armed mercenaries block the road. 'You'll need to pay a toll to pass through our territory.'",
                choices: [
                    "Pay without a fuss (Lose 40 gold)",
                    "Draw your weapon and force through (Lose 25 HP)"
                ]
            }
        }
    }
} as const;
