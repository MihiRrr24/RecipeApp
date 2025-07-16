import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  useColorScheme,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function RecipeForm({
  title,
  setTitle,
  ingredients,
  setIngredients,
  category,
  setCategory,
  imageUri,
  setImageUri,
  onSave,
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Denied',
          'You need to grant media library permission to pick an image.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDark && { backgroundColor: '#121212' },
      ]}
    >
      <Text style={[styles.label, isDark && styles.darkLabel]}>🍲 Recipe Title</Text>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, isDark && styles.darkInput]}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />

      <Text style={[styles.label, isDark && styles.darkLabel]}>📝 Ingredients</Text>
      <TextInput
        placeholder="List ingredients..."
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        style={[
          styles.input,
          { height: 100 },
          isDark && styles.darkInput,
        ]}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />

      <Text style={[styles.label, isDark && styles.darkLabel]}>🍽️ Category</Text>
      <View style={[styles.pickerWrapper, isDark && styles.darkPickerWrapper]}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={[styles.picker, isDark && { color: '#fff' }]}
          dropdownIconColor={isDark ? '#fff' : '#000'}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Veg" value="Veg" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Non-Veg" value="Non-Veg" />
        </Picker>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>
          📸 {imageUri ? 'Change Image' : 'Pick Image'}
        </Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <View style={styles.saveButton}>
        <Button title="💾 Save Recipe" onPress={onSave} color="#28a745" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  darkLabel: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderColor: '#444',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  darkPickerWrapper: {
    backgroundColor: '#2c2c2c',
    borderColor: '#444',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  imageButton: {
    marginBottom: 20,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  saveButton: {
    marginTop: 10,
  },
});
