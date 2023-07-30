import { IPinForm } from "../types/forms";
import { IPinModel } from "../types/models";
import { IPinItemViewModel } from "../types/viewModels";

export const pinFormToModel = (form: IPinForm): IPinModel => ({
  id: "",
  label: form.label,
  description: form.description,
  location: {
    latitude: Number.parseFloat(form.latitude),
    longitude: Number.parseFloat(form.longitude),
  },
  isFavorite: true,
});

export const pinItemViewModelToModel = (
  pinItemViewModel: IPinItemViewModel
): IPinModel => ({
  id: pinItemViewModel.key,
  label: pinItemViewModel.label,
  description: pinItemViewModel.description,
  location: pinItemViewModel.location,
  isFavorite: pinItemViewModel.isFavorite,
});

export const pinModelToViewModel = (
  pinModel: IPinModel
): IPinItemViewModel => ({
  key: pinModel.id,
  label: pinModel.label,
  description: pinModel.description,
  location: pinModel.location,
  isFavorite: pinModel.isFavorite,
});
