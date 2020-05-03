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

  @Get('/saved-gyms/:id')
  async getAllSavedGyms(@Param('id') id?: number): Promise<Gym[]> {
    const gyms = await this.gymRepository.getAllGyms(id);
    return gyms?.filter(gym => gym.isSavedGym == 1);
  }

  @Get('/unsaved-gyms/:id')
  async getAllUnsavedGyms(@Param('id') id?: number): Promise<Gym[]> {
    const gyms = await this.gymRepository.getAllGyms(id);
    return gyms?.filter(gym => gym.isSavedGym != 1);
  }

  @Post('/search-gyms/:id')
  async searchGyms(@Param('id') id?: number, @Body() payload?: { keyword?: string, location?: string }): Promise<Gym[]> {
    const allGyms = await this.gymRepository.getAllGyms(id);
    return allGyms?.filter(gym =>
      gym.name.match(payload?.keyword?.[0]?.toUpperCase()) && !payload?.location ||
      gym.city.match(payload?.location?.[0]?.toUpperCase()) && !payload?.keyword ||
      gym.state.match(payload?.location?.[0]?.toUpperCase()) && !payload?.keyword ||
      gym.zipCode.match(payload?.location) && !payload?.keyword ||
      gym.name.match(payload?.keyword?.[0]?.toUpperCase()) && gym.city.match(payload?.location?.[0]?.toUpperCase()) ||
      gym.name.match(payload?.keyword?.[0]?.toUpperCase()) && gym.state.match(payload?.location?.[0]?.toUpperCase()) ||
      gym.name.match(payload?.keyword?.[0]?.toUpperCase()) && gym.zipCode.match(payload?.location)
    );
  }
}
