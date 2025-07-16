import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import RecipeForm from '../components/RecipeForm';
import { getRecipes, saveRecipes } from '../utils/storage';
import uuid from 'react-native-uuid';

export default function AddEditScreen({ route, navigation }) {
  const editingRecipe = route.params?.recipe;

  const [title, setTitle] = useState(editingRecipe?.title || '');
  const [ingredients, setIngredients] = useState(editingRecipe?.ingredients || '');
  const [category, setCategory] = useState(editingRecipe?.category || '');
  const [imageUri, setImageUri] = useState(editingRecipe?.imageUri || '');

  const handleSave = async () => {
    const existing = await getRecipes() || [];

    let updated;
    if (editingRecipe) {
      updated = existing.map(r =>
        r.id === editingRecipe.id ? { ...editingRecipe, title, ingredients, category, imageUri } : r
      );
    } else {
      updated = [...existing, { id: uuid.v4(), title, ingredients, category, imageUri }];
    }

    await saveRecipes(updated);
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <RecipeForm
          title={title}
          setTitle={setTitle}
          ingredients={ingredients}
          setIngredients={setIngredients}
          category={category}
          setCategory={setCategory}
          imageUri={imageUri}
          setImageUri={setImageUri}
          onSave={handleSave}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)', // Light theme overlay
  },
});
