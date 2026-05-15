import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../constants/theme";

type RecipeCardProps = {
  image: string;
  title: string;
  match: string;
  time: string;
};

export function RecipeCard({ image, title, match, time }: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Text style={styles.image}>{image}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.match}>{match}</Text>

        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.time}>{time} min</Text>
        </View>
      </View>

      <Ionicons name="heart-outline" size={24} color={colors.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 104,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    overflow: "hidden",
    padding: 10,
  },
  imageBox: {
    width: 130,
    height: "100%",
    backgroundColor: colors.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    fontSize: 54,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  match: {
    color: colors.success,
    fontSize: 13,
    marginTop: 8,
    fontWeight: "600",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 4,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
  },
});