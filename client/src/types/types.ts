import { ValidatySchema } from "../utils/validateUtils";

export type ValidatySchemaGroup = {
  emailValidityCheck: ValidatySchema[];
  passwordValidityCheck: ValidatySchema[];
  passwordDoubleValidityCheck?: ValidatySchema[];
};
