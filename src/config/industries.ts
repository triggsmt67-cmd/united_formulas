export interface OperationalChallenge {
    title: string;
    description: string;
    citation?: string;
    citationUrl?: string;
    problemStat?: string;
    solutionText?: string;
}

export interface Citation {
    sourceName: string;
    text: string;
    url: string;
}

export interface ReferenceItem {
    text: string;
    url?: string;
    sourceName?: string;
}

export interface ValuePropPoint {
    title: string;
    description: string;
}

export interface ComparisonSystem {
    name: string;
    values: string[];
}

export interface ComparisonTable {
    badge?: string;
    heading: string;
    subhead?: string;
    featureHeader?: string;
    features: string[];
    systems: ComparisonSystem[];
}

export type WarewashingComparison = ComparisonTable;

export interface FAQItem {
    question: string;
    answer: string;
}

export interface HighlightMetric {
    value: string;
    title: string;
    description: string;
    color?: "emerald" | "cyan" | "blue" | "amber" | "rose";
}

export interface IndustryConfig {
    slug: string;
    seoTitle: string;
    seoDescription: string;
    geoTarget: string;
    schemaName?: string;
    hero: {
        badge?: string;
        h1: string;
        subhead: string;
        primaryCtaText?: string;
        secondaryCtaText?: string;
        secondaryCtaHref?: string;
        trustBar: string[];
        highlightMetrics?: HighlightMetric[];
    };
    challengesSection: {
        badge?: string;
        heading: string;
        items: OperationalChallenge[];
    };
    recommendedProductsHeading?: string;
    recommendedProductsSubhead?: string;
    recommendedCategorySlugs: string[];
    comparisonTable?: ComparisonTable;
    warewashingComparison?: WarewashingComparison; // backwards compatibility
    showRtuCalculator?: boolean;
    showJanitorialCalculator?: boolean;
    showSchoolCalculator?: boolean;
    showHospitalityCalculator?: boolean;
    showAutomotiveCalculator?: boolean;
    showShopCalculator?: boolean;
    valuePropSection: {
        badge?: string;
        heading: string;
        subhead?: string;
        points: ValuePropPoint[];
    };
    faqsHeading?: string;
    faqsSubhead?: string;
    faqs?: FAQItem[];
    citations?: Citation[];
    references?: (string | ReferenceItem | Citation)[];
    ctaSection: {
        badge?: string;
        heading: string;
        lead: string;
        auditPoints?: string[];
        buttonText: string;
        phone: string;
    };
}

export const INDUSTRIES: IndustryConfig[] = [
    {
        slug: "restaurants-food-service",
        seoTitle: "Commercial Restaurant Cleaning Supplies in Great Falls, MT | United Formulas",
        seoDescription:
            "Commercial dish machine detergents, food-safe sanitizers, and grill degreasers built for Montana hard water. Stocked locally in Great Falls and Billings.",
        geoTarget: "Great Falls, MT",
        schemaName: "Commercial Restaurant Cleaning Supplies in Great Falls, MT",
        hero: {
            badge: "GREAT FALLS, MT • RESTAURANT & FOOD SERVICE CHEMISTRY",
            h1: "Commercial Kitchen Chemistry Built for Montana Water.",
            subhead:
                "Stop paying expensive shipping fees for plain water. Get ultra-concentrated dish machine detergents, heavy degreasers, and sanitizers blended right here in Great Falls and delivered straight to your back door.",
            trustBar: [
                "Warehouses in Great Falls & Billings",
                "Free Delivery on Local Routes",
                "Direct Local Support: 406-727-4144",
            ],
        },
        challengesSection: {
            heading: "3 Kitchen Headaches in Cascade County (And Why Generic Soap Fails)",
            items: [
                {
                    title: "Cloudy Glasses and White Crust on Dishwashers",
                    problemStat: "9.4 Grains Hardness (160 ppm)",
                    description:
                        "Great Falls tap water carries high dissolved minerals. When water heats inside your commercial dish machine, minerals bake onto heating coils and spray arms. This crust acts like an insulator, driving up electric bills, burning out heating elements, and leaving cloudy film on glassware.",
                    solutionText:
                        "UF commercial detergents feature built-in water conditioners that keep minerals suspended in the water so they never stick to your coils or glasses.",
                    citation: "Source: City of Great Falls Drinking Water Quality Report",
                    citationUrl: "https://greatfallsmt.gov/1033/Water-Quality---Consumer-Confidence-Repo",
                },
                {
                    title: "Failing Surprise Health Inspections on Sanitizer Levels",
                    problemStat: "County Targets: Quat 200–400 ppm | Chlorine 50–100 ppm",
                    description:
                        "Cascade County inspectors test red sanitizer buckets and sink wash bays on every visit. When staff mixes by hand using the 'splash and guess' method, solutions are almost always either too weak (instant critical violation) or too strong (wasting money and leaving sticky residue).",
                    solutionText:
                        "We mount precision dilution dispensers in your kitchen that blend the exact chemical ratio every time you turn the tap—guaranteeing test strips land in the passing zone.",
                    citation: "Source: Cascade County Health Department & Montana Food Safety Rules",
                    citationUrl: "https://cchdmt.org/environmental-health/",
                },
                {
                    title: "Grease Clogging Cold Pipes and Floor Drains",
                    problemStat: "Winter Soil & Cold Pipe Risk",
                    description:
                        "Montana winters turn underground kitchen pipes icy cold. When hot animal fat from fryers and flat-top grills hits cold drain lines, it hardens into thick sludge before it ever reaches the grease trap. Cheap degreasers just push grease downstream until it backs up into the kitchen during a Friday rush.",
                    solutionText:
                        "Commercial-grade degreasers break grease down into a free-flowing emulsion that flushes all the way through the line without blocking pipes.",
                    citation: "Source: Montana Uniform Plumbing Code (ARM 24.301)",
                    citationUrl: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=24%2E301",
                },
            ],
        },
        recommendedCategorySlugs: [
            "kitchen-warewash",
            "degreaser",
            "floor-care",
            "bathroom",
            "disinfectants-deodorizers",
        ],
        recommendedProductsHeading: "Concentrated Formulas Stocked at Our Great Falls Warehouse",
        warewashingComparison: {
            heading: "High-Temp vs. Low-Temp: Which Chemistry Fits Your Dish Machine?",
            subhead: "Not sure which machine fits your kitchen? Here is how both systems handle Great Falls water, health inspections, and monthly operating costs.",
            features: [
                "How It Sanitizes Dishes",
                "Biggest Risk in Great Falls",
                "What Happens with Cheap Soap",
                "The Right Chemical Setup",
            ],
            systems: [
                {
                    name: "High-Temp (180°F Rinse)",
                    values: [
                        "Hot water rinse at 180°F kills bacteria with heat—no chlorine bleach smell.",
                        "Very High: Hot water bakes hard water minerals onto coils, causing heavy lime scale and element burnout.",
                        "Heater elements burn out early, power bills spike, and cloudy glasses have to be hand-dried.",
                        "Hard-water machine detergent + commercial rinse aid to sheet water off clean.",
                    ],
                },
                {
                    name: "Low-Temp (Chemical Sanitizer)",
                    values: [
                        "Sanitizes at lower temps (around 120°F) using chemical chlorine sanitizer.",
                        "Medium: Hard water minerals can clog spray nozzles, but heating coils don't bake as fast.",
                        "Grease doesn't dissolve at lower water temps, leaving an oily film on plates and silverware.",
                        "Low-temp machine detergent + chlorinated sanitizer + quick-drying rinse aid.",
                    ],
                },
            ],
        },
        showRtuCalculator: true,
        valuePropSection: {
            heading: "The Local Supply Chain Advantage: Why Buy From 10 Miles Away?",
            points: [
                {
                    title: "Never Pay Freight on Plain Water",
                    description:
                        "Most commercial cleaners sold by out-of-state distributors are over 90% water. You are paying expensive freight to truck heavy jugs over mountain passes. We manufacture ultra-concentrated formulas right here in Montana. You connect them to your kitchen tap and add the water on-site.",
                },
                {
                    title: "Free Dispenser Setup & Testing",
                    description:
                        "National box companies just drop jugs on your loading dock and leave. Our local technicians visit your kitchen, mount dispensers on your walls, and test the water. Your crew gets the exact mix every time with the push of a button—no measuring, no waste.",
                },
                {
                    title: "Local Warehouses When Storms Hit",
                    description:
                        "When winter blizzards shut down I-15 or mountain passes, out-of-state freight trucks get delayed for days. We keep full inventory in Great Falls and Billings, running our own delivery routes so you never run out of dish soap or sanitizer during a busy shift.",
                },
            ],
        },
        faqsHeading: "Questions from Great Falls Kitchen Managers",
        faqs: [
            {
                question: "Why do our glasses come out cloudy and dish machine heating elements burn out so fast?",
                answer: "Great Falls tap water has high mineral content (about 9.4 grains of hardness). When water heats up to wash dishes, those minerals bake onto the heating coils and form a thick white crust (lime scale). This crust acts like a blanket, trapping heat inside the element until it burns out. It also leaves white chalky film on glassware. Using a detergent made with built-in water conditioners dissolves those minerals in the wash cycle before they can stick.",
            },
            {
                question: "What sanitizer strength do Cascade County health inspectors check for?",
                answer: "During health inspections, inspectors dip test paper into your red sanitizer buckets and sink compartments. If you use a standard Quat sanitizer (the most common type for kitchen buckets), it must test between 200 and 400 parts per million (ppm). If you use chlorine bleach, it must test between 50 and 100 ppm. Using wall-mounted dispensers makes sure every bucket tests in the safe passing zone with zero guesswork.",
            },
            {
                question: "How does switching to concentrates cut my restaurant's monthly chemical bill?",
                answer: "When you buy pre-mixed cleaners in spray bottles or jugs, you are paying mostly for plastic bottles and shipping water. A commercial concentrate mixes with your kitchen tap water at ratios like 1:64 or 1:128. That drops your cost for a full 32-ounce spray bottle down to around 15 to 25 cents. Most restaurants see their overall cleaning chemical costs drop by 30% to 50% in their first month.",
            },
            {
                question: "Do you supply and install the wall dispensers?",
                answer: "Yes. We supply and mount commercial dilution dispensers for your 3-compartment sink, mop station, and dish machine. Our local technicians connect the units, set the dilution tips, test your water, and train your team on how to use them.",
            },
        ],
        references: [
            {
                text: "City of Great Falls Annual Drinking Water Quality Report (Missouri River Water Treatment Plant: Hardness ~160 mg/L / 9.4 grains per gallon).",
                url: "https://greatfallsmt.gov/1033/Water-Quality---Consumer-Confidence-Repo",
            },
            {
                text: "Cascade County City-County Health Department (CCHD) Food Safety & Environmental Health Division.",
                url: "https://cchdmt.org/environmental-health/",
            },
            {
                text: "Montana Department of Public Health and Human Services (DPHHS) Food Safety Regulations (ARM 37.110.2).",
                url: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=37%2E110",
            },
            {
                text: "U.S. Environmental Protection Agency (EPA) Standards for Food Contact Surface Sanitizers (40 CFR § 180.940).",
                url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-180/subpart-D/section-180.940",
            },
            {
                text: "Montana Uniform Plumbing Code: Commercial Grease Interceptors & Drainage Maintenance (ARM 24.301).",
                url: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=24%2E301",
            },
        ],
        ctaSection: {
            heading: "Cut Your Kitchen Chemical Costs and Never Fail an Inspection.",
            lead: "Call our local Great Falls team or request a free on-site kitchen audit. We'll test your water, check your dispensers, and give you a free sample kit formulated for your kitchen.",
            buttonText: "Schedule a Free On-Site Audit",
            phone: "406-727-4144",
        },
    },
    // Commercial Janitorial Industry Configuration
    {
        slug: "commercial-janitorial",
        seoTitle: "Commercial Janitorial Supplies & Cleaning Chemicals in Great Falls, MT | United Formulas",
        seoDescription:
            "High-yield cleaning concentrates, winter salt neutralizers, and calibrated dispensers stocked in Great Falls for Montana commercial cleaning contractors.",
        geoTarget: "Great Falls, MT",
        schemaName: "Commercial Janitorial Supplies & Cleaning Chemicals in Great Falls, MT",
        hero: {
            badge: "GREAT FALLS & CENTRAL MONTANA • COMMERCIAL JANITORIAL",
            h1: "Industrial Cleaning Chemistry Built for Montana Crews.",
            subhead:
                "Stop paying out-of-state freight on pre-mixed water. Get ultra-concentrated floor care, winter salt neutralizers, and multi-surface chemistry stocked locally in Great Falls and Billings for direct route delivery.",
            trustBar: [
                "Stocked in Great Falls & Billings",
                "Direct Route Truck Delivery",
                "Contractor Support Desk: (406) 727-4144",
            ],
            highlightMetrics: [
                {
                    value: "1:128",
                    title: "High Yield",
                    description: "Up to 512 mop buckets per drum",
                    color: "cyan",
                },
                {
                    value: "1 Pass",
                    title: "Salt Neutralizer",
                    description: "Cuts out 2nd-pass mopping hours",
                    color: "emerald",
                },
                {
                    value: "3 SKUs",
                    title: "Core Van System",
                    description: "Replaces 9+ redundant spray cans",
                    color: "blue",
                },
            ],
        },
        challengesSection: {
            badge: "Contractor Margin Diagnostics",
            heading: "3 Account Headaches That Bleed Janitorial Profits",
            items: [
                {
                    title: "Magnesium Chloride & Winter Salt Hazing (The Double-Mop Trap)",
                    problemStat: "MDT Chemical De-Icing Residue",
                    description:
                        "Montana highway and sidewalk de-icers (mag chloride and road slag) track into commercial lobbies all winter. Standard neutral floor cleaners cannot break the ionic bond of chemical salts, leaving an unsightly white chalky film. Cleaning crews waste expensive labor hours mopping floors twice or three times to clear the haze.",
                    solutionText:
                        "Winter-specific neutralizers break chemical salt bonds in a single pass without dulling floor wax or softening acrylic finishes.",
                    citation: "Source: Montana Dept. of Transportation (MDT) Winter Maintenance Protocols",
                    citationUrl: "https://www.mdt.mt.gov/maintenance/",
                },
                {
                    title: "The 9.4 GPG Restroom Scale Lockup",
                    problemStat: "9.4 Grains Hardness (160 ppm)",
                    description:
                        "Great Falls municipal water averages 160 ppm (9.4 grains per gallon) of hardness. In high-traffic office and school restrooms, hard water combines with uric salts to form rock-hard encrustations in urinals and toilet bowls that neutral cleaners can't touch.",
                    solutionText:
                        "Concentrated organic acid descalers dissolve thick mineral rings and eliminate odor-causing uric salts in seconds without etching chrome fixtures or damaging plumbing seals.",
                    citation: "Source: City of Great Falls Drinking Water Quality Report",
                    citationUrl: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
                },
                {
                    title: "Van SKU Bloat & Crew Over-Pouring",
                    problemStat: "12+ Bottles vs. 3 Proportioners",
                    description:
                        "Carrying 12 to 15 different specialty cleaning spray bottles in every service van creates confusion, theft, and inventory loss. Untrained night crews 'free-pour' unmeasured chemicals into mop buckets, burning through monthly budgets and leaving sticky residues that cause rapid re-soiling.",
                    solutionText:
                        "A 3-product core system (High-Yield Neutral Cleaner, Acid Restroom Descaler, and Disinfectant) paired with wall-mounted or portable proportioners that lock in calibrated dilution down to pennies per usable gallon.",
                    citation: "Source: OSHA HazCom Standard (29 CFR 1910.1200) & ISSA 612 Standards",
                    citationUrl: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200",
                },
            ],
        },
        recommendedProductsHeading: "Core Concentrates Stocked at Our Great Falls Warehouse",
        recommendedProductsSubhead:
            "High-yield commercial concentrates formulated specifically for Montana hard water and winter road soil conditions.",
        recommendedCategorySlugs: [
            "floor-care",
            "all-purpose-cleaners",
            "carpet-care",
            "bathroom",
            "disinfectants-deodorizers",
            "degreaser",
        ],
        showJanitorialCalculator: true,
        comparisonTable: {
            badge: "Contractor Surface Chemistry",
            heading: "The Double-Mop Trap: Neutral Cleaner vs. Winter Salt Neutralizer",
            subhead:
                "Why standard floor soaps fail on Montana winter soils, and how specialized ionic neutralizers protect your crew's labor budget and your client's floor finish.",
            featureHeader: "Performance Challenge",
            features: [
                "De-Icer Chemical Removal",
                "Labor Passes Required",
                "Acrylic Floor Finish Impact",
                "Dilution Ratio & In-Use Cost",
            ],
            systems: [
                {
                    name: "Standard National Neutral Cleaner",
                    values: [
                        "Fails on Mag Chloride; redeposits white powder film after drying.",
                        "Requires 2 to 3 mopping passes (rinse, wash, rinse) to lift residue.",
                        "Excessive mechanical scrubbing wears down floor wax prematurely.",
                        "Typically pre-mixed or low-yield (1:32), costing up to $1.20 per mop bucket.",
                    ],
                },
                {
                    name: "Montana Winter Salt Neutralizer (UF)",
                    values: [
                        "Chelates ionic road salts; lifts calcium & magnesium de-icers completely.",
                        "True single-pass damp mopping; zero secondary water rinse needed.",
                        "Safe on wax; preserves gloss without softening polymer chains.",
                        "Ultra-concentrated (1:128 to 1:256) costing pennies per mop bucket.",
                    ],
                },
            ],
        },
        valuePropSection: {
            badge: "Supply Chain & Margin Protection",
            heading: "The Local Supply Advantage: Why Buy From 10 Miles Away?",
            subhead:
                "The local Montana manufacturer advantage built specifically for commercial building service contractors.",
            points: [
                {
                    title: "Zero Freight Waste on Heavy Water",
                    description:
                        "Over 90% of national store-bought cleaner is tap water. Our ultra-concentrates eliminate unnecessary freight weight and free up cargo space in your cleaning vans.",
                },
                {
                    title: "Free Janitorial Closet Proportioner Setup",
                    description:
                        "We mount and calibrate precision dilution dispensers directly inside your client accounts so night crews never overdose product or burn through your margins.",
                },
                {
                    title: "Same-Week Route Delivery Across Central Montana",
                    description:
                        "Local warehouse inventory in Great Falls and Billings means your cleaning crews never run dry before a major floor strip, wax job, or post-construction clean.",
                },
            ],
        },
        faqsHeading: "Questions from Montana Commercial Cleaners",
        faqsSubhead:
            "Straightforward answers to the most common questions from Montana cleaning business owners and facility managers.",
        faqs: [
            {
                question: "How do we stop white salt haze on commercial floors during Montana winters?",
                answer:
                    "Standard neutral floor soaps don't break down magnesium chloride and road salts. You need an active chemical neutralizer that dissolves the salt crystals in a single pass without stripping the protective floor wax underneath.",
            },
            {
                question: "Can our crews use one concentrate for multiple surfaces to cut down van inventory?",
                answer:
                    "Yes. By pairing a high-yield neutral concentrate (1:128) with calibrated dispensers, your crew can use the exact same formula for daily damp mopping, spray-and-wipe surface cleaning, and light glass touch-ups, reducing van inventory from 12 bottles to 3 core products.",
            },
            {
                question: "Do you provide OSHA-compliant Secondary Container Labels and Safety Data Sheets (SDS)?",
                answer:
                    "Yes. We supply bilingual, OSHA-compliant secondary spray bottle labels and complete GHS Safety Data Sheets for all your client custodial closets to keep your accounts 100% audit-ready.",
            },
        ],
        citations: [
            {
                sourceName: "Montana Dept. of Transportation (MDT)",
                text: "Winter Maintenance Protocols & Chemical De-Icing Standards.",
                url: "https://www.mdt.mt.gov/maintenance/",
            },
            {
                sourceName: "City of Great Falls Drinking Water Quality Report",
                text: "Missouri River Water Treatment Plant: Hardness ~160 mg/L (9.4 GPG).",
                url: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
            },
            {
                sourceName: "OSHA 29 CFR 1910.1200",
                text: "Hazard Communication Standard for Secondary Custodial Containers.",
                url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200",
            },
            {
                sourceName: "The Worldwide Cleaning Industry Association (ISSA)",
                text: "ISSA 612 Cleaning Times & Labor Performance Standards.",
                url: "https://www.issa.com/",
            },
        ],
        ctaSection: {
            badge: "Direct Montana Contractor Partnership",
            heading: "Test Our Concentrates on Your Toughest Account.",
            lead:
                "Pick your most frustrating commercial building—the one with stubborn salt tracking or cloudy restroom fixtures. We'll bring a commercial sample kit to your job site and demonstrate the results on your own floors.",
            buttonText: "Request a Job-Site Audit & Free Sample Kit",
            phone: "(406) 727-4144",
            auditPoints: [
                "On-Site Water Hardness Test (GPG)",
                "Dispenser Calibration & Leak Check",
                "Custom Chemical Sample Kit",
            ],
        },
    },
    // Schools & Educational Facilities Industry Configuration
    {
        slug: "schools-educational-facilities",
        seoTitle: "School & Educational Facility Cleaning Supplies in Great Falls, MT | United Formulas",
        seoDescription:
            "Child-safe cleaning concentrates, EPA gym disinfectants, and locked dispenser systems stocked in Great Falls for Montana school districts and colleges.",
        geoTarget: "Great Falls, MT",
        schemaName: "School & Educational Facility Cleaning Supplies in Great Falls, MT",
        hero: {
            badge: "MONTANA SCHOOL DISTRICT & CAMPUS SAFETY",
            h1: "Low-VOC Custodial Supplies, Blended in Montana.",
            subhead:
                "Protect student air quality, eliminate open-jug chemical spills, and stretch district maintenance budgets with high-yield concentrates stocked locally in Great Falls and Billings.",
            primaryCtaText: "Schedule a Campus Safety Walkthrough",
            trustBar: [
                "Stocked in Great Falls & Billings",
                "Direct District Route Delivery",
                "Facility Support Desk: (406) 727-4144",
            ],
            highlightMetrics: [
                {
                    value: "0 VOC",
                    title: "Air Quality",
                    description: "Safe around students with asthma",
                    color: "emerald",
                },
                {
                    value: "100%",
                    title: "Sealed Closets",
                    description: "Tamper-proof closed-loop dispensing",
                    color: "cyan",
                },
                {
                    value: "B2B PO",
                    title: "District Billing",
                    description: "Net terms for public schools & campuses",
                    color: "blue",
                },
            ],
        },
        challengesSection: {
            badge: "District Health Diagnostics",
            heading: "3 Campus Safety Risks Facing Montana Head Custodians",
            items: [
                {
                    title: "Indoor Air Quality & Low-VOC Mandates (Protecting Student Health)",
                    problemStat: "IAQ & Asthma Risk Reduction",
                    description:
                        "Harsh chemical fumes, synthetic fragrances, and heavy solvents trigger student asthma attacks and staff complaints, violating district indoor air quality (IAQ) initiatives. Custodians need powerful multi-surface chemistry that leaves zero hazardous airborne residue in classrooms and hallways.",
                    solutionText:
                        "Neutral-pH, low-VOC commercial concentrates clean desks, glass, and cafeteria tables thoroughly with zero caustic off-gassing or lingering chemical odors.",
                    citation: "Source: EPA Healthy Schools Indoor Air Quality Guidelines",
                    citationUrl: "https://www.epa.gov/iaq-schools",
                },
                {
                    title: "Athletic Mats, Locker Rooms & Pathogen Outbreaks (MRSA & Norovirus)",
                    problemStat: "MHSA Contact Protocol Target",
                    description:
                        "High-contact athletic surfaces—wrestling mats, weight rooms, gym benches, and locker room showers—are breeding grounds for ringworm, MRSA, staph, and norovirus. Generic sanitizers either lack the required contact kill claims or corrode expensive athletic vinyl and rubber flooring.",
                    solutionText:
                        "EPA-registered, broad-spectrum hospital-grade disinfectants kill athletic pathogens on contact without degrading mat finishes or drying out vinyl.",
                    citation: "Source: Montana High School Association (MHSA) Sports Medicine",
                    citationUrl: "https://www.mhsa.org/",
                },
                {
                    title: "Custodial Closet Safety & 'Free-Pour' Chemical Hazards",
                    problemStat: "ARM 37.111.8 Storage Compliance",
                    description:
                        "Open chemical jugs in custodial closets risk accidental spills, staff skin burns, and student exposure. Unmeasured chemical glugs leave sticky residue on VCT hallway floors, which creates slip-and-fall hazards and attracts heavy winter dirt.",
                    solutionText:
                        "Tamper-resistant, wall-mounted closed-loop proportioners keep concentrated chemicals completely sealed while dispensing exact, metered dilutions into mop buckets and auto-scrubbers.",
                    citation: "Source: Montana DPHHS Public School Standards (ARM 37.111.8)",
                    citationUrl: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=37%2E111",
                },
            ],
        },
        recommendedProductsHeading: "Child-Safe Concentrates Stocked at Our Great Falls Warehouse",
        recommendedProductsSubhead:
            "Low-VOC, EPA-registered commercial concentrates engineered for student safety and high-traffic Montana school hallways.",
        recommendedCategorySlugs: [
            "disinfectants-deodorizers",
            "floor-care",
            "all-purpose",
            "restroom",
            "carpet-care",
            "degreaser",
        ],
        showSchoolCalculator: true,
        comparisonTable: {
            badge: "School Facility Chemistry",
            heading: "Open Jugs vs. Closed-Loop: Protecting Students & Budgets",
            subhead:
                "Why traditional store-bought jugs risk student exposure and employee splash injuries, and how tamper-proof wall stations lock in safe dilutions.",
            featureHeader: "District Facility Concern",
            features: [
                "Indoor Air Impact",
                "Chemical Storage Safety",
                "Hallway VCT & Terrazzo",
                "State Health Compliance",
            ],
            systems: [
                {
                    name: "Traditional Over-The-Counter Cleaners",
                    values: [
                        "High VOCs and strong perfumes; triggers classroom asthma alerts.",
                        "Open-pour jugs susceptible to student tampering and custodial spills.",
                        "Over-concentrated soap leaves sticky, high-traction dirt magnets.",
                        "Frequent citations for missing GHS labels or unlabeled secondary bottles.",
                    ],
                },
                {
                    name: "United Formulas Closed-Loop Educational Program",
                    values: [
                        "Ultra-low VOC formulations; safe for occupied educational spaces.",
                        "Lockable, closed-loop dispensing cabinets with zero direct chemical contact.",
                        "Clean-rinsing neutral chemistry; keeps high-gloss wax bright through winter.",
                        "Full district onboarding: bilingual GHS labels and pre-printed spray bottles provided.",
                    ],
                },
            ],
        },
        valuePropSection: {
            badge: "Taxpayer Dollar Stewardship",
            heading: "The Local Supply Advantage: Why Buy From 10 Miles Away?",
            subhead:
                "How buying direct from Montana blending facilities protects classroom budgets and eliminates out-of-state freight markups.",
            points: [
                {
                    title: "Keep Taxpayer Dollars in Montana",
                    description:
                        "Eliminate out-of-state freight markups on heavy water. Buy direct from our Great Falls and Billings chemical blending facilities to stretch annual facility budgets.",
                },
                {
                    title: "Compliant Custodial Onboarding & Safety Training",
                    description:
                        "We provide bilingual GHS labels, laminated wall charts, and staff training so your district breezes through county and state DPHHS school health audits.",
                },
                {
                    title: "Reliable Route Stocking During Winter Weather",
                    description:
                        "When winter blizzards shut down mountain passes, our local Montana route trucks ensure your maintenance team never runs out of ice melt neutralizer, floor soap, or disinfectants.",
                },
            ],
        },
        faqsHeading: "Questions from Montana School Facility Directors",
        faqsSubhead:
            "Straightforward answers to the most common questions from Montana school facility directors and head custodians.",
        faqs: [
            {
                question: "Are these cleaning chemicals safe to use around students and staff with asthma?",
                answer:
                    "Yes. Our primary classroom and cafeteria products are formulated with ultra-low VOCs and contain no harsh butyl solvents or heavy synthetic perfumes, meeting strict indoor air quality (IAQ) standards for occupied school environments.",
            },
            {
                question: "Do your disinfectants meet MHSA requirements for wrestling mats and athletic rooms?",
                answer:
                    "Yes. We supply EPA-registered, broad-spectrum disinfectants with proven kill claims against MRSA, ringworm, staph, and norovirus, engineered specifically not to damage mat vinyl or locker room finishes.",
            },
            {
                question: "How does the closed-loop system keep custodial closets safe and compliant?",
                answer:
                    "The system uses locked, wall-mounted proportioning units where concentrate bottles screw directly into sealed quick-connect heads. Custodians never touch raw chemical, eliminating spill risks and ensuring dilution is always 100% accurate.",
            },
        ],
        citations: [
            {
                sourceName: "Montana Administrative Rules (ARM 37.111.8)",
                text: "Health & Safety Standards for Public Schools: Sanitation & Chemical Storage.",
                url: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=37%2E111",
            },
            {
                sourceName: "U.S. Environmental Protection Agency (EPA)",
                text: "Creating Healthy Indoor Air Quality in Schools & Green Cleaning Guidance.",
                url: "https://www.epa.gov/iaq-schools",
            },
            {
                sourceName: "Montana High School Association (MHSA)",
                text: "Sports Medicine & Communicable Skin Disease Management Guidelines.",
                url: "https://www.mhsa.org/",
            },
            {
                sourceName: "OSHA 29 CFR 1910.1200",
                text: "GHS Chemical Labeling & Safety Data Sheet Standards for Custodial Staff.",
                url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200",
            },
        ],
        ctaSection: {
            badge: "Direct Montana District Partnership",
            heading: "Walk Your Campus Closets with a Local Montana Formulator.",
            lead:
                "Let our Montana technical specialists walk your facilities, inspect your current custodial mixing stations, and demonstrate our low-VOC, closed-loop systems on your toughest hallway or locker room.",
            buttonText: "Schedule a Campus Safety Walkthrough",
            phone: "(406) 727-4144",
            auditPoints: [
                "Custodial Closet Safety & Lock Audit",
                "Indoor Air Quality (VOC) Review",
                "Free District Trial Dispenser & Kit",
            ],
        },
    },
    {
        slug: "property-management-hospitality",
        seoTitle: "Commercial Hospitality & Property Cleaning Supplies in Great Falls, MT | United Formulas",
        seoDescription:
            "Speed up room turnover and protect linens from hard water. Fast shower descalers, laundry detergents, and odor destroyers stocked in Great Falls, MT.",
        geoTarget: "Great Falls, MT",
        schemaName: "Commercial Hospitality & Property Cleaning Supplies in Great Falls, MT",
        hero: {
            badge: "MONTANA LODGING & PROPERTY MANAGEMENT",
            h1: "Faster Room Turnovers. Zero Hard Water Glass Etching.",
            subhead:
                "Commercial descalers, automated laundry builders, and molecular odor destroyers engineered specifically to beat Montana mineral scale and protect your linen investment.",
            primaryCtaText: "Schedule a Free On-Site Shower & Laundry Demo",
            trustBar: [
                "Stocked in Great Falls & Billings",
                "Direct Route Truck Delivery",
                "Hospitality Desk: (406) 727-4144",
            ],
            highlightMetrics: [
                {
                    value: "9.4 GPG",
                    title: "Hard Water Descaling",
                    description: "Zero-scratch mineral dissolving",
                    color: "cyan",
                },
                {
                    value: "+40%",
                    title: "Linen Life",
                    description: "Sequestrant laundry builders",
                    color: "emerald",
                },
                {
                    value: "$0.28",
                    title: "Cost Per Turn",
                    description: "Vs $4.85 retail spray bottles",
                    color: "blue",
                },
            ],
        },
        challengesSection: {
            badge: "Turnover Bottleneck Analysis",
            heading: "3 Turnover Headaches That Slow Down Housekeeping Crews",
            items: [
                {
                    title: "9.4 GPG Hard Water Etching & Shower Glass Scale",
                    problemStat: "9.4 GPG Hardness Target",
                    description:
                        "Great Falls tap water carries 160 ppm (9.4 grains per gallon) of dissolved minerals. In hotel and rental bathrooms, hot shower mist evaporates, bonding calcium carbonate and body oils directly to glass enclosures, fiberglass pans, and chrome fixtures. Housekeepers waste 10 to 15 minutes manually scrubbing a single shower, blowing turnover schedules and leaving dull surfaces that trigger guest complaints.",
                    solutionText:
                        "Fast-acting phosphoric and organic acid descalers that dissolve mineral crusts and soap scum in a single wipe-and-rinse pass without scratching glass or corroding plumbing seals.",
                    citation: "Source: City of Great Falls Drinking Water Quality Report",
                    citationUrl: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
                },
                {
                    title: "Linen Graying & Early Sheet Replacement (On-Premise Laundry)",
                    problemStat: "+40% Linen Life Extension",
                    description:
                        "When commercial hotel washing machines use standard detergents with hard Missouri River surface water, calcium binds to cotton and poly-blend fibers. This traps unrinsed soil and minerals inside the weave, causing premium white towels and bedsheets to turn stiff, scratchy, and gray within 30 to 45 wash cycles.",
                    solutionText:
                        "Commercial laundry builders, high-sequestrant liquid detergents, and neutralizing sour/softeners that bind mineral hardness and rinse linens bright, extending linen life by up to 40%.",
                    citation: "Source: American Hotel & Lodging Association (AHLA) Textile Care Standards",
                    citationUrl: "https://www.ahla.com/",
                },
                {
                    title: "Turnover Odors: Smoke, Pet Urine & Cooking Spices",
                    problemStat: "ARM 37.111.1 Lodging Compliance",
                    description:
                        "Between hotel guest check-outs or apartment tenant turnovers, lingering odors sink deep into carpets, upholstery, and drywall. Retail aerosol sprays only mask smells with synthetic perfumes, allowing smoke and pet odors to return as soon as the HVAC kicks on—resulting in guest refund demands and negative online reviews.",
                    solutionText:
                        "Bio-enzymatic odor digesters and molecular encapsulants that consume uric acid crystals and neutralize airborne volatile organic compounds permanently.",
                    citation: "Source: Montana DPHHS Public Accommodation Rules (ARM 37.111.1)",
                    citationUrl: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=37%2E111",
                },
            ],
        },
        recommendedProductsHeading: "Hospitality Concentrates Stocked at Our Great Falls Warehouse",
        recommendedProductsSubhead:
            "Industrial descalers that melt calcium crust in 60 seconds, laundry builders that keep towels snow-white, and molecular odor destroyers that stop review-killing smells.",
        recommendedCategorySlugs: [
            "bathroom",
            "all-purpose",
            "carpet-care",
            "disinfectants-deodorizers",
            "floor-care",
            "degreaser",
        ],
        showHospitalityCalculator: true,
        comparisonTable: {
            badge: "Room Turnover Chemistry",
            heading: "Retail Cleaners vs. Commercial Hospitality Systems",
            subhead:
                "Why consumer spray jugs cost $4.85 per room turn and waste hours of manual scrubbing, and how local commercial concentrates cut costs to under $0.35 per turn.",
            featureHeader: "Operational Factor",
            features: [
                "Shower Glass Descaling",
                "Linen Whiteness & Texture",
                "Deep Odor Neutralization",
                "Room Turnover Cost",
            ],
            systems: [
                {
                    name: "Retail / Off-The-Shelf Jugs",
                    values: [
                        "Requires harsh abrasive pads and repeat scrubbing; risks permanent glass etching.",
                        "Minerals bake into fiber; white towels turn gray and feel like sandpaper.",
                        "Heavily perfumed aerosol mist; odor returns within 4 hours.",
                        "$4.50 to $7.00 per room in retail spray bottles and wasted labor.",
                    ],
                },
                {
                    name: "United Formulas Hospitality Program",
                    values: [
                        "High-active acid foaming spray; dissolves scale in 60 seconds with zero scratching.",
                        "Chelated laundry chemistry locks out minerals; leaves towels plush and bright white.",
                        "Enzymatic and molecular counteractants that eliminate the biological odor source.",
                        "Under $0.35 per room in commercial concentrates, cutting 8+ minutes per turnover.",
                    ],
                },
            ],
        },
        valuePropSection: {
            badge: "Local Montana Lodging Logistics",
            heading: "The Local Supply Advantage: Why Buy From 10 Miles Away?",
            subhead:
                "Direct route delivery from Great Falls and Billings blending facilities means no shipping delays when summer tourism or ski season surges.",
            points: [
                {
                    title: "Never Pay Freight on Plain Tap Water",
                    description:
                        "Commercial cleaners are 90% water. Our concentrates let you add local water on-site, cutting shipping costs and keeping money in Montana.",
                },
                {
                    title: "Commercial On-Premise Laundry Dispenser Setup",
                    description:
                        "Our local technicians install, plumb, and calibrate multi-pump automated laundry injection systems for hotel wash wheels to guarantee exact chemical dosing.",
                },
                {
                    title: "Guaranteed Route Stocking Through Montana Winters",
                    description:
                        "Local warehouses in Great Falls and Billings mean you never run out of shower descaler, laundry sour, or linens before peak weekend occupancy.",
                },
            ],
        },
        faqsHeading: "Questions from Montana Executive Housekeepers & Property Managers",
        faqsSubhead:
            "Straightforward answers to the most common chemical and turnover questions from Montana executive housekeepers and property managers.",
        faqs: [
            {
                question: "Why do our white hotel towels turn gray and feel scratchy so quickly?",
                answer:
                    "Great Falls municipal water has 9.4 grains of hardness. When unconditioned detergent mixes with hard water, dissolved calcium bonds to towel fibers, trapping dirt and detergent residue. Our commercial laundry program injects specialized sequestrants and sours that lock out minerals, keeping linens soft and bright.",
            },
            {
                question: "How do your bathroom descalers cut turnover times on shower glass?",
                answer:
                    "Instead of abrasive scrubbing that scratches glass, our foaming acid descalers react chemically with calcium carbonate and soap scum, dissolving mineral deposits in under two minutes so housekeepers simply spray, wipe, and rinse clean.",
            },
            {
                question: "Can bio-enzymatic counteractants completely eliminate smoke and pet odors between guests?",
                answer:
                    "Yes. Unlike perfumed aerosols that temporarily mask smells, bio-enzymatic treatments consume the organic protein and uric acid residues embedded in carpets, drapes, and subfloors, permanently neutralizing the odor at the molecular level.",
            },
        ],
        citations: [
            {
                sourceName: "City of Great Falls Drinking Water Quality Report",
                text: "Missouri River Surface Water Hardness Data (~160 mg/L / 9.4 GPG).",
                url: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
            },
            {
                sourceName: "Montana Administrative Rules (ARM 37.111.1)",
                text: "Public Accommodations Health & Sanitation Regulations for Lodging Facilities.",
                url: "https://rules.mt.gov/gateway/ChapterHome.asp?Chapter=37%2E111",
            },
            {
                sourceName: "Cascade County City-County Health Department (CCHD)",
                text: "Environmental Health Division: Hotel, Motel & Tourist Home Licensing.",
                url: "https://www.cascadecountymt.gov/311/Public-Accommodations",
            },
            {
                sourceName: "OSHA 29 CFR 1910.1200",
                text: "Hazard Communication Standard for Housekeeping & Laundry Chemicals.",
                url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200",
            },
        ],
        ctaSection: {
            badge: "On-Property Demonstration",
            heading: "Put Our Descaler on Your Cloudiest Shower Door.",
            lead:
                "Let our local Montana specialists visit your hotel or rental portfolio. We'll run a live 60-second test on your toughest shower glass, test your laundry water hardness, and leave a free commercial sample kit with your executive housekeeper.",
            buttonText: "Schedule a Free On-Site Shower & Laundry Demo",
            phone: "(406) 727-4144",
            auditPoints: [
                "On-Site Water Hardness Test (GPG)",
                "Shower Glass Descaling Live Demo",
                "Laundry Wash Wheel & Dosing Inspection",
            ],
        },
    },
    {
        slug: "automotive",
        seoTitle: "Commercial Car Wash & Fleet Cleaning Chemicals in Great Falls, MT | United Formulas",
        seoDescription:
            "Two-step car wash pre-soaks, road film removers, and drying agents stocked in Great Falls for Montana wash tunnels, in-bay automatics, and fleet bays.",
        geoTarget: "Great Falls, MT",
        schemaName: "Commercial Car Wash & Fleet Cleaning Chemicals in Great Falls, MT",
        hero: {
            badge: "MONTANA FLEET WASHES • COMMERCIAL WASH TUNNELS • AUTO DEALERSHIPS",
            h1: "Cut Montana Road Film. Protect the Clear Coat.",
            subhead:
                "Two-step winter pre-soaks engineered to dissolve baked-on magnesium chloride and road grime, backed by fast-sheeting drying agents—blended in Montana to drop your chemical cost per wash.",
            primaryCtaText: "Request a Wash Tunnel Chemical Audit & Sample Kit",
            trustBar: [
                "Stocked in Great Falls & Billings",
                "Bulk Drum & 275-Gal Tote Route Delivery",
                "Wash Tunnel Support Desk: (406) 727-4144",
            ],
            highlightMetrics: [
                {
                    value: "2-Step",
                    title: "Two-Step System",
                    description: "Low-pH pre-soak + high-alkaline wash",
                    color: "emerald",
                },
                {
                    value: "MgCl₂",
                    title: "Mag-Chloride Buster",
                    description: "Dissolves road brine without dulling paint",
                    color: "cyan",
                },
                {
                    value: "$0.23",
                    title: "Cost Per Car",
                    description: "$0.23/wash with Trophy Car Wash drum",
                    color: "blue",
                },
            ],
        },
        challengesSection: {
            badge: "Wash Tunnel Diagnostics",
            heading: "3 Wash Tunnel Headaches That Cause Re-Washes in Cascade County",
            items: [
                {
                    title: "Baked-On Magnesium Chloride & Road Slag (The Grey Film That Survives High Pressure)",
                    problemStat: "MDT Winter Road Brine",
                    description:
                        "Montana winter road crews spray liquid magnesium chloride and road slag across highways and city routes. That chemical brine bakes onto vehicle clear coats, windshield glass, and aluminum trim. Single-step neutral detergents or high-pressure water alone cannot break the ionic bond, leaving behind a persistent grey film that forces expensive customer re-washes and refund disputes.",
                    solutionText:
                        "Two-step wash chemistry: low-pH acid pre-soaks neutralize the chemical bond of magnesium chloride and road slag, followed immediately by high-alkaline foam to lift soils completely touch-free.",
                    citation: "Source: Montana Dept. of Transportation (MDT) Winter Maintenance",
                    citationUrl: "https://www.mdt.mt.gov/maintenance/",
                },
                {
                    title: "Hard Water Mineral Spotting & Clogged Rinse Nozzles (9.4 GPG Great Falls Tap)",
                    problemStat: "9.4 Grains Hardness (160 ppm)",
                    description:
                        "Great Falls tap water carries 160 ppm of dissolved limestone and minerals. When high-pressure rinse arches spray untreated hard water, minerals bake under tunnel dryers, leaving white water spots on dark vehicle paint and glass. Inside equipment rooms, unconditioned hard water scales up proportioning tips, solenoid valves, and high-pressure ceramic nozzles.",
                    solutionText:
                        "Built-in water conditioning sequestrants and rapid-sheeting drying agents cause rinse water to bead and slide off vehicle surfaces in seconds before mineral scale can deposit.",
                    citation: "Source: City of Great Falls Water Treatment Facility Annual Report",
                    citationUrl: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
                },
                {
                    title: "Chemical Cost-Per-Car Margin Bleed (Over-Concentrated Out-of-State Drums)",
                    problemStat: "$0.54 vs. $0.23 Cost/Vehicle",
                    description:
                        "National catalog chemical suppliers ship heavy pre-diluted 55-gallon drums from thousands of miles away, charging steep freight on water. Car wash operators face unpredictable tip clogging, inaccurate pump calibrations, and chemical costs soaring past $0.54 per car, draining profit margins during peak winter wash volumes.",
                    solutionText:
                        "Trophy Car Wash concentrates blended in Great Falls and Billings delivered in bulk 55-gal drums and 5-gal pails for $0.23 per vehicle pass (0.75 oz draw), backed by free on-site injector calibration.",
                    citation: "Source: International Carwash Association (ICA) Operational Benchmarks",
                    citationUrl: "https://www.carwash.org/",
                },
            ],
        },
        recommendedProductsHeading: "Commercial Wash Concentrates Stocked at Our Great Falls Warehouse",
        recommendedProductsSubhead:
            "Two-step touchless pre-soaks, high-foam detergents, wheel brighteners, and flash-drying waxes blended in Montana for local car wash tunnels and fleet bays.",
        recommendedCategorySlugs: [
            "automotive",
            "degreaser",
            "floor-care",
            "all-purpose",
        ],
        showAutomotiveCalculator: true,
        comparisonTable: {
            badge: "Wash Chemistry Comparison",
            heading: "Two-Step Acid/Alkaline Pre-Soaks vs. Generic One-Step Friction Soaps",
            subhead:
                "See why single-step soap fails on Montana highway brine and how a calibrated two-step touchless system eliminates road film and cuts cost-per-car.",
            featureHeader: "Wash Performance Metric",
            features: [
                "Magnesium Chloride Road Film",
                "Clear Coat & Trim Safety",
                "Tunnel Drying & Spotting",
                "Chemical Cost Per Vehicle",
                "Local Route & Tote Supply",
            ],
            systems: [
                {
                    name: "Generic One-Step Friction Soap",
                    values: [
                        "Leaves persistent chalky grey haze; requires customer re-washes or manual brush friction.",
                        "High friction runs risk of micro-scratches and swirl marks on dark clear coats.",
                        "Water beads slowly; leaves white mineral spots under blowers with 9.4 GPG hard water.",
                        "$0.54 per vehicle average delivered cost with out-of-state freight (1.75 oz draw).",
                        "Common-carrier freight delays when winter storms close mountain passes.",
                    ],
                },
                {
                    name: "United Formulas Two-Step Commercial System",
                    values: [
                        "Low-pH PREP dissolves road salts in seconds; high-alkaline second pass lifts grime touch-free.",
                        "100% touchless-safe; chemically loosens grit without aggressive friction or swirl marks.",
                        "Fast-sheeting drying agents shed rinse water instantly, preventing blower spots.",
                        "$0.23 per vehicle with Trophy Car Wash 55-gal drum (0.75 oz draw).",
                        "Stocked locally in Great Falls and Billings with direct route truck delivery.",
                    ],
                },
            ],
        },
        valuePropSection: {
            badge: "The Local Supply Advantage",
            heading: "The Local Supply Advantage: Why Buy From 10 Miles Away?",
            subhead:
                "Direct route delivery of bulk 55-gallon drums and 275-gallon totes from Great Falls and Billings means zero freight delays when winter wash volume spikes.",
            points: [
                {
                    title: "Direct Drum & 275-Gal Tote Route Delivery",
                    description:
                        "We deliver bulk 55-gallon drums and 275-gallon totes directly to your chemical room on our own trucks. No long freight lead times, damaged pallets, or freight surcharges.",
                },
                {
                    title: "On-Site Injector & Hydrominder Calibration",
                    description:
                        "Our local technicians inspect your chemical pump stands, calibrate hydrominders, and test dilution ratios on-site to guarantee consistent foam and exact cost-per-car dosing.",
                },
                {
                    title: "Guaranteed Supply During Montana Blizzards",
                    description:
                        "When winter storms hit and highway salt demands surge, our Great Falls and Billings warehouses stay fully stocked so your wash tunnel never runs dry.",
                },
            ],
        },
        faqsHeading: "Questions from Montana Car Wash & Fleet Operators",
        faqsSubhead:
            "Straightforward answers to the most common questions from Montana commercial wash tunnel operators, fleet managers, and auto dealerships.",
        faqs: [
            {
                question: "How does the Two-Step pre-soak system eliminate winter road film?",
                answer:
                    "Montana highway de-icers (magnesium chloride and road slag) form an electrostatic bond with vehicle paint that standard friction soaps cannot break. In our two-step program, Step 1 applies a low-pH acid pre-soak that neutralizes the chemical bond of the salts. Step 2 immediately applies a high-pH alkaline wash that encapsulates road oils and lifts the loosened grime away completely touch-free.",
            },
            {
                question: "Will your wash chemicals cause white spotting with Great Falls 9.4 GPG hard water?",
                answer:
                    "No. Our formulations are blended specifically for Central Montana water with built-in chelating agents and water conditioners. Our flash-drying waxes and drying agents cause rinse water to sheet off vehicles in seconds, leaving glass and clear coats streak-free under tunnel blowers.",
            },
            {
                question: "Can we get bulk 275-gallon totes delivered directly to our chemical room?",
                answer:
                    "Yes. We deliver 55-gallon drums and 275-gallon totes directly to car wash facilities and fleet yards across Montana on our company-owned route trucks, including pump-off and empty container pickup services.",
            },
        ],
        citations: [
            {
                sourceName: "Montana Dept. of Transportation (MDT)",
                text: "Winter Road Maintenance Protocols & Magnesium Chloride De-Icing Standards.",
                url: "https://www.mdt.mt.gov/maintenance/",
            },
            {
                sourceName: "International Carwash Association (ICA)",
                text: "Touchless & Tunnel Chemical Management & Cost-Per-Car Benchmarks.",
                url: "https://www.carwash.org/",
            },
            {
                sourceName: "City of Great Falls Drinking Water Quality Report",
                text: "Municipal Water Mineral Hardness Data (~160 mg/L / 9.4 GPG).",
                url: "https://greatfallsmt.net/publicworks/water-treatment-plant-annual-water-quality-report",
            },
            {
                sourceName: "Montana Dept. of Environmental Quality (DEQ)",
                text: "Commercial Car Wash Wastewater & Sand/Oil Separator Regulations (ARM 17.30).",
                url: "https://deq.mt.gov/water/surface-water",
            },
        ],
        ctaSection: {
            badge: "Montana Commercial Wash Partnership",
            heading: "Put Our Chemistry to the Test in Your Wash Tunnel.",
            lead:
                "Tell us how many vehicles you wash each month. We'll bring a commercial car wash sample kit to your facility, test your water hardness, and run a live two-step demonstration on your dirtiest road-filmed vehicle.",
            buttonText: "Request a Wash Tunnel Chemical Audit & Sample Kit",
            phone: "(406) 727-4144",
            auditPoints: [
                "Two-Step Mag-Chloride Road Film Test",
                "Injector & Hydrominder Ratio Check",
                "Free Commercial Chemical Sample Drum",
            ],
        },
    },
    {
        slug: "auto-repair-service-bays",
        seoTitle: "Commercial Auto Repair Degreasers & Shop Supplies in Great Falls, MT",
        seoDescription:
            "Heavy-duty concrete floor degreasers, auto-scrubber detergents, and aqueous parts washer concentrates stocked in Great Falls for Montana repair bays.",
        geoTarget: "Great Falls, MT",
        schemaName: "Commercial Auto Repair Degreasers & Shop Supplies in Great Falls, MT",
        hero: {
            badge: "CENTRAL MONTANA • AUTO REPAIR & SERVICE BAYS",
            h1: "Strip Petroleum Slicks. Stop Smearing Grease.",
            subhead:
                "Dissolve synthetic motor oil, gear lube, and transmission fluid down to bare, high-traction concrete. Heavy-duty floor concentrates, auto-scrubber soaps, and water-based parts cleaners—blended locally in Great Falls and Billings.",
            primaryCtaText: "Request a Free Shop Bay Chemical Audit & Sample Kit",
            secondaryCtaText: "Calculate Bay & Solvent Savings",
            secondaryCtaHref: "#shop-calculator",
            trustBar: [
                "Stocked in Great Falls & Billings",
                "5-Gal Pail & 55-Gal Drum Delivery",
                "Shop Support Desk: (406) 727-4144",
            ],
            highlightMetrics: [
                {
                    value: "High Traction",
                    title: "Petroleum Emulsifier",
                    description: "Lifts motor oil & ATF without slick residue",
                    color: "emerald",
                },
                {
                    value: "Zero Manifests",
                    title: "Aqueous Parts Washing",
                    description: "Replaces flammable solvent sinks",
                    color: "cyan",
                },
                {
                    value: "$0.18 / Clean",
                    title: "Cost Per Bay",
                    description: "Vs. $1.75 retail jug pre-mixes",
                    color: "blue",
                },
            ],
        },
        challengesSection: {
            badge: "Service Bay Diagnostics",
            heading: "3 Shop Floor Headaches That Waste Hours & Risk Slips",
            items: [
                {
                    title: "Porous Concrete Oil Slicks & Technician Slip Hazards",
                    problemStat: "OSHA 29 CFR 1910.22",
                    description:
                        "Synthetic motor oil, gear lube, and transmission fluid seep deep into unsealed concrete bays. Over-the-counter floor soaps lack the alkalinity to break petroleum bonds, smearing grease across the floor and leaving an oily film that creates major OSHA slip-and-fall risks.",
                    solutionText:
                        "High-active alkaline degreasers (Jewelmaster HD and Dynamo-X) that saponify petroleum oils on contact, allowing auto-scrubbers and mops to lift grime completely down to bare, high-traction concrete.",
                    citation: "Source: OSHA 29 CFR 1910.22 Walking-Working Surfaces (Slip, Trip, and Fall Prevention)",
                    citationUrl: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22",
                },
                {
                    title: "Auto-Scrubber Squeegee Gumming & Dirty Recovery Tanks",
                    problemStat: "ISSA Commercial Floor Care",
                    description:
                        "When service bays use weak retail cleaners, oily emulsions gum up auto-scrubber squeegee blades, leaving streaky tire tracks and clogging dirty-water vacuum lines and recovery tanks with greasy sludge.",
                    solutionText:
                        "Clean-rinsing, low-foaming degreasers formulated specifically for automatic floor scrubbers to keep recovery tanks clean and squeegees wiping dry.",
                    citation: "Source: ISSA Commercial Floor Care Standards",
                    citationUrl: "https://www.issa.com/",
                },
                {
                    title: "Solvent Sinks: Recurring Hauling Contracts & Fire Liability",
                    problemStat: "EPA RCRA 40 CFR Part 261",
                    description:
                        "Flammable mineral spirit sinks expose technicians to volatile organic fumes, dry out skin, and require expensive third-party hazardous waste hauling services under cradle-to-grave manifest tracking.",
                    solutionText:
                        "Heated aqueous parts washer chemistry. Water-based concentrates that strip carbon, varnish, and heavy grease at 140°F without hazardous waste manifesting.",
                    citation: "Source: EPA Resource Conservation and Recovery Act (RCRA) Solvent Waste Management (40 CFR Part 261)",
                    citationUrl: "https://www.epa.gov/hw",
                },
            ],
        },
        recommendedProductsHeading: "Heavy-Duty Formulas Stocked at Our Great Falls Warehouse",
        recommendedProductsSubhead:
            "Jewelmaster HD, Dynamo-X Degreaser/Stripper, and Almond Cream Hand Soap stocked locally in Great Falls and Billings for direct shop delivery.",
        recommendedCategorySlugs: [
            "degreaser",
            "floor-care",
            "all-purpose",
            "restroom",
            "automotive",
        ],
        showShopCalculator: true,
        comparisonTable: {
            badge: "Shop Floor & Parts Maintenance",
            heading: "The Solvent Sink Money Pit: Mineral Spirits vs. Heated Aqueous Wash",
            subhead:
                "Why Montana repair shops are replacing flammable solvent tubs with water-based parts cleaning.",
            featureHeader: "Feature / Concern",
            features: [
                "Flammability & Fire Risk",
                "Waste Hauling Cost",
                "Technician Exposure",
                "Degreasing Power on Carbon",
            ],
            systems: [
                {
                    name: "Mineral Spirit Solvent Sinks",
                    values: [
                        "Combustible flash point; presents an open-bay fire hazard.",
                        "Requires recurring paid pickup contracts to haul spent solvent drums.",
                        "High VOC fumes and chronic skin drying/dermatitis.",
                        "Dissolves surface oil but struggles with baked engine carbon.",
                    ],
                },
                {
                    name: "United Formulas Aqueous Wash Program",
                    values: [
                        "Non-flammable water-based chemistry; zero flash point.",
                        "Oil skimmer removes floating grease; cleaning bath lasts for months.",
                        "Low-odor, water-diluted chemistry safe for daily parts handling.",
                        "Heated alkaline bath breaks down carbon varnish and heavy gear grease.",
                    ],
                },
            ],
        },
        valuePropSection: {
            badge: "The Local Supply Advantage",
            heading: "The Local Advantage: Why Pay Freight to Truck Water Over the Pass?",
            subhead:
                "Industrial chemical blending and drum delivery based right here in Great Falls and Billings.",
            points: [
                {
                    title: "Direct Route Delivery in Drums & Pails",
                    description:
                        "We deliver 5-gal pails and 55-gal drums straight to your shop on our own trucks—no common-carrier LTL freight markups.",
                },
                {
                    title: "Free Proportioner Installation",
                    description:
                        "Our field technicians install wall-mounted proportioners so technicians stop free-pouring raw degreaser into mop buckets.",
                },
                {
                    title: "Winter Route Reliability",
                    description:
                        "When winter storms close mountain passes, our regional warehouses keep your bay degreasers and spill supplies fully stocked.",
                },
            ],
        },
        faqsHeading: "Questions from Montana Shop Owners & Service Managers",
        faqsSubhead:
            "Straightforward answers on oil/water separator compliance, aqueous parts washing, and shop chemical savings.",
        faqs: [
            {
                question: "Will your floor degreaser leave a slippery film on smooth-troweled concrete?",
                answer:
                    "No. Unlike cheap soaps that leave detergent residues, our industrial degreasers emulsify petroleum so it can be picked up cleanly by an auto-scrubber or mop, leaving a dry, high-traction finish.",
            },
            {
                question: "Can aqueous parts washing really replace our solvent sink service?",
                answer:
                    "Yes. When heated between 130°F and 150°F, our water-based alkaline concentrates strip baked carbon, motor grease, and hydraulic oil as fast as mineral spirits—without the fire hazard or third-party hauling fees.",
            },
            {
                question: "Do you deliver in 5-gallon pails or 55-gallon drums?",
                answer:
                    "Both. We stock 5-gallon pails, 55-gallon drums, and bulk concentrates at our Great Falls and Billings warehouses, delivered straight to your shop on our own route trucks with no out-of-state freight surcharges.",
            },
        ],
        citations: [
            {
                sourceName: "OSHA 29 CFR 1910.22",
                text: "Walking-Working Surfaces: Shop Floor Slip & Fall Safety Standards.",
                url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22",
            },
            {
                sourceName: "U.S. Environmental Protection Agency (EPA)",
                text: "Management of Industrial Solvent Waste (40 CFR Part 261).",
                url: "https://www.epa.gov/hw",
            },
            {
                sourceName: "The Worldwide Cleaning Industry Association (ISSA)",
                text: "Commercial Floor Maintenance & Scrubbing Performance Standards.",
                url: "https://www.issa.com/",
            },
        ],
        ctaSection: {
            badge: "Montana Service Bay Partnership",
            heading: "Put Industrial Chemistry on Your Greasiest Bay",
            lead:
                "Tell us how many service bays and parts tanks you run. We'll bring an auto shop sample kit to your facility, test your oil/water separator flow, and run a live floor demo on your toughest bay.",
            buttonText: "Request a Free Shop Chemical Audit & Sample Kit",
            phone: "(406) 727-4144",
            auditPoints: [
                "Live Concrete Floor Degreasing Demo",
                "Oil/Water Separator Quick-Break Test",
                "Free Aqueous Parts Wash & Hand Soap Samples",
            ],
        },
    },
    {
        slug: "healthcare-senior-care",
        seoTitle: "Healthcare & Senior Care Cleaning Programs in Montana | United Formulas",
        seoDescription: "Local commercial cleaning support for clinics, senior care communities and healthcare facilities across the Great Falls region.",
        geoTarget: "Great Falls, MT",
        hero: {
            badge: "HEALTHCARE & SENIOR CARE FACILITY SUPPORT",
            h1: "A cleaning program your team can use consistently.",
            subhead: "Build a simpler facility program around documented products, repeatable dilution, staff training and responsive local service.",
            primaryCtaText: "Request a Healthcare Facility Audit",
            trustBar: ["Local product support", "SDS access", "On-site usage review"],
        },
        challengesSection: { heading: "Where healthcare cleaning programs lose consistency", items: [
            { title: "Too many products and unclear procedures", description: "Overlapping products make training harder and create uncertainty about where each formula belongs.", solutionText: "Map each task to a defined product, dilution and procedure your team can repeat." },
            { title: "High-touch areas need dependable routines", description: "Busy facilities need clear responsibilities and accessible documentation across shifts.", solutionText: "Create a practical product and documentation plan around the facility's own protocols." },
            { title: "Supply or equipment problems interrupt work", description: "A distant supplier can leave a facility waiting when dispensers, dosage or inventory need attention.", solutionText: "Use local review and planned replenishment to address issues before they disrupt the cleaning schedule." },
        ]},
        recommendedProductsHeading: "Facility-care categories to review",
        recommendedCategorySlugs: ["disinfectants-deodorizers", "floor-care", "bathroom", "laundry", "all-purpose"],
        valuePropSection: { heading: "Local support for a repeatable program", points: [
            { title: "Document the system", description: "Connect products, SDS documents and use instructions to the tasks your team performs." },
            { title: "Train around real work", description: "Review dilution and application where employees actually use each product." },
            { title: "Respond locally", description: "Work with a regional team when product, dispenser or supply questions arise." },
        ]},
        ctaSection: { heading: "Start with a facility review", lead: "We will review applications, product overlap, documentation and usage before recommending a trial.", buttonText: "Request a Healthcare Audit", phone: "(406) 727-4144", auditPoints: ["Product and task inventory", "Dilution and usage review", "Structured seven-day trial"] },
    },
    {
        slug: "industrial-manufacturing",
        seoTitle: "Industrial & Manufacturing Cleaning Chemicals in Montana | United Formulas",
        seoDescription: "Concentrated cleaning programs and local service for manufacturing, maintenance and industrial facilities in Montana.",
        geoTarget: "Great Falls, MT",
        hero: { badge: "INDUSTRIAL & MANUFACTURING", h1: "Match the chemistry to the soil, surface and process.", subhead: "Reduce product overlap and avoid one-strength-fits-all cleaning with an on-site review of soil load, handling, dosage and labor.", primaryCtaText: "Request an Industrial Audit", trustBar: ["Concentrated formulas", "Regional route service", "On-site product testing"] },
        challengesSection: { heading: "Start with the operational cost", items: [
            { title: "Heavy soil drives repeat labor", description: "A low container price loses its advantage when employees must apply, scrub and repeat.", solutionText: "Test performance at a defined dilution and measure labor alongside chemical usage." },
            { title: "Product overlap creates waste", description: "Facilities often accumulate multiple cleaners for similar jobs without a clear system.", solutionText: "Inventory tasks and consolidate only where one formula can do the work safely." },
            { title: "Downtime costs more than chemistry", description: "Waiting for supply or support can interrupt maintenance and production work.", solutionText: "Tie local inventory and planned follow-up to the facility's critical cleaning tasks." },
        ]},
        recommendedProductsHeading: "Heavy-duty categories to evaluate",
        recommendedCategorySlugs: ["degreaser", "industrial-cleaner-degreaser", "floor-care", "all-purpose", "automotive"],
        valuePropSection: { heading: "A practical industrial trial", points: [
            { title: "Choose one difficult job", description: "Define the soil, surface, current method and expected result before testing." },
            { title: "Control the dilution", description: "Record the working dilution so performance and cost can be compared fairly." },
            { title: "Review after seven days", description: "Measure usage, labor and operator feedback before expanding the program." },
        ]},
        ctaSection: { heading: "Put one difficult cleaning job under review", lead: "We will help define the baseline, test location and success measure before placing a sample.", buttonText: "Request an Industrial Audit", phone: "(406) 727-4144", auditPoints: ["Soil and surface assessment", "Dilution test", "Seven-day follow-up plan"] },
    },
    {
        slug: "agribusiness-food-processing",
        seoTitle: "Agribusiness & Food Processing Cleaning Support | Montana",
        seoDescription: "Regional cleaning-product support for agribusiness, production and food-processing operations in Montana.",
        geoTarget: "Great Falls, MT",
        hero: { badge: "GOLDEN TRIANGLE AGRIBUSINESS ROUTE", h1: "Reliable cleaning support for regional production.", subhead: "Review the real cost of cleaning across production soils, equipment, floors, warewashing and employee-use areas.", primaryCtaText: "Request an Operations Audit", trustBar: ["Golden Triangle route planning", "Concentrate trials", "Local follow-up"] },
        challengesSection: { heading: "Problems worth measuring before switching", items: [
            { title: "Variable soil and seasonal demand", description: "Cleaning demands can change with production, weather and material handling.", solutionText: "Define product strength and replenishment around the actual operating cycle." },
            { title: "Large sites magnify small waste", description: "Overuse at each station becomes a meaningful annual cost across a facility.", solutionText: "Review dispensing, dilution and consumption by task rather than by container." },
            { title: "Rural supply needs planning", description: "Long replenishment gaps create risk when essential products run low.", solutionText: "Group service and delivery around a planned regional route and follow-up schedule." },
        ]},
        recommendedProductsHeading: "Production and facility categories",
        recommendedCategorySlugs: ["degreaser", "floor-care", "kitchen-warewash", "all-purpose", "laundry"],
        valuePropSection: { heading: "Built around the route and the operation", points: [
            { title: "Plan the call", description: "Group audits, trials and follow-ups across the Golden Triangle route." },
            { title: "Define the trial", description: "Identify the product, location, problem and success measure before leaving a sample." },
            { title: "Schedule the return", description: "Set the 72-hour contact and seven-day review while the trial is placed." },
        ]},
        ctaSection: { heading: "Review one process before changing the program", lead: "Tell us the facility, application and current problem. We will plan the right route and test.", buttonText: "Request an Agribusiness Audit", phone: "(406) 727-4144", auditPoints: ["Application review", "Usage baseline", "Scheduled trial follow-up"] },
    },
    {
        slug: "government-public-facilities",
        seoTitle: "Government & Public Facility Cleaning Programs | Montana",
        seoDescription: "Commercial cleaning support, documentation and local supply for government and public facilities in Montana.",
        geoTarget: "Great Falls, MT",
        hero: { badge: "GOVERNMENT & PUBLIC FACILITIES", h1: "Clear products, clear documentation, dependable supply.", subhead: "Give facility teams a practical path from product review to controlled trial, purchasing documentation and regional service.", primaryCtaText: "Request a Public Facility Audit", trustBar: ["SDS database", "Commercial credit application", "Regional delivery planning"] },
        challengesSection: { heading: "Make the program easier to manage", items: [
            { title: "Documentation is separated from daily work", description: "Purchasing and facility teams need quick access to product and safety information.", solutionText: "Connect recommended products directly to their SDS and application details." },
            { title: "Multiple buildings create inconsistent use", description: "Different locations and crews may use different products for the same task.", solutionText: "Review common tasks and build a repeatable core program with defined exceptions." },
            { title: "Purchasing needs a defensible comparison", description: "Container price alone does not show usable yield, labor or delivery impact.", solutionText: "Compare cost per usable gallon and document trial results before expanding." },
        ]},
        recommendedProductsHeading: "Core public-facility categories",
        recommendedCategorySlugs: ["floor-care", "bathroom", "disinfectants-deodorizers", "all-purpose", "laundry"],
        valuePropSection: { heading: "From field test to purchasing review", points: [
            { title: "Audit", description: "Document current products, tasks, usage and service problems." },
            { title: "Trial", description: "Test one product in one location against a clear success measure." },
            { title: "Report", description: "Summarize performance, consumption and the recommended next action." },
        ]},
        ctaSection: { heading: "Build a documented facility review", lead: "Start with one building or cleaning task and expand only after the trial produces a useful result.", buttonText: "Request a Public Facility Audit", phone: "(406) 727-4144", auditPoints: ["Product inventory", "SDS and usage review", "Trial result summary"] },
    },
];

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
    if (slug === "janitorial-cleaning-companies") {
        return INDUSTRIES.find((ind) => ind.slug === "commercial-janitorial");
    }
    if (slug === "schools-education") {
        return INDUSTRIES.find((ind) => ind.slug === "schools-educational-facilities");
    }
    return INDUSTRIES.find((ind) => ind.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
    return INDUSTRIES.map((ind) => ind.slug);
}
