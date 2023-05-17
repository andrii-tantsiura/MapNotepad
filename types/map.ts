export interface Location {
  latitude: number;
  longitude: number;
}

export interface Pin {
  id: string;
  location: Location;
  label: string;
  description?: string;
  isFavorite?: boolean;
}
