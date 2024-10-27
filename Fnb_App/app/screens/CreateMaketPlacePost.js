import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { db, storage } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreatePostScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `marketplace/${filename}`);

    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const handlePostSubmit = async () => {
    if (name && description && contactEmail && image) {
      const imageUrl = await uploadImage(image);
      await addDoc(collection(db, 'marketplace'), {
        name,
        description,
        contactEmail,
        image: imageUrl,
      });
      alert('Post created successfully!');
      // Reset the form or navigate back
      setName('');
      setDescription('');
      setContactEmail('');
      setImage(null);
    } else {
      alert('Please fill in all fields and select an image.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4} // You can adjust this value as needed
          textAlignVertical="top" // Ensures text starts from the top
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Email"
          value={contactEmail}
          onChangeText={setContactEmail}
          keyboardType="email-address"
        />
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handlePostSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  input: {
    
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#1d61e7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#1d61e7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;
