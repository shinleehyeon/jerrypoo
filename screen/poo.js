import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator, ImageBackground, Modal, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const tileSize = width / 2;
const imageAssets = [
  require('../assets/tea.jpg'),
  require('../assets/tea1.jpg'),
  require('../assets/tea2.jpg'),
  require('../assets/tea3.jpg'),
];

const Poo = () => {
  const [tiles, setTiles] = useState([0, 1, 2, 3]); 
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [scaleAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    createPuzzle();
  }, []);

  const createPuzzle = () => {
    const tileList = [0, 1, 2, 3];
    shuffle(tileList); 
    setTiles(tileList);
    setModalVisible(false); 
    setLoading(false); 
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }).start(() => {
        setModalVisible(true); 
      });
    } else {
      createPuzzle();
    }
  };

  const handleModalClose = () => {
    setModalVisible(false); 
  };

  return (
    <ImageBackground 
      source={require('../assets/jerry.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>퍼즐 완료! 다음 퍼즐을 맞춰보세요!</Text>
        <View style={styles.puzzleContainer}>
          {tiles.map((tile, index) => (
            <View key={index} style={[styles.tile, { width: tileSize, height: tileSize }]}>
              <Image source={imageAssets[tile]} style={{ width: tileSize, height: tileSize }} />
            </View>
          ))}
        </View>
        {loading && <ActivityIndicator size="large" color="#3498db" />}
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>돌리기</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>🎉성공! 제리얌,태권히어로와 결혼하세요!🎉</Text>
              <TouchableOpacity onPress={handleModalClose} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Animated.View style={[styles.celebration, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.celebrationText}>🎉</Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  celebration: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40, 
    marginTop: -40, 
  },
  celebrationText: {
    fontSize: 80,
    color: '#FFD700', 
  },
});

export default Poo;
