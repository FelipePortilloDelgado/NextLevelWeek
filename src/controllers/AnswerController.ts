import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/**
 * http://localhost:3333/answers/1/?u=c7abd832-6bb7-4680-be70-a5531f3229ff
 */

class AnswerController {

    async execute(req: Request, res: Response){
        const { value } = req.params
        const { u } = req.query

        const surveysUsersRerpository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRerpository.findOne({
            id: String(u)
        })

        if(!surveyUser){
            throw new AppError('Survey User does not existx!')
        }

        surveyUser.value = Number(value);

        await surveysUsersRerpository.save(surveyUser)

        return res.status(200).json(surveyUser)
    }

}

export { AnswerController }