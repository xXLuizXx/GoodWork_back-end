import { Request, Response } from "express";
import { ProfileUserUseCase } from "./ProfileUserUseCase";
import { container } from "tsyringe";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);
    const user = await profileUserUseCase.execute({ id });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json(user);
  }

  async updateDataProfileUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { road, number, neighborhood, telephone, functionn, ability, is_employee, user_type, business_area,...rest } = request.body;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    try {
      const updatedUser = await profileUserUseCase.updateProfile({
        id,
        road,
        number,
        neighborhood,
        telephone,
        functionn,
        ability,
        is_employee,
        business_area,
        ...rest,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { ProfileUserController };
