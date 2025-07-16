import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function RecipeCard({ recipe, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      {recipe.imageUri && <Image source={{ uri: recipe.imageUri }} style={styles.image} />}
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.category}>🍽 {recipe.category}</Text>
      <Text>{recipe.ingredients}</Text>
      <View style={styles.row}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" color="red" onPress={() => onDelete(recipe.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 16, marginVertical: 8, borderRadius: 12, elevation: 3 },
  title: { fontSize: 18, fontWeight: 'bold' },
  category: { marginBottom: 8, fontStyle: 'italic' },
  image: { width: '100%', height: 150, borderRadius: 10, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});