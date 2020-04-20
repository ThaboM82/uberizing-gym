import { Service, ObjectType } from "typedi";
import { IGymRepository } from "../Interface/IGymRepository";
import { Gym } from "../Entity";
import { getRepository } from "../Config";
import { Repository } from "typeorm";

@Service()
export class GymRepository implements IGymRepository {
  private async getRepository<T>(repo: ObjectType<T>): Promise<Repository<T>> {
    return await getRepository(repo);
  }

  async getAllGyms(): Promise<Gym[]> {
    return await (await this.getRepository(Gym)).find();
  }

}