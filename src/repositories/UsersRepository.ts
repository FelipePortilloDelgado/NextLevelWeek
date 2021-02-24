import { EntityRepository, Repository } from "typeorm";
import {User as ttt} from '../models/User'

@EntityRepository(ttt)
class UsersRepository extends Repository<ttt> {

}

export { UsersRepository }