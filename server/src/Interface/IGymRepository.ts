import { Gym } from "../Entity";

export interface IGymRepository {
  getAllGyms: (id?: number) => Promise<Gym[]>;
}
