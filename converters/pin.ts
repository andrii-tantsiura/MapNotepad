import { IPinForm } from "../types/forms";
import { IPinModel } from "../types/models";
import { IPinItemData } from "../types/ui";

export const pinFormToPinModel = (form: IPinForm): IPinModel => ({
  id: "",
  label: form.label,
  description: form.description,
  location: {
    latitude: Number.parseFloat(form.latitude),
    longitude: Number.parseFloat(form.longitude),
  },
  isFavorite: true,
});

export const pinItemDataToPinModel = (pinUiModel: IPinItemData): IPinModel => ({
  id: pinUiModel.key,
  label: pinUiModel.label,
  description: pinUiModel.description,
  location: pinUiModel.location,
  isFavorite: pinUiModel.isFavorite,
});

export const pinModelToPinItemData = (pinUiModel: IPinModel): IPinItemData => ({
  key: pinUiModel.id,
  label: pinUiModel.label,
  description: pinUiModel.description,
  location: pinUiModel.location,
  isFavorite: pinUiModel.isFavorite,
});
