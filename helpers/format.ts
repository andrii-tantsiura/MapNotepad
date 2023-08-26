import { LatLng } from "react-native-maps";

export const formatCoordinate = ({ latitude, longitude }: LatLng) =>
  latitude.toFixed(8) + ", " + longitude.toFixed(8);
