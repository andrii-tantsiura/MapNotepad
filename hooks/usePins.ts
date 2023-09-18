import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { IPinsService } from "../interfaces";
import AlertService from "../services/AlertService";
import { PinsService } from "../services";
import {
  addPinAction,
  deletePinAction,
  setPinsAction,
  toggleFavoritePinStatusAction,
  updatePinAction,
} from "../store/redux/actions";
import { selectAuth, selectPins } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { IPinModel, IPinModelsArray } from "../types/models";

type UsePinsReturn = {
  pins: IPinModelsArray;
  isPinsLoading: boolean;
  fetchPins: () => void;
  getPinsBySearchQuery: (searchQuery: string) => IPinModelsArray;
  createPin: (pin: IPinModel) => Promise<boolean>;
  updatePin: (pin: IPinModel) => Promise<boolean>;
  togglePinFavoriteStatus: (pin: IPinModel) => void;
  deletePin: (pinId: string) => void;
};

export const usePins = (): UsePinsReturn => {
  const dispatch = useAppDispatch();

  const { credentials } = useSelector(selectAuth);
  const pins = useSelector(selectPins);
  const pinsService: IPinsService = useMemo(
    () => new PinsService(credentials),
    [credentials]
  );

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

  const getPinsBySearchQuery = (searchQuery: string): IPinModelsArray =>
    pinsService.filterPinsBySearchQuery(pins, searchQuery);

  const createPin = async (pin: IPinModel): Promise<boolean> => {
    const createPinResult = await pinsService.createPin(pin);

    if (createPinResult.isSuccess && createPinResult.data) {
      const newPin: IPinModel = {
        ...pin,
        id: createPinResult.data,
      };

      dispatch(addPinAction(newPin));
    } else {
      AlertService.error(createPinResult);
    }

    return createPinResult.isSuccess;
  };

  const updatePin = async (pin: IPinModel) => {
    const updatePinResult = await pinsService.updatePin(pin);

    if (updatePinResult.isSuccess) {
      dispatch(updatePinAction(pin));
    } else {
      AlertService.error(updatePinResult);
    }

    return updatePinResult.isSuccess;
  };

  const togglePinFavoriteStatus = async (pin: IPinModel) => {
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
    getPinsBySearchQuery,
    createPin,
    updatePin,
    togglePinFavoriteStatus,
    deletePin,
  };
};
