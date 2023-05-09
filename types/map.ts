export interface Location {
  latitude: number;
  longitude: number;
}

export interface Pin {
  id: number;
  location: Location;
  label: string;
  description?: string;
  isFavorite?: boolean;
}
