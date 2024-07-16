import {
  CaseFinish,
  CaseColor,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export type ConfigImageType = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};
