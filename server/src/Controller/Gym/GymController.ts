import { JsonController, Get, Param } from "routing-controllers";
import { IGymRepository } from "../../Interface/IGymRepository";
import Container from "typedi";
import { GymRepository } from "../../Repository";
import { Gym } from "../../Entity";

@JsonController()
export class GymController {
  private gymRepository: IGymRepository;

  constructor() {
    this.gymRepository = Container.get(GymRepository);
  }

  @Get('/all-gyms/:id')
  async getAllGyms(@Param('id') id?: number): Promise<Gym[]> {
    return this.gymRepository.getAllGyms(id);
  }
}
