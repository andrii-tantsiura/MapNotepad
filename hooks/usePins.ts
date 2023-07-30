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
import { IPin, IPins } from "../types";
import { usePinsService } from "./usePinsService";

type UsePinsReturn = {
  pins: IPins;
  isPinsLoading: boolean;
  fetchPins: () => void;
  filterPinsBySearchQuery: (searchQuery: string) => IPins;
  getPins: (predicate?: (value: IPin) => boolean) => IPins;
  createPin: (pin: IPin) => Promise<boolean>;
  updatePin: (pin: IPin) => Promise<boolean>;
  togglePinFavoriteStatus: (pin: IPin) => void;
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

  const filterPinsBySearchQuery = (searchQuery: string): IPins => {
    const keysWords = textToKeywords(searchQuery);

    return keysWords
      ? pins.filter((pin) => {
          const label = pin.label.toLowerCase();
          const description = pin.description?.toLowerCase();
          const latitude = pin.location.latitude.toString();
          const longitude = pin.location.longitude.toString();

          return keysWords.some(
            (key) =>
              label.includes(key) ||
              description?.includes(key) ||
              latitude.includes(key) ||
              longitude.includes(key)
          );
        })
      : pins;
  };

  const getPins = (predicate?: (value: IPin) => boolean): IPins =>
    predicate ? pins.filter(predicate) : pins;

  const createPin = async (pin: IPin): Promise<boolean> => {
    const createPinResult = await pinsService.createPin(pin);

    if (createPinResult.isSuccess && createPinResult.data) {
      const newPin: IPin = {
        ...pin,
        id: createPinResult.data,
      };

      dispatch(addPinAction(newPin));
    } else {
      AlertService.error(createPinResult);
    }

    return createPinResult.isSuccess;
  };

  const updatePin = async (pin: IPin) => {
    const updatePinResult = await pinsService.updatePin(pin);

    if (updatePinResult.isSuccess) {
      dispatch(updatePinAction(pin));
    } else {
      AlertService.error(updatePinResult);
    }

    return updatePinResult.isSuccess;
  };

  const togglePinFavoriteStatus = async (pin: IPin) => {
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
