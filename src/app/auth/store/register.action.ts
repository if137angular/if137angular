// import { createAction, props } from '@ngrx/store';
import { RegisterRequstInterface } from '../models/registerRequst.interface';
import { ActionType } from './actionType';

// export const register = createAction(ActionType.REGISTER
  
// )

export class RegisterAction {
  static readonly type = ActionType.REGISTER;
  constructor(
    public userData: RegisterRequstInterface
  ) {}
}