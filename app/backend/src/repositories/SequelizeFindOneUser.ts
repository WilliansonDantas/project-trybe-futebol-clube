import IUser from '../interfaces/IUser';
import { ILoginRepository } from '../services/LoginService';
import Users from '../database/models/Users';

export default class SequelizeFindOneUser implements ILoginRepository {
  private _users = Users;
  async findOne(email: string): Promise<IUser | null> {
    const data = await this._users.findOne({ where: { email } });
    return data;
  }
}
