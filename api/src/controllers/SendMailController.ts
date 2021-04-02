import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { Request, Response } from 'express';

class SendMailController {
	async execute(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

		const user = await usersRepository.findOne({ email });

		if (!user) {
			return response.status(400).json({
				error: 'User does not exist',
			});
		}

		const survey = await surveysRepository.findOne({
			id: survey_id,
		});

		if (!survey) {
			return response.status(400).json({
				error: 'Survey does not exist',
			});
		}

		const surveyUser = surveysUsersRepository.create({
			user_id: user.id,
			survey_id: survey.id,
		});

		await surveysUsersRepository.save(surveyUser);

		return response.json(surveyUser);
	}
}

export { SendMailController };
