(() => {
  const sdk = window.NajiMiniApp || null;
  const ui = {
    startScreen: document.getElementById("startScreen"),
    finishScreen: document.getElementById("finishScreen"),
    startButton: document.getElementById("startButton"),
    pauseButton: document.getElementById("pauseButton"),
    closeButton: document.getElementById("closeButton"),
    restartButton: document.getElementById("restartButton"),
    restartQuickButton: document.getElementById("restartQuickButton"),
    shareButton: document.getElementById("shareButton"),
    touchPrimaryButton: document.getElementById("touchPrimaryButton"),
    touchRestartButton: document.getElementById("touchRestartButton"),
    finishTitle: document.getElementById("finishTitle"),
    finishSummary: document.getElementById("finishSummary"),
    positionValue: document.getElementById("positionValue"),
    lapValue: document.getElementById("lapValue"),
    speedValue: document.getElementById("speedValue"),
    timeValue: document.getElementById("timeValue"),
    pilotName: document.getElementById("pilotName"),
    pilotMeta: document.getElementById("pilotMeta"),
    boostMeter: document.getElementById("boostMeter"),
    boostText: document.getElementById("boostText"),
    leaderboardList: document.getElementById("leaderboardList"),
    skinShop: document.getElementById("skinShop"),
    sparkBalance: document.getElementById("sparkBalance"),
    root: document.getElementById("game"),
  };

  const TRACK = { rx: 68, rz: 46, width: 18, laps: 3 };
  const PLAYER = { maxSpeed: 42, maxBoostSpeed: 58, accel: 34, brake: 44, drag: 12, steer: 17, grip: 7.5, boostDrain: 0.45, boostFill: 0.18, boostAccel: 56 };
  const STORAGE = { best: "arena_rush_best_time_ms", stats: "arena_rush_stats_v1" };
  const API_BASE = window.__APP_CONFIG__?.API_BASE_URL || "https://backapi.najime.org/api";
  const COLORS = [0x5ce1e6, 0xffd166, 0xff7b7b, 0x8f9dff];
  const AI_NAMES = ["Nova", "Pulse", "Vanta"];
  const INPUT_KEYS = ["up", "down", "left", "right", "boost"];
  const GAMEPAD_DEADZONE = 0.35;
  const SKINS = [
    { key: "default", title: "Pulse Cyan", priceSol: "0", color: 0x5ce1e6, glow: 0x5ce1e6, accent: "#5ce1e6", preview: "linear-gradient(135deg, #5ce1e6, #8fd5ff)" },
    { key: "sunflare", title: "Sunflare", priceSol: "0.020", color: 0xffb347, glow: 0xffd166, accent: "#ffd166", preview: "linear-gradient(135deg, #ffd166, #ff8f5e)" },
    { key: "voidrunner", title: "Voidrunner", priceSol: "0.030", color: 0xa78bfa, glow: 0x8f9dff, accent: "#8f9dff", preview: "linear-gradient(135deg, #8f9dff, #191e4b)" },
    { key: "crimson", title: "Crimson Shock", priceSol: "0.045", color: 0xff5e7d, glow: 0xff7b7b, accent: "#ff7b7b", preview: "linear-gradient(135deg, #ff7b7b, #7a1029)" },
    { key: "aurora", title: "Aurora Pulse", priceSol: "0.055", color: 0x64ffda, glow: 0x5ce1e6, accent: "#64ffda", preview: "linear-gradient(135deg, #64ffda, #4f8cff, #c084fc)" },
    { key: "goldrush", title: "Gold Rush", priceSol: "0.060", color: 0xffd54f, glow: 0xffb300, accent: "#ffd54f", preview: "linear-gradient(135deg, #fff1a8, #ffbf47, #b96a00)" },
    { key: "midnight", title: "Midnight Coil", priceSol: "0.065", color: 0x3b3f77, glow: 0x7c3aed, accent: "#7c3aed", preview: "linear-gradient(135deg, #0f1024, #312e81, #7c3aed)" },
    { key: "acidwave", title: "Acid Wave", priceSol: "0.072", color: 0x9cff57, glow: 0x6effb7, accent: "#9cff57", preview: "linear-gradient(135deg, #c6ff63, #41f19a, #0d5c63)" },
    { key: "rosegold", title: "Rose Gold", priceSol: "0.078", color: 0xff9f9f, glow: 0xffd6a5, accent: "#ffb4a2", preview: "linear-gradient(135deg, #ffd6d6, #ffb4a2, #b56576)" },
    { key: "glacier", title: "Glacier Run", priceSol: "0.085", color: 0x9bd7ff, glow: 0xdff6ff, accent: "#9bd7ff", preview: "linear-gradient(135deg, #eefbff, #9bd7ff, #4c83ff)" },
    { key: "inferno", title: "Inferno Rail", priceSol: "0.095", color: 0xff6a00, glow: 0xff2d55, accent: "#ff6a00", preview: "linear-gradient(135deg, #ffd166, #ff6a00, #b00020)" }
  ];

  const createInputState = () => ({ up: false, down: false, left: false, right: false, boost: false });

  const state = {
    started: false, finished: false, elapsed: 0, startedAt: 0, bestTimeMs: null, lastResult: null,
    pilotName: "Guest Racer", pilotMeta: "Mini App Arena",
    currentBalance: 0, botName: null, botUsername: null, selectedSkin: "default", ownedSkins: new Set(["default"]), processingSkinKey: null,
    walletAddress: null, walletNetwork: "devnet",
    shopStatusMessage: null,
    paused: false,
    orientation: "portrait",
    gamepadStartPressed: false,
    input: {
      keyboard: createInputState(),
      touch: createInputState(),
      gamepad: createInputState()
    },
    keys: createInputState()
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06101b);
  scene.fog = new THREE.FogExp2(0x071423, 0.012);
  const camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 800);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  ui.root.appendChild(renderer.domElement);

  const clock = new THREE.Clock();
  const racers = [];
  const collectibles = [];
  const sparks = [];
  const laneMarkers = [];
  const cameraRig = { position: new THREE.Vector3(0, 14, 24), lookAt: new THREE.Vector3() };
  const world = { player: null, raceTimer: 0, trackGroup: new THREE.Group(), arenaGlow: null };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const wrap01 = (v) => ((v % 1) + 1) % 1;
  const formatWalletAddress = (value) => value ? `${String(value).slice(0, 4)}...${String(value).slice(-4)}` : null;
  const isSkinFree = (skin) => Number(skin?.priceSol || 0) <= 0;
  const withTimeout = (promise, ms) => Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout:${ms}`)), ms))
  ]);
  let bridgeReqCounter = 0;
  let shopStatusTimeout = null;
  const fmtTime = (ms) => {
    if (!Number.isFinite(ms) || ms <= 0) return "00:00.0";
    const t = ms / 1000;
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${Math.floor((t % 1) * 10)}`;
  };
  const suffix = (n) => n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

  function syncKeys() {
    INPUT_KEYS.forEach((key) => {
      state.keys[key] = Boolean(
        state.input.keyboard[key]
        || state.input.touch[key]
        || state.input.gamepad[key]
      );
    });
  }

  function setInputSource(source, key, value) {
    if (!state.input[source] || !INPUT_KEYS.includes(key)) return;
    state.input[source][key] = Boolean(value);
    syncKeys();
  }

  function setInputState(source, nextState) {
    if (!state.input[source]) return;
    INPUT_KEYS.forEach((key) => {
      state.input[source][key] = Boolean(nextState?.[key]);
    });
    syncKeys();
  }

  function mapGamepadsToInput(gamepads) {
    const primary = Array.isArray(gamepads) ? gamepads[0] : null;
    if (!primary) return createInputState();

    const axes = Array.isArray(primary.axes) ? primary.axes : [];
    const buttons = Array.isArray(primary.buttons) ? primary.buttons : [];
    const horizontal = Number(axes[0] || 0);
    const vertical = Number(axes[1] || 0);
    const isPressed = (index) => Boolean(buttons[index]?.pressed || Number(buttons[index]?.value || 0) > 0.5);

    return {
      up: vertical < -GAMEPAD_DEADZONE || isPressed(12),
      down: vertical > GAMEPAD_DEADZONE || isPressed(13),
      left: horizontal < -GAMEPAD_DEADZONE || isPressed(14),
      right: horizontal > GAMEPAD_DEADZONE || isPressed(15),
      boost: isPressed(0) || isPressed(1) || isPressed(5) || isPressed(6) || isPressed(7)
    };
  }

  function isGamepadStartPressed(gamepads) {
    const primary = Array.isArray(gamepads) ? gamepads[0] : null;
    if (!primary) return false;
    const buttons = Array.isArray(primary.buttons) ? primary.buttons : [];
    return Boolean(buttons[9]?.pressed || Number(buttons[9]?.value || 0) > 0.5);
  }

  function applyOrientationState(orientation) {
    const nextMode = orientation?.mode || (window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    state.orientation = nextMode;
    document.documentElement.dataset.orientation = nextMode;
    document.body.dataset.orientation = nextMode;
  }

  function applyWalletState(wallet) {
    const nextWallet = wallet && typeof wallet === "object" ? wallet : null;
    state.walletAddress = nextWallet?.address || nextWallet?.publicKey || null;
    state.walletNetwork = String(nextWallet?.network || "devnet").toLowerCase();
    renderSkinShop();
  }

  function showShopStatus(message, duration = 4200) {
    state.shopStatusMessage = message || null;
    renderSkinShop();
    if (shopStatusTimeout) clearTimeout(shopStatusTimeout);
    if (duration > 0) {
      shopStatusTimeout = setTimeout(() => {
        shopStatusTimeout = null;
        state.shopStatusMessage = null;
        renderSkinShop();
      }, duration);
    }
  }

  function refreshStartButton() {
    const startLabel = state.finished
      ? "Race Again"
      : state.started
        ? "Pause Race"
        : state.paused
          ? "Resume Race"
          : "Start Race";
    const compactLabel = state.finished
      ? "AGAIN"
      : state.started
        ? "PAUSE"
        : state.paused
          ? "RESUME"
          : "GO";

    if (ui.startButton) ui.startButton.textContent = startLabel;
    if (ui.pauseButton) ui.pauseButton.textContent = state.started ? "Pause" : state.paused ? "Resume" : "Start";
    if (ui.touchPrimaryButton) ui.touchPrimaryButton.textContent = compactLabel;
  }

  function pauseRace() {
    if (!state.started || state.finished) return;
    state.started = false;
    state.paused = true;
    ui.startScreen.style.display = "flex";
    refreshStartButton();
    toast("Race paused", "info");
  }

  function resumeRace() {
    if (!state.paused || state.finished) return;
    ui.startScreen.style.display = "none";
    ui.finishScreen.style.display = "none";
    state.started = true;
    state.paused = false;
    state.startedAt = performance.now() - state.elapsed;
    refreshStartButton();
    toast("Race resumed", "info");
  }

  function handlePrimaryAction() {
    if (state.finished) {
      restartRace();
      return;
    }
    if (state.started) {
      pauseRace();
      return;
    }
    if (state.paused) {
      resumeRace();
      return;
    }
    startRace();
  }

  function syncGamepadInput(payload) {
    const gamepads = Array.isArray(payload) ? payload : payload?.gamepads;
    const nextStartPressed = isGamepadStartPressed(gamepads);
    const nextInput = mapGamepadsToInput(gamepads);
    setInputState("gamepad", nextInput);
    if (nextStartPressed && !state.gamepadStartPressed) {
      handlePrimaryAction();
    } else if (nextInput.up || nextInput.boost) {
      if (state.finished) restartRace();
      else if (!state.started) startRace();
    }
    state.gamepadStartPressed = nextStartPressed;
  }

  function bridgeApiRequest(path, options = {}) {
    const fallbackParentOrigin = (() => {
      const queryOrigin = new URLSearchParams(window.location.search).get("__naji_parent_origin");
      const rawOrigin = queryOrigin || document.referrer || "";
      if (!rawOrigin) return "*";
      try {
        return new URL(rawOrigin, window.location.href).origin;
      } catch {
        return "*";
      }
    })();

    return new Promise((resolve, reject) => {
      if (!window.parent || window.parent === window) {
        reject(new Error("Mini App bridge unavailable"));
        return;
      }

      bridgeReqCounter += 1;
      const reqId = `arena_api_${Date.now()}_${bridgeReqCounter}`;
      const timeoutId = setTimeout(() => {
        window.removeEventListener("message", onMessage);
        reject(new Error("Mini App bridge timeout"));
      }, 15000);

      function onMessage(event) {
        if (fallbackParentOrigin !== "*" && event.origin !== fallbackParentOrigin) return;
        const data = event.data || {};
        if (data.type !== "NAJI_ASYNC_RESPONSE" || data.reqId !== reqId) return;
        clearTimeout(timeoutId);
        window.removeEventListener("message", onMessage);
        if (data.error) reject(new Error(data.error));
        else resolve(data.result);
      }

      window.addEventListener("message", onMessage);
      window.parent.postMessage({
        type: "API_REQUEST",
        payload: {
          reqId,
          path,
          method: options.method || "GET",
          headers: options.headers || {},
          body: options.body
        }
      }, fallbackParentOrigin);
    });
  }

  async function storageGet(key, fallback = null) {
    try {
      if (sdk?.storage?.get) {
        const value = await sdk.storage.get(key);
        return value == null || value === "" ? fallback : value;
      }
    } catch (e) { console.warn("[ArenaRush] storage get failed", e); }
    const value = localStorage.getItem(key);
    return value == null ? fallback : value;
  }

  async function storageSet(key, value) {
    try {
      if (sdk?.storage?.set) return await sdk.storage.set(key, value);
    } catch (e) { console.warn("[ArenaRush] storage set failed", e); }
    localStorage.setItem(key, value);
  }

  async function toast(message, type = "info") {
    return null;
  }

  async function apiFetch(path, options = {}) {
    if (sdk?.api?.request) {
      return sdk.api.request(path, {
        method: options.method || "GET",
        headers: options.headers || {},
        body: options.body
      });
    }
    if (window.parent && window.parent !== window) {
      return bridgeApiRequest(path, options);
    }
    const response = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }
    return data;
  }

  function getSkin(key) {
    return SKINS.find((skin) => skin.key === key) || SKINS[0];
  }

  function pointAt(progress, lane = 0) {
    const a = progress * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * (TRACK.rx + lane), 0, Math.sin(a) * (TRACK.rz + lane));
  }

  function tangentAt(progress) {
    const a = progress * Math.PI * 2;
    return new THREE.Vector3(-Math.sin(a) * TRACK.rx, 0, Math.cos(a) * TRACK.rz).normalize();
  }

  function normalAt(progress) {
    const t = tangentAt(progress);
    return new THREE.Vector3(-t.z, 0, t.x).normalize();
  }

  function buildArena() {
    scene.add(new THREE.HemisphereLight(0x8fd5ff, 0x09111f, 1.15));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(40, 70, 25);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.left = -140;
    sun.shadow.camera.right = 140;
    sun.shadow.camera.top = 140;
    sun.shadow.camera.bottom = -140;
    scene.add(sun);

    const floor = new THREE.Mesh(new THREE.CylinderGeometry(150, 170, 8, 80), new THREE.MeshStandardMaterial({ color: 0x091522, metalness: 0.08, roughness: 0.92 }));
    floor.receiveShadow = true;
    floor.position.y = -4;
    scene.add(floor);

    const shape = new THREE.Shape();
    shape.absellipse(0, 0, TRACK.rx + TRACK.width * 0.5, TRACK.rz + TRACK.width * 0.5, 0, Math.PI * 2, false, 0);
    const hole = new THREE.Path();
    hole.absellipse(0, 0, TRACK.rx - TRACK.width * 0.5, TRACK.rz - TRACK.width * 0.5, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole);

    const track = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.8, bevelEnabled: false, curveSegments: 96 }), new THREE.MeshStandardMaterial({ color: 0x13263d, metalness: 0.2, roughness: 0.55 }));
    track.rotation.x = -Math.PI / 2;
    track.receiveShadow = true;
    world.trackGroup.add(track);

    const glow = new THREE.Mesh(new THREE.TorusGeometry((TRACK.rx + TRACK.rz) * 0.5 - 4, 2.2, 24, 140), new THREE.MeshBasicMaterial({ color: 0x103752, transparent: true, opacity: 0.18 }));
    glow.rotation.x = Math.PI / 2;
    glow.scale.set(1.2, 1, 0.84);
    glow.position.y = 0.4;
    world.trackGroup.add(glow);
    world.arenaGlow = glow;

    for (let i = 0; i < 36; i += 1) {
      const p = i / 36;
      const marker = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.3, 0.55), new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x5ce1e6 : 0xffd166, emissive: i % 2 === 0 ? 0x123948 : 0x3a2b0b, emissiveIntensity: 0.7 }));
      marker.position.copy(pointAt(p));
      marker.position.y = 0.55;
      marker.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangentAt(p));
      marker.castShadow = true;
      laneMarkers.push(marker);
      world.trackGroup.add(marker);
    }

    const gate = new THREE.Mesh(new THREE.TorusGeometry(8.8, 0.65, 14, 64, Math.PI), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4f7dff, emissiveIntensity: 0.85 }));
    gate.rotation.set(0, Math.PI * 0.5, Math.PI);
    gate.position.set(TRACK.rx + 1.2, 6.5, 0);
    world.trackGroup.add(gate);
    scene.add(world.trackGroup);
  }

  function createRacer(index, opts = {}) {
    const root = new THREE.Group();
    const color = opts.color || COLORS[index % COLORS.length];
    const hull = new THREE.Mesh(new THREE.BoxGeometry(3.1, 1.2, 5.6), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.22, metalness: 0.28, roughness: 0.38 }));
    hull.castShadow = true;
    root.add(hull);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 2.2), new THREE.MeshStandardMaterial({ color: 0xe6fbff, transparent: true, opacity: 0.82, metalness: 0.08, roughness: 0.12 }));
    canopy.position.set(0, 0.72, 0.2);
    root.add(canopy);
    const flames = [];
    [-0.75, 0.75].forEach((x) => {
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.8, 12), new THREE.MeshBasicMaterial({ color: 0x5ce1e6, transparent: true, opacity: 0.9 }));
      flame.rotation.x = Math.PI / 2;
      flame.position.set(x, 0, 3.2);
      root.add(flame);
      flames.push(flame);
    });
    scene.add(root);
    const racer = {
      id: opts.id || `racer_${index}`, name: opts.name || `Pilot ${index + 1}`, isPlayer: !!opts.isPlayer, color,
      root, hull, canopy, flames, progress: opts.progress || 0, lastProgress: opts.progress || 0, speed: opts.isPlayer ? 0 : 27 + index * 2.4,
      laneBase: opts.laneBase || 0, lane: opts.laneBase || 0, targetLane: opts.laneBase || 0, drift: 0, wobble: Math.random() * Math.PI * 2,
      boost: 1, lap: 1, finished: false, finishMs: null
    };
    racers.push(racer);
    if (racer.isPlayer) world.player = racer;
    return racer;
  }

  function placeRacer(racer) {
    const pos = pointAt(racer.progress, racer.lane);
    const tangent = tangentAt(racer.progress);
    const bank = Math.sin(racer.progress * Math.PI * 2) * 0.08;
    racer.root.position.copy(pos);
    racer.root.position.y = 1.25 + Math.sin(world.raceTimer * 4 + racer.wobble) * 0.12;
    racer.root.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    racer.root.rotateY(Math.PI);
    racer.root.rotateZ(bank - racer.drift * 0.018);
  }

  function spawnCollectibles() {
    collectibles.forEach((item) => scene.remove(item.mesh));
    collectibles.length = 0;
    for (let i = 0; i < 10; i += 1) {
      const progress = wrap01(0.08 + i * 0.091 + (i % 2) * 0.012);
      const lane = (i % 3 - 1) * 4.4;
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.05), new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x5c4410, emissiveIntensity: 1.1, metalness: 0.35, roughness: 0.25 }));
      mesh.position.copy(pointAt(progress, lane));
      mesh.position.y = 2.3;
      scene.add(mesh);
      collectibles.push({ progress, lane, mesh, active: true, respawn: 0 });
    }
  }

  function addSpark(position, color, scale = 1) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.22 * scale, 8, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 }));
    mesh.position.copy(position);
    scene.add(mesh);
    sparks.push({ mesh, velocity: new THREE.Vector3((Math.random() - 0.5) * 8, 4 + Math.random() * 5, (Math.random() - 0.5) * 8), life: 0.4 + Math.random() * 0.35 });
  }

  function applySkinToPlayer() {
    const player = world.player;
    if (!player) return;
    const skin = getSkin(state.selectedSkin);
    player.color = skin.color;
    player.hull.material.color.setHex(skin.color);
    player.hull.material.emissive.setHex(skin.glow || skin.color);
    player.canopy.material.color.setHex(0xe6fbff);
    player.flames.forEach((flame) => {
      flame.material.color.setHex(skin.glow || skin.color);
    });
  }

  function resetRace() {
    state.started = false;
    state.finished = false;
    state.paused = false;
    state.elapsed = 0;
    state.startedAt = 0;
    refreshStartButton();
    racers.forEach((r) => scene.remove(r.root));
    racers.length = 0;
    createRacer(0, { id: "player", name: state.pilotName, isPlayer: true, laneBase: -5.2, progress: 0.048, color: COLORS[0] });
    createRacer(1, { name: AI_NAMES[0], laneBase: -1.6, progress: 0.032, color: COLORS[1] });
    createRacer(2, { name: AI_NAMES[1], laneBase: 1.8, progress: 0.016, color: COLORS[2] });
    createRacer(3, { name: AI_NAMES[2], laneBase: 5.2, progress: 0.004, color: COLORS[3] });
    applySkinToPlayer();
    spawnCollectibles();
    racers.forEach(placeRacer);
    updateHud();
    renderLeaderboard();
  }

  function orderedRacers() {
    return [...racers].sort((a, b) => (((b.finished ? TRACK.laps + 1 : b.lap) + b.progress) - ((a.finished ? TRACK.laps + 1 : a.lap) + a.progress)));
  }

  function updateHud() {
    const player = world.player;
    if (!player) return;
    const rank = orderedRacers();
    const pos = rank.findIndex((r) => r.id === player.id) + 1;
    ui.positionValue.textContent = `${pos}/${racers.length}`;
    ui.lapValue.textContent = `${clamp(player.lap, 1, TRACK.laps)}/${TRACK.laps}`;
    ui.speedValue.textContent = String(Math.round(player.speed * 4.2));
    ui.timeValue.textContent = fmtTime(state.elapsed);
    ui.boostMeter.style.width = `${Math.round(player.boost * 100)}%`;
    ui.boostText.textContent = player.boost > 0.95 ? "Boost fully charged" : player.boost > 0.25 ? "Use boost on a straight" : "Charge recovering";
  }

  function renderLeaderboard() {
    ui.leaderboardList.innerHTML = orderedRacers().map((r, i) => {
      const meta = r.finished && r.finishMs ? fmtTime(r.finishMs) : `Lap ${clamp(r.lap, 1, TRACK.laps)}`;
      return `<div class="row"><span><strong>${i + 1}.</strong> ${r.name}</span><span>${meta}</span></div>`;
    }).join("");
  }

  function renderSkinShop() {
    if (!ui.skinShop) return;
    if (ui.sparkBalance) {
      ui.sparkBalance.textContent = state.shopStatusMessage || (
        state.walletAddress
          ? `Devnet • ${formatWalletAddress(state.walletAddress)}`
          : "Devnet • Solana checkout"
      );
    }
    ui.skinShop.innerHTML = SKINS.map((skin) => {
      const owned = state.ownedSkins.has(skin.key);
      const selected = state.selectedSkin === skin.key;
      const isProcessing = state.processingSkinKey === skin.key;
      const freeSkin = isSkinFree(skin);
      return `
        <div class="skin-card">
          <div class="skin-preview" style="background:${skin.preview};"></div>
          <div class="skin-topline">
            <div class="skin-name">${skin.title}</div>
            <div class="skin-price">${freeSkin ? "Free" : `${skin.priceSol} SOL`}</div>
          </div>
          <div class="skin-badge">${owned ? (selected ? "Equipped" : "Owned") : (freeSkin ? "Starter" : "Solana Devnet")}</div>
          <div class="skin-actions">
            ${owned
              ? `<button class="${selected ? "secondary" : ""}" data-skin-action="equip" data-skin-key="${skin.key}" data-skin-processing="${isProcessing ? "true" : "false"}">${isProcessing ? "Processing..." : (selected ? "Active" : "Equip")}</button>`
              : `<button data-skin-action="buy" data-skin-key="${skin.key}" data-skin-processing="${isProcessing ? "true" : "false"}">${isProcessing ? "Processing..." : (freeSkin ? "Unlock" : `Pay ${skin.priceSol} SOL`)}</button>`
            }
          </div>
        </div>
      `;
    }).join("");

    ui.skinShop.querySelectorAll("[data-skin-action]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const key = event.currentTarget.getAttribute("data-skin-key");
        const action = event.currentTarget.getAttribute("data-skin-action");
        const isProcessing = event.currentTarget.getAttribute("data-skin-processing") === "true";
        if (isProcessing) return;
        if (action === "equip") {
          state.selectedSkin = key;
          await storageSet("arena_rush_selected_skin", key);
          applySkinToPlayer();
          renderSkinShop();
          return;
        }
        if (action === "buy") {
          await buySkin(key);
        }
      });
    });
  }

  function updatePlayer(racer, dt) {
    if (!state.started) {
      racer.speed = lerp(racer.speed, 0, dt * 4);
      racer.boost = clamp(racer.boost + PLAYER.boostFill * dt, 0, 1);
      return;
    }
    const turn = (state.keys.left ? 1 : 0) - (state.keys.right ? 1 : 0);
    const boost = state.keys.boost && racer.boost > 0.02 && racer.speed > 18;
    if (state.keys.up) racer.speed += PLAYER.accel * dt;
    if (state.keys.down) racer.speed -= PLAYER.brake * dt;
    if (!state.keys.up && !state.keys.down) racer.speed -= PLAYER.drag * dt;
    racer.targetLane = clamp(racer.targetLane + turn * PLAYER.steer * dt, -TRACK.width * 0.35, TRACK.width * 0.35);
    racer.lane = lerp(racer.lane, racer.targetLane, dt * PLAYER.grip);
    racer.drift = lerp(racer.drift, turn * racer.speed, dt * 6);
    if (boost) {
      racer.speed += PLAYER.boostAccel * dt;
      racer.boost = clamp(racer.boost - PLAYER.boostDrain * dt, 0, 1);
      addSpark(racer.root.position, 0x5ce1e6, 2);
    } else {
      racer.boost = clamp(racer.boost + PLAYER.boostFill * dt, 0, 1);
    }
    racer.speed = clamp(racer.speed, 0, boost ? PLAYER.maxBoostSpeed : PLAYER.maxSpeed);
    racer.progress = wrap01(racer.progress + dt * racer.speed / 360);
  }

  function updateAI(racer, dt, idx) {
    if (racer.finished) return;
    if (!state.started) {
      racer.speed = lerp(racer.speed, 0, dt * 5);
      racer.lane = lerp(racer.lane, racer.laneBase, dt * 4);
      racer.drift = lerp(racer.drift, 0, dt * 6);
      return;
    }
    const pulse = Math.sin(world.raceTimer * 0.7 + idx * 1.4) * 0.5 + 0.5;
    const targetSpeed = 26.4 + idx * 2.2 + pulse * 8;
    racer.speed = lerp(racer.speed, targetSpeed, dt * 0.9);
    racer.targetLane = racer.laneBase + Math.sin(world.raceTimer * 0.9 + idx) * 2.2;
    racer.lane = lerp(racer.lane, racer.targetLane, dt * 1.7);
    racer.drift = Math.sin(world.raceTimer * 2.3 + idx) * 8;
    if (state.started && Math.random() < 0.018) addSpark(racer.root.position, racer.color, 1);
    racer.progress = wrap01(racer.progress + dt * racer.speed / 360);
  }

  function updateLaps(racer) {
    if (!racer.finished && racer.progress < 0.08 && racer.lastProgress > 0.92) {
      racer.lap += 1;
      if (racer.lap > TRACK.laps) {
        racer.finished = true;
        racer.finishMs = state.elapsed;
        if (racer.isPlayer) finishRace();
      }
    }
    racer.lastProgress = racer.progress;
  }

  function updateCollectibles(dt) {
    collectibles.forEach((item, idx) => {
      if (!item.active) {
        item.respawn -= dt;
        if (item.respawn <= 0) {
          item.active = true;
          item.mesh.visible = true;
        }
        return;
      }
      item.mesh.rotation.y += dt * 2.2;
      item.mesh.position.y = 2.2 + Math.sin(world.raceTimer * 2.8 + idx) * 0.35;
      const player = world.player;
      if (player && player.root.position.distanceTo(item.mesh.position) < 3.4) {
        player.boost = clamp(player.boost + 0.28, 0, 1);
        item.active = false;
        item.mesh.visible = false;
        item.respawn = 7 + idx * 0.2;
        toast("Boost core collected", "success");
      }
    });
  }

  function updateSparks(dt) {
    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      const s = sparks[i];
      s.life -= dt;
      s.mesh.position.addScaledVector(s.velocity, dt);
      s.velocity.y -= 18 * dt;
      s.mesh.material.opacity = clamp(s.life * 2.2, 0, 0.85);
      s.mesh.scale.setScalar(clamp(s.life * 2, 0.1, 1.2));
      if (s.life <= 0) {
        scene.remove(s.mesh);
        sparks.splice(i, 1);
      }
    }
  }

  function updateCamera(dt) {
    const player = world.player;
    if (!player) return;
    const tangent = tangentAt(player.progress);
    const normal = normalAt(player.progress);
    const targetPos = player.root.position.clone().addScaledVector(tangent, -16).addScaledVector(normal, -player.lane * 0.25).add(new THREE.Vector3(0, 10.5, 0));
    const targetLook = player.root.position.clone().addScaledVector(tangent, 14).add(new THREE.Vector3(0, 2, 0));
    cameraRig.position.lerp(targetPos, 1 - Math.exp(-dt * 4.2));
    cameraRig.lookAt.lerp(targetLook, 1 - Math.exp(-dt * 5.4));
    camera.position.copy(cameraRig.position);
    camera.lookAt(cameraRig.lookAt);
  }

  async function finishRace() {
    if (state.finished) return;
    state.finished = true;
    state.started = false;
    refreshStartButton();
    racers.forEach((racer) => {
      racer.speed = 0;
      racer.targetLane = racer.lane;
      racer.drift = 0;
      if (!racer.isPlayer) {
        racer.finished = true;
        if (racer.finishMs == null) racer.finishMs = state.elapsed;
      }
    });
    const rank = orderedRacers();
    const pos = rank.findIndex((r) => r.isPlayer) + 1;
    const isRecord = state.bestTimeMs == null || state.elapsed < state.bestTimeMs;
    if (isRecord) {
      state.bestTimeMs = state.elapsed;
      await storageSet(STORAGE.best, String(Math.round(state.elapsed)));
    }
    const prevStats = JSON.parse(await storageGet(STORAGE.stats, "{\"races\":0,\"wins\":0}"));
    await storageSet(STORAGE.stats, JSON.stringify({ races: (prevStats.races || 0) + 1, wins: (prevStats.wins || 0) + (pos === 1 ? 1 : 0), updatedAt: new Date().toISOString() }));
    state.lastResult = { position: pos, timeMs: state.elapsed };
    ui.finishTitle.textContent = pos === 1 ? "Victory Lap" : "Heat Complete";
    ui.finishSummary.textContent = `${suffix(pos)} place in ${fmtTime(state.elapsed)}${isRecord ? " • new personal best" : state.bestTimeMs ? ` • best ${fmtTime(state.bestTimeMs)}` : ""}`;
    ui.finishScreen.style.display = "flex";
    renderLeaderboard();
    await toast(isRecord ? "New record saved" : `Finished ${suffix(pos)}`, pos === 1 ? "success" : "info");
  }

  async function loadSkinState() {
    try {
      const selectedSkin = await storageGet("arena_rush_selected_skin", "default");
      if (selectedSkin) state.selectedSkin = selectedSkin;
    } catch (e) {
      console.warn("[ArenaRush] selected skin load failed", e);
    }

    try {
      const context = sdk?.initData || null;
      applyWalletState(context?.wallet || null);
    } catch (e) {
      console.warn("[ArenaRush] wallet context load failed", e);
    }

    if (!state.botUsername) {
      renderSkinShop();
      applySkinToPlayer();
      return;
    }

    try {
      const inventory = await apiFetch("/miniapp/inventory", {
          method: "POST",
          body: JSON.stringify({ bot_username: state.botUsername, item_type: "skin" })
      });

      state.ownedSkins = new Set(["default"]);
      (inventory.items || []).forEach((item) => {
        if (item.item_key) state.ownedSkins.add(item.item_key);
      });
      if (!state.ownedSkins.has(state.selectedSkin)) state.selectedSkin = "default";
    } catch (e) {
      console.warn("[ArenaRush] inventory load failed", e);
    }
    renderSkinShop();
    applySkinToPlayer();
  }

  async function buySkin(key) {
    const skin = getSkin(key);
    if (state.processingSkinKey) return;
    if (!state.botUsername) {
      showShopStatus("Attach Arena Rush to a bot first");
      return;
    }
    if (state.ownedSkins.has(key)) {
      state.selectedSkin = key;
      await storageSet("arena_rush_selected_skin", key);
      applySkinToPlayer();
      renderSkinShop();
      return;
    }

    try {
      state.processingSkinKey = key;
      renderSkinShop();
      if (isSkinFree(skin)) {
        state.ownedSkins.add(key);
        state.selectedSkin = key;
        await storageSet("arena_rush_selected_skin", key);
        applySkinToPlayer();
        renderSkinShop();
        return;
      }

      if (!sdk?.payments?.solana) {
        throw new Error("Solana payments are available only inside Naji Mini Apps");
      }

      await sdk.payments.solana({
        bot_username: state.botUsername,
        item_type: "skin",
        item_key: skin.key,
        title: `${skin.title} skin`,
        description: `${skin.title} unlock for Arena Rush on Solana Devnet`,
        amount_sol: skin.priceSol,
        purchase_meta: {
          source: "arena-rush",
          color: skin.color,
          glow: skin.glow,
          preview: skin.preview,
          payment_currency: "SOL"
        }
      });
      state.ownedSkins.add(key);
      state.selectedSkin = key;
      await storageSet("arena_rush_selected_skin", key);
      applySkinToPlayer();
      state.processingSkinKey = null;
      showShopStatus(`${skin.title} unlocked on Solana Devnet`);
      renderSkinShop();
    } catch (e) {
      console.warn("[ArenaRush] Solana skin purchase failed", e);
      showShopStatus(e?.message || "Solana payment failed");
    } finally {
      state.processingSkinKey = null;
      renderSkinShop();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    world.raceTimer += dt;
    if (!state.finished && state.started) state.elapsed = performance.now() - state.startedAt;

    laneMarkers.forEach((marker, i) => { marker.material.emissiveIntensity = 0.35 + Math.sin(world.raceTimer * 2.6 + i * 0.3) * 0.22; });
    if (world.arenaGlow) {
      const pulse = 1 + Math.sin(world.raceTimer * 1.3) * 0.035;
      world.arenaGlow.scale.set(1.2 * pulse, 1, 0.84 * pulse);
      world.arenaGlow.material.opacity = 0.15 + Math.sin(world.raceTimer * 1.8) * 0.04;
    }

    racers.forEach((racer, idx) => {
      racer.isPlayer ? updatePlayer(racer, dt) : updateAI(racer, dt, idx);
      updateLaps(racer);
      placeRacer(racer);
      racer.flames.forEach((flame, fi) => {
        const flicker = 0.55 + Math.sin(world.raceTimer * 18 + fi + idx) * 0.12;
        flame.scale.setScalar(flicker + racer.speed / 70 + (state.keys.boost && racer.isPlayer ? 0.55 : 0));
        flame.material.opacity = clamp(0.5 + racer.speed / 80, 0.35, 0.95);
      });
    });

    updateCollectibles(dt);
    updateSparks(dt);
    updateCamera(dt);
    updateHud();
    renderLeaderboard();
    renderer.render(scene, camera);
  }

  async function initSdk() {
    ui.pilotName.textContent = state.pilotName;
    ui.pilotMeta.textContent = state.pilotMeta;
    applyOrientationState();
    if (!sdk) return;
    try {
      const initData = await withTimeout(sdk.init(), 2500);
      if (typeof sdk.ready === "function") sdk.ready();
      if (typeof sdk.expand === "function") sdk.expand();
      if (typeof sdk.setHeaderColor === "function") sdk.setHeaderColor("#09111f");
      if (sdk.backButton?.show) sdk.backButton.show();
      if (sdk.backButton?.onClick) sdk.backButton.onClick(() => {
        if (state.finished) restartRace();
        else if (state.started) pauseRace();
        else if (state.paused) resumeRace();
        else sdk.close();
      });
      const ctx = sdk.requestContext ? await withTimeout(sdk.requestContext(), 2500) : null;
      if (sdk.gamepad?.onChange) sdk.gamepad.onChange(syncGamepadInput);
      if (sdk.gamepad?.onConnect) sdk.gamepad.onConnect(syncGamepadInput);
      if (sdk.gamepad?.onDisconnect) sdk.gamepad.onDisconnect(syncGamepadInput);
      if (sdk.on) sdk.on("walletChanged", applyWalletState);
      syncGamepadInput(ctx?.gamepads || initData?.gamepads || sdk.gamepad?.state || sdk.gamepads || []);
      if (sdk.gamepad?.getState) {
        withTimeout(sdk.gamepad.getState(), 2500)
          .then(syncGamepadInput)
          .catch((error) => console.warn("[ArenaRush] gamepad sync failed", error));
      }
      applyOrientationState(ctx?.orientation || initData?.orientation || sdk.orientation?.state || null);
      if (sdk.orientation?.onChange) sdk.orientation.onChange(applyOrientationState);
      if (sdk.orientation?.getState) {
        withTimeout(sdk.orientation.getState(), 2500)
          .then(applyOrientationState)
          .catch((error) => console.warn("[ArenaRush] orientation sync failed", error));
      }
      const user = ctx?.user || initData?.user || null;
      state.botName = ctx?.botName || initData?.botName || null;
      state.botUsername = ctx?.botUsername || initData?.botUsername || null;
      applyWalletState(ctx?.wallet || initData?.wallet || null);
      const sparksBalance = Number(ctx?.sparks?.balance ?? initData?.sparks?.balance ?? user?.najisparks ?? 0);
      if (Number.isFinite(sparksBalance) && sparksBalance >= 0) {
        state.currentBalance = sparksBalance;
      }
      state.pilotName = user?.display_name || user?.first_name || user?.username || state.pilotName;
      const walletAddress = state.walletAddress;
      const wallet = walletAddress ? `Wallet ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : "Solana checkout ready";
      state.pilotMeta = user?.username ? `@${user.username} • ${wallet}` : wallet;
      ui.pilotName.textContent = state.pilotName;
      ui.pilotMeta.textContent = state.pilotMeta;
      renderSkinShop();
    } catch (e) {
      console.warn("[ArenaRush] sdk init failed", e);
      ui.pilotMeta.textContent = "Standalone mode";
      applyOrientationState();
    }
  }

  async function loadStats() {
    const best = await storageGet(STORAGE.best);
    if (best && !Number.isNaN(Number(best))) state.bestTimeMs = Number(best);
  }

  function startRace() {
    if (state.started) return;
    if (state.paused) {
      resumeRace();
      return;
    }
    ui.startScreen.style.display = "none";
    ui.finishScreen.style.display = "none";
    state.started = true;
    state.paused = false;
    state.finished = false;
    state.elapsed = 0;
    state.startedAt = performance.now();
    racers.forEach((r) => { r.finished = false; r.finishMs = null; });
    refreshStartButton();
    toast("Race started", "info");
  }

  function restartRace() {
    ui.finishScreen.style.display = "none";
    ui.startScreen.style.display = "flex";
    resetRace();
  }

  async function shareResult() {
    if (!state.lastResult) return;
    const text = `Arena Rush 3D: ${suffix(state.lastResult.position)} place in ${fmtTime(state.lastResult.timeMs)}${state.bestTimeMs ? ` | best ${fmtTime(state.bestTimeMs)}` : ""}`;
    try {
      if (sdk?.ui?.copy) {
        await sdk.ui.copy(text);
        return toast("Result copied", "success");
      }
      await navigator.clipboard.writeText(text);
      await toast("Result copied", "success");
    } catch (e) {
      console.warn("[ArenaRush] copy failed", e);
    }
  }

  function bindInput() {
    const setKey = (code, value) => {
      if (code === "ArrowUp" || code === "KeyW") setInputSource("keyboard", "up", value);
      if (code === "ArrowDown" || code === "KeyS") setInputSource("keyboard", "down", value);
      if (code === "ArrowLeft" || code === "KeyA") setInputSource("keyboard", "left", value);
      if (code === "ArrowRight" || code === "KeyD") setInputSource("keyboard", "right", value);
      if (code === "ShiftLeft" || code === "ShiftRight" || code === "Space") setInputSource("keyboard", "boost", value);
      if (value && code === "KeyR") restartRace();
    };
    window.addEventListener("keydown", (e) => {
      setKey(e.code, true);
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      if (e.code === "Enter") {
        handlePrimaryAction();
      }
    });
    window.addEventListener("keyup", (e) => setKey(e.code, false));
    document.querySelectorAll("[data-touch]").forEach((button) => {
      const key = button.getAttribute("data-touch");
      const activate = (value) => {
        setInputSource("touch", key, value);
        if (key === "up" && value) {
          if (state.finished) restartRace();
          else if (!state.started) startRace();
        }
      };
      ["touchstart", "pointerdown"].forEach((name) => button.addEventListener(name, (e) => { e.preventDefault(); activate(true); }, { passive: false }));
      ["touchend", "touchcancel", "pointerup", "pointerleave"].forEach((name) => button.addEventListener(name, (e) => { e.preventDefault(); activate(false); }, { passive: false }));
    });
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    applyOrientationState();
  }

  async function bootstrap() {
    buildArena();
    bindInput();
    ui.startButton.addEventListener("click", handlePrimaryAction);
    if (ui.pauseButton) ui.pauseButton.addEventListener("click", handlePrimaryAction);
    ui.closeButton.addEventListener("click", () => sdk?.close ? sdk.close() : window.close());
    ui.restartButton.addEventListener("click", restartRace);
    if (ui.restartQuickButton) ui.restartQuickButton.addEventListener("click", restartRace);
    if (ui.touchPrimaryButton) ui.touchPrimaryButton.addEventListener("click", handlePrimaryAction);
    if (ui.touchRestartButton) ui.touchRestartButton.addEventListener("click", restartRace);
    ui.shareButton.addEventListener("click", shareResult);
    window.addEventListener("resize", resize);
    applyOrientationState();
    resetRace();
    animate();
    await Promise.allSettled([initSdk(), loadStats()]);
    await loadSkinState();
    ui.pilotName.textContent = state.pilotName;
    ui.pilotMeta.textContent = state.bestTimeMs ? `${state.pilotMeta} • best ${fmtTime(state.bestTimeMs)}` : state.pilotMeta;
    renderSkinShop();
  }

  bootstrap();
})();
