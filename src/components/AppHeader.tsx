import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../constants/theme";

type AppHeaderProps = {
  title: string;
  centered?: boolean;
};

export function AppHeader({ title, centered = false }: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      <Text style={[styles.title, centered && styles.centeredTitle]}>
        {title}
      </Text>

      {centered && <View style={styles.placeholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    width: 44,
  },
  menuIcon: {
    color: colors.text,
    fontSize: 32,
  },
  title: {
    color: colors.text,
    ...typography.screenTitle,
  },
  centeredTitle: {
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 44,
  },
});