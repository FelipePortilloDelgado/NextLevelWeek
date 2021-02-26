import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/ServeysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'
import { AppError } from '../errors/AppError'

class SendMailController {
    async deleteAll(req: Request, res: Response){
        const surveysUsersRerpository = getCustomRepository(SurveysUsersRepository)
        await surveysUsersRerpository.delete({})
        res.json({message: 'Deleted records'})
    }

    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRerpository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email })

        if (!user) {
            throw new AppError('User does not exists')
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            throw new AppError('Survey does not exists')
        }

        const surveyUserAlreadyExists = await surveysUsersRerpository.findOne({
            where: {user_id: user.id, value: null},
            //where: [{user_id: user.id}, {value: null}],
            relations: ['user', 'survey']
        })

        const npsPath = resolve(__dirname, '../', 'views', 'emails', 'npsMail.hbs')
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return res.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRerpository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRerpository.save(surveyUser)

        variables.id = surveyUser.id

        await SendMailService.execute(email, survey.title, variables, npsPath)

        return res.json(surveyUser)
    }
}

export { SendMailController }