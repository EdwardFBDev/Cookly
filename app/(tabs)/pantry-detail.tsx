import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * PantryScreen
 *
 * Pantalla principal del tab Despensa.
 * Muestra una vista inicial de la despensa del usuario.
 */
export default function PantryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>

      {/* Link usado para navegar hacia la pantalla de detalle. */}
      <Link href="/pantry-detail" style={styles.link}>
        Ver detalle de alimento
      </Link>
    </View>
  );
}

/**
 * Estilos locales de la pantalla.
 * Se mantienen aquí porque esta vista todavía es simple.
 * Más adelante pueden moverse a un tema global reutilizable.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0E0E0E",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  link: {
    color: "#FFA726",
    fontSize: 18,
  },
});