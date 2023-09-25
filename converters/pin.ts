import { IPinPayload } from "../types/api/firebase";
import { ICustomMarkerModel, IPinItemModel } from "../types/components";
import { IPinForm } from "../types/forms";
import { IPinModel } from "../types/models";

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

export const pinItemModelToPinModel = (model: IPinItemModel): IPinModel => ({
  id: model.key,
  label: model.label,
  description: model.description,
  location: model.location,
  isFavorite: model.isFavorite,
});

export const pinModelToPinPayload = (model: IPinModel): IPinPayload => ({
  label: model.label,
  description: model.description,
  location: model.location,
  isFavorite: model.isFavorite,
});

export const pinModelToPinItemModel = (model: IPinModel): IPinItemModel => ({
  key: model.id,
  label: model.label,
  description: model.description,
  location: model.location,
  isFavorite: model.isFavorite,
});

export const pinModelToCustomMarkerModel = (
  model: IPinModel
): ICustomMarkerModel => ({
  key: model.id,
  label: model.label,
  description: model.description,
  location: model.location,
});

export const customMarkerModelToPinModel = (
  model: ICustomMarkerModel
): IPinModel => ({
  id: model.key,
  label: model.label,
  description: model.description,
  location: model.location,
  isFavorite: true,
});
