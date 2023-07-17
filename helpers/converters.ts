import { IPin, IPinForm } from "../types";

export const pinFormToPin = ({
  label,
  description,
  latitude,
  longitude,
}: IPinForm): IPin => ({
  id: "",
  label,
  description,
  location: {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  },
  isFavorite: true,
});
