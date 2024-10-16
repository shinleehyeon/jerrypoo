import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const tileSize = width / 2;
const imageAssets = [
  require('../assets/jerry.jpg'),
  require('../assets/jerry1.jpg'),
  require('../assets/jerry2.jpg'),
  require('../assets/jerry3.jpg'),
];

const PuzzleGame = () => {
  const [tiles, setTiles] = useState([0, 1, 2, 3]); 
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    createPuzzle();
  }, []);

  const createPuzzle = () => {
    const tileList = [0, 1, 2, 3];
    shuffle(tileList);
    setTiles(tileList);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const checkIfPuzzleComplete = () => {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== i) {
        return false; 
      }
    }
    return true;
  };

  const handleButtonPress = () => {
    if (checkIfPuzzleComplete()) {
      setLoading(true);
      setTimeout(() => {
        navigation.navigate('poo'); 
      }, 1000);
    } else {
      createPuzzle(); 
    }
  };

  useEffect(() => {
    if (checkIfPuzzleComplete()) {
      console.log("제리얌 만들기 완성!");
    }
  }, [tiles]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이런 반찬 안 먹찬</Text>
      <View style={styles.puzzleContainer}>
        {tiles.map((tile, index) => (
          <View key={index} style={[styles.tile, { width: tileSize, height: tileSize }]}>
            <Image source={imageAssets[tile]} style={{ width: tileSize, height: tileSize }} />
          </View>
        ))}
      </View>
      {loading && <ActivityIndicator size="large" color="#3498db" />}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>잘먹찬
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  puzzleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: tileSize * 2,
    height: tileSize * 2,
  },
  tile: {
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 100,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PuzzleGame;