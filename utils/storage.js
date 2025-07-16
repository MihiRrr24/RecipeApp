import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'RECIPES';

export const getRecipes = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecipes = async (recipes) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};