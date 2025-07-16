import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { getRecipes, saveRecipes } from '../utils/storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const isFocused = useIsFocused();
  const theme = useColorScheme();

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const loadData = async () => {
    const data = await getRecipes();
    setRecipes(data || []);
  };

  const handleDelete = async (id) => {
    const updated = recipes.filter(r => r.id !== id);
    setRecipes(updated);
    await saveRecipes(updated);
  };

  const filteredRecipes = recipes.filter(r =>
    r.ingredients.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.container,
          theme === 'dark' && { backgroundColor: 'rgba(18, 18, 18, 0.85)' },
        ]}
      >
        <TextInput
          style={[
            styles.search,
            theme === 'dark' && {
              backgroundColor: '#2c2c2c',
              color: '#fff',
              borderColor: '#444',
            },
          ]}
          placeholder="🔍 Search by ingredient..."
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEdit')}
        >
          <Text style={styles.addButtonText}>➕ Add New Recipe</Text>
        </TouchableOpacity>

        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onDelete={handleDelete}
              onEdit={() => navigation.navigate('AddEdit', { recipe: item })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', // fallback on light mode
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
