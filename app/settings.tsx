import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../src/components/AppScreen";
import { AppHeader } from "../src/components/AppHeader";
import { colors } from "../src/constants/theme";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.drawerButton}
        >
        </Pressable>

        <AppHeader title="Configuración" centered />

        <Text style={styles.sectionTitle}>Preferencias</Text>

        <SettingRow icon="moon-outline" label="Tema" value="Oscuro" />
        <SettingRow icon="options-outline" label="Unidades" value="Métrico" />
        <SettingRow
          icon="notifications-outline"
          label="Recordatorios"
          value="Próximamente"
        />

        <Text style={styles.sectionTitle}>Información</Text>

        <SettingRow icon="information-circle-outline" label="Acerca de Cookly" />
        <SettingRow icon="help-circle-outline" label="Ayuda y soporte" />
        <SettingRow icon="document-text-outline" label="Términos y condiciones" />

        <Text style={styles.version}>Versión 1.0.0</Text>
      </ScrollView>
    </AppScreen>
  );
}

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
};

function SettingRow({ icon, label, value }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={colors.textMuted} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.right}>
        {value && <Text style={styles.value}>{value}</Text>}
        <Ionicons name="chevron-forward-outline" size={18} color={colors.textMuted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    marginTop: 12,
    marginBottom: 8,
    width: 44,
  },
  drawerIcon: {
    color: colors.text,
    fontSize: 32,
  },
  header: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 28,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  value: {
    color: colors.textMuted,
    fontSize: 14,
  },
  version: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 34,
    fontSize: 13,
  },
});