import { Ionicons } from "@expo/vector-icons";

type BottomTabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

export function BottomTabIcon({
  name,
  color,
  size,
}: BottomTabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}