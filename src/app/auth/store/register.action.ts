import { RegisterRequstInterface } from '../models/registerRequst.interface';
import { ActionType } from './actionType';

export class RegisterAction {
  static readonly type = ActionType.REGISTER;
  constructor(
    public userData: RegisterRequstInterface
  ) {}
}