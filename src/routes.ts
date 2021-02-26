import { Router } from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendMailController } from './controllers/SendMailController'
import { ServeysController } from './controllers/ServeysController'
import { UserController } from './controllers/UsersController'

const router = Router()

const userController = new UserController()
const surveyController = new ServeysController()

const sendMailController = new SendMailController()

const answerController = new AnswerController()

const npsController = new NpsController()

router.get('/users', userController.getAll)
router.post('/users', userController.create)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

router.post('/sendMail', sendMailController.execute)
router.delete('/surveysusers', sendMailController.deleteAll)

router.get('/answers/:value', answerController.execute)

router.get('/nps/:survey_id', npsController.execute)

export { router }