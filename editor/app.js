// Guru Maps Style Studio - Core Application Logic
// Features Dual-Engine Rendering: Offline Embedded Sample (0-latency) + Online Global Vector Tiles

// Maputnik-style Unified Feature Definitions (Grouping Fill + Casing + Width into single Feature Entities)
const FEATURE_DEFS = [
  {
    category: "道路交通要素 (Road Features)",
    icon: "🛣️",
    features: [
      {
        id: "feat_motorway",
        title: "高速公路 (Motorway / 三环成雅)",
        fillKey: "@color_motorway",
        fillLabel: "路面填色 (Fill)",
        casingKey: "@color_motorway_casing",
        casingLabel: "外描边 (Casing)",
        defaultFill: "#FF9966",
        defaultCasing: "#EE8855",
        zlinear: { zStart: 6, zEnd: 14, keyStart: "motorwayZ6", keyEnd: "motorwayZ14" }
      },
      {
        id: "feat_primary",
        title: "城市主干道 (Primary / 天府大道、一二环)",
        fillKey: "@color_primary",
        fillLabel: "路面填色 (Fill)",
        casingKey: "@color_primary_casing",
        casingLabel: "外描边 (Casing)",
        defaultFill: "#FFBB66",
        defaultCasing: "#EEAA55",
        zlinear: { zStart: 8, zEnd: 14, keyStart: "primaryZ8", keyEnd: "primaryZ14" }
      },
      {
        id: "feat_secondary",
        title: "次要干道 (Secondary / 红星路、滨江路)",
        fillKey: "@color_secondary",
        fillLabel: "路面填色 (Fill)",
        casingKey: "@color_secondary_casing",
        casingLabel: "外描边 (Casing)",
        defaultFill: "#FFDD77",
        defaultCasing: "#EECC66"
      },
      {
        id: "feat_small_road",
        title: "普通街巷 (Small Road / 春熙路、宽窄巷子)",
        fillKey: "@color_small_road",
        fillLabel: "路面填色 (Fill)",
        casingKey: "@color_small_road_casing",
        casingLabel: "外描边 (Casing)",
        defaultFill: "#FEFEFE",
        defaultCasing: "#CCCCCC"
      },
      {
        id: "feat_trails",
        title: "绿道与越野步道 (Path & Track / 锦江绿道)",
        fillKey: "@color_footway_dashes",
        fillLabel: "步道颜色 (Path)",
        casingKey: "@color_track_dashes",
        casingLabel: "越野道色 (Track)",
        defaultFill: "#B8908A",
        defaultCasing: "#8C6F58"
      }
    ]
  },
  {
    category: "城镇与建筑要素 (Urban & Buildings)",
    icon: "🏢",
    features: [
      {
        id: "feat_building",
        title: "城市建筑物 (Building)",
        fillKey: "@color_building",
        fillLabel: "建筑顶面填色",
        casingKey: "@color_building_stroke",
        casingLabel: "建筑外轮廓描边",
        defaultFill: "#D7C9BA",
        defaultCasing: "#B39B7C"
      },
      {
        id: "feat_zones",
        title: "城区功能用地 (Residential & Commercial)",
        fillKey: "@color_landuse_residential",
        fillLabel: "居住区填色",
        casingKey: "@color_landuse_commercial",
        casingLabel: "商业区填色",
        defaultFill: "#D4CFC8",
        defaultCasing: "#F3E3D9"
      }
    ]
  },
  {
    category: "自然地貌与水系要素 (Nature & Water)",
    icon: "🏞️",
    features: [
      {
        id: "feat_ground_water",
        title: "陆地底色与锦江水系 (Ground & Water)",
        fillKey: "@color_ground",
        fillLabel: "陆地背景底色",
        casingKey: "@color_water",
        casingLabel: "锦江/湖泊水系色",
        defaultFill: "#EAE3D3",
        defaultCasing: "#83C3ED"
      },
      {
        id: "feat_vegetation",
        title: "森林公园与生态绿地 (Wood & Grass)",
        fillKey: "@color_wood",
        fillLabel: "森林公园 (Wood)",
        casingKey: "@color_grass",
        casingLabel: "草坪绿地 (Grass)",
        defaultFill: "#A0D788",
        defaultCasing: "#C8DF9F"
      }
    ]
  },
  {
    category: "地名与标注要素 (Labels & Text)",
    icon: "🔤",
    features: [
      {
        id: "feat_labels",
        title: "地图文字标注 (Map Labels)",
        fillKey: "@color_name_text",
        fillLabel: "地标主文字色",
        casingKey: "@color_water_text",
        casingLabel: "水系文字色",
        defaultFill: "#48424F",
        defaultCasing: "#0F4F80"
      }
    ]
  }
];

// Real OpenMapTiles Vector Layer Mapping
const LAYER_MAPPING = {
  "@color_ground": [
    { id: "background", prop: "background-color" }
  ],
  "@color_water": [
    { id: "water", prop: "fill-color" },
    { id: "waterway_river", prop: "line-color" },
    { id: "waterway_other", prop: "line-color" }
  ],
  "@color_wood": [
    { id: "landcover_wood", prop: "fill-color" },
    { id: "park", prop: "fill-color" }
  ],
  "@color_grass": [
    { id: "landcover_grass", prop: "fill-color" }
  ],
  "@color_sand": [
    { id: "landcover_sand", prop: "fill-color" }
  ],
  "@color_glacier": [
    { id: "landcover_ice", prop: "fill-color" }
  ],
  "@color_national_park": [
    { id: "park_outline", prop: "line-color" }
  ],
  "@color_building": [
    { id: "building", prop: "fill-color" }
  ],
  "@color_building_stroke": [
    { id: "building", prop: "fill-outline-color" }
  ],
  "@color_landuse_residential": [
    { id: "landuse_residential", prop: "fill-color" }
  ],
  "@color_landuse_commercial": [
    { id: "landuse_commercial", prop: "fill-color" }
  ],
  "@color_motorway": [
    { id: "motorway", prop: "line-color" },
    { id: "bridge_motorway", prop: "line-color" }
  ],
  "@color_motorway_casing": [
    { id: "motorway_casing", prop: "line-color" }
  ],
  "@color_primary": [
    { id: "primary", prop: "line-color" },
    { id: "bridge_primary", prop: "line-color" }
  ],
  "@color_primary_casing": [
    { id: "primary_casing", prop: "line-color" }
  ],
  "@color_secondary": [
    { id: "secondary", prop: "line-color" },
    { id: "bridge_secondary", prop: "line-color" }
  ],
  "@color_secondary_casing": [
    { id: "secondary_casing", prop: "line-color" }
  ],
  "@color_small_road": [
    { id: "small_road", prop: "line-color" },
    { id: "bridge_small_road", prop: "line-color" },
    { id: "bridge_path_deck", prop: "line-color" }
  ],
  "@color_small_road_casing": [
    { id: "small_road_casing", prop: "line-color" }
  ],
  "@color_track_dashes": [
    { id: "track", prop: "line-color" }
  ],
  "@color_footway_dashes": [
    { id: "path", prop: "line-color" },
    { id: "bridge_path", prop: "line-color" }
  ],
  "@color_cycleway_dashes": [
    { id: "path", prop: "line-color" }
  ],
  "@color_railway": [
    { id: "railway", prop: "line-color" },
    { id: "tunnel_railway", prop: "line-color" }
  ],
  "@color_label_text": [
    { id: "road_label", prop: "text-color" },
    { id: "poi_label", prop: "text-color" }
  ],
  "@color_name_text": [
    { id: "place_label", prop: "text-color" },
    { id: "road_label", prop: "text-color" },
    { id: "poi_label", prop: "text-color" }
  ],
  "@color_water_text": [
    { id: "water_label", prop: "text-color" }
  ]
};

// Application State
let currentColors = {};
let map = null;
let currentMode = "offline"; // "offline" or "online"
let currentSampleType = "outdoor"; // "outdoor" or "city"
let trailBoostActive = false;
let cleanPoiActive = false;

// Road Structural & zlinear State
const roadSpec = {
  colorBridge: "#A4A8AB",
  bridgeWidth: 1.5,
  colorTunnel: "#D0D0D0",
  tunnelOpacity: 0.6,
  motorwayZ6: 1.5,
  motorwayZ14: 5.0,
  primaryZ8: 1.5,
  primaryZ14: 4.0,
  pathZ15: 3.0
};

// Chengdu Viewpoints & Bounds (成都市范围与核心视点)
const CHENGDU_BOUNDS = [
  [103.85, 30.48], // Southwest (Shuangliu / Wenjiang)
  [104.28, 30.82]  // Northeast (Longquanyi / Xindu)
];

const TEST_LOCATIONS = {
  tianfu:   { name: "🏛️ 天府广场/春熙路", type: "chengdu", center: [104.066, 30.658], zoom: 14.0, pitch: 0 },
  jiuyanqiao:{name: "🌉 九眼桥/锦江合江亭", type: "chengdu", center: [104.081, 30.642], zoom: 14.8, pitch: 0 },
  huanhuaxi:{ name: "🌲 浣花溪/杜甫草堂", type: "chengdu", center: [104.031, 30.660], zoom: 14.3, pitch: 0 },
  jincheng: { name: "🌊 锦城湖/环球中心", type: "chengdu", center: [104.060, 30.610], zoom: 13.8, pitch: 0 },
  overview: { name: "🗺️ 成都市全览", type: "chengdu", center: [104.066, 30.658], zoom: 12.3, pitch: 0 }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initPresets();
  initColorControls();
  initMap();
  setupEventListeners();
});

// Render Preset Chips
function initPresets() {
  const container = document.getElementById("preset-chips-container");
  container.innerHTML = "";

  Object.keys(window.GURU_PRESETS).forEach((key, index) => {
    const preset = window.GURU_PRESETS[key];
    const chip = document.createElement("button");
    chip.className = `preset-chip ${index === 0 ? "active" : ""}`;
    chip.innerHTML = `${preset.icon} <span>${preset.name.split(" ")[0]}</span>`;
    chip.title = preset.description;
    chip.onclick = () => applyPreset(key, chip);
    container.appendChild(chip);
  });
}

// Render Maputnik-style Unified Feature Inspector Cards
function initColorControls() {
  const container = document.getElementById("categories-container");
  container.innerHTML = "";

  currentColors = { ...window.GURU_PRESETS.default.colors };

  FEATURE_DEFS.forEach((group) => {
    const groupEl = document.createElement("div");
    groupEl.className = "cat-group";

    const header = document.createElement("div");
    header.className = "cat-header";
    header.innerHTML = `<span>${group.icon} ${group.category}</span><span style="font-size:0.75rem; color:#9ca3af;">▼</span>`;
    header.onclick = () => {
      const items = groupEl.querySelector(".cat-items");
      items.style.display = items.style.display === "none" ? "flex" : "none";
    };

    const itemsEl = document.createElement("div");
    itemsEl.className = "cat-items";

    group.features.forEach((feat, fIdx) => {
      const fillVal = currentColors[feat.fillKey] || feat.defaultFill;
      const casingVal = currentColors[feat.casingKey] || feat.defaultCasing;

      const card = document.createElement("div");
      card.className = `feature-card ${fIdx === 0 ? "expanded" : ""}`;
      card.innerHTML = `
        <div class="feature-card-head">
          <div class="feature-card-title">
            <span class="feature-swatch-dual" id="swatch-${feat.id}" style="background:${normalizeHex(fillVal)}; border-color:${normalizeHex(casingVal)};"></span>
            <span>${feat.title}</span>
          </div>
          <span style="font-size:0.72rem; color:#9ca3af;">属性 ▾</span>
        </div>
        <div class="feature-card-body">
          <div class="prop-grid">
            <div class="prop-cell">
              <div class="prop-label">
                <span>${feat.fillLabel}</span>
                <code>${feat.fillKey.replace("@color_", "")}</code>
              </div>
              <div class="prop-control">
                <input type="color" class="color-input-native" id="picker-${feat.fillKey}" value="${normalizeHex(fillVal)}">
                <input type="text" class="color-hex-text" id="hex-${feat.fillKey}" value="${fillVal.toUpperCase()}" maxlength="9">
              </div>
            </div>
            <div class="prop-cell">
              <div class="prop-label">
                <span>${feat.casingLabel}</span>
                <code>${feat.casingKey.replace("@color_", "")}</code>
              </div>
              <div class="prop-control">
                <input type="color" class="color-input-native" id="picker-${feat.casingKey}" value="${normalizeHex(casingVal)}">
                <input type="text" class="color-hex-text" id="hex-${feat.casingKey}" value="${casingVal.toUpperCase()}" maxlength="9">
              </div>
            </div>
          </div>
        </div>
      `;

      // Toggle card expand/collapse like Maputnik layer inspector
      const cardHead = card.querySelector(".feature-card-head");
      cardHead.onclick = () => {
        card.classList.toggle("expanded");
      };

      const swatch = card.querySelector(`#swatch-${feat.id}`);
      const bindColorPair = (key) => {
        const picker = card.querySelector(`#picker-${CSS.escape(key)}`);
        const hexInput = card.querySelector(`#hex-${CSS.escape(key)}`);
        if (!picker || !hexInput) return;

        picker.addEventListener("input", (e) => {
          const val = e.target.value.toUpperCase();
          hexInput.value = val;
          updateColor(key, val);
          if (swatch) {
            swatch.style.background = normalizeHex(currentColors[feat.fillKey]);
            swatch.style.borderColor = normalizeHex(currentColors[feat.casingKey]);
          }
        });

        hexInput.addEventListener("change", (e) => {
          let cleanHex = e.target.value.trim().toUpperCase();
          if (!cleanHex.startsWith("#")) cleanHex = "#" + cleanHex;
          picker.value = normalizeHex(cleanHex);
          updateColor(key, cleanHex);
          if (swatch) {
            swatch.style.background = normalizeHex(currentColors[feat.fillKey]);
            swatch.style.borderColor = normalizeHex(currentColors[feat.casingKey]);
          }
        });
      };

      bindColorPair(feat.fillKey);
      bindColorPair(feat.casingKey);

      itemsEl.appendChild(card);
    });

    groupEl.appendChild(header);
    groupEl.appendChild(itemsEl);
    container.appendChild(groupEl);
  });
}

function normalizeHex(hex) {
  if (!hex) return "#000000";
  let h = hex.trim();
  if (h.length === 9) return h.substring(0, 7);
  if (h.length === 4) return "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  return h;
}

// Build Real OpenStreetMap Vector Tile Style (OpenMapTiles Schema via Local Caching Proxy)
function buildRealOSMVectorStyle() {
  const origin = window.location.origin;
  return {
    version: 8,
    name: "Guru Maps Real OSM Vector Style",
    glyphs: `${origin}/editor/fonts/{fontstack}/{range}.pbf`,
    sources: {
      "openmaptiles": {
        type: "vector",
        tiles: [`${origin}/tiles/{z}/{x}/{y}.pbf`],
        minzoom: 0,
        maxzoom: 14
      }
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": currentColors["@color_ground"] || "#EAE3D3" }
      },
      {
        id: "landuse_residential",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landuse",
        filter: ["in", ["get", "class"], ["literal", ["residential", "suburb", "quarter", "neighbourhood"]]],
        paint: { "fill-color": currentColors["@color_landuse_residential"] || "#D4CFC8", "fill-opacity": 0.65 }
      },
      {
        id: "landuse_commercial",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landuse",
        filter: ["in", ["get", "class"], ["literal", ["commercial", "retail", "industrial", "hospital", "school", "university"]]],
        paint: { "fill-color": currentColors["@color_landuse_commercial"] || "#F3E3D9", "fill-opacity": 0.65 }
      },
      {
        id: "landcover_ice",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["==", ["get", "class"], "ice"],
        paint: { "fill-color": currentColors["@color_glacier"] || "#E0F8F7" }
      },
      {
        id: "landcover_sand",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["==", ["get", "class"], "sand"],
        paint: { "fill-color": currentColors["@color_sand"] || "#F5E9C6" }
      },
      {
        id: "park",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "park",
        paint: { "fill-color": currentColors["@color_wood"] || "#A0D788", "fill-opacity": 0.6 }
      },
      {
        id: "landcover_wood",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["==", ["get", "class"], "wood"],
        paint: { "fill-color": currentColors["@color_wood"] || "#A0D788", "fill-opacity": 0.8 }
      },
      {
        id: "landcover_grass",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["in", ["get", "class"], ["literal", ["grass", "farmland", "wetland"]]],
        paint: { "fill-color": currentColors["@color_grass"] || "#C8DF9F", "fill-opacity": 0.8 }
      },
      {
        id: "waterway_other",
        type: "line",
        source: "openmaptiles",
        "source-layer": "waterway",
        filter: ["!=", ["get", "class"], "river"],
        paint: {
          "line-color": currentColors["@color_water"] || "#83C3ED",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 2.5]
        }
      },
      {
        id: "waterway_river",
        type: "line",
        source: "openmaptiles",
        "source-layer": "waterway",
        filter: ["==", ["get", "class"], "river"],
        paint: {
          "line-color": currentColors["@color_water"] || "#83C3ED",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1.5, 14, 5, 17, 10]
        }
      },
      {
        id: "water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        paint: { "fill-color": currentColors["@color_water"] || "#83C3ED" }
      },
      {
        id: "building",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "building",
        minzoom: 13,
        paint: {
          "fill-color": currentColors["@color_building"] || "#D7C9BA",
          "fill-outline-color": currentColors["@color_building_stroke"] || "#B39B7C",
          "fill-opacity": 0.9
        }
      },
      // ============================================================================
      // 1. UNDERGROUND LAYER: Road Tunnels & Subway/Rail Tunnels (brunnel == "tunnel" or subclass == "subway")
      // ============================================================================
      {
        id: "tunnel",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "tunnel"],
          ["!", ["in", ["get", "class"], ["literal", ["rail", "transit"]]]]
        ],
        paint: {
          "line-color": roadSpec.colorTunnel,
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 15, 5],
          "line-opacity": roadSpec.tunnelOpacity,
          "line-dasharray": [3, 2]
        }
      },
      {
        id: "tunnel_railway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["in", ["get", "class"], ["literal", ["rail", "transit"]]],
          ["any", ["==", ["get", "brunnel"], "tunnel"], ["==", ["get", "subclass"], "subway"], ["<", ["coalesce", ["get", "layer"], 0], 0]]
        ],
        paint: {
          "line-color": currentColors["@color_railway"] || "#887A85",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1.0, 15, 1.8],
          "line-opacity": 0.45,
          "line-dasharray": [3, 3]
        }
      },

      // ============================================================================
      // 2A. GROUND LAYER - PASS 1: All Road Casings & Trails (Low Grade -> High Grade)
      // Strictly filter geometry-type == LineString/MultiLineString
      // ============================================================================
      {
        id: "track",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["==", ["get", "class"], "track"]
        ],
        paint: {
          "line-color": currentColors["@color_track_dashes"] || "#8C6F58",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1.5, 16, 3.5],
          "line-dasharray": [3, 2]
        }
      },
      {
        id: "path",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 13,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["path", "footway", "pedestrian", "steps", "cycleway"]]]
        ],
        paint: {
          "line-color": currentColors["@color_footway_dashes"] || "#B8908A",
          "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1.5, 16, roadSpec.pathZ15],
          "line-dasharray": [2, 2]
        }
      },
      {
        id: "small_road_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["minor", "service", "street"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_small_road_casing"] || "#CCCCCC",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1.5, 15, 4, 18, 8]
        }
      },
      {
        id: "secondary_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_secondary_casing"] || "#EECC66",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 14, 5, 18, 12]
        }
      },
      {
        id: "primary_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["==", ["get", "class"], "primary"]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_primary_casing"] || "#EEAA55",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, roadSpec.primaryZ8 + 1.5, 14, roadSpec.primaryZ14 + 2, 18, roadSpec.primaryZ14 * 2.2 + 2.5]
        }
      },
      {
        id: "motorway_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_motorway_casing"] || "#EE8855",
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, roadSpec.motorwayZ6 + 1.5, 14, roadSpec.motorwayZ14 + 2.5, 18, roadSpec.motorwayZ14 * 2.2 + 3]
        }
      },

      // ============================================================================
      // 2B. GROUND LAYER - PASS 2: All Road Fills (Low Grade -> High Grade)
      // ============================================================================
      {
        id: "small_road",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["minor", "service", "street"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_small_road"] || "#FEFEFE",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.8, 15, 2.5, 18, 6]
        }
      },
      {
        id: "secondary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_secondary"] || "#FFDD77",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.2, 14, 3.5, 18, 9]
        }
      },
      {
        id: "primary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["==", ["get", "class"], "primary"]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_primary"] || "#FFBB66",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, roadSpec.primaryZ8, 14, roadSpec.primaryZ14, 18, roadSpec.primaryZ14 * 2.2]
        }
      },
      {
        id: "motorway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_motorway"] || "#FF9966",
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, roadSpec.motorwayZ6, 14, roadSpec.motorwayZ14, 18, roadSpec.motorwayZ14 * 2.2]
        }
      },
      {
        id: "railway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
          ["!=", ["get", "subclass"], "subway"],
          [">=", ["coalesce", ["get", "layer"], 0], 0],
          ["in", ["get", "class"], ["literal", ["rail", "transit"]]]
        ],
        paint: {
          "line-color": currentColors["@color_railway"] || "#887A85",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.2, 15, 2.5],
          "line-dasharray": [4, 2]
        }
      },

      // ============================================================================
      // 3. OVERPASS LAYER: Bridge Deck Polygons + Bridge Casings (Pass 3A) + Bridge Fills (Pass 3B)
      // ============================================================================
      {
        id: "bridge_deck_poly",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 13,
        filter: [
          "all",
          ["match", ["geometry-type"], ["Polygon", "MultiPolygon"], true, false],
          ["==", ["get", "brunnel"], "bridge"]
        ],
        paint: {
          "fill-color": roadSpec.colorBridge,
          "fill-opacity": 0.28
        }
      },
      // Pass 3A: All Bridge Casings (Low Grade -> High Grade, LineString only, line-cap: butt)
      {
        id: "bridge_small_road_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["minor", "service", "street"]]]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": roadSpec.colorBridge,
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.8 + roadSpec.bridgeWidth * 1.4, 15, 2.5 + roadSpec.bridgeWidth * 1.8, 18, 6 + roadSpec.bridgeWidth * 2.2]
        }
      },
      {
        id: "bridge_secondary_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": roadSpec.colorBridge,
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.2 + roadSpec.bridgeWidth * 1.2, 14, 3.5 + roadSpec.bridgeWidth * 1.8, 18, 9 + roadSpec.bridgeWidth * 2.5]
        }
      },
      {
        id: "bridge_primary_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["==", ["get", "class"], "primary"]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": roadSpec.colorBridge,
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, roadSpec.primaryZ8 + roadSpec.bridgeWidth * 1.4, 14, roadSpec.primaryZ14 + roadSpec.bridgeWidth * 2, 18, roadSpec.primaryZ14 * 2.2 + roadSpec.bridgeWidth * 2.6]
        }
      },
      {
        id: "bridge_motorway_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": roadSpec.colorBridge,
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, roadSpec.motorwayZ6 + roadSpec.bridgeWidth * 1.4, 14, roadSpec.motorwayZ14 + roadSpec.bridgeWidth * 2.2, 18, roadSpec.motorwayZ14 * 2.2 + roadSpec.bridgeWidth * 2.8]
        }
      },
      // Pass 3B: All Bridge Fills (Low Grade -> High Grade, preserving each road's class color)
      {
        id: "bridge_small_road",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["minor", "service", "street"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_small_road"] || "#FEFEFE",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.8, 15, 2.5, 18, 6]
        }
      },
      {
        id: "bridge_secondary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_secondary"] || "#FFDD77",
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.2, 14, 3.5, 18, 9]
        }
      },
      {
        id: "bridge_primary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["==", ["get", "class"], "primary"]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_primary"] || "#FFBB66",
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, roadSpec.primaryZ8, 14, roadSpec.primaryZ14, 18, roadSpec.primaryZ14 * 2.2]
        }
      },
      {
        id: "bridge_motorway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]]
        ],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": currentColors["@color_motorway"] || "#FF9966",
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, roadSpec.motorwayZ6, 14, roadSpec.motorwayZ14, 18, roadSpec.motorwayZ14 * 2.2]
        }
      },
      // Pass 3C: Pedestrian Overpasses / Footbridges ([brunnel=bridge][class=path/footway/steps])
      // Matches Guru Maps lines.mapcss: thin white deck + gray side railing + dashed footway line
      {
        id: "bridge_path_casing",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 14,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["path", "footway", "pedestrian", "steps", "cycleway"]]]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": roadSpec.colorBridge,
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 3.2, 17, 6.0]
        }
      },
      {
        id: "bridge_path_deck",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 14,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["path", "footway", "pedestrian", "steps", "cycleway"]]]
        ],
        layout: { "line-cap": "butt", "line-join": "miter" },
        paint: {
          "line-color": currentColors["@color_small_road"] || "#FEFEFE",
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 1.8, 17, 3.8]
        }
      },
      {
        id: "bridge_path",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 14,
        filter: [
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["==", ["get", "brunnel"], "bridge"],
          ["in", ["get", "class"], ["literal", ["path", "footway", "pedestrian", "steps", "cycleway"]]]
        ],
        paint: {
          "line-color": currentColors["@color_footway_dashes"] || "#B8908A",
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 1.2, 17, 2.2],
          "line-dasharray": [1.5, 1.5]
        }
      },
      {
        id: "water_label",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "water_name",
        layout: {
          "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": 12
        },
        paint: {
          "text-color": currentColors["@color_water_text"] || "#0F4F80",
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-halo-width": 1.5
        }
      },
      {
        id: "road_label",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "transportation_name",
        minzoom: 12,
        layout: {
          "symbol-placement": "line",
          "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 12, 10, 16, 13]
        },
        paint: {
          "text-color": currentColors["@color_name_text"] || "#48424F",
          "text-halo-color": "rgba(255,255,255,0.85)",
          "text-halo-width": 1.8
        }
      },
      {
        id: "poi_label",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "poi",
        minzoom: 14,
        filter: ["<=", ["get", "rank"], 15],
        layout: {
          "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": 11,
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        },
        paint: {
          "text-color": currentColors["@color_name_text"] || "#48424F",
          "text-halo-color": "rgba(255,255,255,0.85)",
          "text-halo-width": 1.5
        }
      },
      {
        id: "place_label",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        layout: {
          "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": [
            "match",
            ["get", "class"],
            "city", 18,
            "town", 15,
            "suburb", 14,
            "quarter", 13,
            12
          ]
        },
        paint: {
          "text-color": currentColors["@color_name_text"] || "#48424F",
          "text-halo-color": "rgba(255,255,255,0.9)",
          "text-halo-width": 2.0
        }
      }
    ]
  };
}

// Initialize Map (Default centered on Chengdu成都市 with Real OpenStreetMap Vector Tiles)
function initMap() {
  const initialLoc = TEST_LOCATIONS.tianfu;
  const realOSMStyle = buildRealOSMVectorStyle();

  map = new maplibregl.Map({
    container: "map",
    style: realOSMStyle,
    center: initialLoc.center,
    zoom: initialLoc.zoom,
    pitch: 0,
    bearing: 0,
    maxPitch: 0,
    dragRotate: false,
    pitchWithRotate: false,
    minZoom: 2,
    maxZoom: 20,
    localIdeographFontFamily: "'Microsoft YaHei', 'PingFang SC', 'SimHei', sans-serif",
    attributionControl: false
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  map.on("error", (e) => {
    console.error("[MAPLIBRE_ERR]", e && e.error ? e.error.message : JSON.stringify(e));
  });

  map.on("load", () => {
    console.log("[GuruMaps Studio] Real OSM Vector Map Loaded Successfully");
    applyAllColorsToMap();
    initFeatureInspector();
    updateMapStatus();
  });

  map.on("move", () => {
    updateMapStatus();
  });
}

let inspectModeActive = true;
let lastInspectReportText = "";

function findColorVarForLayer(layerId) {
  for (const [colorVar, targets] of Object.entries(LAYER_MAPPING)) {
    if (targets.some(t => t.id === layerId)) return colorVar;
  }
  if (layerId.includes("bridge") && layerId.includes("casing")) return "@color_bridge";
  if (layerId === "bridge_deck_poly") return "@color_bridge";
  if (layerId === "tunnel") return "@color_tunnel";
  return "-";
}

function initFeatureInspector() {
  if (!map.getSource("__inspect_highlight")) {
    map.addSource("__inspect_highlight", {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] }
    });
    map.addLayer({
      id: "__inspect_highlight_poly",
      type: "fill",
      source: "__inspect_highlight",
      filter: ["match", ["geometry-type"], ["Polygon", "MultiPolygon"], true, false],
      paint: {
        "fill-color": "#00F5D4",
        "fill-opacity": 0.32,
        "fill-outline-color": "#00BBF9"
      }
    });
    map.addLayer({
      id: "__inspect_highlight_line",
      type: "line",
      source: "__inspect_highlight",
      paint: {
        "line-color": "#00F5D4",
        "line-width": 4,
        "line-opacity": 0.9
      }
    });
  }

  map.getCanvas().style.cursor = inspectModeActive ? "crosshair" : "";

  map.on("click", (e) => {
    if (!inspectModeActive) return;

    const bbox = [
      [e.point.x - 4, e.point.y - 4],
      [e.point.x + 4, e.point.y + 4]
    ];
    const rawFeatures = map.queryRenderedFeatures(bbox).filter(
      f => f.layer && !f.layer.id.startsWith("__inspect_") && f.layer.id !== "background"
    );

    // Deduplicate by layer.id + JSON(properties)
    const seen = new Set();
    const features = [];
    for (const f of rawFeatures) {
      const sig = `${f.layer.id}::${JSON.stringify(f.properties || {})}`;
      if (!seen.has(sig)) {
        seen.add(sig);
        features.push(f);
      }
    }

    const card = document.getElementById("feature-inspector-card");
    const body = document.getElementById("inspector-body");
    if (!card || !body) return;

    card.classList.add("visible");
    const lng = e.lngLat.lng.toFixed(5);
    const lat = e.lngLat.lat.toFixed(5);
    const zoom = map.getZoom().toFixed(2);

    if (features.length === 0) {
      map.getSource("__inspect_highlight").setData({ type: "FeatureCollection", features: [] });
      body.innerHTML = `
        <div class="inspector-coord-bar">📍 [${lng}, ${lat}] | Zoom: ${zoom}</div>
        <div style="color:#9ca3af; font-size:0.78rem; padding:8px 0;">此处仅包含陆地背景底色 (background)，无叠加矢量要素。</div>
      `;
      lastInspectReportText = `[要素识别] 坐标: [${lng}, ${lat}], Zoom: ${zoom} -> 无矢量要素`;
      return;
    }

    // Highlight the top-most clicked feature on map
    highlightInspectedFeature(features[0]);

    const reportLines = [
      `【要素识别报告】坐标: [${lng}, ${lat}] | Zoom: ${zoom} | 共命中 ${features.length} 个图层（由顶到底排序）：`
    ];

    let html = `<div class="inspector-coord-bar">📍 [${lng}, ${lat}] | Zoom: ${zoom} (命中 ${features.length} 层，自顶向下)</div>`;

    features.forEach((f, idx) => {
      const layerId = f.layer.id;
      const sourceLayer = f.sourceLayer || f.layer["source-layer"] || "-";
      const geomType = f.geometry ? f.geometry.type : "Unknown";
      const colorVar = findColorVarForLayer(layerId);
      const props = f.properties || {};
      const propEntries = Object.entries(props);

      reportLines.push(
        `${idx + 1}. layer="${layerId}" (${ f.layer.type }) | source-layer="${sourceLayer}" | geom="${geomType}" | var="${colorVar}" | props=${JSON.stringify(props)}`
      );

      const propsHtml = propEntries.length > 0
        ? `<div class="inspect-props-table">` +
          propEntries.map(([k, v]) => `<span class="inspect-prop-k">${k}:</span><span class="inspect-prop-v">${String(v)}</span>`).join("") +
          `</div>`
        : `<div style="font-size:0.72rem; color:#6b7280;">(无附加 OSM 属性字段)</div>`;

      html += `
        <div class="inspect-feat-item" data-feat-idx="${idx}" style="cursor:pointer;" title="点击在地图上单独高亮该要素几何">
          <div class="inspect-feat-top">
            <span class="inspect-layer-badge">#${idx + 1} ${layerId}</span>
            <span class="inspect-geom-badge">${geomType} (${f.layer.type})</span>
          </div>
          <div class="inspect-source-row">
            <span>源图层: <b>${sourceLayer}</b></span>
            <span>色板变量: <code>${colorVar}</code></span>
          </div>
          ${propsHtml}
        </div>
      `;
    });

    body.innerHTML = html;
    lastInspectReportText = reportLines.join("\n");

    body.querySelectorAll(".inspect-feat-item").forEach(el => {
      el.onclick = () => {
        const i = parseInt(el.getAttribute("data-feat-idx"), 10);
        if (features[i]) highlightInspectedFeature(features[i]);
      };
    });
  });
}

function highlightInspectedFeature(feat) {
  if (!map || !map.getSource("__inspect_highlight") || !feat || !feat.geometry) return;
  map.getSource("__inspect_highlight").setData({
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: feat.geometry,
      properties: feat.properties || {}
    }]
  });
}

function updateMapStatus() {
  const center = map.getCenter();
  const zoom = map.getZoom().toFixed(1);
  document.getElementById("map-zoom-badge").innerText = 
    `🌐 OpenStreetMap 真实矢量数据 | 成都市 | Zoom: ${zoom} | ${center.lng.toFixed(3)}°E, ${center.lat.toFixed(3)}°N`;
}

// Switch between Chengdu Viewpoints
function switchSampleLocation(locKey) {
  const loc = TEST_LOCATIONS[locKey];
  if (!loc) return;
  map.flyTo({ center: loc.center, zoom: loc.zoom, pitch: loc.pitch, essential: true });
}

// Update single color & sync with MapLibre layers
function updateColor(key, hex) {
  currentColors[key] = hex;
  if (!map) return;

  const targets = LAYER_MAPPING[key];
  if (!targets) return;

  targets.forEach(target => {
    try {
      if (map.getLayer(target.id)) {
        map.setPaintProperty(target.id, target.prop, hex);
      }
    } catch {
      // Ignored if layer doesn't exist
    }
  });
}

// Batch apply all colors to map
function applyAllColorsToMap() {
  if (!map) return;
  Object.keys(currentColors).forEach(key => {
    updateColor(key, currentColors[key]);
  });
}

// Apply selected Preset
function applyPreset(presetKey, chipEl) {
  const preset = window.GURU_PRESETS[presetKey];
  if (!preset) return;

  document.querySelectorAll(".preset-chip").forEach(c => c.classList.remove("active"));
  if (chipEl) chipEl.classList.add("active");

  currentColors = { ...preset.colors };

  // Update UI Inputs & Feature Dual Swatches
  Object.keys(currentColors).forEach(key => {
    const hex = currentColors[key];
    const picker = document.getElementById(`picker-${key}`);
    const hexInput = document.getElementById(`hex-${key}`);
    if (picker) picker.value = normalizeHex(hex);
    if (hexInput) hexInput.value = hex.toUpperCase();
  });

  FEATURE_DEFS.forEach(group => {
    group.features.forEach(feat => {
      const swatch = document.getElementById(`swatch-${feat.id}`);
      if (swatch) {
        swatch.style.background = normalizeHex(currentColors[feat.fillKey]);
        swatch.style.borderColor = normalizeHex(currentColors[feat.casingKey]);
      }
    });
  });

  applyAllColorsToMap();
}

// Setup Event Listeners & Quick Toggles
function setupEventListeners() {
  // Location Chips
  const locContainer = document.getElementById("location-chips");
  Object.keys(TEST_LOCATIONS).forEach((locKey, idx) => {
    const loc = TEST_LOCATIONS[locKey];
    const chip = document.createElement("button");
    chip.className = `location-chip ${idx === 0 ? "active" : ""}`;
    chip.innerText = loc.name;
    chip.onclick = () => {
      document.querySelectorAll(".location-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      switchSampleLocation(locKey);
    };
    locContainer.appendChild(chip);
  });

  // Feature Inspector Mode Toggle Button in Top Floating Bar
  const inspectBtn = document.createElement("button");
  inspectBtn.className = "inspector-toggle-btn active";
  inspectBtn.innerText = "🔍 点击识图: 开启";
  inspectBtn.title = "开启后点击地图任意位置即可查看要素图层顺序与OSM属性";
  inspectBtn.onclick = () => {
    inspectModeActive = !inspectModeActive;
    inspectBtn.classList.toggle("active", inspectModeActive);
    inspectBtn.innerText = inspectModeActive ? "🔍 点击识图: 开启" : "🔍 点击识图: 关闭";
    if (map) map.getCanvas().style.cursor = inspectModeActive ? "crosshair" : "";
    if (!inspectModeActive) {
      document.getElementById("feature-inspector-card").classList.remove("visible");
      if (map && map.getSource("__inspect_highlight")) {
        map.getSource("__inspect_highlight").setData({ type: "FeatureCollection", features: [] });
      }
    }
  };
  locContainer.appendChild(inspectBtn);

  // Inspector Panel Copy & Close Buttons
  const copyInspectBtn = document.getElementById("btn-copy-inspect");
  if (copyInspectBtn) {
    copyInspectBtn.onclick = () => {
      if (!lastInspectReportText) return;
      navigator.clipboard.writeText(lastInspectReportText);
      copyInspectBtn.innerText = "✅ 已复制";
      setTimeout(() => { copyInspectBtn.innerText = "📋 复制属性"; }, 1800);
    };
  }

  const closeInspectBtn = document.getElementById("btn-close-inspect");
  if (closeInspectBtn) {
    closeInspectBtn.onclick = () => {
      document.getElementById("feature-inspector-card").classList.remove("visible");
      if (map && map.getSource("__inspect_highlight")) {
        map.getSource("__inspect_highlight").setData({ type: "FeatureCollection", features: [] });
      }
    };
  }

  // Trail Boost Toggle
  const trailToggle = document.getElementById("toggle-trail-boost");
  trailToggle.onclick = () => {
    trailBoostActive = !trailBoostActive;
    trailToggle.classList.toggle("active", trailBoostActive);
    if (map && map.isStyleLoaded()) {
      const trailWidth = trailBoostActive ? 5 : 3;
      const trailColor = trailBoostActive ? "#FF3B30" : currentColors["@color_footway_dashes"];
      const trackWidth = trailBoostActive ? 4.5 : 3.5;
      const trackColor = trailBoostActive ? "#FF9500" : currentColors["@color_track_dashes"];

      if (map.getLayer("path")) {
        map.setPaintProperty("path", "line-width", trailWidth);
        map.setPaintProperty("path", "line-color", trailColor);
      }
      if (map.getLayer("track")) {
        map.setPaintProperty("track", "line-width", trackWidth);
        map.setPaintProperty("track", "line-color", trackColor);
      }
      if (map.getLayer("road_path_pedestrian")) {
        map.setPaintProperty("road_path_pedestrian", "line-width", trailWidth);
        map.setPaintProperty("road_path_pedestrian", "line-color", trailColor);
      }
    }
  };

  // Clean City Toggle
  const cleanToggle = document.getElementById("toggle-clean-poi");
  cleanToggle.onclick = () => {
    cleanPoiActive = !cleanPoiActive;
    cleanToggle.classList.toggle("active", cleanPoiActive);
    if (map && map.isStyleLoaded()) {
      const opacity = cleanPoiActive ? 0.3 : 1;
      if (map.getLayer("building")) map.setPaintProperty("building", "fill-opacity", opacity);
      if (map.getLayer("landuse_residential")) map.setPaintProperty("landuse_residential", "fill-opacity", opacity);
    }
  };

  // Navigation Tabs Switching
  document.querySelectorAll(".nav-tab").forEach(tabBtn => {
    tabBtn.onclick = () => {
      document.querySelectorAll(".nav-tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(p => p.classList.remove("active"));
      tabBtn.classList.add("active");
      const targetId = tabBtn.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
      if (targetId === "tab-code") updateLiveCodePreview();
    };
  });

  // Bridge & Tunnel Controls
  setupRoadStructureListeners();

  // Copy Code Button
  const copyBtn = document.getElementById("btn-copy-code");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const code = document.getElementById("code-preview-block").innerText;
      navigator.clipboard.writeText(code);
      copyBtn.innerText = "✅ 已复制到剪贴板";
      setTimeout(() => { copyBtn.innerText = "📋 一键复制代码"; }, 1800);
    };
  }

  // Export Button
  document.getElementById("btn-export").onclick = exportStylePackage;

  // Reset Button
  document.getElementById("btn-reset").onclick = () => {
    applyPreset("default", document.querySelector(".preset-chip"));
  };

  // Help Modal Close
  document.getElementById("btn-modal-close").onclick = () => {
    document.getElementById("help-modal").style.display = "none";
  };
}

// Bind Road Structure & zlinear Sliders
function setupRoadStructureListeners() {
  const bindSlider = (sliderId, valId, unit, onUpdate) => {
    const el = document.getElementById(sliderId);
    const valEl = document.getElementById(valId);
    if (!el) return;
    el.addEventListener("input", (e) => {
      const num = parseFloat(e.target.value);
      if (valEl) valEl.innerText = unit === "%" ? `${Math.round(num * 100)}%` : `${num} ${unit}`;
      onUpdate(num);
    });
  };

  // Bridge Color
  const bPicker = document.getElementById("picker-color-bridge");
  const bHex = document.getElementById("hex-color-bridge");
  if (bPicker && bHex) {
    bPicker.addEventListener("input", (e) => {
      roadSpec.colorBridge = e.target.value.toUpperCase();
      bHex.value = roadSpec.colorBridge;
      if (map) {
        if (map.getLayer("bridge_deck_poly")) {
          map.setPaintProperty("bridge_deck_poly", "fill-color", roadSpec.colorBridge);
        }
        ["bridge_small_road_casing", "bridge_secondary_casing", "bridge_primary_casing", "bridge_motorway_casing"].forEach(id => {
          if (map.getLayer(id)) map.setPaintProperty(id, "line-color", roadSpec.colorBridge);
        });
      }
    });
  }

  // Tunnel Color
  const tPicker = document.getElementById("picker-color-tunnel");
  const tHex = document.getElementById("hex-color-tunnel");
  if (tPicker && tHex) {
    tPicker.addEventListener("input", (e) => {
      roadSpec.colorTunnel = e.target.value.toUpperCase();
      tHex.value = roadSpec.colorTunnel;
      if (map && map.getLayer("tunnel")) {
        map.setPaintProperty("tunnel", "line-color", roadSpec.colorTunnel);
      }
    });
  }

  bindSlider("slider-bridge-width", "val-bridge-width", "pt", (val) => {
    roadSpec.bridgeWidth = val;
    if (map) {
      if (map.getLayer("bridge_small_road_casing")) {
        map.setPaintProperty("bridge_small_road_casing", "line-width", ["interpolate", ["linear"], ["zoom"], 12, 0.8 + val * 1.4, 15, 2.5 + val * 1.8, 18, 6 + val * 2.2]);
      }
      if (map.getLayer("bridge_secondary_casing")) {
        map.setPaintProperty("bridge_secondary_casing", "line-width", ["interpolate", ["linear"], ["zoom"], 10, 1.2 + val * 1.2, 14, 3.5 + val * 1.8, 18, 9 + val * 2.5]);
      }
      if (map.getLayer("bridge_primary_casing")) {
        map.setPaintProperty("bridge_primary_casing", "line-width", ["interpolate", ["linear"], ["zoom"], 8, roadSpec.primaryZ8 + val * 1.4, 14, roadSpec.primaryZ14 + val * 2, 18, roadSpec.primaryZ14 * 2.2 + val * 2.6]);
      }
      if (map.getLayer("bridge_motorway_casing")) {
        map.setPaintProperty("bridge_motorway_casing", "line-width", ["interpolate", ["linear"], ["zoom"], 6, roadSpec.motorwayZ6 + val * 1.4, 14, roadSpec.motorwayZ14 + val * 2.2, 18, roadSpec.motorwayZ14 * 2.2 + val * 2.8]);
      }
    }
  });

  bindSlider("slider-tunnel-opacity", "val-tunnel-opacity", "%", (val) => {
    roadSpec.tunnelOpacity = val;
    if (map && map.getLayer("tunnel")) {
      map.setPaintProperty("tunnel", "line-opacity", val);
    }
  });

  bindSlider("slider-motorway-z6", "val-motorway-z6", "pt", (val) => {
    roadSpec.motorwayZ6 = val;
    updateZLinearLayer("motorway", 6, roadSpec.motorwayZ6, 14, roadSpec.motorwayZ14);
  });

  bindSlider("slider-motorway-z14", "val-motorway-z14", "pt", (val) => {
    roadSpec.motorwayZ14 = val;
    updateZLinearLayer("motorway", 6, roadSpec.motorwayZ6, 14, roadSpec.motorwayZ14);
  });

  bindSlider("slider-primary-z8", "val-primary-z8", "pt", (val) => {
    roadSpec.primaryZ8 = val;
    updateZLinearLayer("primary", 8, roadSpec.primaryZ8, 14, roadSpec.primaryZ14);
  });

  bindSlider("slider-primary-z14", "val-primary-z14", "pt", (val) => {
    roadSpec.primaryZ14 = val;
    updateZLinearLayer("primary", 8, roadSpec.primaryZ8, 14, roadSpec.primaryZ14);
  });

  bindSlider("slider-path-z15", "val-path-z15", "pt", (val) => {
    roadSpec.pathZ15 = val;
    if (map && map.getLayer("path")) {
      map.setPaintProperty("path", "line-width", val);
    }
  });
}

function updateZLinearLayer(layerId, zStart, wStart, zEnd, wEnd) {
  if (!map || !map.getLayer(layerId)) return;
  map.setPaintProperty(layerId, "line-width", [
    "interpolate", ["linear"], ["zoom"], zStart, wStart, zEnd, wEnd, 18, wEnd * 2.2
  ]);
  const casingId = `${layerId}_casing`;
  if (map.getLayer(casingId)) {
    map.setPaintProperty(casingId, "line-width", [
      "interpolate", ["linear"], ["zoom"], zStart, wStart + 1.5, zEnd, wEnd + 2.2, 18, wEnd * 2.2 + 2.8
    ]);
  }
}

// Compute zlinear step array string for MapCSS
function buildZLinearExpr(zStart, wStart, zEnd, wEnd) {
  const steps = [];
  for (let z = zStart; z <= zEnd; z++) {
    const ratio = (z - zStart) / (zEnd - zStart);
    const w = (wStart + ratio * (wEnd - wStart)).toFixed(1).replace(/\.0$/, "");
    steps.push(`${w}pt`);
  }
  return `eval( zlinear(${zStart}, ${steps.join(", ")}) )`;
}

// Generate Custom MapCSS Rules for Code Preview & Export
function buildCustomLinesMapCSS() {
  const alphaHex = Math.round(roadSpec.tunnelOpacity * 255).toString(16).padStart(2, "0").toUpperCase();
  const tunnelColorHex = `${roadSpec.colorTunnel}${alphaHex}`;
  const mwZLinear = buildZLinearExpr(6, roadSpec.motorwayZ6, 14, roadSpec.motorwayZ14);
  const prZLinear = buildZLinearExpr(8, roadSpec.primaryZ8, 14, roadSpec.primaryZ14);

  return `// ==========================================
// 道路分层、桥梁/隧道与 zlinear 动态插值规则
// ==========================================

// 1. 桥梁立体分层 (外描边与无封口端点)
line|z12-[bridge] {
    casing-color: ${roadSpec.colorBridge};
    casing-width: ${roadSpec.bridgeWidth}pt;
    linecap: none;
    z-index: 6;
}

// 2. 隧道立体分层 (半透明与虚线样式)
line|z12-[tunnel] {
    color: ${tunnelColorHex};
    dashes: 4, 4;
    layer: -1;
}

// 3. 高速公路随缩放动态插值 (zlinear)
line|z6-[highway=motorway] {
    color: @color_motorway;
    casing-color: @color_motorway_casing;
    width: ${mwZLinear};
}

// 4. 干线主路随缩放动态插值 (zlinear)
line|z8-[highway=primary] {
    color: @color_primary;
    casing-color: @color_primary_casing;
    width: ${prZLinear};
}

// 5. 户外徒步小径与机耕道 (Path & Track)
line|z12-[highway=path],
line|z12-[highway=track] {
    width: ${roadSpec.pathZ15}pt;
    dashes-color: @color_footway_dashes;
${trailBoostActive ? "    casing-width: 1pt;\n    casing-color: #FFFFFF;\n" : ""}}`;
}

function updateLiveCodePreview() {
  const block = document.getElementById("code-preview-block");
  if (!block) return;

  let code = `/* === 1. colors.mapcss 调色板变量 === */\n`;
  Object.keys(currentColors).forEach(k => {
    code += `${k}: ${currentColors[k]};\n`;
  });
  code += `@color_bridge: ${roadSpec.colorBridge};\n`;
  code += `@color_tunnel: ${roadSpec.colorTunnel};\n\n`;
  code += `/* === 2. lines.mapcss 道路分层与缩放规则 === */\n`;
  code += buildCustomLinesMapCSS();

  block.innerText = code;
}

// Export Full Guru Maps .style ZIP Package
async function exportStylePackage() {
  const exportBtn = document.getElementById("btn-export");
  const rawStyleName = (document.getElementById("style-name-input").value.trim() || "MyCustom")
    .replace(/\.style$/i, "");
  const styleFolderName = `${rawStyleName}.style`;

  exportBtn.disabled = true;
  exportBtn.innerText = "⏳ 正在打包 .style 资源包...";

  try {
    const zip = new JSZip();
    const folder = zip.folder(styleFolderName);

    // 1. Generate modified colors.mapcss
    let colorsContent = `// Custom Palette for Guru Maps: ${rawStyleName}\n// Generated by Guru Maps Style Studio\n\n`;
    Object.keys(currentColors).forEach(k => {
      colorsContent += `${k}: ${currentColors[k]};\n`;
    });
    colorsContent += `@color_bridge: ${roadSpec.colorBridge};\n`;
    colorsContent += `@color_tunnel: ${roadSpec.colorTunnel};\n`;

    folder.file("colors.mapcss", colorsContent);

    // 2. Fetch Default.style template files and append custom road/zlinear rules
    try {
      const filesToFetch = [
        "Style.mapcss", "lines.mapcss", "points.mapcss", "polygons.mapcss",
        "relations.mapcss", "extra.mapcss", "colors_dark.mapcss"
      ];

      for (const fname of filesToFetch) {
        const resp = await fetch(`../Default.style/${fname}`);
        if (resp.ok) {
          let text = await resp.text();
          if (fname === "lines.mapcss") {
            text += `\n\n` + buildCustomLinesMapCSS() + `\n`;
          }
          folder.file(fname, text);
        }
      }
    } catch (err) {
      console.warn("Could not fetch relative style files, fallback to essential bundle", err);
    }

    // 3. Generate ZIP and Trigger Download
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${styleFolderName}.zip`);

    // Show Install Modal
    document.getElementById("export-folder-name").innerText = styleFolderName;
    document.getElementById("help-modal").style.display = "flex";

  } catch (error) {
    alert("打包失败: " + error.message);
  } finally {
    exportBtn.disabled = false;
    exportBtn.innerText = "⬇️ 一键导出 .style 压缩包";
  }
}
