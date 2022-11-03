import IUser from '../interfaces/IUser';

export interface ILoginRepository {
  findOne(email: string): Promise< IUser | null >
}

export default class LoginService {
  private _repository;

  constructor(repository: ILoginRepository) {
    this._repository = repository;
  }

  async findOneUser(email: string) {
    const user = await this._repository.findOne(email);
    return user;
  }
}
