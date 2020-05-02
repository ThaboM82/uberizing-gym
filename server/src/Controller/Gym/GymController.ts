import { JsonController, Get, Param, Post, Body } from "routing-controllers";
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
    return await this.gymRepository.getAllGyms(id);
  }

  @Post('/save-gym')
  async saveGym(@Body() payload: { gymId: number, userId: number }): Promise<Gym[]> {
    await this.gymRepository.saveGym(payload.gymId, payload.userId);

    return  await this.gymRepository.getAllGyms(payload.userId);
  }

  @Post('/unsave-gym')
  async unsaveGym(@Body() payload: { gymId: number, userId: number }): Promise<Gym[]> {
    await this.gymRepository.unsaveGym(payload.gymId, payload.userId);

    return  await this.gymRepository.getAllGyms(payload.userId);
  }
}
