import { IconButton } from "../../common";

const LEFT_BLUE = require("../../../assets/icons/ic_left_blue.png");

interface IBackButtonProps {
  onPress?: () => void;
}

export const BackButton: React.FC<IBackButtonProps> = ({ onPress }) => (
  <IconButton style={{ marginLeft: 8 }} source={LEFT_BLUE} onPress={onPress} />
);
