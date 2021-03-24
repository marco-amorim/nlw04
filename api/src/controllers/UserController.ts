import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
	async create(request: Request, response: Response) {
		const { name, email } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);

		const userAlreadyExists = await usersRepository.findOne({
			email,
		});

		if (userAlreadyExists) {
			return response.status(409).json({
				error: 'User already exists!',
			});
		}

		const user = usersRepository.create({
			name,
			email,
		});

		await usersRepository.save(user);

		response.json(user);
	}
}

export { UserController };
