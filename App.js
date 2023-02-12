import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Image } from 'react-native';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://images-endpoint.herokuapp.com/generate_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt,
        }),
      });

      const result = await response.json();
      setImageUrl(result.image_url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.promptInput}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter a prompt"
      />
      <Button title="Generate Image" onPress={handleSubmit} />
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptInput: {
    width: '80%',
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default App;