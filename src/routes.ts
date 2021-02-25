import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController'
import { ServeysController } from './controllers/ServeysController'
import { UserController } from './controllers/UsersController'

const router = Router()

const userController = new UserController()
const surveyController = new ServeysController()

const sendMailController = new SendMailController()

router.post('/users', userController.create)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

router.post('/sendMail', sendMailController.execute)
router.delete('/surveysusers', sendMailController.deleteAll)

export { router }