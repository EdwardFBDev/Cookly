import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../constants/theme";

type PrimaryButtonProps = {
  title: string;
};

export function PrimaryButton({ title }: PrimaryButtonProps) {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>＋ {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    color: "#111111",
    fontWeight: "900",
  },
});