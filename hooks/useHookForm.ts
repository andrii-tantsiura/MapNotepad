import { UseFormProps, UseFormReturn, useForm } from "react-hook-form";

import { IFormController } from "../components/common";
import { IBaseForm } from "../types";

type UseHookFormReturn<T extends IBaseForm> = {
  formController: IFormController;
} & Omit<UseFormReturn<T>, "control" | "resetField" | "trigger">;

export const useHookForm = <T extends IBaseForm>(
  props?: UseFormProps<T>
): UseHookFormReturn<T> => {
  const { control, trigger, resetField, ...rest } = useForm<T>(props);

  const formController: IFormController = {
    control,
    resetField,
    trigger,
  };

  return {
    formController,
    ...rest,
  };
};
