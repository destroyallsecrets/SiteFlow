export const localSOPs = [
  {
    title: '200A Temp Pole Installation',
    materials: ['200A Meter Main Comb. Panel', '2" PVC Conduit (Schedule 80)', '8ft Grounding Rods (2x)', '2/0 Cu Service Wire', 'Acorn Ground Clamps', '4x4 Pressure Treated Wood Post', '2x4 Bracing Lumber', 'Concrete/Quikrete (2 bags)', 'Nails/Screws'],
    steps: [
      'Don appropriate PPE: Safety glasses, hard hat, work gloves, and steel-toed boots.',
      'Gather necessary tools: Post hole digger, shovel, level, drill/driver, wire strippers, torque wrench, sledgehammer.',
      'Identify a safe location for the temporary pole. Ensure it is free of underground utilities (Call 811 before digging) and accessible to utility company drop.',
      'Dig a hole for the main post. The hole must be at least 3 feet deep to provide sufficient stability against wind and cable tension.',
      'Place the 4x4 pressure-treated wood post into the hole. Use a 4-foot level to ensure the post is perfectly plumb on adjacent sides.',
      'Secure the post by bracing it with 2x4 lumber. Pour dry concrete into the hole, add water according to package directions, and allow it to set.',
      'Once the concrete is firm, measure and mark the mounting height for the 200A Meter Main combination panel (usually eye-level for the meter).',
      'Mount the panel securely to the post using exterior-grade lag screws. Verify the panel is level.',
      'Install the 2" Schedule 80 PVC conduit up the side of the pole, terminating at a weatherhead at the top. Secure with conduit straps every 3 feet.',
      'Run the 2/0 Cu service entrance conductors down through the weatherhead and conduit into the meter main enclosure.',
      'Leave at least 3 feet of wire hanging out of the weatherhead to provide a sufficient tail for the utility company to make their connections.',
      'Using a sledgehammer, drive two 8-foot copper-clad grounding rods into the earth. They must be spaced at least 6 feet apart.',
      'Run a continuous bare copper grounding electrode conductor (usually #4 or #6 bare Cu) from the panel ground bar down to the grounding rods.',
      'Secure the grounding wire to both ground rods using acorn ground clamps. Ensure the clamps are tightened firmly below grade if possible.',
      'Install required GFCI receptacle outlets on the panel and wire them to appropriate circuit breakers for construction site power.',
      'Apply weatherproofing sealant to any penetrations in the panel enclosure.',
      'Clean up the job site, removing debris and tools.',
      'Contact the local utility and inspector to request final inspection and utility hookup to energize the temporary service.'
    ],
    mermaidChart: `graph TD
    A[PPE & Setup] --> B[Dig 3ft Hole]
    B --> C[Set & Plumb Post]
    C --> D[Pour Concrete]
    D --> E[Mount Meter Panel]
    E --> F[Install PVC Conduit & Weatherhead]
    F --> G[Pull Service Conductors]
    G --> H[Drive Ground Rods]
    H --> I[Connect Ground Wire]
    I --> J[Install GFCI Outlets]
    J --> K[Final Inspection]`
  },
  {
    title: '100A Subpanel Addition',
    materials: ['100A Main Lug Panel Enclosure', 'Appropriate Branch Circuit Breakers', '4 AWG Cu Feeder Wire (Black, Red, White, Green)', '1" EMT Conduit or Romex', 'Conduit Fittings & Connectors', 'Drywall Anchors/Toggle Bolts', 'Phase Tape (Red/Black)'],
    steps: [
      'Don appropriate PPE: Safety glasses, insulated gloves, and arc-flash rated clothing as required.',
      'Gather tools: Screwdrivers, wire strippers, conduit bender, fish tape, voltage tester, torque wrench, drill.',
      'Verify power is completely shut off at the main breaker before beginning any work. Use a non-contact voltage tester to confirm zero voltage.',
      'Identify the mounting location for the new subpanel. Ensure it meets NEC working clearance requirements (36 inches clear depth in front, 30 inches width).',
      'Mount the subpanel enclosure securely to wall studs using heavy-duty wood screws. If mounting on drywall/masonry, use appropriate toggle bolts or masonry anchors.',
      'Determine the routing path for the feeder conduit or cable from the main breaker panel to the new subpanel.',
      'Install the 1" EMT conduit between the panels, using appropriate fittings, bends, and supports. Secure conduit straps every 10 feet and within 3 feet of enclosures.',
      'Feed a fish tape through the conduit from the subpanel to the main panel.',
      'Attach the four 4 AWG copper feeder wires (Black, Red, White, Green) to the fish tape and carefully pull them through the conduit.',
      'At the subpanel, cut the wires to length, leaving enough slack for neat routing.',
      'Strip the insulation from the wire ends according to the panel manufacturer specifications.',
      'Terminate the Black and Red (Hot) feeder wires to the main lugs of the subpanel. Tighten to the specified torque using a torque wrench.',
      'Terminate the White (Neutral) wire to the isolated neutral bus bar.',
      'Crucial Step: Ensure the bonding screw or strap connecting the neutral bus bar to the metal enclosure is REMOVED. Neutrals and grounds must be isolated in a subpanel.',
      'Terminate the Green (Ground) wire to the separate grounding bus bar bonded directly to the enclosure.',
      'At the main panel, terminate the feeder wires: Hots to the new 100A double-pole breaker, Neutral to the neutral bar, Ground to the ground bar.',
      'Install branch circuit breakers into the subpanel as needed for the new circuits.',
      'Carefully route and terminate the branch circuit wires to their respective breakers, neutrals, and grounds.',
      'Fill out the panel directory schedule legibly and accurately, describing each new circuit.',
      'Re-install panel covers. Turn on the main breaker, then the subpanel feeder breaker, then individual branch breakers. Verify proper voltage at subpanel.'
    ],
    mermaidChart: `graph TD
    A[Power Off & Verify] --> B[Mount Subpanel]
    B --> C[Run EMT Conduit]
    C --> D[Pull 4AWG Feeder Wires]
    D --> E[Subpanel: Terminate Hots to Lugs]
    E --> F[Subpanel: Terminate Neutral to Isolated Bar]
    F --> G[Subpanel: Terminate Ground to Ground Bar]
    G --> H[Main Panel: Terminate Feeder to 100A Breaker]
    H --> I[Install Branch Breakers & Label]
    I --> J[Power On & Test Voltages]`
  },
  {
    title: '3-Way Switch Circuit Wiring',
    materials: ['Single-Pole Double-Throw (3-Way) Switches (2x)', '14/3 NM-B (Romex) Wire', '14/2 NM-B (Romex) Wire', 'Deep Switch Boxes (2x)', 'Wire Nuts (Assorted Sizes)', 'Electrical Tape', 'Staples'],
    steps: [
      'Don PPE: Safety glasses and insulated gloves.',
      'Gather tools: Wire strippers, needle-nose pliers, Phillips and flathead screwdrivers, voltage tester, utility knife, hammer.',
      'Turn off power at the main breaker panel for the circuit you will be working on. Tag the breaker.',
      'Verify zero voltage at the work area using a non-contact voltage tester.',
      'Install the two deep switch boxes at the desired locations (typically 48 inches from the floor) and the lighting fixture box in the ceiling.',
      'Run a 14/2 NM-B power supply cable (Hot, Neutral, Ground) from the breaker panel (or an upstream junction) to the FIRST switch box.',
      'Run a 14/3 NM-B cable (Black, Red, White, Bare Ground) between the FIRST switch box and the SECOND switch box. These wires will act as your "travelers".',
      'Run a 14/2 NM-B switch leg cable from the SECOND switch box up to the lighting fixture box.',
      'Secure all cables with staples within 12 inches of every box and every 4.5 feet along the framing.',
      'Strip the outer sheathing from all cables inside the boxes (leaving 1/4 inch of sheathing visible inside the box) and strip 5/8 inch of insulation from individual wires.',
      'In the FIRST switch box: Connect the incoming incoming Black (Hot) wire to the Common terminal (usually a black or oxidized screw) on the first 3-way switch.',
      'In the FIRST switch box: Connect the Black and Red wires from the 14/3 cable to the two Traveler terminals (usually brass screws) on the switch.',
      'In the SECOND switch box: Connect the Black and Red wires from the 14/3 cable to the two Traveler terminals on the second switch.',
      'In the SECOND switch box: Connect the Black wire from the 14/2 switch leg cable to the Common terminal on the second switch.',
      'Splice the Neutral (White) wires: In the first box, wire-nut the incoming white to the 14/3 white. In the second box, wire-nut the 14/3 white to the switch leg white.',
      'Note: Neutral wires never connect to the 3-way switches themselves in this standard configuration.',
      'Splice all bare copper ground wires together in each box with a pigtail. Connect the pigtail to the green grounding screw on each switch.',
      'At the ceiling box, connect the switch leg Black to the fixture Hot (usually black), White to Neutral (white), and Ground to the fixture ground.',
      'Carefully fold the wires into the boxes and secure the switches and lighting fixture with mounting screws. Attach faceplates.',
      'Restore power at the breaker panel. Test both switches to ensure they can independently turn the light on and off regardless of the other switch\'s position.'
    ],
    mermaidChart: `graph TD
    A[Power Off & Tag] --> B[Install Boxes & Run Cables]
    B --> C[Strip Wires]
    C --> D[SW1: Power Black to Common]
    D --> E[SW1 & SW2: Connect Red/Black Travelers]
    E --> F[SW2: Switch Leg Black to Common]
    F --> G[Splice White Neutrals Straight Through]
    G --> H[Connect All Grounds]
    H --> I[Wire Light Fixture]
    I --> J[Mount Switches & Test]`
  }
];

