import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { IPinsService } from "../interfaces";
import { PinsService } from "../services";
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
import { IPinModel } from "../types/models";

type UsePinsReturn = {
  pins: Array<IPinModel>;
  isPinsLoading: boolean;
  fetchPins: () => void;
  getPinsBySearchQuery: (searchQuery: string) => Array<IPinModel>;
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

    const result = await pinsService.getPins();

    setIsPinsLoading(false);

    if (result.isSuccess && result.data) {
      dispatch(setPinsAction(result.data));
    } else {
      AlertService.error(result.getMessage());
    }
  };

  const getPinsBySearchQuery = (searchQuery: string): Array<IPinModel> =>
    pinsService.filterPinsBySearchQuery(pins, searchQuery);

  const createPin = async (pin: IPinModel): Promise<boolean> => {
    const result = await pinsService.createPin(pin);

    if (result.isSuccess && result.data) {
      const newPin: IPinModel = {
        ...pin,
        id: result.data,
      };

      dispatch(addPinAction(newPin));
    } else {
      AlertService.error(result.getMessage());
    }

    return result.isSuccess;
  };

  const updatePin = async (pin: IPinModel) => {
    const result = await pinsService.updatePin(pin);

    if (result.isSuccess) {
      dispatch(updatePinAction(pin));
    } else {
      AlertService.error(result.getMessage());
    }

    return result.isSuccess;
  };

  const togglePinFavoriteStatus = async (pin: IPinModel) => {
    const result = await pinsService.toggleFavoritePinStatus(pin);

    if (result.isSuccess) {
      dispatch(toggleFavoritePinStatusAction(pin.id));
    } else {
      AlertService.error(result.getMessage());
    }
  };

  const deletePin = async (pinId: string) => {
    const result = await pinsService.deletePin(pinId);

    if (result.isSuccess) {
      dispatch(deletePinAction(pinId));
    } else {
      AlertService.error(result.getMessage());
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
