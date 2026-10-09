export const CHENNAI_NODES = {
  central: {
    id: "central",
    name: "Chennai Central",
    code: "MAS",
    x: 620,
    y: 140,
    lat: 13.0827,
    lng: 80.2707,
    type: "Transit Hub",
    description: "Primary railway station and city center hub"
  },
  egmore: {
    id: "egmore",
    name: "Egmore Railway Station",
    code: "MS",
    x: 560,
    y: 200,
    lat: 13.0732,
    lng: 80.2609,
    type: "Transit Hub",
    description: "Major commercial and railway interchange"
  },
  koyambedu: {
    id: "koyambedu",
    name: "Koyambedu (CMBT)",
    code: "CMBT",
    x: 420,
    y: 270,
    lat: 13.0694,
    lng: 80.1948,
    type: "Bus Terminal & Metro",
    description: "Asia's largest bus terminal and arterial junction"
  },
  guindy: {
    id: "guindy",
    name: "Guindy Metro & Industrial Estate",
    code: "GND",
    x: 490,
    y: 420,
    lat: 13.0067,
    lng: 80.2020,
    type: "Highway Node",
    description: "GST Road hub connecting central and south Chennai"
  },
  airport: {
    id: "airport",
    name: "Chennai International Airport",
    code: "MAA",
    x: 440,
    y: 550,
    lat: 12.9941,
    lng: 80.1709,
    type: "Airport",
    description: "Meenambakkam airport corridor"
  },
  tambaram: {
    id: "tambaram",
    name: "Tambaram Junction",
    code: "TBM",
    x: 390,
    y: 700,
    lat: 12.9249,
    lng: 80.1000,
    type: "Southern Gateway",
    description: "Major southern transit node on GST road"
  },
  porur: {
    id: "porur",
    name: "Porur Junction",
    code: "PRR",
    x: 300,
    y: 360,
    lat: 13.0382,
    lng: 80.1565,
    type: "IT & Residential",
    description: "Mount-Poonamallee Road IT & hospital corridor"
  },
  poonamallee: {
    id: "poonamallee",
    name: "Poonamallee Bypass",
    code: "PNM",
    x: 190,
    y: 320,
    lat: 13.0498,
    lng: 80.0889,
    type: "Highway Interchange",
    description: "Bengaluru Highway (NH-48) arterial junction"
  },
  ambattur: {
    id: "ambattur",
    name: "Ambattur OT & Estate",
    code: "AMB",
    x: 280,
    y: 180,
    lat: 13.1143,
    lng: 80.1548,
    type: "Industrial Hub",
    description: "CTH road industrial zone and IT park"
  },
  avadi: {
    id: "avadi",
    name: "Avadi Junction",
    code: "AVD",
    x: 170,
    y: 130,
    lat: 13.1167,
    lng: 80.1000,
    type: "Defense & Suburb",
    description: "Defense industrial hub and Western railway corridor"
  },
  rmk_engg: {
    id: "rmk_engg",
    name: "RMK Engineering College",
    code: "RMK",
    x: 280,
    y: 30,
    lat: 13.3558,
    lng: 80.1418,
    type: "Academic Destination",
    description: "Educational landmark on Kolkata Highway (NH-16)"
  },
  omr_sholinganallur: {
    id: "omr_sholinganallur",
    name: "OMR Sholinganallur",
    code: "OMR",
    x: 640,
    y: 600,
    lat: 12.9010,
    lng: 80.2279,
    type: "IT Expressway",
    description: "Rajiv Gandhi Salai OMR IT Expressway corridor"
  },
  velachery: {
    id: "velachery",
    name: "Velachery Bypass",
    code: "VLC",
    x: 570,
    y: 480,
    lat: 12.9815,
    lng: 80.2180,
    type: "Commercial Corridor",
    description: "Connecting Inner Ring Road to OMR"
  },
  sriperumbudur: {
    id: "sriperumbudur",
    name: "Sriperumbudur SEZ",
    code: "SPB",
    x: 60,
    y: 440,
    lat: 12.9680,
    lng: 79.9430,
    type: "Industrial SEZ",
    description: "Automotive manufacturing & industrial corridor"
  }
};

export const CHENNAI_EDGES = [
  { id: "e1", source: "central", target: "egmore", name: "EVR Periyar Salai", distance: 2.8, base_time: 8, base_cost: 15, risk: 0.15, traffic: 0.45 },
  { id: "e2", source: "central", target: "ambattur", name: "CTH Road Expressway", distance: 16.5, base_time: 35, base_cost: 40, risk: 0.25, traffic: 0.55 },
  { id: "e3", source: "central", target: "rmk_engg", name: "NH-16 Kolkata Highway", distance: 35.8, base_time: 52, base_cost: 95, risk: 0.30, traffic: 0.65 },
  { id: "e4", source: "egmore", target: "koyambedu", name: "Poonamallee High Road", distance: 8.5, base_time: 22, base_cost: 25, risk: 0.20, traffic: 0.60 },
  { id: "e5", source: "egmore", target: "guindy", name: "Anna Salai (Mount Road)", distance: 10.2, base_time: 25, base_cost: 30, risk: 0.18, traffic: 0.50 },
  { id: "e6", source: "koyambedu", target: "ambattur", name: "100 Feet Road (Inner Ring)", distance: 9.2, base_time: 20, base_cost: 25, risk: 0.22, traffic: 0.40 },
  { id: "e7", source: "koyambedu", target: "porur", name: "Arcot Road / Mount-Poonamallee", distance: 7.4, base_time: 18, base_cost: 20, risk: 0.18, traffic: 0.45 },
  { id: "e8", source: "koyambedu", target: "guindy", name: "Jawaharlal Nehru Road", distance: 9.8, base_time: 24, base_cost: 28, risk: 0.25, traffic: 0.60 },
  { id: "e9", source: "ambattur", target: "avadi", name: "MTH Road", distance: 6.8, base_time: 14, base_cost: 15, risk: 0.15, traffic: 0.30 },
  { id: "e10", source: "ambattur", target: "rmk_engg", name: "Red Hills - Kavaraipettai Road", distance: 28.5, base_time: 42, base_cost: 75, risk: 0.20, traffic: 0.35 },
  { id: "e11", source: "avadi", target: "rmk_engg", name: "Outer Ring Road (ORR Sector 2)", distance: 26.2, base_time: 34, base_cost: 85, risk: 0.12, traffic: 0.20 },
  { id: "e12", source: "avadi", target: "poonamallee", name: "Avadi-Poonamallee Road", distance: 11.5, base_time: 20, base_cost: 25, risk: 0.20, traffic: 0.35 },
  { id: "e13", source: "porur", target: "poonamallee", name: "NH-48 Bengaluru Highway", distance: 9.0, base_time: 16, base_cost: 30, risk: 0.15, traffic: 0.30 },
  { id: "e14", source: "porur", target: "guindy", name: "Mount-Poonamallee High Road", distance: 8.2, base_time: 21, base_cost: 22, risk: 0.20, traffic: 0.50 },
  { id: "e15", source: "poonamallee", target: "sriperumbudur", name: "NH-48 Industrial Expressway", distance: 18.5, base_time: 24, base_cost: 65, risk: 0.14, traffic: 0.25 },
  { id: "e16", source: "poonamallee", target: "rmk_engg", name: "Outer Ring Road (ORR Phase 1)", distance: 38.0, base_time: 44, base_cost: 110, risk: 0.10, traffic: 0.18 },
  { id: "e17", source: "guindy", target: "airport", name: "GST Road Expressway", distance: 6.4, base_time: 13, base_cost: 20, risk: 0.15, traffic: 0.45 },
  { id: "e18", source: "guindy", target: "velachery", name: "Velachery Main Road", distance: 4.8, base_time: 12, base_cost: 15, risk: 0.18, traffic: 0.40 },
  { id: "e19", source: "airport", target: "tambaram", name: "GST Road Corridor", distance: 10.8, base_time: 20, base_cost: 35, risk: 0.16, traffic: 0.40 },
  { id: "e20", source: "velachery", target: "omr_sholinganallur", name: "OMR Connecting Link", distance: 8.6, base_time: 17, base_cost: 25, risk: 0.20, traffic: 0.50 },
  { id: "e21", source: "tambaram", target: "omr_sholinganallur", name: "Tambaram - Sholinganallur Road", distance: 13.5, base_time: 25, base_cost: 40, risk: 0.22, traffic: 0.35 },
  { id: "e22", source: "tambaram", target: "sriperumbudur", name: "Walajabad Highway Link", distance: 26.0, base_time: 38, base_cost: 70, risk: 0.18, traffic: 0.25 }
];

export const MODE_WEIGHTS = {
  FASTEST: { time: 0.55, cost: 0.10, dist: 0.20, risk: 0.15 },
  CHEAPEST: { time: 0.10, cost: 0.55, dist: 0.20, risk: 0.15 },
  SAFEST: { time: 0.15, cost: 0.10, dist: 0.15, risk: 0.60 },
  BALANCED: { time: 0.30, cost: 0.20, dist: 0.25, risk: 0.25 },
  EMERGENCY: { time: 0.65, cost: 0.00, dist: 0.10, risk: 0.25 },
  ECO: { time: 0.15, cost: 0.30, dist: 0.45, risk: 0.10 }
};
