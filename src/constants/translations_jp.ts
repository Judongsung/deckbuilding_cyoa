// src/constants/translations_jp.ts

export const TRANSLATIONS = {
    NODE_TYPES: {
        "NORMAL": "通常戦闘",
        "ELITE": "エリート戦闘",
        "BOSS": "ボス戦闘",
        "SHOP": "ショップ",
        "REST": "休憩所",
        "TREASURE": "宝箱",
        "UNKNOWN": "未知"
    },
    STAT_NAMES: {
        attack: "基礎攻撃力",
        ATTACK: "基礎攻撃力",
        attackGrowth: "攻撃成長力",
        ATTACK_GROWTH: "攻撃成長力",
        attackCap: "最大攻撃力",
        ATTACK_CAP: "最大攻撃力",
        defense: "基礎防御力",
        DEFENSE: "基礎防御力",
        defenseGrowth: "防御成長力",
        DEFENSE_GROWTH: "防御成長力",
        defenseCap: "最大防御力",
        DEFENSE_CAP: "最大防御力",
        deployment: "展開力",
        DEPLOYMENT: "展開力",
        hp: "体力",
        HP: "体力"
    },
    
    KEYWORDS: {
        "ATTACK": "攻撃",
        "DEFENSE": "防御",
        "BLOODLUST": "血気",
        "BRAWL": "格闘",
        "GROWTH": "成長",
        "ARMORED": "武装",
        "SWARM": "群れ",
        "BERSERK": "狂暴化",
        "WEAKEN": "威圧",
        "VULNERABLE": "鎧割り"
    },

    CARD_TIERS: {
        "BASIC": "基本",
        "COMMON": "コモン",
        "SPECIAL": "スペシャル",
        "RARE": "レア"
    },
    
    UI: {
        TITLE_MAIN: "デッキ構築型オートバトル プロトタイプ",
        SUBTITLE: "デッキ構築型オートバトラー",
        CONFIRM_RESET: "進行中のデータが削除されます。新しく始めますか？",
        BTN_CONTINUE: "▶ 続きから",
        NO_SAVE: "(セーブデータなし)",
        BTN_NEW_GAME: "新たな冒険を始める",
        SELECT_CLASS: "クラス選択",
        TITLE_MAP: "🗺️ 探索マップ (現在: {floor}階)",
        CURRENT_LOCATION: "📍 {floor}階 - {node}",
        CURRENT_LOCATION_WAITING: "📍 {floor}階 - マップ探索中",
        ENEMY_INFO_NAME: "⚔️ 敵: {enemy}",
        ENEMY_INFO_STATS: "体力: {hp} | 攻撃: {atk} | 防御: {def}",
        BTN_BATTLE_START: "戦闘シミュレーション開始！",
        BTN_REST: "⛺ 体力回復 (30)",
        BTN_FORGE: "🔨 カード強化",
        BTN_SHOP_BUY: "購入",
        BTN_SHOP_REMOVE: "デッキ圧縮",
        BTN_POTION_USE: "使用",
        BTN_SKIP: "スキップ",
        BTN_LEAVE: "戻る",
        BTN_NEXT: "次へ",
        MENU_START: "ゲームスタート",
        MENU_TITLE: "メインメニュー",
        SHOP_TITLE: "🛒 奇妙な店",
        REWARD_TITLE: "✨ 勝利報酬",
        REWARD_TITLE_BATTLE: "✨ 戦闘勝利報酬 ✨",
        REWARD_SUBTITLE_CARD: "デッキに追加するカードを1枚選んでください。",
        REWARD_GET_GOLD: "💰 {amount} ゴールド獲得",
        REWARD_GET_POTION: "🧪 {item} を獲得",
        REWARD_GET_RELIC: "🏺 {item} を獲得",
        REWARD_GET_CARD: "🃏 カード報酬選択",
        REWARD_BTN_PICK: "このカードを選ぶ",
        REWARD_BTN_SKIP: "報酬をスキップする",
        GAME_OVER_TITLE: "💀 ゲームオーバー 💀",
        GAME_OVER_DESC: "あなたの旅はここで終わりました...",
        VICTORY_TITLE: "👑 勝利 👑",
        VICTORY_DESC: "おめでとうございます！ダンジョンの支配者になりました。",
        BTN_RETURN_MENU: "⬅️ メインメニューへ",
        VERSION: "プロトタイプ v1.0.0",
        
        REST_CONFIRM_UPGRADE: "強化確認",
        REST_CONFIRM_DESC: "このカードを強化しますか？",
        BTN_CONFIRM: "確認",
        BTN_CANCEL: "キャンセル",

        STATS_TITLE: "ステータス",
        STATS_HP: "体力: {hp}",
        STATS_GOLD: "💰 ゴールド: <strong>{gold} G</strong>",
        STATS_ATTACK: "攻撃力: {base} (成長 {growth} / 最大 {cap})",
        STATS_DEFENSE: "防御力: {base} (成長 {growth} / 最大 {cap})",
        STATS_DEPLOYMENT: "展開力: {deployment} / デッキ枚数: {deckSize}",
        STATS_RELICS: "所持遺物 ({count})",
        STATS_NO_RELICS: "所持している遺物はありません。",
        STATS_POTIONS: "所持ポーション ({count}/3)",
        STATS_NO_POTIONS: "所持しているポーションはありません。",
        
        TREASURE_OPEN_PROMPT: "宝箱をクリックして開けてください！",
        TREASURE_EMPTY: "宝箱は空でした...",
        
        EMPTY_SHOP: "売り切れ",
        CARD_ALREADY_UPGRADED: "強化完了",
        POTION_EMPTY: "空",
        SHOP_GOLD: "所持ゴールド: 💰 {gold}G",
        SHOP_SECTION_RELIC: "特別商品 (遺物)",
        SHOP_SECTION_CARD: "カード購入",
        SHOP_SECTION_POTION: "ポーション購入",
        SHOP_SECTION_REMOVE: "デッキ圧縮サービス",
        SHOP_REMOVE_DESC: "不要なカードを削除し、デッキを軽くします。",
        SHOP_BTN_BUY: "{price}G 購入",
        SHOP_BTN_REMOVE: "{cardName} 削除 ({price}G)",
        SHOP_SOLD_OUT_CARD: "すべてのカードが売り切れました。",
        SHOP_SOLD_OUT_POTION: "すべてのポーションが売り切れました。",
        BTN_SHOP_LEAVE: "ショップを出る",
        
        DECK_TITLE: "現在のデッキ",
        DECK_COUNT: "全 {count} 枚",
        DECK_EMPTY: "まだデッキにカードがありません。ショップで追加してみてください！",
        
        REST_TITLE: "⛺ 快適な休憩所 ⛺",
        REST_SUBTITLE: "燃え盛る焚き火の前で次の旅の準備をしてください。",
        REST_HEAL_TITLE: "休憩する",
        REST_HEAL_DESC: "体力を {amount} 回復します。",
        REST_FORGE_TITLE: "鍛錬する",
        REST_FORGE_DESC: "デッキのカード1枚を永久に強化します。",
        REST_CHOOSE_CARD: "強化するカードを選んでください",
        REST_NO_CARDS: "強化できるカードがありません。",
        
        ALERT_NO_GOLD: "ゴールドが足りません！",
        ALERT_POTION_FULL: "ポーションの鞄がいっぱいです！",
        ALERT_WRONG_FLOOR: "{floor}階のノードを選択する必要があります！",
        ALERT_DISCONNECTED: "前のノードと繋がっていないルートです！",
        
        TREASURE_TITLE: "💎 宝箱",
        BTN_CLAIM: "獲得する",
        BATTLE_ENEMY_HP: "❤️ 体力: {hp} / {maxHp}",
        BATTLE_ENEMY_ATTACK: "⚔️ 攻撃力: {attack}",
        BATTLE_ENEMY_DEFENSE: "🛡️ 防御力: {defense}",
        BATTLE_RESULT: "戦闘結果",
        DECK_SYNERGY: "💡 現在のデッキシナジー:",
        // 설정 팝업
        BTN_SETTINGS: "⚙️ 設定",
        SETTINGS_TITLE: "⚙️ 設定",
        SETTINGS_LANGUAGE: "言語",
        SETTINGS_LANG_KR: "한국어",
        SETTINGS_LANG_EN: "English",
        SETTINGS_LANG_JP: "日本語",
        SETTINGS_APPLY: "適用して再起動",
        SETTINGS_RELOAD_NOTICE: "言語を変更するとゲームが再起動します。"
    },

    SCENE: {
        REWARD_CHOOSE: "✨ 勝利しました！戦利品を選んでください。",
        SHOP_DESC: "役立つ品物を売っています。",
        REST_DESC: "焚き火が暖かく燃えています。どうしますか？"
    },

    LOGS: {
        MAP_START: "新しいマップが生成されました！1階の出発ノードを選んでください。",
        BATTLE_ENCOUNTER: "[{floor}階] 強力な [{enemy}] に遭遇しました！",
        BATTLE_UNKNOWN: "[{floor}階] 奇妙な霧の中に入りました。",
        BATTLE_START: "⚔️ [{enemy}] との戦闘を開始します！",
        BATTLE_POTION_EFFECT: "🔥 ポーション効果発動！この戦闘中、{stat} が {value} 増加します。",
        BATTLE_TURN_INFO: "[ターン {turn}] 倍率: {multiplier}倍 | 自分の攻撃: {curAtk}, 自分の防御: {curDef}",
        BATTLE_DAMAGE: "💥 [{enemy}] に {dmgToEnemy} のダメージ！ / 自分に {dmgToPlayer} のダメージ！",
        BATTLE_INFINITE_LOOP: "無限ループのため強制終了！",
        SHOP_BUY_CARD: "🛒 [{card}] カードを {price}G で購入しました！",
        SHOP_BUY_RELIC: "🛒 [{relic}] 遺物を {price}G で購入しました！",
        SHOP_BUY_POTION: "🛒 [{potion}] を {price}G で購入しました！",
        SHOP_REMOVE_CARD: "🧹 {price}G を支払い、[{card}] カードをデッキから削除しました。",
        REST_HEAL: "⛺ 焚き火のそばで休憩しました。体力を {amount} 回復しました。",
        REWARD_GOLD: "💰 [{enemy}] を討伐し、基本報酬 {gold} ゴールドを獲得しました。",
        REWARD_POTION: "🧪 敵の懐から偶然 [{potion}] を発見し獲得しました！",
        REWARD_POTION_FULL: "🧪 ポーションを発見しましたが、鞄がいっぱいで持てませんでした。",
        NODE_TREASURE: "💎 気分の良い予感がする宝箱を発見しました！",
        NODE_TREASURE_RELIC: "🎁 宝箱の中から [{relic}] 遺物を獲得しました！",
        NODE_TREASURE_EMPTY: "宝箱は空でした。(すでにすべての遺物を所持中)",
        NODE_SHOP: "🛒 ショップに立ち寄りました。",
        NODE_REST: "⛺ [{floor}階] 暖かい焚き火がある休憩所に到着しました。",
        NODE_UNKNOWN: "[{floor}階] ❓ 奇妙な場所に到着しました。",
        
        POTION_USE_HEAL: "🧪 [{potion}] を飲み、体力を {value} 回復しました！",
        POTION_USE_BUFF: "🧪 [{potion}] を飲みました。次の戦闘で効果が発動します。",
        
        GAME_START: "新たな冒険が始まりました！1階のノードを選んでください。",
        
        REWARD_RELIC: "🏺 [{relic}] 遺物を獲得しました！",
        REWARD_CARD: "🎁 [{card}] カードを報酬として獲得しました！",
        REWARD_SKIP: "報酬をスキップしました。",
        
        VICTORY_NORMAL: "勝利！ [{enemy}] を倒しました。",
        VICTORY_FINAL: "🎉 おめでとうございます！ [{enemy}] を打ち倒し、このダンジョンを征服しました！最終勝利！",
        GAME_OVER: "💀 [{enemy}] に圧倒され、敗北しました...",
        
        REST_UPGRADE: "🔨 焚き火で [{card}] カードを強化しました！",
        
        POTION_USE: "🧪 [{potion}] を飲みました！ ({desc})",
        
        DECK_ADD: "🃏 [{card}] カードをデッキに追加しました。",
        
        EVENT_TITLE: "❓ イベント: {title}",
        EVENT_CHOICE: "選択: {choice}",
        EVENT_LOSE_HP: "🩸 体力を {damage} 失いました！",
        EVENT_LOSE_GOLD: "💰 ゴールドを {gold} 失いました！",
        EVENT_DEATH: "💀 出血が酷く、倒れてしまいました...",
        EVENT_GET_RELIC: "💎 対価として [{relic}] 遺物を獲得しました！",
        EVENT_GET_RELIC_GOLD: "💎 施しの対価として [{relic}] 遺物を受け取りました！",
        EVENT_GET_GOLD: "💰 {gold} ゴールドを獲得しました！",
        EVENT_HEAL: "🌿 体力を {amount} 回復しました！",
        EVENT_LEAVE: "無事にその場から抜け出しました。",

        RELIC_EFFECT_HEAL: "🏺 [{relic}] 効果発動！体力を {value} 回復しました。",
        RELIC_EFFECT_GOLD: "🏺 [{relic}] 効果発動！追加ゴールド {value} 獲得。"
    },

    DATA: {
        CARDS: {
            "card_strike_01": { name: "基本攻撃" },
            "card_defend_01": { name: "強固な盾" },
            "card_poison_001": { name: "毒塗り" }
        },
        ENEMIES: {
            "enemy_goblin_01": { name: "ゴブリンの群れ" },
            "enemy_orc_01": { name: "オークの狂戦士" },
            "boss_dragon_01": { name: "火竜 (ボス)" }
        },
        CHARACTERS: {
            "char_warrior": { 
                name: "戦士", 
                description: "バランスの取れた攻防能力を持つ基本キャラクターです。" 
            }
        },
        RELICS: {
            "relic_blood": { name: "戦士の血", desc: "毎戦闘開始時、体力を5回復します。" },
            "relic_whetstone": { name: "砥石", desc: "基礎攻撃力が3増加します。" },
            "relic_golden_idol": { name: "黄金の偶像", desc: "戦闘勝利時に得るゴールドが10増加します。" },
            "relic_mercenary": { name: "傭兵の証", desc: "毎戦闘ターン、攻撃成長力が1増加します。" },
            "relic_shell": { name: "硬い甲羅", desc: "基礎防御力が5増加します。" },
            "relic_compass": { name: "魔法使いの羅針盤", desc: "デッキ展開力が2増加します。" }
        },
        POTIONS: {
            "potion_strength": { name: "力のポーション", desc: "次の戦闘中、攻撃力が5増加します。" },
            "potion_ironskin": { name: "鉄皮のポーション", desc: "次の戦闘中、防御力が5増加します。" },
            "potion_heal": { name: "治癒のポーション", desc: "即座に体力を20回復します。" }
        },
        EVENTS: {
            "event_altar": {
                title: "忘れ去られた祭壇",
                desc: "奇怪な彫像がある古い祭壇を発見しました。古い祭壇の上には誰かが残した血痕が乾いてこびりついています...",
                choices: [
                    "血を捧げる (体力15減少、ランダムな遺物を獲得)",
                    "不吉な気配を感じて引き返す"
                ]
            },
            "event_beggar": {
                title: "怪しい物乞い",
                desc: "頭巾を目深に被った物乞いが道を塞ぎます。「小銭を少し恵んでくだされ... 良いものをあげるかもしれませぬぞ？」",
                choices: [
                    "恵む (50ゴールド減少、ランダムな遺物を獲得)",
                    "無視して通り過ぎる"
                ]
            },
            "event_wagon": {
                title: "捨てられた荷馬車",
                desc: "森の道の真ん中に、商団が捨てていったと思われる壊れた荷馬車があります。使える物が残っているかもしれません。",
                choices: [
                    "馬車の中を深く探る (体力20減少、ランダムな遺物を獲得)",
                    "ポケットに転がっている小銭だけを頂く (ゴールド30獲得)",
                    "そのまま通り過ぎる"
                ]
            },
            "event_mushroom": {
                title: "怪しいキノコの群生地",
                desc: "洞窟の壁面で魅惑的な紫色の光を放つキノコを発見しました。とても美味しそうに見えます。",
                choices: [
                    "キノコをかじる (体力30回復)",
                    "キノコを採って商団に売る (ゴールド40獲得、体力10減少)",
                    "無視して通り過ぎる"
                ]
            },
            "event_checkpoint": {
                title: "通行税の要求",
                desc: "重武装した傭兵たちが道を塞いで立っています。「この区域を通るなら通行税を払え。」",
                choices: [
                    "大人しくお金を払う (40ゴールド減少)",
                    "武器を抜いて強行突破する (体力25減少)"
                ]
            }
        }
    }
} as const;
