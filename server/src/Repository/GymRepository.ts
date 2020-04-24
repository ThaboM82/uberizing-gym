import { Service } from "typedi";
import { IGymRepository } from "../Interface/IGymRepository";
import { Gym } from "../Entity";
import { getDBManager } from "../Config";

@Service()
export class GymRepository implements IGymRepository {
  async getAllGyms(id?: number): Promise<Gym[]> {
    return await (await getDBManager())
      .query(`
      SELECT
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

}