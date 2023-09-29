import React, { FC } from "react";
import { FlatList } from "react-native-gesture-handler";

import { SwitchOption } from "../SwitchOption";

interface IOption<T> {
  title: string;
  value: T;
}

export interface IOptions<T> extends Array<IOption<T>> {}

interface IToggleOptionPickerProps<T> {
  items: IOptions<T>;
  value: T;
  onValueChanged: (value: T) => void;
}

export const ToggleOptionPicker: FC<IToggleOptionPickerProps<any>> = ({
  items,
  value,
  onValueChanged,
}) => (
  <FlatList
    data={items}
    key={value.toString()}
    renderItem={({ item }) => (
      <SwitchOption
        title={item.title}
        isActive={item.value === value}
        onValueChanged={() => onValueChanged(item.value)}
      />
    )}
  />
);
