export type SolutionPath = {
  id: string;
  label: string;
  description: string;
  industries: string[];
  products: { name: string; slug: string; reason: string }[];
  auditPrompt: string;
};

export const SOLUTION_PATHS: SolutionPath[] = [
  {
    id: "grease",
    label: "Grease, oil or baked-on soil",
    description: "Kitchens, service bays, equipment, concrete and other heavy-duty cleaning.",
    industries: ["Food service", "Industrial", "Automotive", "Agribusiness"],
    products: [
      { name: "Dynamo-X", slug: "dynamo-x", reason: "Adjustable-strength cleaner, stripper and degreaser for difficult soil." },
      { name: "R&R Degreaser", slug: "rr-degreaser", reason: "A concentrated option for demanding grease-removal work." },
    ],
    auditPrompt: "Show us the soil, surface and current cleaning process so we can test the safest effective dilution.",
  },
  {
    id: "floors",
    label: "Slippery, dull or difficult floors",
    description: "Daily maintenance, winter residue, finish care and high-traffic floor problems.",
    industries: ["Schools", "Healthcare", "Hospitality", "Janitorial"],
    products: [
      { name: "Delta Green Slip Free Floor Cleaner", slug: "delta-green-non-slip-floor-cleaner", reason: "Built for dependable daily cleaning without a confidence-reducing film." },
      { name: "Big Sky Concentrate", slug: "big-sky-concentrate", reason: "A versatile concentrate for routine hard-surface cleaning." },
    ],
    auditPrompt: "We will review the floor type, soil, equipment, current dilution and labor required per cleaning cycle.",
  },
  {
    id: "warewash",
    label: "Cloudy glassware or dish-machine scale",
    description: "Hard-water film, mineral buildup, spotting and inconsistent warewashing results.",
    industries: ["Restaurants", "Healthcare", "Schools", "Hospitality"],
    products: [
      { name: "All Temp Detergent", slug: "all-temp-detergent", reason: "Concentrated automatic dishwashing detergent for varied water and temperature conditions." },
      { name: "DeLime", slug: "delime", reason: "Targeted mineral-scale removal for equipment and hard surfaces." },
    ],
    auditPrompt: "We will check water conditions, machine type, dosage, scale and rinse performance before recommending a system.",
  },
  {
    id: "odor",
    label: "Persistent odor, drains or organic stains",
    description: "Restrooms, carpets, drains, grease traps and odor sources that return after cleaning.",
    industries: ["Healthcare", "Hospitality", "Food service", "Property management"],
    products: [
      { name: "Bio-Maxx", slug: "bio-maxx", reason: "Microbial odor and stain treatment for organic matter and drain-line maintenance." },
      { name: "Bath Butler", slug: "bath-butler", reason: "Restroom cleaner for soap scum, mineral deposits and fixture soils." },
    ],
    auditPrompt: "We will identify the odor source, affected material and current frequency before setting a seven-day test.",
  },
  {
    id: "laundry",
    label: "Laundry stains, rewashes or high chemical use",
    description: "Commercial laundry programs with staining, softness, dosing or drying-cost problems.",
    industries: ["Healthcare", "Hospitality", "Schools", "Industrial"],
    products: [
      { name: "Brite OEB", slug: "brite-oeb", reason: "A targeted option for organic and protein-based fabric stains." },
      { name: "Dazzle LD500", slug: "dazzle-ld500", reason: "Concentrated controlled-suds detergent for commercial and household machines." },
    ],
    auditPrompt: "We will document load size, soil type, water temperature, rewash rate and current dosing before the trial.",
  },
  {
    id: "surfaces",
    label: "Streaks, residue or too many products",
    description: "Glass, counters, stainless steel and general maintenance where simplicity matters.",
    industries: ["Offices", "Schools", "Healthcare", "Janitorial"],
    products: [
      { name: "C-Thru Concentrate", slug: "c-thru-concentrate", reason: "Streak-free concentrate for glass and polished surfaces." },
      { name: "Big Sky Concentrate", slug: "big-sky-concentrate", reason: "One adjustable concentrate for a broad range of hard surfaces." },
    ],
    auditPrompt: "We will inventory the products in use, identify overlap and calculate the cost of a simpler program.",
  },
];

export const SALES_ROUTES = [
  { name: "10th Avenue South", focus: "Restaurants, hotels, retail and commercial kitchens", cadence: "High-density weekly prospecting", cue: "Lead with warewash, grease, floors and delivery reliability." },
  { name: "East Industrial & AgriTech", focus: "Manufacturing, food processing, trucking and agricultural operations", cadence: "Planned industrial route day", cue: "Lead with soil load, safety, downtime and concentrate handling." },
  { name: "Airport & I-15 Logistics", focus: "Fleet, transport, warehouses, lodging and service operations", cadence: "Cluster visits around delivery runs", cue: "Lead with road film, floors, wash-bay performance and emergency support." },
  { name: "Downtown & Healthcare", focus: "Clinics, senior care, offices, hospitality and public facilities", cadence: "Appointment-led route", cue: "Lead with consistency, training, documentation and responsive service." },
  { name: "Golden Triangle Rural", focus: "Schools, municipalities, agribusiness and rural facilities", cadence: "Pre-booked route with grouped follow-ups", cue: "Lead with supply reliability, fewer deliveries and a structured trial." },
];
