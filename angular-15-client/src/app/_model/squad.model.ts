export interface Squad {
  members: Member[];
  maxSquadRelease: number;
  totalCredits: number;
  userId: string;
}

export interface Member {
  _id: string;
  name: string;
  role: string;
  team: string;
  price: number;
  recoveredCredits: number;
  released: boolean;
}
