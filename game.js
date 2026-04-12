(() => {
  const sdk = window.NajiMiniApp || null;
  const $ = (id) => document.getElementById(id);
  const ui = {
    root: $("game"),
    menuScreen: $("menuScreen"),
    lobbyScreen: $("lobbyScreen"),
    resultScreen: $("resultScreen"),
    pauseOverlay: $("pauseOverlay"),
    hud: $("hud"),
    fighterHud: $("fighterHud"),
    roomRibbon: $("roomRibbon"),
    statusBanner: $("statusBanner"),
    controlsInfo: $("controlsInfo"),
    voiceStatus: $("voiceStatus"),
    phaseValue: $("phaseValue"),
    phaseMeta: $("phaseMeta"),
    timerValue: $("timerValue"),
    timerMeta: $("timerMeta"),
    modeChip: $("modeChip"),
    roomChip: $("roomChip"),
    voiceChip: $("voiceChip"),
    playerNameLabel: $("playerNameLabel"),
    playerMetaLabel: $("playerMetaLabel"),
    skinP1Select: $("skinP1Select"),
    skinP2Select: $("skinP2Select"),
    skinP1BuyButton: $("skinP1BuyButton"),
    skinP2BuyButton: $("skinP2BuyButton"),
    mapSelect: $("mapSelect"),
    mapMeta: $("mapMeta"),
    skinStoreList: $("skinStoreList"),
    soloButton: $("soloButton"),
    quickMatchButton: $("quickMatchButton"),
    createRoomButton: $("createRoomButton"),
    spectateButton: $("spectateButton"),
    joinCodeInput: $("joinCodeInput"),
    joinRoomButton: $("joinRoomButton"),
    pauseButton: $("pauseButton"),
    leaveButton: $("leaveButton"),
    voiceButton: $("voiceButton"),
    copyCodeButton: $("copyCodeButton"),
    inviteFriendButton: $("inviteFriendButton"),
    readyButton: $("readyButton"),
    startMatchButton: $("startMatchButton"),
    roomRibbonMain: $("roomRibbonMain"),
    roomRibbonMeta: $("roomRibbonMeta"),
    lobbyTitle: $("lobbyTitle"),
    lobbyCopy: $("lobbyCopy"),
    lobbyPlayers: $("lobbyPlayers"),
    lobbyRoomCode: $("lobbyRoomCode"),
    lobbyRoomMeta: $("lobbyRoomMeta"),
    lobbyReadyButton: $("lobbyReadyButton"),
    lobbyStartButton: $("lobbyStartButton"),
    lobbyInviteButton: $("lobbyInviteButton"),
    lobbyLeaveButton: $("lobbyLeaveButton"),
    invitePanel: $("invitePanel"),
    inviteContactSelect: $("inviteContactSelect"),
    sendInviteButton: $("sendInviteButton"),
    closeInvitePanelButton: $("closeInvitePanelButton"),
    resultTitle: $("resultTitle"),
    resultCopy: $("resultCopy"),
    resultBoard: $("resultBoard"),
    rematchButton: $("rematchButton"),
    resultMenuButton: $("resultMenuButton"),
    resumeButton: $("resumeButton"),
    pauseExitButton: $("pauseExitButton"),
    touchControls: $("touchControls"),
    touchUp: $("touchUp"),
    touchDown: $("touchDown"),
    touchLeft: $("touchLeft"),
    touchRight: $("touchRight"),
    touchJump: $("touchJump"),
    touchAttack: $("touchAttack"),
    touchSpecial: $("touchSpecial")
  };

  const INVITE_COPY = {
    title: window.NAJI_SMASH_INVITE_TITLE || "Super Smash 3D",
    game: window.NAJI_SMASH_INVITE_GAME || "super-smash-3d",
    text: window.NAJI_SMASH_INVITE_TEXT || "{sender} зовёт тебя в Super Smash 3D.\nКомната: {room_code}",
    buttonText: window.NAJI_SMASH_INVITE_BUTTON_TEXT || "Присоединиться"
  };

  const COLOR_THEMES = [
    { key: "cyan", body: 0x71f6ff, accent: 0xffffff, glow: 0x71f6ff, css: "#71f6ff" },
    { key: "gold", body: 0xffd574, accent: 0xfff4dc, glow: 0xffd574, css: "#ffd574" },
    { key: "rose", body: 0xff8ea2, accent: 0xffeff3, glow: 0xff8ea2, css: "#ff8ea2" },
    { key: "violet", body: 0xa78cff, accent: 0xf1ecff, glow: 0xa78cff, css: "#a78cff" }
  ];

  const MAP_LIBRARY = {
    classic: {
      key: "classic",
      name: "Классическая",
      description: "Одна широкая сцена для чистого 1v1 без лишнего хаоса.",
      background: 0x87ceeb,
      fog: 0x87ceeb,
      bounds: { x: 31, z: 15, bottom: -24 },
      platforms: [
        { id: "main", x: 0, y: -1, z: 0, hx: 12, hz: 4.8, thickness: 2.1, bob: 0.05, color: 0x45a34a }
      ],
      spawns: [
        { x: -6.5, y: 6, z: 0 },
        { x: 6.5, y: 6, z: 0 }
      ]
    },
    battlefield: {
      key: "battlefield",
      name: "Поле боя",
      description: "Три платформы и высокий аптайм для лаунчеров, джагглов и рикавери.",
      background: 0xffaa66,
      fog: 0xffaa66,
      bounds: { x: 28, z: 18, bottom: -22 },
      platforms: [
        { id: "main", x: 0, y: 0, z: 0, hx: 11.5, hz: 6.5, thickness: 2.4, bob: 0.12, color: 0x666666 },
        { id: "left", x: -9.5, y: 5.5, z: -1.5, hx: 4.6, hz: 2.8, thickness: 1.4, bob: 0.14, color: 0xaaaaaa },
        { id: "right", x: 9.5, y: 5.5, z: 1.5, hx: 4.6, hz: 2.8, thickness: 1.4, bob: 0.14, color: 0xaaaaaa },
        { id: "top", x: 0, y: 10.4, z: 0, hx: 3.7, hz: 2.4, thickness: 1.2, bob: 0.16, color: 0xbbbbbb }
      ],
      spawns: [
        { x: -7, y: 6.5, z: 0 },
        { x: 7, y: 6.5, z: 0 }
      ]
    },
    canyon: {
      key: "canyon",
      name: "Каньон",
      description: "Разделенная сцена с опасным центром и агрессивными edge-guard ситуациями.",
      background: 0x332222,
      fog: 0x332222,
      bounds: { x: 33, z: 16, bottom: -25 },
      platforms: [
        { id: "left", x: -8.8, y: -1.3, z: 0, hx: 5.6, hz: 4.2, thickness: 2, bob: 0.05, color: 0xaa5522 },
        { id: "right", x: 8.8, y: -1.3, z: 0, hx: 5.6, hz: 4.2, thickness: 2, bob: 0.05, color: 0xaa5522 },
        { id: "center", x: 0, y: 2.2, z: 0, hx: 2.7, hz: 2.3, thickness: 1.2, bob: 0.1, color: 0xddaadd }
      ],
      spawns: [
        { x: -10, y: 5.6, z: 0 },
        { x: 10, y: 5.6, z: 0 }
      ]
    }
  };

  const SKIN_LIBRARY = {
    crimson_ninja: { key: "crimson_ninja", name: "Красный Ниндзя", body: 0xff3333, accent: 0xff9c9c, glow: 0xff4545, css: "#ff3333", priceSol: 0, rarity: "free" },
    fire_monk: { key: "fire_monk", name: "Огненный Монах", body: 0xffaa00, accent: 0xffe1a3, glow: 0xffaa00, css: "#ffaa00", priceSol: 0, rarity: "free" },
    iron_robot: { key: "iron_robot", name: "Железный Робот", body: 0xaaaaaa, accent: 0xf8f8f8, glow: 0xc8d7ff, css: "#aaaaaa", priceSol: 0, rarity: "free" },
    blue_fighter: { key: "blue_fighter", name: "Синий Боец", body: 0x3333ff, accent: 0x9eb0ff, glow: 0x6666ff, css: "#3333ff", priceSol: 0, rarity: "free" },
    neon_sprinter: { key: "neon_sprinter", name: "Неоновый Спринтер", body: 0x18a7b5, accent: 0xd8fbff, glow: 0x29f0ff, css: "#18a7b5", priceSol: 0.005, rarity: "premium" },
    quantum_fox: { key: "quantum_fox", name: "Квантовый Лис", body: 0xff5f9e, accent: 0xfff1a8, glow: 0x00f5d4, css: "#ff5f9e", priceSol: 0.005, rarity: "premium" },
    cyber_alien: { key: "cyber_alien", name: "Кибер Пришелец", body: 0x33ff33, accent: 0xdfffe0, glow: 0x55ff99, css: "#33ff33", priceSol: 0.035, rarity: "premium" },
    void_mage: { key: "void_mage", name: "Маг Пустоты", body: 0xcc00ff, accent: 0xf2b4ff, glow: 0xcc00ff, css: "#cc00ff", priceSol: 0.045, rarity: "premium" },
    solar_knight: { key: "solar_knight", name: "Солнечный Рыцарь", body: 0xffd700, accent: 0xfff4b8, glow: 0xffd700, css: "#ffd700", priceSol: 0.055, rarity: "premium" },
    frost_sentinel: { key: "frost_sentinel", name: "Ледяной Страж", body: 0x7bdfff, accent: 0xf2fcff, glow: 0x7bdfff, css: "#7bdfff", priceSol: 0.05, rarity: "premium" }
  };

  let currentStage = JSON.parse(JSON.stringify(MAP_LIBRARY.battlefield));

  const PHYSICS = {
    gravity: 34,
    friction: 16,
    groundAccel: 34,
    airAccel: 18,
    moveSpeed: 10.6,
    airSpeed: 8.4,
    jumpSpeed: 14,
    doubleJumpSpeed: 13,
    maxFall: -30,
    fighterRadius: 0.95,
    fighterHeight: 2.7,
    stockCount: 3,
    timeLimitMs: 120000,
    attackCooldown: 0.42,
    specialCooldown: 1.3,
    respawnDelay: 1.5,
    respawnInvuln: 1.8,
    snapshotIntervalMs: 25,
    inputIntervalMs: 16,
    inputKeepaliveMs: 66,
    hudIntervalMs: 80,
    snapshotRenderDelayMs: 78,
    snapshotMaxBufferMs: 650,
    snapshotMaxExtrapolateMs: 120,
    remoteActionHoldMs: 88,
    remoteInputTimeoutMs: 260,
    predictionSnapDistance: 9.5,
    predictionSoftDistance: 2.8
  };

  const MOVE_LIBRARY = {
    jab1: {
      key: "jab1",
      label: "Jab",
      input: "attack",
      hitShape: "front",
      startup: 0.05,
      active: 0.1,
      recovery: 0.16,
      cooldown: 0.18,
      damage: 6.5,
      knockback: 6.4,
      scaling: 0.04,
      vertical: 4.6,
      verticalScale: 0.018,
      distance: 3.1,
      height: 3,
      forwardBoost: 1.8,
      lunge: 2.8,
      control: 0.44,
      stun: 0.18,
      comboStep: 1,
      comboWindow: 0.46,
      effect: "slash"
    },
    jab2: {
      key: "jab2",
      label: "Cross Slash",
      input: "attack",
      hitShape: "front",
      startup: 0.07,
      active: 0.12,
      recovery: 0.2,
      cooldown: 0.24,
      damage: 10.5,
      knockback: 10.8,
      scaling: 0.058,
      vertical: 7.5,
      verticalScale: 0.024,
      distance: 3.7,
      height: 3.4,
      forwardBoost: 3.2,
      lunge: 4.4,
      control: 0.28,
      stun: 0.26,
      comboStep: 0,
      comboWindow: 0,
      effect: "slash-wide"
    },
    upLauncher: {
      key: "upLauncher",
      label: "Sky Upper",
      input: "attack",
      hitShape: "up",
      startup: 0.07,
      active: 0.12,
      recovery: 0.21,
      cooldown: 0.26,
      damage: 9,
      knockback: 7.4,
      scaling: 0.048,
      vertical: 14.2,
      verticalScale: 0.03,
      distance: 3.4,
      height: 5.6,
      forwardBoost: 1.2,
      lunge: 1.6,
      control: 0.18,
      stun: 0.22,
      comboStep: 0,
      comboWindow: 0,
      effect: "upper"
    },
    lowSweep: {
      key: "lowSweep",
      label: "Low Sweep",
      input: "attack",
      hitShape: "low",
      startup: 0.06,
      active: 0.13,
      recovery: 0.22,
      cooldown: 0.28,
      damage: 8.5,
      knockback: 8.6,
      scaling: 0.05,
      vertical: 3.6,
      verticalScale: 0.014,
      distance: 3.8,
      height: 2.1,
      forwardBoost: 2.3,
      lunge: 3.4,
      control: 0.22,
      stun: 0.22,
      comboStep: 0,
      comboWindow: 0,
      effect: "sweep"
    },
    airSlash: {
      key: "airSlash",
      label: "Air Slash",
      input: "attack",
      hitShape: "front",
      requiresAir: true,
      startup: 0.05,
      active: 0.13,
      recovery: 0.18,
      cooldown: 0.24,
      damage: 8,
      knockback: 7.6,
      scaling: 0.048,
      vertical: 6.2,
      verticalScale: 0.02,
      distance: 3.5,
      height: 3.2,
      forwardBoost: 2.4,
      lunge: 2.5,
      lungeY: 0.8,
      control: 0.22,
      stun: 0.2,
      comboStep: 0,
      comboWindow: 0,
      effect: "air"
    },
    dashBurst: {
      key: "dashBurst",
      label: "Burst Dash",
      input: "special",
      hitShape: "front",
      startup: 0.11,
      active: 0.2,
      recovery: 0.28,
      cooldown: 1.05,
      damage: 14.5,
      knockback: 12.6,
      scaling: 0.074,
      vertical: 6.6,
      verticalScale: 0.02,
      distance: 4.8,
      height: 3.4,
      forwardBoost: 4.4,
      lunge: 11.4,
      control: 0.08,
      stun: 0.34,
      comboStep: 0,
      comboWindow: 0,
      effect: "burst"
    },
    risingUppercut: {
      key: "risingUppercut",
      label: "Star Rise",
      input: "special",
      hitShape: "up",
      startup: 0.08,
      active: 0.2,
      recovery: 0.3,
      cooldown: 1.12,
      damage: 13.5,
      knockback: 10.2,
      scaling: 0.066,
      vertical: 16,
      verticalScale: 0.03,
      distance: 3.4,
      height: 6.8,
      forwardBoost: 1.4,
      lunge: 1.6,
      lungeY: 16.8,
      control: 0.06,
      stun: 0.34,
      comboStep: 0,
      comboWindow: 0,
      effect: "upper"
    },
    shockPulse: {
      key: "shockPulse",
      label: "Shock Pulse",
      input: "special",
      hitShape: "radial",
      requiresGround: true,
      startup: 0.12,
      active: 0.17,
      recovery: 0.34,
      cooldown: 1.24,
      damage: 16.5,
      knockback: 11.8,
      scaling: 0.08,
      vertical: 8.2,
      verticalScale: 0.024,
      distance: 4.2,
      height: 4,
      forwardBoost: 0,
      lunge: 0,
      control: 0.04,
      stun: 0.4,
      comboStep: 0,
      comboWindow: 0,
      effect: "pulse"
    },
    meteorDive: {
      key: "meteorDive",
      label: "Meteor Dive",
      input: "special",
      hitShape: "down",
      requiresAir: true,
      startup: 0.07,
      active: 0.22,
      recovery: 0.32,
      cooldown: 1.16,
      damage: 15.2,
      knockback: 10.6,
      scaling: 0.07,
      vertical: -10.5,
      verticalScale: -0.018,
      distance: 3.2,
      height: 4.6,
      forwardBoost: 2.2,
      lunge: 4.2,
      lungeY: -18.6,
      control: 0.03,
      stun: 0.36,
      comboStep: 0,
      comboWindow: 0,
      effect: "dive"
    }
  };

  const INPUT_KEYS = ["left", "right", "up", "down", "jump", "attack", "special"];
  const GAMEPAD_DEADZONE = 0.32;
  const MOBILE_QUERY = window.matchMedia("(max-width: 900px)");

  const createInputState = () => ({
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    attack: false,
    special: false
  });

  const encodeInputMask = (input = {}) => INPUT_KEYS.reduce((mask, key, index) => (
    input[key] ? mask | (1 << index) : mask
  ), 0);

  const decodeInputMask = (maskValue) => {
    const mask = Number(maskValue || 0);
    const input = createInputState();
    INPUT_KEYS.forEach((key, index) => {
      input[key] = Boolean(mask & (1 << index));
    });
    return input;
  };

  const netNumber = (value, precision = 100) => {
    const numeric = Number(value || 0);
    if (!Number.isFinite(numeric)) return 0;
    return Math.round(numeric * precision) / precision;
  };

  const state = {
    phase: "menu",
    mode: "solo",
    isPaused: false,
    orientation: "portrait",
    localPlayerId: `guest_${Date.now().toString(36)}`,
    localPlayerName: "Guest",
    isMiniApp: Boolean(sdk),
    embeddedHost: typeof window !== "undefined" ? window.parent !== window : false,
    sdkReady: false,
    multiplayerSupported: Boolean(sdk?.multiplayer),
    currentRoom: null,
    currentQueue: null,
    voiceState: null,
    voiceConnected: false,
    voiceMuted: false,
    voiceConnecting: false,
    botUsername: null,
    autoVoiceRequested: false,
    invitePanelOpen: false,
    inviteContactsLoaded: false,
    inviteContactsLoading: false,
    inviteContacts: [],
    inviteJoinInProgress: false,
    localMode: "local",
    selectedMapId: "battlefield",
    selectedSkins: {
      p1: "crimson_ninja",
      p2: "blue_fighter"
    },
    ownedSkins: new Set(["crimson_ninja", "fire_monk", "iron_robot", "blue_fighter"]),
    localReady: false,
    quickMatchArmed: false,
    lastStatusTimeout: null,
    inputSources: {
      p1: {
        keyboard: createInputState(),
        touch: createInputState(),
        gamepad: createInputState()
      },
      p2: {
        keyboard: createInputState(),
        touch: createInputState(),
        gamepad: createInputState()
      }
    },
    input: createInputState(),
    inputByControl: {
      p1: createInputState(),
      p2: createInputState()
    }
  };

  const net = {
    roomState: null,
    isHost: false,
    inputSignature: "",
    inputBurstSignature: "",
    inputBurstUntil: 0,
    localInputSeq: 0,
    lastServerInputSeq: 0,
    lastInputSentAt: 0,
    lastSnapshotSentAt: 0,
    lastHudSyncAt: 0,
    autoStartTimer: null,
    snapshotSeq: 0,
    lastSnapshotSeq: 0,
    snapshotBuffer: [],
    serverTimeOffsetMs: null,
    lastSnapshotReceivedAt: 0,
    remoteInputs: new Map()
  };

  const match = {
    active: false,
    authoritative: false,
    practice: false,
    roomId: null,
    matchId: null,
    startedAt: 0,
    elapsedMs: 0,
    timeLimitMs: PHYSICS.timeLimitMs,
    ended: false,
    fighters: new Map(),
    winnerId: null,
    summary: []
  };

  const world = {
    platformMeshes: [],
    fighterVisuals: new Map(),
    background: { rings: [], crystals: [], sparkles: null },
    ambientLight: null,
    sunLight: null,
    stageCore: null
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07101e);
  scene.fog = new THREE.FogExp2(0x091326, 0.018);
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 800);
  camera.position.set(0, 14, 28);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute("role", "application");
  renderer.domElement.setAttribute("aria-label", "Super Smash 3D game viewport");
  ui.root.appendChild(renderer.domElement);

  const clock = new THREE.Clock();
  let accumulator = 0;
  const FIXED_STEP = 1 / 60;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (from, to, factor) => lerp(from, to, clamp(factor, 0, 1));
  const distance2D = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);
  const signOr = (value, fallback) => (Math.abs(value) > 0.01 ? Math.sign(value) : fallback);
  const formatTime = (ms) => {
    if (!Number.isFinite(ms) || ms <= 0) return "00:00";
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const formatDamage = (value) => `${Math.max(0, Math.round(value || 0))}%`;
  const roomIdOf = (room) => room?.roomId || room?.room_id || null;
  const roomCodeOf = (room) => room?.roomCode || room?.room_code || null;
  const hostIdOf = (room) => room?.hostId || room?.host_id || null;
  const roomPlayersOf = (room) => Array.isArray(room?.players) ? room.players : [];
  const playerIdOf = (player) => player?.playerId || player?.player_id || player?.username || null;

  function focusGameViewport() {
    try { window.focus(); } catch {}
    try {
      renderer.domElement.focus({ preventScroll: true });
    } catch {
      try { renderer.domElement.focus(); } catch {}
    }
  }

  function resetKeyboardInput() {
    state.inputSources.p1.keyboard = createInputState();
    state.inputSources.p2.keyboard = createInputState();
    if (state.mode === "room" || state.mode === "quick") {
      sendLocalInputNow(true);
    }
  }
  const playerNameOf = (player) => player?.name || player?.username || "Боец";
  const isPlayerReady = (player) => Boolean(player?.state?.ready);
  const getTheme = (index) => COLOR_THEMES[((index % COLOR_THEMES.length) + COLOR_THEMES.length) % COLOR_THEMES.length];
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
  const isPrimaryLocalFighter = (fighter) => Boolean(fighter && (fighter.controlSlot === "p1" || fighter.playerId === state.localPlayerId));
  const isSecondaryLocalFighter = (fighter) => Boolean(fighter && fighter.controlSlot === "p2" && state.localMode === "local");
  const getModeLabel = () => {
    if (state.mode === "practice") return "Тренировка";
    if (state.mode === "quick") return "Онлайн";
    if (state.mode === "room") return "Комната";
    if (state.mode === "local") return "Локальная 1v1";
    return "Схватка";
  };
  const getPlayerTag = (fighter) => {
    if (!fighter) return "";
    if (state.localMode === "local") {
      return fighter.controlSlot === "p1" ? "P1" : fighter.controlSlot === "p2" ? "P2" : "";
    }
    return isPrimaryLocalFighter(fighter) ? "ТЫ" : "СОП";
  };
  const getMiniAppRealtimeUnavailableReason = () => {
    if (!sdk) {
      return "Mini App SDK недоступен. Для комнат открой игру внутри мессенджера.";
    }
    if (!state.embeddedHost) {
      return "Комнаты работают только внутри встроенного Mini App окна, а не в отдельной вкладке.";
    }
    if (!state.sdkReady) {
      return "Mini App bridge еще не инициализировался. Подожди пару секунд и попробуй снова.";
    }
    if (!sdk?.multiplayer) {
      return "Realtime bridge недоступен для этой сессии Mini App.";
    }
    if (sdk.multiplayer.state && sdk.multiplayer.state.supported === false) {
      return "Подключение к лобби еще устанавливается. Подожди пару секунд и попробуй снова.";
    }
    if (!state.botUsername) {
      return "Игра должна быть открыта как Mini App конкретного бота, иначе комнаты недоступны.";
    }
    return "";
  };
  const getLocalRoomPlayer = (room) => {
    const localId = String(state.localPlayerId || "").trim();
    if (!localId) return null;
    return roomPlayersOf(room).find((player) => {
      const playerId = String(playerIdOf(player) || "").trim();
      const username = String(player?.username || "").trim();
      return playerId === localId || username === localId;
    }) || null;
  };
  const isLocalRoomHost = (room) => {
    const localPlayer = getLocalRoomPlayer(room);
    if (localPlayer?.isHost || localPlayer?.is_host) return true;
    const hostId = String(hostIdOf(room) || "").trim();
    const localId = String(state.localPlayerId || "").trim();
    const localUsername = String(localPlayer?.username || "").trim();
    return Boolean(hostId && (hostId === localId || hostId === localUsername));
  };
  const cloneMapConfig = (mapId) => JSON.parse(JSON.stringify(MAP_LIBRARY[mapId] || MAP_LIBRARY.battlefield));
  const getSkinConfig = (skinKey, fallbackIndex = 0) => {
    const direct = SKIN_LIBRARY[skinKey];
    if (direct) return direct;
    const theme = getTheme(fallbackIndex);
    return {
      key: theme.key,
      name: theme.key,
      body: theme.body,
      accent: theme.accent,
      glow: theme.glow,
      css: theme.css,
      priceSol: 0,
      rarity: "free"
    };
  };
  const isSkinOwned = (skinKey) => {
    const skin = SKIN_LIBRARY[skinKey];
    if (!skin) return false;
    return skin.priceSol <= 0 || state.ownedSkins.has(skinKey);
  };
  const normalizeSelectedSkin = (slot) => {
    const current = state.selectedSkins[slot];
    if (isSkinOwned(current)) return current;
    const fallback = slot === "p2" ? "blue_fighter" : "crimson_ninja";
    state.selectedSkins[slot] = fallback;
    return fallback;
  };
  const buildRoomPlayerState = (ready = true) => ({
    ready: Boolean(ready),
    skinKey: normalizeSelectedSkin("p1"),
    mapId: state.selectedMapId,
    mode: state.mode,
    playerName: state.localPlayerName
  });
  const getMoveConfig = (moveKey) => MOVE_LIBRARY[moveKey] || null;
  const formatCooldown = (value) => value > 0.05 ? `${value.toFixed(1)}s` : "готово";
  const getFighterMoveStatus = (fighter) => {
    const currentMove = getMoveConfig(fighter.currentMoveKey);
    if (currentMove) {
      const phase = fighter.movePhase === "startup"
        ? "размах"
        : fighter.movePhase === "active"
          ? "удар"
          : fighter.movePhase === "recovery"
            ? "откат"
            : "движение";
      return `${currentMove.label} · ${phase}`;
    }
    if (fighter.respawnTimer > 0) return "Респавн";
    if (fighter.stunTimer > 0.05) return "Стан";
    if (fighter.specialCooldown > 0.05) return `Special ${formatCooldown(fighter.specialCooldown)}`;
    if (fighter.attackCooldown > 0.05) return `Атака ${formatCooldown(fighter.attackCooldown)}`;
    return "Готов к удару";
  };

  function setStatus(message, tone = "info", duration = 2600) {
    if (!message) {
      ui.statusBanner.classList.add("hidden");
      ui.statusBanner.textContent = "";
      return;
    }
    ui.statusBanner.classList.remove("hidden");
    ui.statusBanner.innerHTML = `<span class="status-strong">${tone === "danger" ? "Внимание:" : tone === "success" ? "Готово:" : "Статус:"}</span> ${escapeHtml(message)}`;
    if (state.lastStatusTimeout) clearTimeout(state.lastStatusTimeout);
    if (duration > 0) {
      state.lastStatusTimeout = setTimeout(() => ui.statusBanner.classList.add("hidden"), duration);
    }
  }

  function renderControlsInfo() {
    if (!ui.controlsInfo) return;
    ui.controlsInfo.innerHTML = [
      "<b>ИГРОК 1:</b> A D движение, W launcher/up, S down, Space jump, F attack, G special",
      "<b>ИГРОК 2:</b> ← → движение, ↑ launcher/up, ↓ down, Right Shift jump, Enter attack, / special"
    ].join("<br>");
    ui.controlsInfo.classList.toggle("hidden", !(state.phase === "match" || state.phase === "menu" || state.phase === "lobby"));
  }

  function renderVoiceStatus() {
    if (!ui.voiceStatus) return;
    const visible = state.mode === "quick" || state.mode === "room" || state.voiceConnected;
    ui.voiceStatus.classList.toggle("hidden", !visible);
    if (!visible) return;
    if (state.voiceConnected) {
      const participants = state.voiceState?.participants?.length || 1;
      ui.voiceStatus.textContent = state.voiceMuted
        ? `Голос: выключен (${participants})`
        : `Голос: подключен (${participants})`;
      ui.voiceStatus.style.color = "#86ffc8";
      ui.voiceStatus.style.borderColor = "rgba(117, 240, 182, 0.28)";
      ui.voiceStatus.style.background = "rgba(4, 24, 12, 0.72)";
      return;
    }
    ui.voiceStatus.textContent = state.voiceConnecting ? "Голос: подключение..." : "Голос: офлайн";
    ui.voiceStatus.style.color = "#ffd574";
    ui.voiceStatus.style.borderColor = "rgba(255, 213, 116, 0.24)";
    ui.voiceStatus.style.background = "rgba(36, 22, 0, 0.72)";
  }

  function setPhase(nextPhase) {
    state.phase = nextPhase;
    ui.menuScreen.classList.toggle("hidden", nextPhase !== "menu");
    ui.lobbyScreen.classList.toggle("hidden", nextPhase !== "lobby");
    ui.resultScreen.classList.toggle("hidden", nextPhase !== "result");
    ui.pauseOverlay.classList.toggle("hidden", nextPhase !== "pause");
    const inBattle = nextPhase === "match";
    ui.hud.classList.toggle("hidden", !inBattle);
    ui.fighterHud.classList.toggle("hidden", !inBattle);
    ui.touchControls.classList.toggle("hidden", !inBattle || !MOBILE_QUERY.matches);
    ui.roomRibbon.classList.toggle("hidden", !(state.currentRoom && (nextPhase === "lobby" || nextPhase === "match")));
    renderControlsInfo();
    renderVoiceStatus();
    updateHud();
  }

  function forceHideLobbyOverlaysForMatch() {
    ui.menuScreen.classList.add("hidden");
    ui.lobbyScreen.classList.add("hidden");
    ui.resultScreen.classList.add("hidden");
    ui.pauseOverlay.classList.add("hidden");
    ui.hud.classList.remove("hidden");
    ui.fighterHud.classList.remove("hidden");
    ui.touchControls.classList.toggle("hidden", !MOBILE_QUERY.matches);
  }

  function syncMatchHud(force = false) {
    const nowMs = performance.now();
    if (!force && nowMs - net.lastHudSyncAt < PHYSICS.hudIntervalMs) return;
    net.lastHudSyncAt = nowMs;
    renderFighterHud();
    updateHud();
  }

  function updateHud() {
    const room = state.currentRoom;
    const remainingMs = match.active ? Math.max(0, match.timeLimitMs - match.elapsedMs) : match.timeLimitMs;
    const roomCode = roomCodeOf(room);
    const players = roomPlayersOf(room);
    const isHost = isLocalRoomHost(room);
    const startDisabledReason = !room
      ? "Сначала создай комнату или войди в неё."
      : !isHost
        ? "Матч может запустить только хост комнаты."
        : players.length < 2
          ? "Нужны минимум два игрока в комнате."
          : players.some((player) => !isPlayerReady(player))
            ? "Все игроки должны нажать Ready."
            : "Комната готова к старту.";
    const phaseTitle = match.active
      ? (match.ended ? "Матч завершен" : "Бой идет")
      : state.phase === "lobby"
        ? "Лобби"
        : "Меню";
    const phaseMeta = match.active
      ? (match.authoritative ? "Ты хостишь симуляцию матча" : "Получаем снапшоты хоста")
      : state.mode === "practice"
        ? "Свободная тренировка без таймера"
        : state.mode === "quick"
          ? "Поиск соперника через матчмейкинг"
          : state.mode === "room"
            ? "Приватная комната для 1v1"
            : state.mode === "local"
              ? "Локальный versus на одном устройстве"
              : "Подготовка к схватке";
    ui.phaseValue.textContent = phaseTitle;
    ui.phaseMeta.textContent = phaseMeta;
    ui.timerValue.textContent = match.timeLimitMs > 0 ? formatTime(remainingMs) : "FREE";
    ui.timerMeta.textContent = match.ended ? "Раунд закончен" : state.isPaused ? "Пауза" : match.active ? "Выбей соперника за границы арены" : "Ждем старт";
    ui.modeChip.textContent = getModeLabel();
    ui.roomChip.textContent = roomCode ? `Комната ${roomCode}` : "Без комнаты";
    ui.voiceChip.textContent = state.voiceConnected ? (state.voiceMuted ? "Голос выкл" : `Голос ${state.voiceState?.participants?.length || 1}`) : "Голос выкл";
    ui.voiceButton.textContent = state.voiceConnected ? (state.voiceMuted ? "Включить микрофон" : "Выйти из голоса") : "Голос";
    ui.pauseButton.textContent = state.isPaused ? "Продолжить" : "Пауза";
    ui.pauseButton.disabled = !match.active || state.mode === "quick" || state.mode === "room";
    ui.startMatchButton.disabled = !room || !isHost || players.length < 2 || players.some((player) => !isPlayerReady(player));
    ui.lobbyStartButton.disabled = ui.startMatchButton.disabled;
    const canOpenInvitePicker = Boolean(sdk?.contacts?.inviteRoom || sdk?.contacts?.share || sdk?.contacts?.invite);
    if (ui.inviteFriendButton) ui.inviteFriendButton.disabled = match.active || !room || !roomCode || !canOpenInvitePicker;
    if (ui.lobbyInviteButton) ui.lobbyInviteButton.disabled = match.active || !room || !roomCode || !canOpenInvitePicker;
    ui.startMatchButton.title = startDisabledReason;
    ui.lobbyStartButton.title = startDisabledReason;
    ui.readyButton.textContent = state.localReady ? "Готов" : "Ready";
    ui.lobbyReadyButton.textContent = state.localReady ? "Снять готовность" : "Готов";
    ui.roomRibbonMain.textContent = roomCode ? roomCode : "WAITING";
    ui.roomRibbonMeta.textContent = room
      ? `${players.length} бойца в комнате${isHost ? " • ты хост" : ""}`
      : state.currentQueue
        ? `Очередь ${state.currentQueue.queueKey || state.currentQueue.queue_key || "default"}`
        : "Создай комнату или жми Quick Match";
    renderVoiceStatus();
  }

  function renderInvitePanel() {
    if (!ui.invitePanel || !ui.inviteContactSelect) return;
    ui.invitePanel.classList.toggle("hidden", !state.invitePanelOpen);
    if (!state.invitePanelOpen) return;

    ui.inviteContactSelect.innerHTML = "";
    if (state.inviteContactsLoading) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Загружаю контакты...";
      ui.inviteContactSelect.appendChild(option);
      return;
    }

    const contacts = Array.isArray(state.inviteContacts) ? state.inviteContacts : [];
    if (!contacts.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Нет доступных контактов";
      ui.inviteContactSelect.appendChild(option);
      return;
    }

    contacts.forEach((contact) => {
      const username = String(contact?.username || contact?.id || "").trim();
      if (!username) return;
      const option = document.createElement("option");
      option.value = username;
      option.textContent = `${contact?.name || username} (@${username})`;
      ui.inviteContactSelect.appendChild(option);
    });
  }

  function renderLobby() {
    const room = state.currentRoom;
    const players = roomPlayersOf(room);
    const roomCode = roomCodeOf(room);
    const mapName = MAP_LIBRARY[state.selectedMapId]?.name || "Арена";
    ui.lobbyTitle.textContent = state.mode === "quick" ? "Комната матчмейкинга готова" : roomCode ? `Комната ${roomCode}` : "Подготовка матча";
    ui.lobbyCopy.textContent = state.currentQueue && !room ? "Ищем других игроков. Когда комната соберётся, хост запустит бой вручную." : net.isHost ? "Ты хост. Дождись Ready от обоих игроков и запускай бой." : "Жди запуска от хоста и отмечайся Ready перед стартом.";
    ui.lobbyRoomCode.textContent = roomCode ? `ROOM ${roomCode}` : "QUEUE";
    ui.lobbyRoomMeta.textContent = room
      ? `${players.length} бойца • арена ${mapName} • хост ${playerNameOf(players.find((player) => playerIdOf(player) === hostIdOf(room)) || players[0])}`
      : "Ждем комнату от матчмейкинга";
    renderInvitePanel();
    ui.lobbyPlayers.innerHTML = "";
    if (!players.length) {
      const row = document.createElement("div");
      row.className = "feature";
      row.innerHTML = "<strong>Ожидание игроков</strong><span>Quick Match соберет комнату автоматически.</span>";
      ui.lobbyPlayers.appendChild(row);
      return;
    }
    players.forEach((player, index) => {
      const element = document.createElement("div");
      const playerId = playerIdOf(player);
      const isLocal = playerId === state.localPlayerId;
      const isHost = Boolean(player?.isHost || player?.is_host || playerId === hostIdOf(room) || player?.username === hostIdOf(room));
      const skinKey = player?.state?.skinKey || player?.state?.skin_key || (index === 0 ? "crimson_ninja" : "blue_fighter");
      const skinName = SKIN_LIBRARY[skinKey]?.name || "Стандарт";
      element.className = "lobby-player";
      element.innerHTML = `
        <div class="lobby-player-main">
          <div class="lobby-player-name">${escapeHtml(playerNameOf(player))}${isLocal ? " (ты)" : ""}</div>
          <div class="lobby-player-meta">${isHost ? "Host" : "Player"} · ${escapeHtml(skinName)} · слот ${index + 1}</div>
        </div>
        <div class="pill ${isPlayerReady(player) ? "success" : isHost ? "warning" : ""}">
          ${isPlayerReady(player) ? "READY" : isHost ? "HOST" : "WAIT"}
        </div>
      `;
      ui.lobbyPlayers.appendChild(element);
    });
  }

  function renderResultBoard() {
    ui.resultBoard.innerHTML = "";
    (match.summary || []).forEach((entry, index) => {
      const row = document.createElement("div");
      row.className = "result-row";
      const fighter = match.fighters.get(entry.playerId);
      const suffix = state.localMode === "local"
        ? fighter?.controlSlot === "p1"
          ? " (P1)"
          : fighter?.controlSlot === "p2"
            ? " (P2)"
            : ""
        : entry.playerId === state.localPlayerId
          ? " (ты)"
          : "";
      row.innerHTML = `<span>${index + 1}. ${escapeHtml(entry.name)}${suffix}</span><span>${entry.stocks} stocks · ${entry.kos} KO · ${entry.damage}%</span>`;
      ui.resultBoard.appendChild(row);
    });
  }

  function renderFighterHud() {
    const fighters = Array.from(match.fighters.values()).sort((left, right) => {
      const leftLocal = isPrimaryLocalFighter(left) ? -2 : isSecondaryLocalFighter(left) ? -1 : 0;
      const rightLocal = isPrimaryLocalFighter(right) ? -2 : isSecondaryLocalFighter(right) ? -1 : 0;
      if (leftLocal !== rightLocal) return leftLocal - rightLocal;
      return right.stocks - left.stocks || right.koCount - left.koCount || left.damage - right.damage;
    });
    ui.fighterHud.innerHTML = "";
    fighters.forEach((fighter) => {
      const card = document.createElement("div");
      const isPrimary = isPrimaryLocalFighter(fighter);
      const meta = fighter.currentMoveKey
        ? getFighterMoveStatus(fighter)
        : fighter.specialCooldown > 0.05
          ? `Special ${formatCooldown(fighter.specialCooldown)}`
          : "Jab, launcher, sweep, special";
      const stocks = Array.from({ length: PHYSICS.stockCount }, (_, index) => `
        <span class="fighter-stock-dot${index < Math.max(0, fighter.stocks) ? " alive" : ""}" style="--stock-color:${fighter.theme.css};"></span>
      `).join("");
      card.innerHTML = `
        <div class="fighter-card-header${isPrimary ? " local" : ""}">
          <div>
            <div class="fighter-name">
              <span class="fighter-swatch" style="background:${fighter.theme.css}; margin-right:8px;"></span>
              ${escapeHtml(fighter.name)}
            </div>
            <div class="fighter-meta">${escapeHtml(SKIN_LIBRARY[fighter.skinKey]?.name || fighter.theme.name || "Скин бойца")}</div>
          </div>
          <div class="pill ${fighter.specialCooldown <= 0.05 && fighter.attackCooldown <= 0.05 ? "success" : ""}">
            ${getPlayerTag(fighter)}
          </div>
        </div>
        <div class="fighter-stats">
          <div class="fighter-stat">
            <strong style="color:${fighter.damage >= 120 ? "#ff6464" : fighter.damage >= 60 ? "#ffd574" : "#ffffff"}">${formatDamage(fighter.damage)}</strong>
            <span>Урон</span>
          </div>
          <div class="fighter-stat">
            <div class="fighter-stock-row">${stocks}</div>
            <span>Стоки</span>
          </div>
          <div class="fighter-stat">
            <strong>${fighter.koCount}</strong>
            <span>KO</span>
          </div>
        </div>
        <div class="fighter-meta" style="margin-top:10px;">${escapeHtml(meta)}</div>
      `;
      card.className = `fighter-card panel${isPrimary ? " local" : ""}`;
      ui.fighterHud.appendChild(card);
    });
  }

  async function copyText(text) {
    const value = String(text || "").trim();
    if (!value) return false;
    try {
      if (sdk?.ui?.copy) {
        await sdk.ui.copy(value);
        return true;
      }
    } catch {}
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {}
    return false;
  }

  function getCleanMiniAppUrlForInvite() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("__naji_parent_origin");
      url.searchParams.delete("naji_room_invite");
      return url.toString();
    } catch {
      return window.location.href;
    }
  }

  function buildRoomInvitePayload(room) {
    const roomCode = roomCodeOf(room);
    return {
      bot_username: state.botUsername,
      room_id: roomIdOf(room),
      room_code: roomCode,
      app_url: getCleanMiniAppUrlForInvite(),
      title: INVITE_COPY.title,
      game: INVITE_COPY.game,
      text: INVITE_COPY.text,
      invite_text: INVITE_COPY.text,
      message_text: INVITE_COPY.text,
      button_text: INVITE_COPY.buttonText,
      buttonText: INVITE_COPY.buttonText
    };
  }

  async function loadInviteContacts() {
    if (state.inviteContactsLoaded || state.inviteContactsLoading) return;
    state.inviteContactsLoading = true;
    renderInvitePanel();
    state.inviteContacts = [];
    state.inviteContactsLoaded = true;
    state.inviteContactsLoading = false;
    renderInvitePanel();
  }

  async function openInvitePanel() {
    if (match.active && !match.ended) {
      setStatus("Приглашать удобнее из лобби: заверши раунд или вернись в комнату.", "info", 4200);
      return;
    }
    if (!state.currentRoom || !roomCodeOf(state.currentRoom)) {
      setStatus("Сначала создай комнату, чтобы пригласить друга.", "danger", 4200);
      return;
    }
    state.invitePanelOpen = false;
    setPhase("lobby");
    renderInvitePanel();
    const room = state.currentRoom;
    const roomCode = roomCodeOf(room);
    const invitePayload = buildRoomInvitePayload(room);
    const inviteMethod = sdk?.contacts?.inviteRoom || sdk?.contacts?.share || sdk?.contacts?.invite;
    if (!inviteMethod) {
      const copied = await copyText(roomCode);
      setStatus(copied ? `Код комнаты ${roomCode} скопирован.` : `Код комнаты: ${roomCode}`, "info", 5200);
      return;
    }
    try {
      setStatus("Выбери контакт в Najime, чтобы отправить приглашение.", "info", 0);
      const result = await inviteMethod.call(sdk.contacts, invitePayload);
      console.debug("[SuperSmash3D] Invite sent:", {
        customTextApplied: result?.customTextApplied,
        messageText: result?.messageText,
        buttonText: result?.buttonText
      });
      const username = result?.recipient?.username || result?.recipient_username || "";
      setStatus(username ? `Приглашение отправлено @${username}.` : "Приглашение отправлено.", "success", 3800);
    } catch (error) {
      const message = String(error?.message || error || "");
      if (/cancel/i.test(message) || /отмен/i.test(message)) {
        setStatus("Приглашение отменено.", "info", 2600);
        return;
      }
      console.warn("[SuperSmash3D] Failed to send invite:", error);
      setStatus(message || "Не удалось отправить приглашение.", "danger", 5200);
    }
  }

  function closeInvitePanel() {
    state.invitePanelOpen = false;
    renderInvitePanel();
  }

  async function sendInviteToSelectedContact() {
    const room = state.currentRoom;
    const recipient = String(ui.inviteContactSelect?.value || "").trim();
    const roomId = roomIdOf(room);
    const roomCode = roomCodeOf(room);
    if (!room || !roomCode) {
      setStatus("Комната еще не готова для приглашений.", "danger", 4200);
      return;
    }
    if (!recipient) {
      setStatus("Выбери контакт для приглашения.", "danger", 3200);
      return;
    }
    if (!sdk?.api?.request || !state.botUsername) {
      setStatus("Приглашения доступны только внутри Mini App.", "danger", 4200);
      return;
    }
    try {
      if (ui.sendInviteButton) ui.sendInviteButton.disabled = true;
      setStatus(`Отправляю приглашение @${recipient}...`, "info", 0);
      await sdk.api.request("/api/miniapp/room-invite", {
        method: "POST",
        body: {
          ...buildRoomInvitePayload(room),
          recipient_username: recipient,
          room_id: roomId,
          room_code: roomCode
        }
      });
      setStatus(`Приглашение отправлено @${recipient}.`, "success", 3600);
      closeInvitePanel();
    } catch (error) {
      console.warn("[SuperSmash3D] Failed to send invite:", error);
      setStatus(error?.message || "Не удалось отправить приглашение.", "danger", 5200);
    } finally {
      if (ui.sendInviteButton) ui.sendInviteButton.disabled = false;
    }
  }

  function decodeBase64UrlJson(value) {
    try {
      const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
      const binary = atob(padded);
      const jsonText = decodeURIComponent(Array.from(binary, (char) => (
        `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`
      )).join(""));
      return JSON.parse(jsonText);
    } catch {
      return null;
    }
  }

  function parseInvitePayload(rawValue) {
    if (!rawValue) return null;
    if (typeof rawValue === "object") {
      const nested = rawValue.startParams || rawValue.launchParams || rawValue.start_param || rawValue.invite || null;
      const payload = nested && nested !== rawValue ? parseInvitePayload(nested) : rawValue;
      const roomId = payload.roomId || payload.room_id || null;
      const roomCode = payload.roomCode || payload.room_code || null;
      if (!roomId && !roomCode) return null;
      return {
        type: payload.type || "miniapp_room_invite",
        game: payload.game || "super-smash-3d",
        title: payload.title || "Super Smash 3D",
        botUsername: payload.botUsername || payload.bot_username || null,
        roomId,
        roomCode: roomCode ? String(roomCode).trim().toUpperCase() : null,
        hostName: payload.hostName || payload.host_name || payload.host_username || null
      };
    }
    if (typeof rawValue === "string") {
      const trimmed = rawValue.trim();
      if (!trimmed) return null;
      try {
        return parseInvitePayload(JSON.parse(trimmed));
      } catch {}
      return parseInvitePayload(decodeBase64UrlJson(trimmed));
    }
    return null;
  }

  function extractLaunchRoomInvite(initData = {}) {
    let urlInvite = null;
    try {
      const params = new URLSearchParams(window.location.search);
      urlInvite = params.get("naji_room_invite") || params.get("room_invite") || null;
    } catch {}
    const candidates = [
      initData?.startParams,
      initData?.launchParams,
      sdk?.startParams,
      urlInvite
    ];
    for (const candidate of candidates) {
      const invite = parseInvitePayload(candidate);
      if (invite && (!invite.game || invite.game === "super-smash-3d")) {
        return invite;
      }
    }
    return null;
  }

  async function joinRoomInvite(invite) {
    if (!invite || state.inviteJoinInProgress) return;
    const unavailableReason = getMiniAppRealtimeUnavailableReason();
    if (unavailableReason) {
      setStatus(unavailableReason, "danger", 5200);
      return;
    }
    const inviteBot = String(invite.botUsername || "").trim().toLowerCase();
    if (inviteBot && state.botUsername && inviteBot !== state.botUsername) {
      setStatus("Это приглашение относится к другому Mini App.", "danger", 5200);
      return;
    }
    const currentRoom = state.currentRoom;
    if (
      currentRoom
      && ((invite.roomId && roomIdOf(currentRoom) === invite.roomId) || (invite.roomCode && roomCodeOf(currentRoom) === invite.roomCode))
    ) {
      state.mode = "room";
      state.localMode = "online";
      setPhase("lobby");
      renderLobby();
      return;
    }

    state.inviteJoinInProgress = true;
    try {
      await leaveCurrentRoom({ quiet: true, background: true });
      state.mode = "room";
      state.localMode = "online";
      state.autoVoiceRequested = true;
      state.voiceConnecting = false;
      setStatus(`Вхожу по приглашению${invite.roomCode ? ` в ${invite.roomCode}` : ""}...`, "info", 0);
      const nextState = await sdk.multiplayer.joinRoom({
        room_id: invite.roomId || undefined,
        room_code: invite.roomCode || undefined,
        max_players: 2,
        state: buildRoomPlayerState(true)
      });
      if (!nextState?.room) {
        throw new Error("Сервер не вернул состояние комнаты.");
      }
      handleMultiplayerStateChange(nextState);
      setPhase("lobby");
      setStatus(`Ты вошел в комнату ${roomCodeOf(nextState.room) || invite.roomCode || ""}.`, "success", 4200);
    } catch (error) {
      state.autoVoiceRequested = false;
      state.voiceConnecting = false;
      console.warn("[SuperSmash3D] Failed to join invite room:", error);
      setStatus(error?.message || "Не удалось войти в комнату по приглашению.", "danger", 5600);
    } finally {
      state.inviteJoinInProgress = false;
      renderVoiceStatus();
    }
  }

  function normalizeOrientation(orientation) {
    if (!orientation || typeof orientation !== "object") {
      return {
        mode: window.innerWidth > window.innerHeight ? "landscape" : "portrait",
        isLandscape: window.innerWidth > window.innerHeight,
        isPortrait: window.innerWidth <= window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    const mode = orientation.mode || (orientation.isLandscape ? "landscape" : "portrait");
    return {
      ...orientation,
      mode,
      isLandscape: Boolean(orientation.isLandscape || mode === "landscape"),
      isPortrait: Boolean(orientation.isPortrait || mode === "portrait"),
      width: Number(orientation.width || window.innerWidth),
      height: Number(orientation.height || window.innerHeight)
    };
  }

  function applyOrientation(orientation) {
    state.orientation = normalizeOrientation(orientation);
    document.body.classList.toggle("mobile-landscape", Boolean(state.orientation.isLandscape && state.orientation.width <= 1000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    camera.updateProjectionMatrix();
  }

  function setCurrentRoomState(nextRoom, nextQueue = null) {
    state.currentRoom = nextRoom || null;
    state.currentQueue = nextQueue || null;
    net.roomState = nextRoom || null;
    net.isHost = isLocalRoomHost(nextRoom);
    state.localReady = Boolean(getLocalRoomPlayer(nextRoom)?.state?.ready);
    renderLobby();
    updateHud();
  }

  function applyVoiceState(nextVoiceState) {
    state.voiceState = nextVoiceState || null;
    state.voiceConnected = Boolean(nextVoiceState?.connected);
    state.voiceMuted = Boolean(nextVoiceState?.muted);
    if (state.voiceConnected) {
      state.voiceConnecting = false;
      state.autoVoiceRequested = false;
    }
    renderVoiceStatus();
    updateHud();
  }

  function platformTop(platform) {
    return platform.y + platform.thickness * 0.5;
  }

  function makePosition(x = 0, y = 0, z = 0) {
    return { x, y, z };
  }

  function clonePosition(position) {
    return makePosition(position?.x || 0, position?.y || 0, position?.z || 0);
  }

  function findSpawnPoint(index = 0) {
    const spawn = currentStage.spawns[((index % currentStage.spawns.length) + currentStage.spawns.length) % currentStage.spawns.length];
    return clonePosition(spawn);
  }

  function serializeInput(input) {
    return INPUT_KEYS.map((key) => (input[key] ? "1" : "0")).join("");
  }

  function applyRemoteInputEvent(senderId, payload = {}) {
    if (!senderId) return;
    const compactMask = payload.m ?? payload.mask ?? null;
    const nextInput = payload.input
      ? { ...createInputState(), ...payload.input }
      : compactMask !== null
        ? decodeInputMask(compactMask)
        : createInputState();
    const seq = Number(payload.s ?? payload.seq ?? payload.inputSeq ?? 0);
    const nowMs = performance.now();
    const previous = net.remoteInputs.get(senderId) || null;
    if (previous?.seq && seq && seq < previous.seq) {
      if (nextInput.jump || nextInput.attack || nextInput.special) {
        const heldUntil = { ...(previous.heldUntil || {}) };
        ["jump", "attack", "special"].forEach((key) => {
          if (nextInput[key]) {
            heldUntil[key] = Math.max(Number(heldUntil[key] || 0), nowMs + PHYSICS.remoteActionHoldMs);
          }
        });
        net.remoteInputs.set(senderId, { ...previous, heldUntil, receivedAt: nowMs });
      }
      return;
    }

    const heldUntil = { ...(previous?.heldUntil || {}) };
    ["jump", "attack", "special"].forEach((key) => {
      if (nextInput[key]) {
        heldUntil[key] = Math.max(Number(heldUntil[key] || 0), nowMs + PHYSICS.remoteActionHoldMs);
      } else if (Number(heldUntil[key] || 0) <= nowMs) {
        delete heldUntil[key];
      }
    });

    net.remoteInputs.set(senderId, {
      input: nextInput,
      seq,
      receivedAt: nowMs,
      heldUntil
    });
  }

  function getRemoteInputForHost(playerId) {
    const entry = net.remoteInputs.get(playerId);
    if (!entry) return null;
    const nowMs = performance.now();
    if (nowMs - entry.receivedAt > PHYSICS.remoteInputTimeoutMs) {
      return {
        input: createInputState(),
        seq: entry.seq
      };
    }

    const input = { ...createInputState(), ...(entry.input || {}) };
    ["jump", "attack", "special"].forEach((key) => {
      if (Number(entry.heldUntil?.[key] || 0) > nowMs) {
        input[key] = true;
      }
    });
    return {
      input,
      seq: entry.seq
    };
  }

  function createFighter(options = {}) {
    const playerId = String(options.playerId || `cpu_${Math.random().toString(36).slice(2, 8)}`);
    const skinConfig = getSkinConfig(options.skinKey, options.themeIndex || 0);
    const initialFacing = options.facing || 1;
    const fighter = {
      playerId,
      name: options.name || "Боец",
      themeIndex: options.themeIndex || 0,
      skinKey: skinConfig.key,
      theme: skinConfig,
      controlSlot: options.controlSlot || null,
      isBot: Boolean(options.isBot),
      isLocal: playerId === state.localPlayerId,
      isRemote: Boolean(options.isRemote),
      damage: 0,
      stocks: Number.isFinite(options.stocks) ? options.stocks : PHYSICS.stockCount,
      koCount: 0,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      facing: initialFacing,
      aimX: initialFacing >= 0 ? 1 : -1,
      aimZ: 0,
      grounded: false,
      jumpsUsed: 0,
      attackCooldown: 0,
      specialCooldown: 0,
      respawnTimer: 0,
      invulnTimer: 0,
      stunTimer: 0,
      flashTimer: 0,
      lastHitBy: null,
      comboStep: 0,
      comboTimer: 0,
      attackBuffer: 0,
      specialBuffer: 0,
      currentMoveKey: null,
      movePhase: null,
      moveTimer: 0,
      moveState: null,
      lastAttackPressed: false,
      lastSpecialPressed: false,
      lastJumpPressed: false,
      inputSeq: 0,
      input: createInputState(),
      snapshot: null,
      netSnapshotReady: false
    };
    const spawn = findSpawnPoint(options.spawnIndex || 0);
    fighter.x = spawn.x;
    fighter.y = spawn.y;
    fighter.z = spawn.z;
    fighter.spawnIndex = options.spawnIndex || 0;
    return fighter;
  }

  function resetFighterForSpawn(fighter, spawnIndex) {
    const spawn = findSpawnPoint(spawnIndex ?? fighter.spawnIndex ?? 0);
    fighter.spawnIndex = spawnIndex ?? fighter.spawnIndex ?? 0;
    fighter.x = spawn.x;
    fighter.y = spawn.y;
    fighter.z = spawn.z;
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.vz = 0;
    fighter.facing = spawn.x <= 0 ? 1 : -1;
    fighter.grounded = false;
    fighter.jumpsUsed = 0;
    fighter.attackCooldown = 0;
    fighter.specialCooldown = 0;
    fighter.respawnTimer = 0;
    fighter.invulnTimer = PHYSICS.respawnInvuln;
    fighter.stunTimer = 0;
    fighter.flashTimer = 0;
    fighter.comboStep = 0;
    fighter.comboTimer = 0;
    fighter.attackBuffer = 0;
    fighter.specialBuffer = 0;
    fighter.currentMoveKey = null;
    fighter.movePhase = null;
    fighter.moveTimer = 0;
    fighter.moveState = null;
    fighter.aimX = fighter.facing >= 0 ? 1 : -1;
    fighter.aimZ = 0;
  }

  function clearMatchWorld() {
    match.fighters.clear();
    match.active = false;
    match.ended = false;
    match.elapsedMs = 0;
    match.startedAt = 0;
    match.winnerId = null;
    match.summary = [];
    net.snapshotBuffer = [];
    net.serverTimeOffsetMs = null;
    net.lastSnapshotReceivedAt = 0;
    Array.from(world.fighterVisuals.values()).forEach((visual) => {
      scene.remove(visual.group);
    });
    world.fighterVisuals.clear();
    renderFighterHud();
    updateHud();
  }

  function ensureFighterVisual(fighter) {
    if (world.fighterVisuals.has(fighter.playerId)) {
      return world.fighterVisuals.get(fighter.playerId);
    }
    const group = new THREE.Group();
    const modelRoot = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: fighter.theme.body,
      roughness: 0.24,
      metalness: 0.14,
      emissive: fighter.theme.glow,
      emissiveIntensity: 0.16
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: fighter.theme.accent,
      roughness: 0.18,
      metalness: 0.1
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2135,
      roughness: 0.42,
      metalness: 0.22
    });
    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x111826,
      roughness: 0.48,
      metalness: 0.15
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.22, 1.5, 0.76), bodyMaterial);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.84, 0.84), accentMaterial);
    const visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.2, 0.08),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.94
      })
    );
    const shoulder = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.24, 0.54), darkMaterial);
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.02, 0.34), accentMaterial);
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.02, 0.34), accentMaterial);
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.16, 0.42), jointMaterial);
    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.16, 0.42), jointMaterial);
    const aura = new THREE.Mesh(
      new THREE.SphereGeometry(1.42, 20, 20),
      new THREE.MeshBasicMaterial({
        color: fighter.theme.glow,
        transparent: true,
        opacity: 0.09
      })
    );
    const pointer = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.46, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: fighter.theme.glow,
        emissiveIntensity: 0.24
      })
    );
    const slash = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.11, 10, 36, Math.PI * 1.2),
      new THREE.MeshBasicMaterial({
        color: fighter.theme.glow,
        transparent: true,
        opacity: 0.28
      })
    );
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 20, 20),
      new THREE.MeshBasicMaterial({
        color: fighter.theme.accent,
        transparent: true,
        opacity: 0.18
      })
    );
    const meshes = [body, head, shoulder, leftArm, rightArm, leftLeg, rightLeg];
    meshes.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    body.position.y = 0.34;
    shoulder.position.set(0, 0.94, 0);
    head.position.y = 1.54;
    visor.position.set(0, 1.6, 0.46);
    leftArm.position.set(-0.82, 0.42, 0);
    rightArm.position.set(0.82, 0.42, 0);
    leftLeg.position.set(-0.28, -0.98, 0);
    rightLeg.position.set(0.28, -0.98, 0);
    pointer.position.set(0, 0.4, 0.94);
    pointer.rotation.x = Math.PI * 0.5;
    slash.visible = false;
    pulse.visible = false;
    modelRoot.add(body, shoulder, head, visor, leftArm, rightArm, leftLeg, rightLeg);
    group.add(aura, modelRoot, pointer, slash, pulse);
    scene.add(group);
    const visual = { group, modelRoot, body, head, visor, shoulder, leftArm, rightArm, leftLeg, rightLeg, aura, pointer, slash, pulse };
    world.fighterVisuals.set(fighter.playerId, visual);
    return visual;
  }

  function syncFighterVisual(fighter, dt = 0.016) {
    const visual = ensureFighterVisual(fighter);
    const move = getMoveConfig(fighter.currentMoveKey);
    const targetY = fighter.respawnTimer > 0 ? -80 : fighter.y;
    const networkMatch = Boolean(state.currentRoom && match.active);
    const positionFollow = networkMatch ? 34 : 14;
    const verticalFollow = networkMatch ? 38 : 16;
    const rotationFollow = networkMatch ? 28 : 12;
    visual.group.position.x = smooth(visual.group.position.x, fighter.x, dt * positionFollow);
    visual.group.position.y = smooth(visual.group.position.y, targetY, dt * verticalFollow);
    visual.group.position.z = smooth(visual.group.position.z, fighter.z, dt * positionFollow);
    visual.group.rotation.y = smooth(visual.group.rotation.y, fighter.facing > 0 ? 0 : Math.PI, dt * rotationFollow);
    const moveAmp = clamp((Math.abs(fighter.vx) + Math.abs(fighter.vz)) * 0.012, 0, 0.12);
    const attackStretch = move && fighter.movePhase === "active" ? 0.12 : move && fighter.movePhase === "startup" ? 0.05 : 0;
    visual.body.scale.set(1 - moveAmp - attackStretch * 0.2, 1 + moveAmp + attackStretch, 1 - moveAmp - attackStretch * 0.12);
    visual.head.position.y = 1.54 + Math.sin((performance.now() * 0.006) + fighter.themeIndex) * 0.04;
    visual.visor.position.y = visual.head.position.y + 0.06;
    visual.aura.scale.setScalar(1 + clamp(fighter.damage / 220, 0, 0.5));
    visual.aura.material.opacity = fighter.invulnTimer > 0 ? 0.2 : fighter.flashTimer > 0 ? 0.22 : 0.09;
    visual.pointer.visible = isPrimaryLocalFighter(fighter);
    const aimAngle = Math.atan2(fighter.aimZ || 0, fighter.aimX || fighter.facing || 1);
    const runCycle = Math.sin((performance.now() * 0.012) + fighter.themeIndex * 0.8);
    const runSwing = fighter.grounded ? runCycle * clamp((Math.abs(fighter.vx) + Math.abs(fighter.vz)) * 0.08, 0, 0.7) : 0;
    visual.modelRoot.rotation.z = fighter.stunTimer > 0 ? Math.sin(performance.now() * 0.032) * 0.2 : 0;
    visual.leftLeg.rotation.x = -runSwing;
    visual.rightLeg.rotation.x = runSwing;
    visual.leftArm.rotation.x = runSwing * 0.85;
    visual.rightArm.rotation.x = -runSwing * 0.85;
    visual.leftArm.rotation.z = 0;
    visual.rightArm.rotation.z = 0;
    if (move) {
      const phaseAlpha = fighter.movePhase === "startup" ? 0.16 : fighter.movePhase === "active" ? 0.34 : 0.12;
      visual.slash.visible = move.effect !== "pulse";
      visual.pulse.visible = move.effect === "pulse" || move.effect === "burst";
      visual.slash.material.opacity = phaseAlpha;
      visual.pulse.material.opacity = move.effect === "pulse" ? phaseAlpha * 0.9 : phaseAlpha * 0.55;
      visual.slash.scale.setScalar(move.effect === "slash-wide" ? 1.18 : move.effect === "burst" ? 1.3 : 1);
      visual.pulse.scale.setScalar(move.effect === "pulse" ? 1.2 + Math.sin(performance.now() * 0.02) * 0.16 : 1);
      visual.slash.position.set((fighter.aimX || fighter.facing) * 1.2, move.effect === "upper" ? 1.9 : move.effect === "dive" ? 0.9 : 1.25, (fighter.aimZ || 0) * 1.2);
      visual.pulse.position.set((fighter.aimX || fighter.facing) * 1.1, 1.1, (fighter.aimZ || 0) * 1.1);
      visual.slash.rotation.set(
        move.effect === "upper" ? Math.PI * 0.2 : move.effect === "sweep" ? Math.PI * 0.52 : move.effect === "dive" ? Math.PI * 0.75 : Math.PI * 0.5,
        -aimAngle,
        move.effect === "slash-wide" ? Math.PI * 0.2 : 0
      );
      if (move.effect === "upper") {
        visual.rightArm.rotation.x = -2.35;
        visual.leftArm.rotation.x = 0.4;
      } else if (move.effect === "sweep") {
        visual.rightArm.rotation.x = -1.3;
        visual.rightArm.rotation.z = fighter.facing > 0 ? -0.55 : 0.55;
        visual.leftArm.rotation.x = 0.8;
      } else if (move.effect === "pulse" || move.effect === "burst") {
        visual.leftArm.rotation.x = -1.1;
        visual.rightArm.rotation.x = -1.1;
      } else if (move.effect === "dive") {
        visual.rightArm.rotation.x = -2.8;
        visual.leftArm.rotation.x = -1.6;
        visual.leftLeg.rotation.x = 0.38;
        visual.rightLeg.rotation.x = 0.38;
      } else {
        visual.rightArm.rotation.x = -2.2;
        visual.leftArm.rotation.x = 0.45;
      }
    } else if (!fighter.grounded) {
      visual.slash.visible = false;
      visual.pulse.visible = false;
      visual.leftArm.rotation.x = -1.25;
      visual.rightArm.rotation.x = -1.25;
      visual.leftLeg.rotation.x = 0.2;
      visual.rightLeg.rotation.x = 0.2;
    } else {
      visual.slash.visible = false;
      visual.pulse.visible = false;
    }
    if (fighter.flashTimer > 0) {
      visual.body.material.emissiveIntensity = 0.52;
    } else {
      visual.body.material.emissiveIntensity = fighter.invulnTimer > 0 ? 0.28 : 0.18;
    }
  }

  function clearArenaVisuals() {
    world.platformMeshes.forEach(({ mesh }) => scene.remove(mesh));
    world.platformMeshes = [];
    world.background.rings.forEach(({ mesh }) => scene.remove(mesh));
    world.background.rings = [];
    world.background.crystals.forEach((mesh) => scene.remove(mesh));
    world.background.crystals = [];
    if (world.background.sparkles) {
      scene.remove(world.background.sparkles);
      world.background.sparkles = null;
    }
    if (world.stageCore) {
      scene.remove(world.stageCore);
      world.stageCore = null;
    }
  }

  function ensureStageLighting() {
    if (!world.ambientLight) {
      world.ambientLight = new THREE.HemisphereLight(0xffffff, 0x0c1629, 1.05);
      scene.add(world.ambientLight);
    }
    if (!world.sunLight) {
      world.sunLight = new THREE.DirectionalLight(0xffffff, 1.15);
      world.sunLight.position.set(10, 20, 10);
      world.sunLight.castShadow = true;
      world.sunLight.shadow.mapSize.set(2048, 2048);
      world.sunLight.shadow.camera.left = -40;
      world.sunLight.shadow.camera.right = 40;
      world.sunLight.shadow.camera.top = 40;
      world.sunLight.shadow.camera.bottom = -40;
      scene.add(world.sunLight);
    }
  }

  function buildStage() {
    clearArenaVisuals();
    ensureStageLighting();
    scene.background = new THREE.Color(currentStage.background);
    scene.fog = new THREE.Fog(currentStage.fog, 20, 100);
    world.ambientLight.color.setHex(currentStage.background);
    world.sunLight.color.setHex(0xffffff);

    world.stageCore = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 4.8, 16, 12, 1),
      new THREE.MeshStandardMaterial({
        color: currentStage.key === "classic" ? 0x2d5c3a : currentStage.key === "canyon" ? 0x603122 : 0x3e3e46,
        roughness: 0.76,
        metalness: 0.1,
        emissive: currentStage.key === "classic" ? 0x183326 : currentStage.key === "canyon" ? 0x26140d : 0x23263b,
        emissiveIntensity: 0.18
      })
    );
    world.stageCore.position.set(0, -9, 0);
    world.stageCore.castShadow = true;
    world.stageCore.receiveShadow = true;
    scene.add(world.stageCore);

    currentStage.platforms.forEach((platform, index) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(platform.hx * 2, platform.thickness, platform.hz * 2),
        new THREE.MeshStandardMaterial({
          color: platform.color || (index === 0 ? 0x10243d : 0x143455),
          roughness: 0.5,
          metalness: 0.16,
          emissive: platform.color || 0x173d66,
          emissiveIntensity: 0.1
        })
      );
      mesh.position.set(platform.x, platform.y, platform.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      world.platformMeshes.push({ mesh, platform });
    });

    const boundary = new THREE.Mesh(
      new THREE.TorusGeometry(currentStage.key === "classic" ? 24 : 22, 0.18, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14 })
    );
    boundary.rotation.x = Math.PI * 0.5;
    boundary.position.y = -5.5;
    scene.add(boundary);
    world.background.rings.push({ mesh: boundary, speed: 0.12, axis: "z" });
  }

  function buildBackground() {
    const palette = currentStage.key === "canyon"
      ? [0xff9d6c, 0xd46d4d, 0xffd1bd]
      : currentStage.key === "classic"
        ? [0xffffff, 0xb9f7ff, 0xfff3c4]
        : [0x88f6ff, 0xffd574, 0xa48cff];

    for (let index = 0; index < 3; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(18 + index * 6, 0.08 + index * 0.03, 10, 96),
        new THREE.MeshBasicMaterial({
          color: palette[index % palette.length],
          transparent: true,
          opacity: 0.12 - index * 0.02
        })
      );
      ring.position.set(0, 8 + index * 5, -8 + index * 4);
      ring.rotation.x = Math.PI * (0.45 + index * 0.04);
      scene.add(ring);
      world.background.rings.push({ mesh: ring, speed: 0.05 + index * 0.03, axis: index % 2 === 0 ? "y" : "x" });
    }

    for (let index = 0; index < 16; index += 1) {
      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.4 + Math.random() * 1.2, 0),
        new THREE.MeshStandardMaterial({
          color: palette[index % palette.length],
          emissive: palette[index % palette.length],
          emissiveIntensity: 0.18,
          metalness: 0.3,
          roughness: 0.2
        })
      );
      crystal.position.set((Math.random() - 0.5) * 46, 4 + Math.random() * 24, (Math.random() - 0.5) * 32);
      crystal.userData.baseY = crystal.position.y;
      crystal.userData.speed = 0.4 + Math.random() * 0.8;
      crystal.userData.wobble = Math.random() * Math.PI * 2;
      scene.add(crystal);
      world.background.crystals.push(crystal);
    }

    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = [];
    for (let index = 0; index < 260; index += 1) {
      sparklePositions.push((Math.random() - 0.5) * 120, Math.random() * 80, (Math.random() - 0.5) * 120);
    }
    sparkleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(sparklePositions, 3));
    const sparkleMaterial = new THREE.PointsMaterial({
      color: 0xd9f8ff,
      size: 0.26,
      transparent: true,
      opacity: 0.82
    });
    world.background.sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(world.background.sparkles);
  }

  function applySelectedMap(mapId, options = {}) {
    state.selectedMapId = MAP_LIBRARY[mapId] ? mapId : "battlefield";
    currentStage = cloneMapConfig(state.selectedMapId);
    buildStage();
    buildBackground();
    if (ui.mapMeta) {
      ui.mapMeta.textContent = currentStage.description;
    }
    if (!options.skipPersist) {
      try {
        localStorage.setItem("smash3d:selectedMap", state.selectedMapId);
      } catch {}
    }
  }

  function persistSelectedSkins() {
    try {
      localStorage.setItem("smash3d:selectedSkins", JSON.stringify(state.selectedSkins));
    } catch {}
  }

  function restoreMenuSelections() {
    try {
      const savedMapId = localStorage.getItem("smash3d:selectedMap");
      if (savedMapId && MAP_LIBRARY[savedMapId]) {
        state.selectedMapId = savedMapId;
      }
    } catch {}
    try {
      const parsed = JSON.parse(localStorage.getItem("smash3d:selectedSkins") || "{}");
      if (parsed && typeof parsed === "object") {
        if (typeof parsed.p1 === "string") state.selectedSkins.p1 = parsed.p1;
        if (typeof parsed.p2 === "string") state.selectedSkins.p2 = parsed.p2;
      }
    } catch {}
    normalizeSelectedSkin("p1");
    normalizeSelectedSkin("p2");
  }

  function renderSkinSelectors() {
    const fillSelect = (element, selectedKey) => {
      if (!element) return;
      element.innerHTML = "";
      Object.values(SKIN_LIBRARY).forEach((skin) => {
        const option = document.createElement("option");
        option.value = skin.key;
        option.textContent = `${skin.name}${skin.priceSol > 0 && !isSkinOwned(skin.key) ? ` • ${skin.priceSol.toFixed(3)} SOL` : skin.priceSol > 0 ? " • owned" : ""}`;
        if (skin.key === selectedKey) option.selected = true;
        element.appendChild(option);
      });
    };
    fillSelect(ui.skinP1Select, state.selectedSkins.p1);
    fillSelect(ui.skinP2Select, state.selectedSkins.p2);
  }

  function syncSkinActionButtons() {
    const syncButton = (button, skinKey) => {
      if (!button) return;
      const skin = SKIN_LIBRARY[skinKey];
      if (!skin) {
        button.disabled = true;
        return;
      }
      const owned = isSkinOwned(skinKey);
      button.disabled = owned || !sdk?.payments?.solana || !state.botUsername || skin.priceSol <= 0;
      button.textContent = owned ? "Скин открыт" : `Купить за ${skin.priceSol.toFixed(3)} SOL`;
    };
    syncButton(ui.skinP1BuyButton, ui.skinP1Select?.value || state.selectedSkins.p1);
    syncButton(ui.skinP2BuyButton, ui.skinP2Select?.value || state.selectedSkins.p2);
  }

  function renderSkinStore() {
    if (!ui.skinStoreList) return;
    ui.skinStoreList.innerHTML = "";
    Object.values(SKIN_LIBRARY).forEach((skin) => {
      const card = document.createElement("div");
      const owned = isSkinOwned(skin.key);
      card.className = `skin-card ${owned ? "owned" : "locked"}`;
      card.innerHTML = `
        <div class="skin-preview" style="background:
          radial-gradient(circle at 30% 25%, ${skin.css}, transparent 46%),
          linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.08));"></div>
        <div class="skin-card-title">${skin.name}</div>
        <div class="skin-card-meta">${owned ? "Доступен в инвентаре" : `Premium skin • ${skin.priceSol.toFixed(3)} SOL`}</div>
        <div class="skin-card-actions">
          <button class="secondary-btn menu-small-btn" data-apply-skin="${skin.key}">Выбрать</button>
          ${owned || skin.priceSol <= 0 ? "" : `<button class="primary-btn menu-small-btn" data-buy-skin="${skin.key}">Купить</button>`}
        </div>
      `;
      ui.skinStoreList.appendChild(card);
    });
  }

  function renderMenuSelections() {
    renderSkinSelectors();
    renderSkinStore();
    syncSkinActionButtons();
    if (ui.mapSelect) {
      ui.mapSelect.value = state.selectedMapId;
    }
    if (ui.mapMeta) {
      ui.mapMeta.textContent = MAP_LIBRARY[state.selectedMapId]?.description || "";
    }
  }

  function applySkinSelection(slot, skinKey, options = {}) {
    if (!SKIN_LIBRARY[skinKey]) return false;
    if (!isSkinOwned(skinKey) && !options.allowLocked) {
      setStatus(`Скин ${SKIN_LIBRARY[skinKey].name} ещё не куплен.`, "danger");
      return false;
    }
    state.selectedSkins[slot] = skinKey;
    persistSelectedSkins();
    renderMenuSelections();
    return true;
  }

  async function loadOwnedSkinsFromInventory() {
    if (!sdk?.api?.request || !state.botUsername) {
      renderMenuSelections();
      return;
    }
    try {
      const result = await sdk.api.request("/api/miniapp/inventory", {
        method: "POST",
        body: {
          bot_username: state.botUsername,
          item_type: "skin"
        }
      });
      if (result?.success && Array.isArray(result.items)) {
        result.items.forEach((item) => {
          if (item?.item_key && SKIN_LIBRARY[item.item_key]) {
            state.ownedSkins.add(item.item_key);
          }
        });
      }
    } catch (error) {
      console.warn("[Smash3D] Failed to load skin inventory:", error);
    } finally {
      normalizeSelectedSkin("p1");
      normalizeSelectedSkin("p2");
      renderMenuSelections();
    }
  }

  async function purchaseSkin(skinKey, slot = "p1") {
    const skin = SKIN_LIBRARY[skinKey];
    if (!skin) return false;
    if (isSkinOwned(skinKey)) {
      applySkinSelection(slot, skinKey, { allowLocked: true });
      return true;
    }
    if (!sdk?.payments?.solana || !state.botUsername) {
      setStatus("Покупка скинов доступна только внутри Mini App с активированными платежами.", "danger");
      return false;
    }
    try {
      await sdk.payments.solana({
        bot_username: state.botUsername,
        item_type: "skin",
        item_key: skin.key,
        title: `${skin.name} skin`,
        description: `Unlock ${skin.name} for Super Smash 3D`,
        amount_sol: String(skin.priceSol),
        purchase_meta: {
          game: "super-smash-3d",
          skin_key: skin.key,
          skin_name: skin.name
        }
      });
      state.ownedSkins.add(skin.key);
      applySkinSelection(slot, skin.key, { allowLocked: true });
      renderMenuSelections();
      setStatus(`Скин ${skin.name} куплен.`, "success");
      return true;
    } catch (error) {
      setStatus(error?.message || "Не удалось купить скин.", "danger");
      return false;
    }
  }

  function populateMapSelect() {
    if (!ui.mapSelect) return;
    ui.mapSelect.innerHTML = "";
    Object.values(MAP_LIBRARY).forEach((map) => {
      const option = document.createElement("option");
      option.value = map.key;
      option.textContent = map.name;
      ui.mapSelect.appendChild(option);
    });
    ui.mapSelect.value = state.selectedMapId;
    if (ui.mapMeta) {
      ui.mapMeta.textContent = MAP_LIBRARY[state.selectedMapId]?.description || "";
    }
  }

  function createRosterFromRoom(room) {
    return roomPlayersOf(room).slice(0, 2).map((player, index) => ({
      playerId: playerIdOf(player),
      name: playerNameOf(player),
      themeIndex: index,
      spawnIndex: index,
      skinKey: player?.state?.skinKey || player?.state?.skin_key || (index === 0 ? "crimson_ninja" : "blue_fighter"),
      controlSlot: (() => {
        const playerId = String(playerIdOf(player) || "").trim();
        const username = String(player?.username || "").trim();
        const localId = String(state.localPlayerId || "").trim();
        return playerId === localId || username === localId ? "p1" : null;
      })()
    }));
  }

  function createSoloRoster(dummy = false) {
    const roster = [
      {
        playerId: state.localPlayerId,
        name: state.localPlayerName,
        themeIndex: 0,
        spawnIndex: 0,
        skinKey: normalizeSelectedSkin("p1"),
        controlSlot: "p1"
      }
    ];
    const botNames = dummy
      ? ["Training Drone"]
      : ["Nova Fox"];
    botNames.forEach((name, index) => {
      roster.push({
        playerId: `cpu_${index + 1}`,
        name,
        themeIndex: index + 1,
        spawnIndex: index + 1,
        isBot: true,
        skinKey: normalizeSelectedSkin("p2")
      });
    });
    return roster;
  }

  function createLocalVersusRoster() {
    return [
      {
        playerId: "local_p1",
        name: "ИГРОК 1",
        themeIndex: 0,
        spawnIndex: 0,
        skinKey: normalizeSelectedSkin("p1"),
        controlSlot: "p1"
      },
      {
        playerId: "local_p2",
        name: "ИГРОК 2",
        themeIndex: 1,
        spawnIndex: 1,
        skinKey: normalizeSelectedSkin("p2"),
        controlSlot: "p2"
      }
    ];
  }

  function beginMatch(roster, options = {}) {
    clearMatchWorld();
    applySelectedMap(options.mapId || state.selectedMapId || "battlefield", { skipPersist: true });
    match.active = true;
    match.ended = false;
    match.authoritative = Boolean(options.authoritative);
    match.practice = Boolean(options.practice);
    match.roomId = options.roomId || null;
    match.matchId = options.matchId || `match_${Date.now().toString(36)}`;
    match.startedAt = performance.now();
    match.elapsedMs = 0;
    match.timeLimitMs = Number.isFinite(options.timeLimitMs) ? options.timeLimitMs : PHYSICS.timeLimitMs;
    match.summary = [];
    match.winnerId = null;
    net.lastHudSyncAt = 0;
    net.inputSignature = "";
    net.inputBurstSignature = "";
    net.inputBurstUntil = 0;
    net.localInputSeq = 0;
    net.lastServerInputSeq = 0;
    net.lastInputSentAt = 0;
    net.lastSnapshotSentAt = 0;
    net.snapshotSeq = 0;
    net.lastSnapshotSeq = 0;
    net.snapshotBuffer = [];
    net.serverTimeOffsetMs = null;
    net.lastSnapshotReceivedAt = 0;
    net.remoteInputs.clear();

    roster.forEach((entry, index) => {
      const fighter = createFighter({
        playerId: entry.playerId,
        name: entry.name,
        themeIndex: entry.themeIndex ?? index,
        spawnIndex: entry.spawnIndex ?? index,
        isBot: entry.isBot,
        skinKey: entry.skinKey,
        controlSlot: entry.controlSlot || null,
        isRemote: Boolean(entry.isRemote || (entry.playerId !== state.localPlayerId && !entry.isBot && !entry.controlSlot && !match.authoritative))
      });
      match.fighters.set(fighter.playerId, fighter);
    });

    state.isPaused = false;
    setPhase("match");
    forceHideLobbyOverlaysForMatch();
    requestAnimationFrame(forceHideLobbyOverlaysForMatch);
    renderFighterHud();
    updateHud();
    setStatus(match.practice ? "Тренировочная арена загружена. Пробуй джагглы, спешиалы и рикавери." : "Матч начался. Выбей соперника за пределы арены.", "success");
  }

  function startSoloClash() {
    state.mode = "solo";
    state.localMode = "solo";
    setCurrentRoomState(null, null);
    beginMatch(createSoloRoster(false), {
      authoritative: true,
      practice: false,
      timeLimitMs: PHYSICS.timeLimitMs,
      mapId: state.selectedMapId
    });
  }

  function startLocalVersus() {
    state.mode = "local";
    state.localMode = "local";
    setCurrentRoomState(null, null);
    beginMatch(createLocalVersusRoster(), {
      authoritative: true,
      practice: false,
      timeLimitMs: PHYSICS.timeLimitMs,
      mapId: state.selectedMapId
    });
  }

  function startPracticeStage() {
    state.mode = "practice";
    state.localMode = "practice";
    setCurrentRoomState(null, null);
    beginMatch(createSoloRoster(true), {
      authoritative: true,
      practice: true,
      timeLimitMs: 0,
      mapId: state.selectedMapId
    });
  }

  function getMergedInput(controlSlot = "p1") {
    const merged = createInputState();
    const sourceGroup = state.inputSources[controlSlot] || {};
    Object.values(sourceGroup).forEach((source) => {
      INPUT_KEYS.forEach((key) => {
        merged[key] = merged[key] || Boolean(source[key]);
      });
    });
    state.inputByControl[controlSlot] = merged;
    if (controlSlot === "p1") {
      state.input = merged;
    }
    return merged;
  }

  function readGamepadInput() {
    const nextP1 = createInputState();
    const nextP2 = createInputState();
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
    const applyPad = (pad, target) => {
      if (!pad) return;
      const axisX = pad.axes?.[0] || 0;
      const axisY = pad.axes?.[1] || 0;
      target.left = axisX < -GAMEPAD_DEADZONE || Boolean(pad.buttons?.[14]?.pressed);
      target.right = axisX > GAMEPAD_DEADZONE || Boolean(pad.buttons?.[15]?.pressed);
      target.up = axisY < -GAMEPAD_DEADZONE || Boolean(pad.buttons?.[12]?.pressed);
      target.down = axisY > GAMEPAD_DEADZONE || Boolean(pad.buttons?.[13]?.pressed);
      target.jump = Boolean(pad.buttons?.[0]?.pressed || pad.buttons?.[5]?.pressed);
      target.attack = Boolean(pad.buttons?.[2]?.pressed || pad.buttons?.[4]?.pressed);
      target.special = Boolean(pad.buttons?.[1]?.pressed || pad.buttons?.[7]?.pressed);
    };
    applyPad(pads[0], nextP1);
    applyPad(pads[1], nextP2);
    state.inputSources.p1.gamepad = nextP1;
    state.inputSources.p2.gamepad = nextP2;
    return nextP1;
  }

  function selectNearestOpponent(fighter) {
    let best = null;
    let bestDistance = Infinity;
    match.fighters.forEach((candidate) => {
      if (candidate.playerId === fighter.playerId || candidate.stocks <= 0 || candidate.respawnTimer > 0) return;
      const distance = Math.hypot(candidate.x - fighter.x, candidate.z - fighter.z, (candidate.y - fighter.y) * 0.35);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    });
    return best;
  }

  function computeBotInput(fighter) {
    const next = createInputState();
    const target = selectNearestOpponent(fighter);
    if (!target) return next;
    const dx = target.x - fighter.x;
    const dz = target.z - fighter.z;
    const dy = target.y - fighter.y;
    const distance = Math.hypot(dx, dz);
    next.left = dx < -1.2;
    next.right = dx > 1.2;
    next.up = dz < -1.2;
    next.down = dz > 1.2;

    if ((dy > 2.8 && fighter.grounded) || (fighter.y < 2.5 && Math.abs(dx) > 3.4)) {
      next.jump = true;
    }
    if (dy > 2.2 && distance < 3.4) {
      next.up = true;
    } else if (dy < -1.4 && fighter.grounded && distance < 3.5) {
      next.down = true;
    }
    if (distance < 3.8 && Math.abs(dy) < 3.6 && fighter.attackCooldown <= 0) {
      next.attack = true;
    }
    if (fighter.specialCooldown <= 0) {
      if (dy > 3 && distance < 3.8) {
        next.up = true;
        next.special = true;
      } else if (!fighter.grounded && target.y < fighter.y - 1.8 && distance < 3.2) {
        next.down = true;
        next.special = true;
      } else if (distance < 2.6 || target.damage > 85) {
        next.special = Math.random() > 0.22;
      }
    }
    return next;
  }

  function normalizeAim(x, z, fallbackX = 1, fallbackZ = 0) {
    const length = Math.hypot(x, z);
    if (length > 0.001) {
      return { x: x / length, z: z / length };
    }
    const fallbackLength = Math.hypot(fallbackX, fallbackZ) || 1;
    return { x: fallbackX / fallbackLength, z: fallbackZ / fallbackLength };
  }

  function updateFighterAim(fighter, moveX, moveZ) {
    if (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01) {
      const aim = normalizeAim(moveX, moveZ, fighter.aimX || fighter.facing || 1, fighter.aimZ || 0);
      fighter.aimX = aim.x;
      fighter.aimZ = aim.z;
      if (aim.x > 0.16) fighter.facing = 1;
      if (aim.x < -0.16) fighter.facing = -1;
    }
  }

  function selectAttackMove(fighter, input) {
    if (!fighter.grounded) return "airSlash";
    if (input.up) return "upLauncher";
    if (input.down) return "lowSweep";
    if (fighter.comboStep === 1 && fighter.comboTimer > 0.02) return "jab2";
    return "jab1";
  }

  function selectSpecialMove(fighter, input) {
    if (input.up) return "risingUppercut";
    if (input.down) return fighter.grounded ? "shockPulse" : "meteorDive";
    return "dashBurst";
  }

  function startMove(fighter, moveKey) {
    const move = getMoveConfig(moveKey);
    if (!move || fighter.moveState || fighter.stocks <= 0 || fighter.respawnTimer > 0 || fighter.stunTimer > 0) {
      return false;
    }
    if (move.requiresGround && !fighter.grounded) return false;
    if (move.requiresAir && fighter.grounded) return false;
    const cooldownKey = move.input === "special" ? "specialCooldown" : "attackCooldown";
    if (fighter[cooldownKey] > 0.02) return false;

    fighter.moveState = {
      key: moveKey,
      phase: "startup",
      phaseTime: move.startup,
      targetIds: new Set(),
      activated: false
    };
    fighter.currentMoveKey = moveKey;
    fighter.movePhase = "startup";
    fighter.moveTimer = move.startup + move.active + move.recovery;
    fighter[cooldownKey] = Math.max(fighter[cooldownKey], move.cooldown);
    if (move.comboStep) {
      fighter.comboStep = move.comboStep;
      fighter.comboTimer = move.comboWindow || 0;
    } else {
      fighter.comboStep = 0;
      fighter.comboTimer = 0;
    }
    fighter.flashTimer = Math.max(fighter.flashTimer, 0.06);
    return true;
  }

  function applyMoveImpulse(fighter, move) {
    const aim = normalizeAim(fighter.aimX || fighter.facing || 1, fighter.aimZ || 0, fighter.facing || 1, 0);
    if (move.lunge) {
      fighter.vx = aim.x * move.lunge;
      fighter.vz = aim.z * move.lunge;
    }
    if (Number.isFinite(move.lungeY)) {
      fighter.vy = move.lungeY;
      fighter.grounded = false;
    }
    if (move.key === "shockPulse") {
      fighter.vx *= 0.2;
      fighter.vz *= 0.2;
    }
    if (move.key === "risingUppercut") {
      fighter.jumpsUsed = 2;
    }
  }

  function moveCanHitTarget(attacker, target, move) {
    if (!target || target.playerId === attacker.playerId || target.respawnTimer > 0 || target.stocks <= 0 || target.invulnTimer > 0) {
      return false;
    }
    const dx = target.x - attacker.x;
    const dz = target.z - attacker.z;
    const dy = target.y - attacker.y;
    const planarDistance = Math.hypot(dx, dz);
    const verticalDistance = Math.abs(dy);
    const aim = normalizeAim(attacker.aimX || attacker.facing || 1, attacker.aimZ || 0, attacker.facing || 1, 0);
    const along = dx * aim.x + dz * aim.z;
    const cross = Math.abs(dx * aim.z - dz * aim.x);

    switch (move.hitShape) {
      case "radial":
        return planarDistance <= move.distance && verticalDistance <= move.height;
      case "up":
        return planarDistance <= move.distance && dy >= -1.6 && dy <= move.height && cross <= move.distance * 0.95;
      case "down":
        return planarDistance <= move.distance && dy <= 1.2 && dy >= -move.height && cross <= move.distance * 0.85;
      case "low":
        return along >= -0.8 && along <= move.distance && cross <= 1.8 && dy >= -2.4 && dy <= 1.5;
      case "front":
      default:
        return along >= -0.9 && along <= move.distance && cross <= 1.9 && verticalDistance <= move.height;
    }
  }

  function applyMoveHit(attacker, target, move) {
    const dx = target.x - attacker.x;
    const dz = target.z - attacker.z;
    const planarDistance = Math.hypot(dx, dz);
    const aim = normalizeAim(attacker.aimX || attacker.facing || 1, attacker.aimZ || 0, attacker.facing || 1, 0);
    const radial = planarDistance > 0.01 ? { x: dx / planarDistance, z: dz / planarDistance } : aim;
    const knockback = move.knockback + target.damage * move.scaling;
    const direction = move.hitShape === "radial" ? radial : aim;
    let horizontalScale = 1;
    if (move.hitShape === "up") horizontalScale = 0.48;
    if (move.hitShape === "down") horizontalScale = 0.68;

    target.damage += move.damage;
    target.vx = direction.x * knockback * horizontalScale + aim.x * (move.forwardBoost || 0);
    target.vz = direction.z * knockback * horizontalScale + aim.z * (move.forwardBoost || 0);
    target.vy = move.vertical + target.damage * move.verticalScale;
    target.grounded = false;
    target.jumpsUsed = Math.max(target.jumpsUsed, 1);
    target.stunTimer = Math.max(target.stunTimer, move.stun || 0.24);
    target.flashTimer = 0.18;
    target.lastHitBy = attacker.playerId;
    attacker.flashTimer = 0.14;
  }

  function resolveMoveHits(fighter, move, moveState) {
    match.fighters.forEach((target) => {
      if (moveState.targetIds.has(target.playerId)) return;
      if (!moveCanHitTarget(fighter, target, move)) return;
      applyMoveHit(fighter, target, move);
      moveState.targetIds.add(target.playerId);
    });
  }

  function clearMoveState(fighter) {
    fighter.moveState = null;
    fighter.currentMoveKey = null;
    fighter.movePhase = null;
    fighter.moveTimer = 0;
  }

  function advanceMoveState(fighter, dt) {
    if (!fighter.moveState) return;
    const moveState = fighter.moveState;
    const move = getMoveConfig(moveState.key);
    if (!move) {
      clearMoveState(fighter);
      return;
    }

    fighter.moveTimer = Math.max(0, fighter.moveTimer - dt);
    moveState.phaseTime -= dt;

    if (moveState.phase === "startup" && moveState.phaseTime <= 0) {
      moveState.phase = "active";
      moveState.phaseTime = move.active;
      moveState.activated = true;
      fighter.movePhase = "active";
      applyMoveImpulse(fighter, move);
    }

    if (moveState.phase === "active") {
      resolveMoveHits(fighter, move, moveState);
      if (moveState.phaseTime <= 0) {
        moveState.phase = "recovery";
        moveState.phaseTime = move.recovery;
        fighter.movePhase = "recovery";
      }
    }

    if (moveState.phase === "recovery" && moveState.phaseTime <= 0) {
      clearMoveState(fighter);
    }
  }

  function advancePredictedMoveState(fighter, dt) {
    if (!fighter.moveState) return;
    const moveState = fighter.moveState;
    const move = getMoveConfig(moveState.key);
    if (!move) {
      clearMoveState(fighter);
      return;
    }

    fighter.moveTimer = Math.max(0, fighter.moveTimer - dt);
    moveState.phaseTime -= dt;

    if (moveState.phase === "startup" && moveState.phaseTime <= 0) {
      moveState.phase = "active";
      moveState.phaseTime = move.active;
      moveState.activated = true;
      fighter.movePhase = "active";
      applyMoveImpulse(fighter, move);
    }

    if (moveState.phase === "active" && moveState.phaseTime <= 0) {
      moveState.phase = "recovery";
      moveState.phaseTime = move.recovery;
      fighter.movePhase = "recovery";
    }

    if (moveState.phase === "recovery" && moveState.phaseTime <= 0) {
      clearMoveState(fighter);
    }
  }

  function landOnPlatform(fighter, previousY) {
    const halfHeight = PHYSICS.fighterHeight * 0.5;
    for (const platform of currentStage.platforms) {
      const top = platformTop(platform);
      const withinX = Math.abs(fighter.x - platform.x) <= platform.hx + PHYSICS.fighterRadius;
      const withinZ = Math.abs(fighter.z - platform.z) <= platform.hz + PHYSICS.fighterRadius;
      const wasAbove = previousY - halfHeight >= top - 0.12;
      const isBelowTop = fighter.y - halfHeight <= top;
      if (fighter.vy <= 0 && withinX && withinZ && wasAbove && isBelowTop) {
        fighter.y = top + halfHeight;
        fighter.vy = 0;
        fighter.grounded = true;
        fighter.jumpsUsed = 0;
        if (fighter.currentMoveKey === "meteorDive" && fighter.moveState) {
          const shockwave = {
            ...MOVE_LIBRARY.shockPulse,
            damage: 7,
            knockback: 7.8,
            scaling: 0.04,
            distance: 2.8,
            height: 3.2,
            forwardBoost: 0
          };
          resolveMoveHits(fighter, shockwave, fighter.moveState);
          fighter.moveState.phase = "recovery";
          fighter.moveState.phaseTime = Math.min(fighter.moveState.phaseTime, 0.12);
          fighter.movePhase = "recovery";
          fighter.flashTimer = Math.max(fighter.flashTimer, 0.2);
        }
        return true;
      }
    }
    return false;
  }

  function handleRingOut(fighter) {
    if (fighter.respawnTimer > 0 || fighter.stocks <= 0) return;
    const outsideBounds = Math.abs(fighter.x) > currentStage.bounds.x || Math.abs(fighter.z) > currentStage.bounds.z || fighter.y < currentStage.bounds.bottom || fighter.y > 44;
    if (!outsideBounds) return;

    fighter.stocks -= 1;
    fighter.damage = 0;
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.vz = 0;
    fighter.grounded = false;
    fighter.flashTimer = 0;
    fighter.comboStep = 0;
    fighter.comboTimer = 0;
    fighter.attackBuffer = 0;
    fighter.specialBuffer = 0;
    clearMoveState(fighter);
    if (fighter.lastHitBy && match.fighters.has(fighter.lastHitBy)) {
      match.fighters.get(fighter.lastHitBy).koCount += 1;
    }
    if (fighter.stocks > 0) {
      fighter.respawnTimer = PHYSICS.respawnDelay;
      fighter.invulnTimer = 0;
      fighter.x = 0;
      fighter.y = -60;
      fighter.z = 0;
    }
  }

  function stepPredictedLocalFighter(fighter, dt) {
    if (!fighter || fighter.stocks <= 0) return;
    const previousY = fighter.y;
    const wasRespawning = fighter.respawnTimer > 0;
    fighter.attackCooldown = Math.max(0, fighter.attackCooldown - dt);
    fighter.specialCooldown = Math.max(0, fighter.specialCooldown - dt);
    fighter.respawnTimer = Math.max(0, fighter.respawnTimer - dt);
    fighter.invulnTimer = Math.max(0, fighter.invulnTimer - dt);
    fighter.stunTimer = Math.max(0, fighter.stunTimer - dt);
    fighter.flashTimer = Math.max(0, fighter.flashTimer - dt);
    fighter.comboTimer = Math.max(0, fighter.comboTimer - dt);
    fighter.attackBuffer = Math.max(0, fighter.attackBuffer - dt);
    fighter.specialBuffer = Math.max(0, fighter.specialBuffer - dt);
    if (fighter.comboTimer <= 0.001 && !fighter.moveState) {
      fighter.comboStep = 0;
    }

    if (wasRespawning) {
      if (fighter.respawnTimer <= 0) {
        resetFighterForSpawn(fighter, fighter.spawnIndex);
      }
      return;
    }

    const input = getMergedInput("p1");
    fighter.input = input;
    const moveX = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const moveZ = (input.down ? 1 : 0) - (input.up ? 1 : 0);
    const hasMove = moveX !== 0 || moveZ !== 0;
    updateFighterAim(fighter, moveX, moveZ);

    const targetSpeed = fighter.grounded ? PHYSICS.moveSpeed : PHYSICS.airSpeed;
    const accel = fighter.grounded ? PHYSICS.groundAccel : PHYSICS.airAccel;
    const drag = fighter.grounded ? PHYSICS.friction : PHYSICS.friction * 0.4;
    const currentMove = getMoveConfig(fighter.currentMoveKey);
    const controlFactor = currentMove
      ? fighter.movePhase === "startup"
        ? currentMove.control ?? 0.25
        : fighter.movePhase === "active"
          ? Math.max(0.04, (currentMove.control ?? 0.25) * 0.6)
          : Math.max(0.08, (currentMove.control ?? 0.25) * 0.8)
      : 1;
    if (fighter.stunTimer <= 0) {
      fighter.vx = hasMove ? smooth(fighter.vx, moveX * targetSpeed * controlFactor, dt * accel) : smooth(fighter.vx, 0, dt * drag);
      fighter.vz = hasMove ? smooth(fighter.vz, moveZ * targetSpeed * controlFactor, dt * accel) : smooth(fighter.vz, 0, dt * drag);
    }

    if (input.jump && !fighter.lastJumpPressed) {
      if (fighter.grounded) {
        fighter.vy = PHYSICS.jumpSpeed;
        fighter.grounded = false;
        fighter.jumpsUsed = 1;
      } else if (fighter.jumpsUsed < 2) {
        fighter.vy = PHYSICS.doubleJumpSpeed;
        fighter.jumpsUsed += 1;
      }
    }
    fighter.lastJumpPressed = Boolean(input.jump);

    if (input.attack && !fighter.lastAttackPressed) {
      fighter.attackBuffer = 0.22;
    }
    fighter.lastAttackPressed = Boolean(input.attack);

    if (input.special && !fighter.lastSpecialPressed) {
      fighter.specialBuffer = 0.22;
    }
    fighter.lastSpecialPressed = Boolean(input.special);

    if (!fighter.moveState && fighter.stunTimer <= 0) {
      if (fighter.specialBuffer > 0.01) {
        if (startMove(fighter, selectSpecialMove(fighter, input))) {
          fighter.specialBuffer = 0;
        }
      } else if (fighter.attackBuffer > 0.01) {
        if (startMove(fighter, selectAttackMove(fighter, input))) {
          fighter.attackBuffer = 0;
        }
      }
    }

    advancePredictedMoveState(fighter, dt);

    fighter.vy = Math.max(PHYSICS.maxFall, fighter.vy - PHYSICS.gravity * dt);
    fighter.x += fighter.vx * dt;
    fighter.y += fighter.vy * dt;
    fighter.z += fighter.vz * dt;

    fighter.grounded = false;
    landOnPlatform(fighter, previousY);
    handleRingOut(fighter);
  }

  function stepClientPredictionMatch(dt) {
    if (!match.active || match.ended || state.isPaused || match.authoritative) return;
    const localFighter = match.fighters.get(state.localPlayerId);
    if (!localFighter) return;
    match.elapsedMs += dt * 1000;
    stepPredictedLocalFighter(localFighter, dt);
    syncMatchHud();
  }

  function buildMatchSummary() {
    return Array.from(match.fighters.values())
      .map((fighter) => ({
        playerId: fighter.playerId,
        name: fighter.name,
        stocks: Math.max(0, fighter.stocks),
        kos: fighter.koCount,
        damage: Math.round(fighter.damage)
      }))
      .sort((left, right) => right.stocks - left.stocks || right.kos - left.kos || left.damage - right.damage);
  }

  function finishMatch(options = {}) {
    if (match.ended && state.phase === "result") return;
    match.ended = true;
    match.active = false;
    match.summary = options.summary || buildMatchSummary();
    match.winnerId = options.winnerId || (match.summary[0]?.playerId || null);
    const winnerEntry = match.summary.find((entry) => entry.playerId === match.winnerId) || null;
    const winnerName = winnerEntry?.name || "Никто";
    const winnerFighter = winnerEntry ? match.fighters.get(winnerEntry.playerId) : null;
    const localWin = state.localMode === "local"
      ? winnerFighter?.controlSlot === "p1"
      : match.winnerId === state.localPlayerId;
    ui.resultTitle.textContent = localWin ? "Победа" : `${winnerName} победил`;
    ui.resultCopy.textContent = match.practice
      ? "Тренировка завершена. Можно сразу зайти еще в один раунд."
      : `${winnerName} забрал последний сток и удержал арену.`;
    renderResultBoard();
    setPhase("result");
    setStatus(localWin ? "Раунд за тобой." : `${winnerName} забрал этот раунд.`, localWin ? "success" : "info", 3200);
  }

  function serializeFighter(fighter) {
    return {
      playerId: fighter.playerId,
      name: fighter.name,
      themeIndex: fighter.themeIndex,
      skinKey: fighter.skinKey,
      damage: fighter.damage,
      stocks: fighter.stocks,
      koCount: fighter.koCount,
      x: fighter.x,
      y: fighter.y,
      z: fighter.z,
      vx: fighter.vx,
      vy: fighter.vy,
      vz: fighter.vz,
      facing: fighter.facing,
      aimX: fighter.aimX,
      aimZ: fighter.aimZ,
      grounded: fighter.grounded,
      jumpsUsed: fighter.jumpsUsed,
      respawnTimer: fighter.respawnTimer,
      invulnTimer: fighter.invulnTimer,
      stunTimer: fighter.stunTimer,
      flashTimer: fighter.flashTimer,
      comboStep: fighter.comboStep,
      comboTimer: fighter.comboTimer,
      currentMoveKey: fighter.currentMoveKey,
      movePhase: fighter.movePhase,
      moveTimer: fighter.moveTimer,
      inputSeq: Number(fighter.inputSeq || 0)
    };
  }

  function serializeFighterCompact(fighter) {
    return [
      fighter.playerId,
      fighter.name,
      Number(fighter.themeIndex || 0),
      fighter.skinKey,
      netNumber(fighter.damage, 10),
      Number(fighter.stocks || 0),
      Number(fighter.koCount || 0),
      netNumber(fighter.x),
      netNumber(fighter.y),
      netNumber(fighter.z),
      netNumber(fighter.vx),
      netNumber(fighter.vy),
      netNumber(fighter.vz),
      Number(fighter.facing || 1),
      netNumber(fighter.aimX),
      netNumber(fighter.aimZ),
      fighter.grounded ? 1 : 0,
      Number(fighter.jumpsUsed || 0),
      netNumber(fighter.respawnTimer),
      netNumber(fighter.invulnTimer),
      netNumber(fighter.stunTimer),
      netNumber(fighter.flashTimer),
      Number(fighter.comboStep || 0),
      netNumber(fighter.comboTimer),
      fighter.currentMoveKey || "",
      fighter.movePhase || "",
      netNumber(fighter.moveTimer),
      Number(fighter.inputSeq || 0)
    ];
  }

  function normalizeSnapshotFighter(entry = {}, index = 0) {
    if (!Array.isArray(entry)) return entry || {};
    return {
      playerId: entry[0],
      name: entry[1],
      themeIndex: entry[2] ?? index,
      skinKey: entry[3],
      damage: entry[4],
      stocks: entry[5],
      koCount: entry[6],
      x: entry[7],
      y: entry[8],
      z: entry[9],
      vx: entry[10],
      vy: entry[11],
      vz: entry[12],
      facing: entry[13],
      aimX: entry[14],
      aimZ: entry[15],
      grounded: Boolean(entry[16]),
      jumpsUsed: entry[17],
      respawnTimer: entry[18],
      invulnTimer: entry[19],
      stunTimer: entry[20],
      flashTimer: entry[21],
      comboStep: entry[22],
      comboTimer: entry[23],
      currentMoveKey: entry[24],
      movePhase: entry[25],
      moveTimer: entry[26],
      inputSeq: entry[27]
    };
  }

  function getSnapshotFighters(snapshot = {}) {
    const fighters = Array.isArray(snapshot.fighters)
      ? snapshot.fighters
      : Array.isArray(snapshot.f)
        ? snapshot.f
        : [];
    return fighters.map(normalizeSnapshotFighter);
  }

  function getSnapshotSequence(snapshot = {}) {
    const seq = Number(snapshot.seq ?? snapshot.q ?? 0);
    return Number.isFinite(seq) ? seq : 0;
  }

  function queueRemoteSnapshot(snapshot = {}, snapshotFighters = []) {
    const receivedAt = performance.now();
    const elapsedMs = Number(snapshot.elapsedMs ?? snapshot.e ?? 0);
    if (!Number.isFinite(elapsedMs)) return false;

    const seq = getSnapshotSequence(snapshot);
    if (seq && seq <= net.lastSnapshotSeq - 10) {
      return false;
    }

    const duplicate = net.snapshotBuffer.some((entry) => (
      (seq && entry.seq === seq) || (!seq && Math.abs(entry.elapsedMs - elapsedMs) < 0.5)
    ));
    if (duplicate) return false;

    const fighterMap = new Map();
    snapshotFighters.forEach((fighter) => {
      const playerId = String(fighter.playerId || "");
      if (playerId) fighterMap.set(playerId, fighter);
    });

    net.snapshotBuffer.push({
      seq,
      receivedAt,
      elapsedMs,
      fighters: snapshotFighters,
      fighterMap
    });
    net.snapshotBuffer.sort((left, right) => (
      left.elapsedMs - right.elapsedMs || left.seq - right.seq || left.receivedAt - right.receivedAt
    ));

    if (seq) net.lastSnapshotSeq = Math.max(net.lastSnapshotSeq, seq);
    const latest = net.snapshotBuffer[net.snapshotBuffer.length - 1];
    const cutoffElapsed = latest.elapsedMs - PHYSICS.snapshotMaxBufferMs;
    net.snapshotBuffer = net.snapshotBuffer
      .filter((entry) => entry.elapsedMs >= cutoffElapsed)
      .slice(-14);

    const nextOffset = elapsedMs - receivedAt;
    net.serverTimeOffsetMs = net.serverTimeOffsetMs === null
      ? nextOffset
      : smooth(net.serverTimeOffsetMs, nextOffset, 0.12);
    net.lastSnapshotReceivedAt = receivedAt;
    return true;
  }

  function applySnapshotDiscreteState(fighter, entry = {}) {
    fighter.damage = Number(entry.damage || 0);
    fighter.stocks = Number(entry.stocks ?? fighter.stocks);
    fighter.koCount = Number(entry.koCount || 0);
    fighter.facing = Number(entry.facing || fighter.facing || 1);
    fighter.aimX = Number.isFinite(Number(entry.aimX)) ? Number(entry.aimX) : fighter.facing;
    fighter.aimZ = Number.isFinite(Number(entry.aimZ)) ? Number(entry.aimZ) : 0;
    fighter.grounded = Boolean(entry.grounded);
    fighter.jumpsUsed = Number(entry.jumpsUsed || 0);
    fighter.respawnTimer = Number(entry.respawnTimer || 0);
    fighter.invulnTimer = Number(entry.invulnTimer || 0);
    fighter.stunTimer = Number(entry.stunTimer || 0);
    fighter.flashTimer = Number(entry.flashTimer || 0);
    fighter.comboStep = Number(entry.comboStep || 0);
    fighter.comboTimer = Number(entry.comboTimer || 0);
    fighter.currentMoveKey = entry.currentMoveKey || null;
    fighter.movePhase = entry.movePhase || null;
    fighter.moveTimer = Number(entry.moveTimer || 0);
    fighter.inputSeq = Number(entry.inputSeq || 0);
    fighter.moveState = fighter.currentMoveKey
      ? {
          key: fighter.currentMoveKey,
          phase: fighter.movePhase,
          phaseTime: fighter.moveTimer,
          targetIds: new Set(),
          activated: fighter.movePhase === "active"
        }
      : null;
  }

  function applySnapshotTransform(fighter, entry = {}) {
    fighter.x = Number(entry.x || 0);
    fighter.y = Number(entry.y || 0);
    fighter.z = Number(entry.z || 0);
    fighter.vx = Number(entry.vx || 0);
    fighter.vy = Number(entry.vy || 0);
    fighter.vz = Number(entry.vz || 0);
  }

  function applyInterpolatedRemoteFighter(fighter, fromEntry, toEntry, alpha, extrapolateSeconds = 0) {
    const source = toEntry || fromEntry;
    if (!source) return;
    const t = clamp(alpha, 0, 1);
    const fromX = Number(fromEntry?.x || 0);
    const fromY = Number(fromEntry?.y || 0);
    const fromZ = Number(fromEntry?.z || 0);
    const fromVx = Number(fromEntry?.vx || 0);
    const fromVy = Number(fromEntry?.vy || 0);
    const fromVz = Number(fromEntry?.vz || 0);
    const toX = Number((toEntry || fromEntry)?.x || 0);
    const toY = Number((toEntry || fromEntry)?.y || 0);
    const toZ = Number((toEntry || fromEntry)?.z || 0);
    const toVx = Number((toEntry || fromEntry)?.vx || 0);
    const toVy = Number((toEntry || fromEntry)?.vy || 0);
    const toVz = Number((toEntry || fromEntry)?.vz || 0);

    fighter.x = lerp(fromX, toX, t) + toVx * extrapolateSeconds;
    fighter.y = lerp(fromY, toY, t) + toVy * extrapolateSeconds;
    fighter.z = lerp(fromZ, toZ, t) + toVz * extrapolateSeconds;
    fighter.vx = lerp(fromVx, toVx, t);
    fighter.vy = lerp(fromVy, toVy, t);
    fighter.vz = lerp(fromVz, toVz, t);
    applySnapshotDiscreteState(fighter, source);
    fighter.netSnapshotReady = true;
  }

  function applyBufferedRemoteSnapshots(nowMs = performance.now()) {
    if (match.authoritative || !match.active || match.ended || net.snapshotBuffer.length === 0) return;
    const latest = net.snapshotBuffer[net.snapshotBuffer.length - 1];
    const estimatedServerNow = net.serverTimeOffsetMs === null
      ? latest.elapsedMs
      : nowMs + net.serverTimeOffsetMs;
    const targetElapsed = estimatedServerNow - PHYSICS.snapshotRenderDelayMs;

    let fromSnapshot = net.snapshotBuffer[0];
    let toSnapshot = null;
    for (let index = 0; index < net.snapshotBuffer.length - 1; index += 1) {
      const current = net.snapshotBuffer[index];
      const next = net.snapshotBuffer[index + 1];
      if (current.elapsedMs <= targetElapsed && targetElapsed <= next.elapsedMs) {
        fromSnapshot = current;
        toSnapshot = next;
        break;
      }
      if (current.elapsedMs <= targetElapsed) {
        fromSnapshot = current;
      }
    }

    let alpha = 0;
    let extrapolateSeconds = 0;
    if (toSnapshot) {
      const span = Math.max(1, toSnapshot.elapsedMs - fromSnapshot.elapsedMs);
      alpha = clamp((targetElapsed - fromSnapshot.elapsedMs) / span, 0, 1);
    } else {
      const extrapolateMs = clamp(targetElapsed - fromSnapshot.elapsedMs, 0, PHYSICS.snapshotMaxExtrapolateMs);
      extrapolateSeconds = extrapolateMs / 1000;
    }

    match.fighters.forEach((fighter, playerId) => {
      if (playerId === state.localPlayerId) return;
      const fromEntry = fromSnapshot.fighterMap.get(playerId);
      const toEntry = toSnapshot?.fighterMap.get(playerId) || null;
      if (!fromEntry) return;
      applyInterpolatedRemoteFighter(fighter, fromEntry, toEntry, alpha, extrapolateSeconds);
    });

    match.elapsedMs = Math.max(match.elapsedMs, Math.min(estimatedServerNow, latest.elapsedMs + PHYSICS.snapshotMaxExtrapolateMs));
  }

  function applyRemoteSnapshot(snapshot = {}) {
    const snapshotFighters = getSnapshotFighters(snapshot);
    if (!snapshot || !snapshotFighters.length) return;
    const snapshotMatchId = snapshot.matchId || snapshot.m;
    const snapshotRoomId = snapshot.roomId || snapshot.r;
    const snapshotElapsedMs = Number(snapshot.elapsedMs ?? snapshot.e ?? 0);
    const snapshotTimeLimitMs = Number(snapshot.timeLimitMs ?? snapshot.t ?? PHYSICS.timeLimitMs);
    const snapshotEnded = Boolean(snapshot.ended ?? snapshot.n);
    const snapshotSummary = Array.isArray(snapshot.summary) ? snapshot.summary : Array.isArray(snapshot.u) ? snapshot.u : null;
    const snapshotWinnerId = snapshot.winnerId || snapshot.w || null;

    if (!match.matchId || snapshotMatchId !== match.matchId) {
      const roster = snapshotFighters.map((fighter, index) => ({
        playerId: fighter.playerId,
        name: fighter.name,
        themeIndex: fighter.themeIndex ?? index,
        spawnIndex: index
      }));
      beginMatch(roster, {
        authoritative: false,
        practice: false,
        timeLimitMs: Number.isFinite(snapshotTimeLimitMs) ? snapshotTimeLimitMs : PHYSICS.timeLimitMs,
        roomId: snapshotRoomId || state.currentRoom?.roomId || null,
        matchId: snapshotMatchId || `remote_${Date.now().toString(36)}`
      });
    }

    const acceptedSnapshot = match.authoritative
      ? true
      : queueRemoteSnapshot(snapshot, snapshotFighters);
    if (!acceptedSnapshot && !snapshotEnded) return;

    const activeIds = new Set();
    snapshotFighters.forEach((entry, index) => {
      const playerId = String(entry.playerId || "");
      if (!playerId) return;
      activeIds.add(playerId);
      let fighter = match.fighters.get(playerId);
      if (!fighter) {
        fighter = createFighter({
          playerId,
          name: entry.name,
          themeIndex: entry.themeIndex ?? index,
          spawnIndex: index,
          skinKey: entry.skinKey,
          isRemote: playerId !== state.localPlayerId
        });
        match.fighters.set(playerId, fighter);
      }
      fighter.name = entry.name || fighter.name;
      fighter.themeIndex = entry.themeIndex ?? fighter.themeIndex;
      fighter.skinKey = entry.skinKey || fighter.skinKey;
      fighter.theme = getSkinConfig(fighter.skinKey, fighter.themeIndex);
      const predictLocal = !match.authoritative && playerId === state.localPlayerId;
      const previousStocks = fighter.stocks;
      const serverX = Number(entry.x || 0);
      const serverY = Number(entry.y || 0);
      const serverZ = Number(entry.z || 0);
      const serverVx = Number(entry.vx || 0);
      const serverVy = Number(entry.vy || 0);
      const serverVz = Number(entry.vz || 0);
      const serverRespawnTimer = Number(entry.respawnTimer || 0);
      const serverStocks = Number(entry.stocks ?? fighter.stocks);
      const serverInputSeq = Number(entry.inputSeq || 0);
      const interpolateRemote = !match.authoritative && playerId !== state.localPlayerId && !snapshotEnded;
      fighter.damage = Number(entry.damage || 0);
      fighter.stocks = serverStocks;
      fighter.koCount = Number(entry.koCount || 0);
      let didSnapPrediction = false;
      let stalePrediction = false;
      if (predictLocal) {
        net.lastServerInputSeq = Math.max(net.lastServerInputSeq || 0, serverInputSeq);
        const correctionDistance = Math.hypot(serverX - fighter.x, serverY - fighter.y, serverZ - fighter.z);
        const isStaleServerState = serverInputSeq > 0 && serverInputSeq < net.localInputSeq;
        stalePrediction = isStaleServerState;
        const shouldSnap = previousStocks !== serverStocks || serverRespawnTimer > 0 || correctionDistance > PHYSICS.predictionSnapDistance;
        if (shouldSnap) {
          didSnapPrediction = true;
          fighter.x = serverX;
          fighter.y = serverY;
          fighter.z = serverZ;
          fighter.vx = serverVx;
          fighter.vy = serverVy;
          fighter.vz = serverVz;
        } else if (!isStaleServerState) {
          const correction = correctionDistance > PHYSICS.predictionSoftDistance ? 0.16 : 0.045;
          fighter.x += (serverX - fighter.x) * correction;
          fighter.y += (serverY - fighter.y) * correction;
          fighter.z += (serverZ - fighter.z) * correction;
          fighter.vx = smooth(fighter.vx, serverVx, 0.08);
          fighter.vy = smooth(fighter.vy, serverVy, 0.06);
          fighter.vz = smooth(fighter.vz, serverVz, 0.08);
        } else {
          fighter.inputSeq = Math.max(Number(fighter.inputSeq || 0), serverInputSeq);
        }
        fighter.inputSeq = Math.max(Number(fighter.inputSeq || 0), serverInputSeq);
      } else if (interpolateRemote) {
        const correctionDistance = Math.hypot(serverX - fighter.x, serverY - fighter.y, serverZ - fighter.z);
        const shouldHardSyncRemote = !fighter.netSnapshotReady
          || previousStocks !== serverStocks
          || serverRespawnTimer > 0
          || correctionDistance > PHYSICS.predictionSnapDistance * 1.6;
        if (shouldHardSyncRemote) {
          fighter.x = serverX;
          fighter.y = serverY;
          fighter.z = serverZ;
          fighter.vx = serverVx;
          fighter.vy = serverVy;
          fighter.vz = serverVz;
          fighter.netSnapshotReady = true;
        }
        fighter.inputSeq = serverInputSeq;
      } else {
        fighter.x = serverX;
        fighter.y = serverY;
        fighter.z = serverZ;
        fighter.vx = serverVx;
        fighter.vy = serverVy;
        fighter.vz = serverVz;
        fighter.inputSeq = serverInputSeq;
        fighter.netSnapshotReady = true;
      }
      if (!predictLocal || didSnapPrediction) {
        fighter.facing = Number(entry.facing || 1);
        fighter.aimX = Number.isFinite(Number(entry.aimX)) ? Number(entry.aimX) : fighter.facing;
        fighter.aimZ = Number.isFinite(Number(entry.aimZ)) ? Number(entry.aimZ) : 0;
      }
      if (!predictLocal || didSnapPrediction) {
        fighter.grounded = Boolean(entry.grounded);
        fighter.jumpsUsed = Number(entry.jumpsUsed || 0);
      }
      fighter.respawnTimer = serverRespawnTimer;
      fighter.invulnTimer = Number(entry.invulnTimer || 0);
      fighter.stunTimer = Number(entry.stunTimer || 0);
      fighter.flashTimer = Number(entry.flashTimer || 0);
      if (!predictLocal || didSnapPrediction || !stalePrediction) {
        fighter.comboStep = Number(entry.comboStep || 0);
        fighter.comboTimer = Number(entry.comboTimer || 0);
        const keepPredictedMove = predictLocal && fighter.moveState && !entry.currentMoveKey && fighter.moveTimer > 0.02;
        if (!keepPredictedMove) {
          fighter.currentMoveKey = entry.currentMoveKey || null;
          fighter.movePhase = entry.movePhase || null;
          fighter.moveTimer = Number(entry.moveTimer || 0);
          fighter.moveState = fighter.currentMoveKey
            ? { key: fighter.currentMoveKey, phase: fighter.movePhase, phaseTime: fighter.moveTimer, targetIds: new Set(), activated: fighter.movePhase === "active" }
            : null;
        }
      }
    });

    Array.from(match.fighters.keys()).forEach((playerId) => {
      if (!activeIds.has(playerId)) {
        const visual = world.fighterVisuals.get(playerId);
        if (visual) scene.remove(visual.group);
        world.fighterVisuals.delete(playerId);
        match.fighters.delete(playerId);
      }
    });

    match.elapsedMs = match.authoritative ? snapshotElapsedMs : Math.max(match.elapsedMs, snapshotElapsedMs);
    match.timeLimitMs = Number.isFinite(snapshotTimeLimitMs) ? snapshotTimeLimitMs : match.timeLimitMs;
    match.active = !snapshotEnded;
    match.ended = snapshotEnded;
    match.summary = snapshotSummary || match.summary;
    match.winnerId = snapshotWinnerId || match.winnerId;
    if (match.ended && match.summary?.length) {
      finishMatch({ summary: match.summary, winnerId: match.winnerId });
      return;
    }
    syncMatchHud();
  }

  function exportSnapshot() {
    net.snapshotSeq += 1;
    const snapshot = {
      r: match.roomId,
      m: match.matchId,
      q: net.snapshotSeq,
      e: Math.round(match.elapsedMs),
      t: match.timeLimitMs,
      f: Array.from(match.fighters.values()).map(serializeFighterCompact),
      n: match.ended ? 1 : 0,
      w: match.winnerId || ""
    };
    if (match.ended) snapshot.u = match.summary;
    return snapshot;
  }

  function stepAuthoritativeMatch(dt) {
    if (!match.active || match.ended || state.isPaused) return;
    match.elapsedMs += dt * 1000;

    match.fighters.forEach((fighter) => {
      const previousY = fighter.y;
      const wasRespawning = fighter.respawnTimer > 0;
      fighter.attackCooldown = Math.max(0, fighter.attackCooldown - dt);
      fighter.specialCooldown = Math.max(0, fighter.specialCooldown - dt);
      fighter.respawnTimer = Math.max(0, fighter.respawnTimer - dt);
      fighter.invulnTimer = Math.max(0, fighter.invulnTimer - dt);
      fighter.stunTimer = Math.max(0, fighter.stunTimer - dt);
      fighter.flashTimer = Math.max(0, fighter.flashTimer - dt);
      fighter.comboTimer = Math.max(0, fighter.comboTimer - dt);
      fighter.attackBuffer = Math.max(0, fighter.attackBuffer - dt);
      fighter.specialBuffer = Math.max(0, fighter.specialBuffer - dt);
      if (fighter.comboTimer <= 0.001 && !fighter.moveState) {
        fighter.comboStep = 0;
      }

      if (fighter.stocks <= 0) {
        fighter.respawnTimer = 0;
        clearMoveState(fighter);
        return;
      }

      if (wasRespawning) {
        if (fighter.respawnTimer <= 0) {
          resetFighterForSpawn(fighter, fighter.spawnIndex);
        }
        return;
      }

      const remoteInputState = !fighter.isBot && !fighter.controlSlot && fighter.playerId !== state.localPlayerId
        ? getRemoteInputForHost(fighter.playerId)
        : null;
      const input = fighter.isBot
        ? computeBotInput(fighter)
        : fighter.controlSlot
          ? getMergedInput(fighter.controlSlot)
          : fighter.playerId === state.localPlayerId
            ? getMergedInput("p1")
            : remoteInputState?.input || createInputState();
      if (remoteInputState) {
        fighter.inputSeq = Math.max(Number(fighter.inputSeq || 0), Number(remoteInputState.seq || 0));
      }
      fighter.input = input;
      const moveX = (input.right ? 1 : 0) - (input.left ? 1 : 0);
      const moveZ = (input.down ? 1 : 0) - (input.up ? 1 : 0);
      const hasMove = moveX !== 0 || moveZ !== 0;
      updateFighterAim(fighter, moveX, moveZ);

      const targetSpeed = fighter.grounded ? PHYSICS.moveSpeed : PHYSICS.airSpeed;
      const accel = fighter.grounded ? PHYSICS.groundAccel : PHYSICS.airAccel;
      const drag = fighter.grounded ? PHYSICS.friction : PHYSICS.friction * 0.4;
      const currentMove = getMoveConfig(fighter.currentMoveKey);
      const controlFactor = currentMove
        ? fighter.movePhase === "startup"
          ? currentMove.control ?? 0.25
          : fighter.movePhase === "active"
            ? Math.max(0.04, (currentMove.control ?? 0.25) * 0.6)
            : Math.max(0.08, (currentMove.control ?? 0.25) * 0.8)
        : 1;
      if (fighter.stunTimer <= 0) {
        fighter.vx = hasMove ? smooth(fighter.vx, moveX * targetSpeed * controlFactor, dt * accel) : smooth(fighter.vx, 0, dt * drag);
        fighter.vz = hasMove ? smooth(fighter.vz, moveZ * targetSpeed * controlFactor, dt * accel) : smooth(fighter.vz, 0, dt * drag);
      }

      if (input.jump && !fighter.lastJumpPressed) {
        if (fighter.grounded) {
          fighter.vy = PHYSICS.jumpSpeed;
          fighter.grounded = false;
          fighter.jumpsUsed = 1;
        } else if (fighter.jumpsUsed < 2) {
          fighter.vy = PHYSICS.doubleJumpSpeed;
          fighter.jumpsUsed += 1;
        }
      }
      fighter.lastJumpPressed = Boolean(input.jump);

      if (input.attack && !fighter.lastAttackPressed) {
        fighter.attackBuffer = 0.22;
      }
      fighter.lastAttackPressed = Boolean(input.attack);

      if (input.special && !fighter.lastSpecialPressed) {
        fighter.specialBuffer = 0.22;
      }
      fighter.lastSpecialPressed = Boolean(input.special);

      if (!fighter.moveState && fighter.stunTimer <= 0) {
        if (fighter.specialBuffer > 0.01) {
          if (startMove(fighter, selectSpecialMove(fighter, input))) {
            fighter.specialBuffer = 0;
          }
        } else if (fighter.attackBuffer > 0.01) {
          if (startMove(fighter, selectAttackMove(fighter, input))) {
            fighter.attackBuffer = 0;
          }
        }
      }

      advanceMoveState(fighter, dt);

      fighter.vy = Math.max(PHYSICS.maxFall, fighter.vy - PHYSICS.gravity * dt);
      fighter.x += fighter.vx * dt;
      fighter.y += fighter.vy * dt;
      fighter.z += fighter.vz * dt;

      fighter.grounded = false;
      landOnPlatform(fighter, previousY);
      handleRingOut(fighter);
    });

    syncMatchHud();

    const living = Array.from(match.fighters.values()).filter((fighter) => fighter.stocks > 0);
    if (!match.practice && living.length <= 1) {
      finishMatch({ winnerId: living[0]?.playerId || null });
      if (match.roomId && match.authoritative) {
        void sendRoomEvent("match_end", {
          matchId: match.matchId,
          summary: buildMatchSummary(),
          winnerId: living[0]?.playerId || null
        });
      }
      return;
    }

    if (!match.practice && match.timeLimitMs > 0 && match.elapsedMs >= match.timeLimitMs) {
      const summary = buildMatchSummary();
      finishMatch({ summary, winnerId: summary[0]?.playerId || null });
      if (match.roomId && match.authoritative) {
        void sendRoomEvent("match_end", {
          matchId: match.matchId,
          summary,
          winnerId: summary[0]?.playerId || null
        });
      }
    }
  }

  async function sendRoomEvent(eventName, payload = {}, options = {}) {
    if (!sdk?.multiplayer || !state.currentRoom) return;
    const roomId = options.roomId || roomIdOf(state.currentRoom);
    if (!roomId) return;
    const targetPlayerId = options.targetPlayerId || null;
    const isTransient = options.transient ?? (eventName === "snapshot" || eventName === "input");

    try {
      const sendOptions = {
        room_id: roomId,
        target_player_id: targetPlayerId || undefined,
        transient: isTransient || undefined,
        noAck: isTransient || undefined
      };
      if (isTransient) {
        void sdk.multiplayer.send(eventName, payload, sendOptions).catch((error) => {
          const errorMessage = String(error?.message || "");
          if (!/(timed out|rate limit)/i.test(errorMessage)) {
            console.warn("[SuperSmash3D] Failed to send fast room event:", eventName, error);
          }
        });
        return true;
      }

      await sdk.multiplayer.send(eventName, payload, sendOptions);
      return true;
    } catch (error) {
      const errorMessage = String(error?.message || "");
      if (!isTransient || !/(timed out|rate limit)/i.test(errorMessage)) {
        console.warn("[SuperSmash3D] Failed to send room event:", eventName, error);
      }
      return false;
    }
  }

  function sendLocalInputNow(force = false) {
    if (!state.currentRoom || !match.active || match.ended || match.authoritative) return false;
    const nowMs = performance.now();
    const input = getMergedInput("p1");
    const signature = serializeInput(input);
    const changed = signature !== net.inputSignature;
    const elapsedMs = nowMs - net.lastInputSentAt;
    const burstActive = !changed && signature === net.inputBurstSignature && nowMs < net.inputBurstUntil;

    if (force) {
      if (!changed && elapsedMs < PHYSICS.inputIntervalMs) return false;
    } else {
      if (elapsedMs < PHYSICS.inputIntervalMs) return false;
      if (!changed && !burstActive && elapsedMs < PHYSICS.inputKeepaliveMs) return false;
    }

    if (changed) {
      net.inputBurstSignature = signature;
      net.inputBurstUntil = nowMs + PHYSICS.remoteActionHoldMs;
    }
    net.inputSignature = signature;
    net.lastInputSentAt = nowMs;
    net.localInputSeq += 1;
    const localFighter = match.fighters.get(state.localPlayerId);
    if (localFighter) {
      localFighter.inputSeq = net.localInputSeq;
    }
    void sendRoomEvent("input", {
      m: encodeInputMask(input),
      s: net.localInputSeq,
      t: Math.round(nowMs)
    });
    return true;
  }

  function clearAutoStartTimer() {
    if (net.autoStartTimer) {
      clearTimeout(net.autoStartTimer);
      net.autoStartTimer = null;
    }
  }

  function maybeScheduleRoomAutostart() {
    clearAutoStartTimer();
  }

  async function setReadyState(ready) {
    const unavailableReason = getMiniAppRealtimeUnavailableReason();
    if (unavailableReason) {
      setStatus(unavailableReason, "danger", 5200);
      return;
    }
    if (!state.currentRoom) return;
    try {
      const nextState = await sdk.multiplayer.updateState({
        ...buildRoomPlayerState(ready)
      }, { room_id: roomIdOf(state.currentRoom) });
      handleMultiplayerStateChange(nextState);
    } catch (error) {
      console.warn("[SuperSmash3D] Failed to update ready state:", error);
      setStatus(error?.message || "Не удалось обновить ready-статус.", "danger", 5200);
    }
  }

  async function leaveCurrentRoom(options = {}) {
    clearAutoStartTimer();
    const roomToLeave = state.currentRoom;
    const queueToLeave = state.currentQueue;
    const shouldLeaveVoice = state.voiceConnected && sdk?.voice;
    state.autoVoiceRequested = false;
    state.voiceConnecting = false;
    state.invitePanelOpen = false;
    net.remoteInputs.clear();
    setCurrentRoomState(null, null);
    clearMatchWorld();
    if (!options.quiet) {
      state.mode = "solo";
      setPhase("menu");
      setStatus("You left the multiplayer arena.", "info");
    }

    const cleanupServerRoom = async () => {
      if (shouldLeaveVoice) {
        try {
          const voiceState = await sdk.voice.leave();
          applyVoiceState(voiceState);
        } catch {}
      }
      if (sdk?.multiplayer) {
        try {
          if (queueToLeave) {
            await sdk.multiplayer.leaveMatchmaking({ queue_key: queueToLeave.queueKey || queueToLeave.queue_key || "super-smash-3d" });
          }
        } catch {}
        try {
          if (roomToLeave) {
            await sdk.multiplayer.leaveRoom({ room_id: roomIdOf(roomToLeave) });
          }
        } catch {}
      }
    };

    if (options.background) {
      void cleanupServerRoom();
    } else {
      await cleanupServerRoom();
    }
  }

  async function createPrivateRoom() {
    const unavailableReason = getMiniAppRealtimeUnavailableReason();
    if (unavailableReason) {
      setStatus(unavailableReason, "danger", 5200);
      return;
    }
    await leaveCurrentRoom({ quiet: true, background: true });
    state.mode = "room";
    state.localMode = "online";
    state.autoVoiceRequested = true;
    state.voiceConnecting = false;
    try {
      setStatus("Создаю приватную комнату...", "info", 0);
      const nextState = await sdk.multiplayer.createRoom({
        mode: "room",
        visibility: "private",
        title: "Super Smash 3D",
        min_players: 2,
        max_players: 2,
        state: buildRoomPlayerState(true),
        metadata: { game: "super-smash-3d", mapId: state.selectedMapId }
      });
      if (!nextState?.room) {
        throw new Error("Сервер не вернул состояние комнаты.");
      }
      handleMultiplayerStateChange(nextState);
      setPhase("lobby");
      setStatus("Приватная комната создана. Поделись кодом и зови соперника.", "success");
    } catch (error) {
      state.autoVoiceRequested = false;
      state.voiceConnecting = false;
      renderVoiceStatus();
      console.warn("[SuperSmash3D] Failed to create room:", error);
      setStatus(error?.message || "Не удалось создать комнату прямо сейчас.", "danger", 5200);
    }
  }

  async function joinPrivateRoom() {
    const roomCode = String(ui.joinCodeInput.value || "").trim().toUpperCase();
    if (!roomCode) {
      setStatus("Сначала введи код комнаты.", "danger");
      return;
    }
    const unavailableReason = getMiniAppRealtimeUnavailableReason();
    if (unavailableReason) {
      setStatus(unavailableReason, "danger", 5200);
      return;
    }
    await leaveCurrentRoom({ quiet: true, background: true });
    state.mode = "room";
    state.localMode = "online";
    state.autoVoiceRequested = true;
    state.voiceConnecting = false;
    try {
      setStatus(`Вхожу в комнату ${roomCode}...`, "info", 0);
      const nextState = await sdk.multiplayer.joinRoom({
        room_code: roomCode,
        max_players: 2,
        state: buildRoomPlayerState(true)
      });
      if (!nextState?.room) {
        throw new Error("Сервер не вернул состояние комнаты.");
      }
      handleMultiplayerStateChange(nextState);
      setPhase("lobby");
      setStatus(`Ты вошел в комнату ${roomCode}.`, "success");
    } catch (error) {
      state.autoVoiceRequested = false;
      state.voiceConnecting = false;
      renderVoiceStatus();
      console.warn("[SuperSmash3D] Failed to join room:", error);
      setStatus(error?.message || "Комната не найдена или уже заполнена.", "danger", 5200);
    }
  }

  async function joinQuickMatch() {
    const unavailableReason = getMiniAppRealtimeUnavailableReason();
    if (unavailableReason) {
      setStatus(unavailableReason, "danger", 5200);
      return;
    }
    await leaveCurrentRoom({ quiet: true, background: true });
    state.mode = "quick";
    state.localMode = "online";
    state.autoVoiceRequested = true;
    state.voiceConnecting = false;
    setPhase("lobby");
    renderLobby();
    try {
      setStatus("Подключаю Quick Match...", "info", 0);
      const nextState = await sdk.multiplayer.joinMatchmaking({
        queue_key: "super-smash-3d",
        min_players: 2,
        max_players: 2,
        metadata: { game: "super-smash-3d", mode: "platform-fighter", mapId: state.selectedMapId }
      });
      handleMultiplayerStateChange(nextState);
      setStatus("Ищу соперника...", "info", 0);
    } catch (error) {
      state.autoVoiceRequested = false;
      state.voiceConnecting = false;
      renderVoiceStatus();
      console.warn("[SuperSmash3D] Failed to join matchmaking:", error);
      setStatus(error?.message || "Quick Match сейчас недоступен.", "danger", 5200);
      setPhase("menu");
    }
  }

  async function startHostedRoomMatch() {
    const room = state.currentRoom;
    if (!room) {
      setStatus("Комната еще не синхронизировалась. Попробуй снова через секунду.", "danger");
      return;
    }
    if (!isLocalRoomHost(room)) {
      setStatus("Матч может запустить только хост комнаты.", "danger");
      return;
    }
    const players = roomPlayersOf(room);
    if (players.length < 2) {
      setStatus("Для старта нужны минимум 2 бойца.", "danger");
      return;
    }
    const notReadyPlayers = players.filter((player) => !isPlayerReady(player));
    if (notReadyPlayers.length) {
      const waitingNames = notReadyPlayers.map((player) => playerNameOf(player)).filter(Boolean).join(", ");
      setStatus(`Не все игроки готовы${waitingNames ? `: ${waitingNames}` : ""}.`, "danger");
      return;
    }
    const roster = createRosterFromRoom(room);
    if (roster.length < 2) {
      setStatus("Для старта нужны минимум 2 бойца.", "danger");
      return;
    }
    const matchId = `room_${Date.now().toString(36)}`;
    setStatus("Запускаю бой для всех игроков...", "info", 0);
    const startDelivered = await sendRoomEvent("match_start", {
      matchId,
      roomId: roomIdOf(room),
      timeLimitMs: PHYSICS.timeLimitMs,
      roster,
      mapId: state.selectedMapId
    });
    if (!startDelivered) {
      setStatus("Не удалось отправить старт матча второму игроку. Попробуй ещё раз.", "danger", 5200);
      return;
    }
    beginMatch(roster, {
      authoritative: true,
      practice: false,
      roomId: roomIdOf(room),
      matchId,
      timeLimitMs: PHYSICS.timeLimitMs,
      mapId: state.selectedMapId
    });
    void sendRoomEvent("snapshot", exportSnapshot(), { transient: true });
  }

  function handleMultiplayerStateChange(nextState) {
    if (nextState?.playerId) {
      state.localPlayerId = nextState.playerId;
    }
    const room = nextState?.room || null;
    const queue = nextState?.queue || null;
    setCurrentRoomState(room, queue);
    if (match.active && !match.ended) {
      setPhase("match");
      forceHideLobbyOverlaysForMatch();
      updateHud();
      return;
    }
    if (queue && !room) {
      ui.lobbyCopy.textContent = "Quick Match собирает бойцов. Как только найдется соперник, ты сразу попадешь в комнату.";
      setPhase("lobby");
    } else if (room && !match.active && !match.ended) {
      setPhase("lobby");
    } else if (!room && !queue && (state.mode === "room" || state.mode === "quick") && !match.active) {
      setPhase("menu");
    }
    if (state.mode === "quick" && room && !state.localReady && sdk?.multiplayer) {
      void setReadyState(true);
    }
    if (room && state.autoVoiceRequested && sdk?.voice && !state.voiceConnected && !state.voiceConnecting) {
      void toggleVoice();
    }
    renderLobby();
    updateHud();
    maybeScheduleRoomAutostart();
  }

  function handleRoomEvent(event = {}) {
    const eventName = String(event.eventName || event.event_name || "").trim();
    const payload = event.payload || {};
    const senderId = playerIdOf(event.sender) || event.sender?.username || null;
    if (!eventName) return;

    if (eventName === "input") {
      if (!net.isHost || !senderId || senderId === state.localPlayerId) return;
      applyRemoteInputEvent(senderId, payload);
      return;
    }

    if (eventName === "match_start") {
      if (senderId === state.localPlayerId && net.isHost) return;
      state.mode = state.currentQueue ? "quick" : "room";
      beginMatch(Array.isArray(payload.roster) ? payload.roster : createRosterFromRoom(state.currentRoom), {
        authoritative: false,
        practice: false,
        roomId: payload.roomId || roomIdOf(state.currentRoom),
        matchId: payload.matchId,
        timeLimitMs: Number.isFinite(payload.timeLimitMs) ? payload.timeLimitMs : PHYSICS.timeLimitMs,
        mapId: payload.mapId || state.selectedMapId
      });
      return;
    }

    if (eventName === "snapshot") {
      if (net.isHost) return;
      applyRemoteSnapshot(payload);
      return;
    }

    if (eventName === "match_end") {
      if (senderId === state.localPlayerId && net.isHost) return;
      finishMatch({
        summary: Array.isArray(payload.summary) ? payload.summary : buildMatchSummary(),
        winnerId: payload.winnerId || null
      });
    }
  }

  async function toggleVoice() {
    if (!sdk?.voice || !state.currentRoom) {
      setStatus("Голос включается только внутри мультиплеерной комнаты.", "danger");
      return;
    }
    try {
      if (!state.voiceConnected) {
        state.voiceConnecting = true;
        renderVoiceStatus();
        const voiceState = await sdk.voice.join({
          room_id: roomIdOf(state.currentRoom),
          channel_id: "main"
        });
        state.autoVoiceRequested = false;
        applyVoiceState(voiceState);
        setStatus("Голосовой чат подключен.", "success");
        return;
      }
      if (state.voiceMuted) {
        const voiceState = await sdk.voice.setMuted(false);
        applyVoiceState(voiceState);
        setStatus("Микрофон снова включен.", "success");
        return;
      }
      const voiceState = await sdk.voice.leave();
      state.autoVoiceRequested = false;
      applyVoiceState(voiceState);
      setStatus("Голосовой чат отключен.", "info");
    } catch (error) {
      state.autoVoiceRequested = false;
      console.warn("[SuperSmash3D] Failed to toggle voice:", error);
      setStatus(error?.message || "Голосовой чат сейчас недоступен.", "danger");
    } finally {
      state.voiceConnecting = false;
      renderVoiceStatus();
    }
  }

  function updateKeyboardInput(event, pressed) {
    switch (event.code) {
      case "KeyA":
        state.inputSources.p1.keyboard.left = pressed;
        break;
      case "KeyD":
        state.inputSources.p1.keyboard.right = pressed;
        break;
      case "KeyW":
        state.inputSources.p1.keyboard.up = pressed;
        break;
      case "KeyS":
        state.inputSources.p1.keyboard.down = pressed;
        break;
      case "Space":
        state.inputSources.p1.keyboard.jump = pressed;
        break;
      case "KeyF":
        state.inputSources.p1.keyboard.attack = pressed;
        break;
      case "KeyG":
      case "ShiftLeft":
        state.inputSources.p1.keyboard.special = pressed;
        break;
      case "ArrowLeft":
        state.inputSources.p2.keyboard.left = pressed;
        break;
      case "ArrowRight":
        state.inputSources.p2.keyboard.right = pressed;
        break;
      case "ArrowUp":
        state.inputSources.p2.keyboard.up = pressed;
        break;
      case "ArrowDown":
        state.inputSources.p2.keyboard.down = pressed;
        break;
      case "Numpad0":
      case "ShiftRight":
        state.inputSources.p2.keyboard.jump = pressed;
        break;
      case "Enter":
      case "NumpadEnter":
        state.inputSources.p2.keyboard.attack = pressed;
        break;
      case "Slash":
      case "Period":
        state.inputSources.p2.keyboard.special = pressed;
        break;
      default:
        return;
    }
    event.preventDefault();
    sendLocalInputNow(true);
  }

  function bindTouchControl(element, key, controlSlot = "p1") {
    if (!element) return;
    const activate = (event) => {
      state.inputSources[controlSlot].touch[key] = true;
      if (controlSlot === "p1") sendLocalInputNow(true);
      event.preventDefault();
    };
    const release = (event) => {
      state.inputSources[controlSlot].touch[key] = false;
      if (controlSlot === "p1") sendLocalInputNow(true);
      event.preventDefault();
    };
    element.addEventListener("pointerdown", activate);
    element.addEventListener("pointerup", release);
    element.addEventListener("pointerleave", release);
    element.addEventListener("pointercancel", release);
  }

  function togglePause() {
    if (!match.active || state.mode === "room" || state.mode === "quick") return;
    state.isPaused = !state.isPaused;
    if (state.isPaused) {
      setPhase("pause");
    } else {
      setPhase("match");
    }
    updateHud();
  }

  async function handleBackAction() {
    if (state.phase === "pause") {
      togglePause();
      return;
    }
    if (state.phase === "result") {
      if (state.currentRoom) {
        setPhase("lobby");
        renderLobby();
      } else {
        clearMatchWorld();
        setPhase("menu");
      }
      return;
    }
    if (state.phase === "match") {
      if (state.mode === "room" || state.mode === "quick") {
        await leaveCurrentRoom();
      } else {
        togglePause();
      }
      return;
    }
    if (state.phase === "lobby") {
      await leaveCurrentRoom();
      return;
    }
    if (sdk?.close) {
      sdk.close();
    }
  }

  function bindUi() {
    ui.soloButton.addEventListener("click", async () => {
      await leaveCurrentRoom({ quiet: true });
      startLocalVersus();
    });
    ui.spectateButton.addEventListener("click", async () => {
      await leaveCurrentRoom({ quiet: true });
      startPracticeStage();
    });
    ui.createRoomButton.addEventListener("click", () => {
      void createPrivateRoom();
    });
    ui.quickMatchButton.addEventListener("click", () => {
      void joinQuickMatch();
    });
    ui.joinRoomButton.addEventListener("click", () => {
      void joinPrivateRoom();
    });
    ui.pauseButton.addEventListener("click", togglePause);
    ui.resumeButton.addEventListener("click", togglePause);
    ui.pauseExitButton.addEventListener("click", () => {
      state.isPaused = false;
      clearMatchWorld();
      setPhase("menu");
    });
    ui.leaveButton.addEventListener("click", () => {
      if (state.currentRoom || state.currentQueue) {
        void leaveCurrentRoom();
      } else {
        clearMatchWorld();
        setPhase("menu");
      }
    });
    ui.lobbyLeaveButton.addEventListener("click", () => {
      void leaveCurrentRoom();
    });
    ui.readyButton.addEventListener("click", () => {
      void setReadyState(!state.localReady);
    });
    ui.lobbyReadyButton.addEventListener("click", () => {
      void setReadyState(!state.localReady);
    });
    ui.startMatchButton.addEventListener("click", () => {
      void startHostedRoomMatch();
    });
    ui.lobbyStartButton.addEventListener("click", () => {
      void startHostedRoomMatch();
    });
    if (ui.inviteFriendButton) {
      ui.inviteFriendButton.addEventListener("click", () => {
        void openInvitePanel();
      });
    }
    if (ui.lobbyInviteButton) {
      ui.lobbyInviteButton.addEventListener("click", () => {
        void openInvitePanel();
      });
    }
    if (ui.sendInviteButton) {
      ui.sendInviteButton.addEventListener("click", () => {
        void sendInviteToSelectedContact();
      });
    }
    if (ui.closeInvitePanelButton) {
      ui.closeInvitePanelButton.addEventListener("click", closeInvitePanel);
    }
    ui.copyCodeButton.addEventListener("click", async () => {
      const roomCode = roomCodeOf(state.currentRoom);
      if (await copyText(roomCode)) {
        setStatus(`Код комнаты ${roomCode} скопирован.`, "success");
      }
    });
    ui.voiceButton.addEventListener("click", () => {
      void toggleVoice();
    });
    ui.rematchButton.addEventListener("click", () => {
      if (state.currentRoom) {
        setPhase("lobby");
        renderLobby();
        updateHud();
        maybeScheduleRoomAutostart();
        return;
      }
      if (state.mode === "practice") {
        startPracticeStage();
      } else if (state.mode === "local") {
        startLocalVersus();
      } else {
        startSoloClash();
      }
    });
    ui.resultMenuButton.addEventListener("click", () => {
      if (state.currentRoom) {
        setPhase("lobby");
        renderLobby();
        updateHud();
        return;
      }
      clearMatchWorld();
      setPhase("menu");
    });
    ui.joinCodeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        void joinPrivateRoom();
      }
    });
    ui.mapSelect?.addEventListener("change", (event) => {
      applySelectedMap(event.target.value);
      renderMenuSelections();
    });
    ui.skinP1Select?.addEventListener("change", (event) => {
      const nextKey = event.target.value;
      if (!applySkinSelection("p1", nextKey)) {
        ui.skinP1Select.value = state.selectedSkins.p1;
      }
      syncSkinActionButtons();
    });
    ui.skinP2Select?.addEventListener("change", (event) => {
      const nextKey = event.target.value;
      if (!applySkinSelection("p2", nextKey)) {
        ui.skinP2Select.value = state.selectedSkins.p2;
      }
      syncSkinActionButtons();
    });
    ui.skinP1BuyButton?.addEventListener("click", () => {
      void purchaseSkin(ui.skinP1Select?.value || state.selectedSkins.p1, "p1");
    });
    ui.skinP2BuyButton?.addEventListener("click", () => {
      void purchaseSkin(ui.skinP2Select?.value || state.selectedSkins.p2, "p2");
    });
    ui.skinStoreList?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const applyKey = target.getAttribute("data-apply-skin");
      const buyKey = target.getAttribute("data-buy-skin");
      if (applyKey) {
        const preferredSlot = !isSkinOwned(state.selectedSkins.p1) || state.selectedSkins.p1 === applyKey ? "p1" : "p2";
        if (!applySkinSelection(preferredSlot, applyKey, { allowLocked: isSkinOwned(applyKey) })) {
          setStatus(`Сначала купи ${SKIN_LIBRARY[applyKey]?.name || "скин"}.`, "danger");
        }
      }
      if (buyKey) {
        void purchaseSkin(buyKey, "p1");
      }
    });
    bindTouchControl(ui.touchLeft, "left");
    bindTouchControl(ui.touchRight, "right");
    bindTouchControl(ui.touchUp, "up");
    bindTouchControl(ui.touchDown, "down");
    bindTouchControl(ui.touchJump, "jump");
    bindTouchControl(ui.touchAttack, "attack");
    bindTouchControl(ui.touchSpecial, "special");
    ui.root.addEventListener("pointerdown", focusGameViewport, { passive: true });
    renderer.domElement.addEventListener("pointerdown", focusGameViewport, { passive: true });
    sdk?.on?.("focusRestored", () => {
      resetKeyboardInput();
      focusGameViewport();
    });
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        event.preventDefault();
        void handleBackAction();
        return;
      }
      updateKeyboardInput(event, true);
    });
    window.addEventListener("keyup", (event) => updateKeyboardInput(event, false));
    window.addEventListener("blur", resetKeyboardInput);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) resetKeyboardInput();
    });
    window.addEventListener("resize", () => applyOrientation(state.orientation));
  }

  function animateBackground(delta, nowSeconds) {
    world.platformMeshes.forEach(({ mesh, platform }, index) => {
      mesh.position.y = platform.y + Math.sin(nowSeconds * (0.8 + index * 0.25) + index) * platform.bob;
      mesh.rotation.z = Math.sin(nowSeconds * 0.25 + index) * 0.015;
    });
    world.background.rings.forEach((entry, index) => {
      entry.mesh.rotation[entry.axis] += delta * entry.speed;
      entry.mesh.position.y += Math.sin(nowSeconds * (0.5 + index * 0.15) + index) * delta * 0.6;
    });
    world.background.crystals.forEach((crystal, index) => {
      crystal.rotation.x += delta * (0.22 + index * 0.01);
      crystal.rotation.y += delta * (0.4 + index * 0.012);
      crystal.position.y = crystal.userData.baseY + Math.sin(nowSeconds * crystal.userData.speed + crystal.userData.wobble) * 0.7;
    });
    if (world.background.sparkles) {
      world.background.sparkles.rotation.y += delta * 0.015;
    }
  }

  function updateCamera(delta) {
    const fighters = Array.from(match.fighters.values()).filter((fighter) => fighter.stocks > 0 && fighter.respawnTimer <= 0);
    let focusX = 0;
    let focusY = 6;
    let focusZ = 0;
    let spread = 10;
    if (fighters.length) {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      let minZ = Infinity;
      let maxZ = -Infinity;
      fighters.forEach((fighter) => {
        minX = Math.min(minX, fighter.x);
        maxX = Math.max(maxX, fighter.x);
        minY = Math.min(minY, fighter.y);
        maxY = Math.max(maxY, fighter.y);
        minZ = Math.min(minZ, fighter.z);
        maxZ = Math.max(maxZ, fighter.z);
      });
      focusX = (minX + maxX) * 0.5;
      focusY = (minY + maxY) * 0.5 + 2.8;
      focusZ = (minZ + maxZ) * 0.5;
      spread = Math.max(10, (maxX - minX) * 0.9 + (maxZ - minZ) * 0.7 + (maxY - minY) * 0.4);
    }
    const distance = state.orientation.isLandscape ? 19 + spread * 0.46 : 23 + spread * 0.58;
    const height = state.orientation.isLandscape ? 11 + spread * 0.22 : 13.5 + spread * 0.28;
    camera.position.x = smooth(camera.position.x, focusX, delta * 2.8);
    camera.position.y = smooth(camera.position.y, focusY + height, delta * 2.6);
    camera.position.z = smooth(camera.position.z, focusZ + distance, delta * 2.3);
    camera.lookAt(focusX, focusY, focusZ);
  }

  function maybeSendRealtimeFrames(nowMs) {
    if (state.currentRoom && match.active && !match.ended) {
      if (match.authoritative && nowMs - net.lastSnapshotSentAt >= PHYSICS.snapshotIntervalMs) {
        net.lastSnapshotSentAt = nowMs;
        void sendRoomEvent("snapshot", exportSnapshot());
      }
      if (!match.authoritative && nowMs - net.lastInputSentAt >= PHYSICS.inputIntervalMs) {
        sendLocalInputNow(false);
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const delta = clamp(clock.getDelta(), 0.001, 0.04);
    const nowMs = performance.now();
    const nowSeconds = nowMs * 0.001;
    readGamepadInput();
    getMergedInput("p1");
    getMergedInput("p2");
    accumulator += delta;
    while (accumulator >= FIXED_STEP) {
      if (match.authoritative) {
        stepAuthoritativeMatch(FIXED_STEP);
      } else if (state.currentRoom && match.active) {
        stepClientPredictionMatch(FIXED_STEP);
      }
      accumulator -= FIXED_STEP;
    }
    maybeSendRealtimeFrames(nowMs);
    applyBufferedRemoteSnapshots(nowMs);
    match.fighters.forEach((fighter) => syncFighterVisual(fighter, delta));
    animateBackground(delta, nowSeconds);
    updateCamera(delta);
    renderer.render(scene, camera);
  }

  async function initializeSdk() {
    if (!sdk) {
      state.sdkReady = false;
      state.localPlayerName = "Гость";
      ui.playerNameLabel.textContent = state.localPlayerName;
      ui.playerMetaLabel.textContent = "Web preview: доступны локальная игра и тренировка. Premium-скины требуют Mini App host.";
      applyOrientation(normalizeOrientation(null));
      renderMenuSelections();
      return;
    }

    if (!state.embeddedHost) {
      state.sdkReady = false;
      state.localPlayerName = "Гость";
      ui.playerNameLabel.textContent = state.localPlayerName;
      ui.playerMetaLabel.textContent = "Игра открыта вне Mini App iframe. Локальный бой работает, комнаты и голос недоступны.";
      applyOrientation(normalizeOrientation(null));
      renderMenuSelections();
      return;
    }

    try {
      const initData = await Promise.race([
        sdk.init(),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Mini App host did not respond to SDK init")), 6000);
        })
      ]);
      state.sdkReady = true;
      sdk.ready();
      sdk.expand?.();
      sdk.setHeaderColor?.("#08111f");
      state.botUsername = typeof initData?.botUsername === "string" ? initData.botUsername.trim().toLowerCase() : null;
      state.localPlayerId = initData?.multiplayer?.playerId || initData?.user?.username || state.localPlayerId;
      state.localPlayerName = initData?.user?.display_name || initData?.user?.first_name || initData?.user?.name || initData?.user?.username || "Боец";
      ui.playerNameLabel.textContent = state.localPlayerName;
      ui.playerMetaLabel.textContent = sdk.multiplayer
        ? "Mini App realtime готов: матчмейкинг, комнаты, голос и Solana skin shop онлайн."
        : "Realtime bridge недоступен. Локальные режимы все равно работают.";
      applyOrientation(sdk.orientation?.state || initData?.orientation || null);
      applyVoiceState(sdk.voice?.state || initData?.voice || null);
      handleMultiplayerStateChange(sdk.multiplayer?.state || initData?.multiplayer || null);
      await loadOwnedSkinsFromInventory();

      sdk.orientation?.onChange((orientation) => applyOrientation(orientation));
      sdk.multiplayer?.onChange((nextState) => handleMultiplayerStateChange(nextState));
      sdk.multiplayer?.onMatchFound((nextState) => handleMultiplayerStateChange(nextState));
      sdk.multiplayer?.onEvent((event) => handleRoomEvent(event));
      sdk.voice?.onChange((nextState) => applyVoiceState(nextState));
      sdk.on?.("launchParamsChanged", (payload) => {
        const invite = extractLaunchRoomInvite({ startParams: payload?.startParams || payload?.launchParams || payload });
        if (invite) void joinRoomInvite(invite);
      });
      sdk.on?.("miniappPaymentCompleted", (eventPayload) => {
        if (eventPayload?.itemType === "skin" && eventPayload?.itemKey && SKIN_LIBRARY[eventPayload.itemKey]) {
          state.ownedSkins.add(eventPayload.itemKey);
          renderMenuSelections();
        }
      });
      sdk.backButton?.show();
      sdk.backButton?.onClick(() => {
        void handleBackAction();
      });
      const launchInvite = extractLaunchRoomInvite(initData);
      if (launchInvite) {
        void joinRoomInvite(launchInvite);
      }
      await sdk.orientation?.refresh?.();
      await sdk.multiplayer?.getState?.();
      await sdk.voice?.getState?.();
    } catch (error) {
      console.warn("[SuperSmash3D] Failed to initialize Mini App SDK:", error);
      state.sdkReady = false;
      state.localPlayerName = "Гость";
      ui.playerNameLabel.textContent = state.localPlayerName;
      ui.playerMetaLabel.textContent = "SDK не подключился. Запущен офлайн preview-режим.";
      applyOrientation(normalizeOrientation(null));
      renderMenuSelections();
    }
  }

  function boot() {
    restoreMenuSelections();
    populateMapSelect();
    applySelectedMap(state.selectedMapId);
    bindUi();
    renderLobby();
    renderFighterHud();
    renderMenuSelections();
    applyOrientation(normalizeOrientation(null));
    setPhase("menu");
    void initializeSdk();
    animate();
  }

  boot();
})();
