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
    return this.gymRepository.getAllGyms(id);
  }

  @Post('/save-gym')
  async saveGym(@Body() payload: { gymId: number, userId: number }): Promise<string> {
    this.gymRepository.saveGym(payload.gymId, payload.userId);

    return 'Gym saved successfully.';
  }

  @Post('/unsave-gym')
  async unsaveGym(@Body() payload: { gymId: number, userId: number }): Promise<string> {
    this.gymRepository.unsaveGym(payload.gymId, payload.userId);

    return 'Gym unsaved successfully.';
  }
}
