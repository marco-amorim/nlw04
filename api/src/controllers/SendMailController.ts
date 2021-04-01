import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { Request, Response } from 'express';

class SendMailController {
	async sendEmail(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

		const userAlreadyExists = await usersRepository.findOne({ email });

		if (!userAlreadyExists) {
			return response.status(400).json({
				error: 'User does not exist',
			});
		}

		const surveyAlreadyExists = await surveysRepository.findOne({
			id: survey_id,
		});

		if (!surveyAlreadyExists) {
			return response.status(400).json({
				error: 'Survey does not exist',
			});
		}
	}
}

export { SendMailController };
