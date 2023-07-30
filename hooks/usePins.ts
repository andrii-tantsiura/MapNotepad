import { useState } from "react";
import { useSelector } from "react-redux";

import { textToKeywords } from "../helpers";
import AlertService from "../services/AlertService";
import {
  addPinAction,
  deletePinAction,
  setPinsAction,
  toggleFavoritePinStatusAction,
  updatePinAction,
} from "../store/redux/actions";
import { selectAuth, selectPins } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { IPinData, IPinDataArray } from "../types/data";
import { usePinsService } from "./usePinsService";

type UsePinsReturn = {
  pins: IPinDataArray;
  isPinsLoading: boolean;
  fetchPins: () => void;
  filterPinsBySearchQuery: (searchQuery: string) => IPinDataArray;
  getPins: (predicate?: (value: IPinData) => boolean) => IPinDataArray;
  createPin: (pin: IPinData) => Promise<boolean>;
  updatePin: (pin: IPinData) => Promise<boolean>;
  togglePinFavoriteStatus: (pin: IPinData) => void;
  deletePin: (pinId: string) => void;
};

export const usePins = (): UsePinsReturn => {
  const dispatch = useAppDispatch();

  const { credentials } = useSelector(selectAuth);
  const pins = useSelector(selectPins);
  const pinsService = usePinsService(credentials);

  const [isPinsLoading, setIsPinsLoading] = useState<boolean>(false);

  const fetchPins = async () => {
    setIsPinsLoading(true);

    const getPinsResult = await pinsService.getPins();

    setIsPinsLoading(false);

    if (getPinsResult.isSuccess && getPinsResult.data) {
      dispatch(setPinsAction(getPinsResult.data));
    } else {
      AlertService.error(getPinsResult);
    }
  };

  const filterPinsBySearchQuery = (searchQuery: string): IPinDataArray => {
    const keywords = textToKeywords(searchQuery);

    return keywords
      ? pins.filter((pin) => {
          const label = pin.label.toLowerCase();
          const description = pin.description?.toLowerCase();
          const latitude = pin.location.latitude.toString();
          const longitude = pin.location.longitude.toString();

          return keywords.some(
            (key) =>
              label.includes(key) ||
              description?.includes(key) ||
              latitude.includes(key) ||
              longitude.includes(key)
          );
        })
      : pins;
  };

  const getPins = (predicate?: (value: IPinData) => boolean): IPinDataArray =>
    predicate ? pins.filter(predicate) : pins;

  const createPin = async (pin: IPinData): Promise<boolean> => {
    const createPinResult = await pinsService.createPin(pin);

    if (createPinResult.isSuccess && createPinResult.data) {
      const newPin: IPinData = {
        ...pin,
        id: createPinResult.data,
      };

      dispatch(addPinAction(newPin));
    } else {
      AlertService.error(createPinResult);
    }

    return createPinResult.isSuccess;
  };

  const updatePin = async (pin: IPinData) => {
    const updatePinResult = await pinsService.updatePin(pin);

    if (updatePinResult.isSuccess) {
      dispatch(updatePinAction(pin));
    } else {
      AlertService.error(updatePinResult);
    }

    return updatePinResult.isSuccess;
  };

  const togglePinFavoriteStatus = async (pin: IPinData) => {
    const toggleFavoriteStatusResult =
      await pinsService.toggleFavoritePinStatus(pin);

    if (
      toggleFavoriteStatusResult.isSuccess &&
      toggleFavoriteStatusResult.data
    ) {
      dispatch(toggleFavoritePinStatusAction(pin.id));
    } else {
      AlertService.error(toggleFavoriteStatusResult);
    }
  };

  const deletePin = async (pinId: string) => {
    const deletePinResult = await pinsService.deletePin(pinId);

    if (deletePinResult.isSuccess) {
      dispatch(deletePinAction(pinId));
    } else {
      AlertService.error(deletePinResult);
    }
  };

  return {
    pins,
    isPinsLoading,
    fetchPins,
    filterPinsBySearchQuery,
    getPins,
    createPin,
    updatePin,
    togglePinFavoriteStatus,
    deletePin,
  };
};
