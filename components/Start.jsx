import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useReducer } from 'react';

export default function Start() {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('./../assets/images/LoginBack.jpg')}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Mediverse Hospital</Text>
        <Text style={styles.description}>
          Your health, our priority. Experience the best medical care with a human touch. Mediverse offers personalized treatments and advanced medical solutions.
        </Text>

        <TouchableOpacity style={{alignItems:'center',alignContent:'center'}} onPress={() => navigation.navigate('Login')}>
            <View style={styles.button}>
                 <Text style={styles.buttonText}>Get Started</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
    flex: 1,
    boxShadow:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 30,
    marginTop:25
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width:'80%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
