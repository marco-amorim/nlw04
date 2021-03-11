import { Request, Response } from 'express';

class UserController {
	async create(req: Request, res: Response) {
		const body = req.body;

		console.log(body);

		res.send('created');
	}
}

export { UserController };
