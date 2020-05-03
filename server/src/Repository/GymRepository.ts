import { Service, ObjectType } from "typedi";
import { IGymRepository } from "../Interface/IGymRepository";
import { Gym, SavedGym } from "../Entity";
import { getDBManager, getRepository } from "../Config";
import { Repository } from "typeorm";

@Service()
export class GymRepository implements IGymRepository {
  private async getRepository<T>(repo: ObjectType<T>): Promise<Repository<T>> {
    return await getRepository(repo);
  }

  async getAllGyms(id?: number): Promise<Gym[]> {
    return await (await getDBManager())
      .query(`
      SELECT
        Q.id,
        Q.name,
        Q.address,
        Q.city,
        Q.state,
        Q.zipCode,
        Q.latitude,
        Q.longitude,
        Q.isSavedGym
      FROM (
      SELECT
        g.id,
        g.name,
        g.address,
        g.city,
        g.state,
        g.zip_code as zipCode,
        g.latitude,
        g.longitude,
        true as isSavedGym
      FROM saved_gym sg
      LEFT JOIN gym g ON sg.gym_id = g.id
      WHERE sg.user_id = ${id}
      UNION DISTINCT
      SELECT
        g.id,
        g.name,
        g.address,
        g.city,
        g.state,
        g.zip_code as zipCode,
        g.latitude,
        g.longitude,
        false as isSavedGym
      FROM gym g
      WHERE g.id NOT IN
      (SELECT
        g.id
      FROM saved_gym sg
      LEFT JOIN gym g ON sg.gym_id = g.id
      WHERE sg.user_id = ${id})) AS Q;
      `)
    ;
  }

  async saveGym(gymId: number, userId: number): Promise<void> {
    const saveGym = new SavedGym();
    saveGym.gymId = gymId;
    saveGym.userId = userId;

    await (await this.getRepository(SavedGym)).save(saveGym);
  }

  async unsaveGym(gymId: number, userId: number): Promise<void> {
    await (await this.getRepository(SavedGym)).delete({ gymId, userId });
  }
}