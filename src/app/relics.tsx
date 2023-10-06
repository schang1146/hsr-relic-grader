export interface CavernRelic {
  id: number;
  name: string;
}

export interface PlanarOrnament {
  id: number;
  name: string;
}

export interface RelicMainStat {
  type: string;
  value: number;
  isPercent: boolean;
}

export interface RelicSubStat {
  type: string;
  value: number;
  isPercent: boolean;
  timesIncreased: number;
}

export function getRelicRarity(red: number, green: number, blue: number): number {
  const acceptableError = 0.05;
  if (isWithinError(red, 184, acceptableError) && isWithinError(green, 142, acceptableError) && isWithinError(blue, 100, acceptableError)) {
    return 5;
  }
  if (isWithinError(red, 139, acceptableError) && isWithinError(green, 101, acceptableError) && isWithinError(blue, 198, acceptableError)) {
    return 4;
  }
  if (isWithinError(red, 85, acceptableError) && isWithinError(green, 124, acceptableError) && isWithinError(blue, 186, acceptableError)) {
    return 3;
  }
  return 0;
}

export const cavernRelics: CavernRelic[] = [
  {
    id: 1,
    name: 'Band of Sizzling Thunder',
  },
  {
    id: 2,
    name: 'Champion of Streetwise Boxing',
  },
  {
    id: 3,
    name: 'Eagle of Twilight Line',
  },
  {
    id: 4,
    name: 'Firesmith of Lava-Forging',
  },
  {
    id: 5,
    name: 'Genius of Brilliant Stars',
  },
  {
    id: 6,
    name: 'Guard of Wuthering Snow',
  },
  {
    id: 7,
    name: 'Hunter of Glacial Forest',
  },
  {
    id: 8,
    name: 'Knight of Purity Palace',
  },
  {
    id: 9,
    name: 'Longevous Disciple',
  },
  {
    id: 10,
    name: 'Messenger Traversing Hackerspace',
  },
  {
    id: 11,
    name: 'Musketeer of Wild Wheat',
  },
  {
    id: 12,
    name: 'Passerby of Wandering Cloud',
  },
  {
    id: 13,
    name: 'Thief of Shooting Meteor',
  },
  {
    id: 14,
    name: 'Wastelander of Banditry Desert',
  },
];

export const planarOrnaments: PlanarOrnament[] = [
  {
    id: 1,
    name: 'Belobog of the Architects',
  },
  {
    id: 2,
    name: 'Broken Keel',
  },
  {
    id: 3,
    name: 'Celestial Differentiator',
  },
  {
    id: 4,
    name: 'Fleet of the Ageless',
  },
  {
    id: 5,
    name: 'Inert Salsotto',
  },
  {
    id: 6,
    name: 'Pan-Cosmic Commercial Enterprise',
  },
  {
    id: 7,
    name: 'Rutilant Arena',
  },
  {
    id: 8,
    name: 'Space Sealing Station',
  },
  {
    id: 9,
    name: 'Sprightly Vonwacq',
  },
  {
    id: 10,
    name: 'Talia: Kingdom of Banditry',
  },
];

function isWithinError(value: number, expected: number, acceptableError: number) {
  return expected * (1 - acceptableError) <= value && value <= expected * (1 + acceptableError);
}
