import { IPinData } from "../types/data";
import { IPinForm } from "../types/forms";
import { IPinItemData } from "../types/ui";

export const pinFormToPinData = (form: IPinForm): IPinData => ({
  id: "",
  label: form.label,
  description: form.description,
  location: {
    latitude: Number.parseFloat(form.latitude),
    longitude: Number.parseFloat(form.longitude),
  },
  isFavorite: true,
});

export const pinItemToPinData = (pinUiModel: IPinItemData): IPinData => ({
  id: pinUiModel.key,
  label: pinUiModel.label,
  description: pinUiModel.description,
  location: pinUiModel.location,
  isFavorite: pinUiModel.isFavorite,
});

export const pinDataToPinItem = (pinUiModel: IPinData): IPinItemData => ({
  key: pinUiModel.id,
  label: pinUiModel.label,
  description: pinUiModel.description,
  location: pinUiModel.location,
  isFavorite: pinUiModel.isFavorite,
});
