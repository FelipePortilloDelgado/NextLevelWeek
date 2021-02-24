import { Router } from 'express'
import { ServeysController } from './controllers/ServeysController'
import { UserController } from './controllers/UsersController'

const router = Router()

const userController = new UserController()
const surveyController = new ServeysController()

router.post('/users', userController.create)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

export { router }