import { Gym } from "../Entity";

export interface IGymRepository {
  getAllGyms: (id?: number) => Promise<Gym[]>;
  saveGym: (gymId: number, userId: number) => Promise<void>;
  unsaveGym: (gymId: number, userId: number) => Promise<void>;
}
