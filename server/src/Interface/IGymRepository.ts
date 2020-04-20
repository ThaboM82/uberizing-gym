import { Gym } from "../Entity";

export interface IGymRepository {
  getAllGyms: () => Promise<Gym[]>;
}
