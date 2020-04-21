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
        g.name,
        g.address,
        g.city,
        g.state,
        g.zip_code as zipCode,
        g.latitude,
        g.longitude,
        if(u.id = ${id}, true, false) as isSavedGym
      FROM gym g
      LEFT JOIN saved_gym sg ON sg.gym_id = g.id
      LEFT JOIN user u ON sg.user_id = u.id
      `)
    ;
  }

}