// Seeded RTO locations used by the locator demo.  Each state has a primary
// and a secondary office so the map, nearest-office calculation, and list can
// be exercised without relying on a third-party directory API.
const STATE_RTO_SEEDS = [
  ["AP", "Andhra Pradesh", "Vijayawada", [16.5062, 80.648], "Visakhapatnam", [17.6868, 83.2185]],
  ["AR", "Arunachal Pradesh", "Itanagar", [27.0844, 93.6053], "Naharlagun", [27.1023, 93.6956]],
  ["AS", "Assam", "Guwahati", [26.1445, 91.7362], "Silchar", [24.8333, 92.7789]],
  ["BR", "Bihar", "Patna", [25.5941, 85.1376], "Muzaffarpur", [26.1209, 85.3647]],
  ["CG", "Chhattisgarh", "Raipur", [21.2514, 81.6296], "Bilaspur", [22.0797, 82.1391]],
  ["GA", "Goa", "Panaji", [15.4909, 73.8278], "Margao", [15.2832, 73.9862]],
  ["GJ", "Gujarat", "Ahmedabad", [23.0225, 72.5714], "Surat", [21.1702, 72.8311]],
  ["HR", "Haryana", "Gurugram", [28.4595, 77.0266], "Faridabad", [28.4089, 77.3178]],
  ["HP", "Himachal Pradesh", "Shimla", [31.1048, 77.1734], "Dharamshala", [32.219, 76.3234]],
  ["JH", "Jharkhand", "Ranchi", [23.3441, 85.3096], "Jamshedpur", [22.8046, 86.2029]],
  ["KA", "Karnataka", "Bengaluru Central", [12.9716, 77.5946], "Mysuru", [12.2958, 76.6394]],
  ["KL", "Kerala", "Thiruvananthapuram", [8.5241, 76.9366], "Kochi", [9.9312, 76.2673]],
  ["MP", "Madhya Pradesh", "Bhopal", [23.2599, 77.4126], "Indore", [22.7196, 75.8577]],
  ["MH", "Maharashtra", "Mumbai Central", [18.969, 72.8194], "Pune", [18.5204, 73.8567]],
  ["MN", "Manipur", "Imphal", [24.817, 93.9368], "Thoubal", [24.6386, 93.9964]],
  ["ML", "Meghalaya", "Shillong", [25.5788, 91.8933], "Tura", [25.514, 90.2024]],
  ["MZ", "Mizoram", "Aizawl", [23.7271, 92.7176], "Lunglei", [22.8864, 92.7425]],
  ["NL", "Nagaland", "Kohima", [25.6751, 94.1086], "Dimapur", [25.904, 93.7266]],
  ["OD", "Odisha", "Bhubaneswar", [20.2961, 85.8245], "Cuttack", [20.4625, 85.883]],
  ["PB", "Punjab", "Chandigarh", [30.7333, 76.7794], "Ludhiana", [30.901, 75.8573]],
  ["RJ", "Rajasthan", "Jaipur", [26.9124, 75.7873], "Jodhpur", [26.2389, 73.0243]],
  ["SK", "Sikkim", "Gangtok", [27.3389, 88.6065], "Namchi", [27.1664, 88.3638]],
  ["TN", "Tamil Nadu", "Chennai Central", [13.0827, 80.2707], "Coimbatore", [11.0168, 76.9558]],
  ["TS", "Telangana", "Hyderabad Central", [17.385, 78.4867], "Warangal", [17.9689, 79.5941]],
  ["TR", "Tripura", "Agartala", [23.8315, 91.2868], "Udaipur", [23.5333, 91.4833]],
  ["UK", "Uttarakhand", "Dehradun", [30.3165, 78.0322], "Haldwani", [29.2183, 79.513]],
  ["UP", "Uttar Pradesh", "Lucknow", [26.8467, 80.9462], "Kanpur", [26.4499, 80.3319]],
  ["WB", "West Bengal", "Kolkata Beltala", [22.5726, 88.3639], "Siliguri", [26.7271, 88.3953]],
  ["JK", "Jammu & Kashmir", "Jammu", [32.7266, 74.857], "Srinagar", [34.0837, 74.7973]],
];

function makeOffice(code, state, city, coordinates, sequence) {
  const officeNumber = `${code}-${String(sequence).padStart(2, "0")}`;

  return {
    id: officeNumber,
    stateCode: code,
    state,
    name: `Regional Transport Office, ${city}`,
    shortName: `RTO ${city}`,
    address: `Transport Department Campus, ${city}, ${state}`,
    phone: `1800 121 ${String(7200 + sequence).padStart(4, "0")}`,
    coordinates,
  };
}

export const RTO_OFFICES = STATE_RTO_SEEDS.flatMap(
  ([code, state, primaryCity, primaryCoordinates, secondaryCity, secondaryCoordinates], index) => [
    makeOffice(code, state, primaryCity, primaryCoordinates, index * 2 + 1),
    makeOffice(code, state, secondaryCity, secondaryCoordinates, index * 2 + 2),
  ]
);

export const RTO_STATES = STATE_RTO_SEEDS.map(([code, name]) => ({ code, name }));
