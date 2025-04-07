export interface categoriesInterface {
  sounds: AudioTrack[];
  music: AudioTrack[];
  brainwaves: AudioTrack[];
}

export interface AudioItem {
  id: string;
  name: string;
  path: string;
  volume: number|0.5;
}

export type AudioCategory = "music" | "sounds" | "brainwaves";
export interface AudioTrack extends AudioItem {
  volume: number;
  category: AudioCategory;
}
export enum LocalStorageMix {
  savedMix = "savedMix"
} 

export type LocalStroageMixType = {
  name:string
  data:AudioTrack[]
}[]