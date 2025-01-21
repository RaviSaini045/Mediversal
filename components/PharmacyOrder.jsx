import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const medicines = [
  { id: '1', name: 'Paracetamol', price: 10 },
  { id: '2', name: 'Aspirin', price: 15 },
  { id: '3', name: 'Ibuprofen', price: 20 },
];

export default function PharmacyOrder() {
  const [cart, setCart] = useState([]);
  const [orderSummary, setOrderSummary] = useState({ totalItems: 0, totalPrice: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      updateOrderSummary(updatedCart);
    } else {
      const updatedCart = [...cart, { ...medicine, quantity: 1 }];
      setCart(updatedCart);
      updateOrderSummary(updatedCart);
    }
  };

  const removeFromCart = (medicineId) => {
    const updatedCart = cart.filter(item => item.id !== medicineId);
    setCart(updatedCart);
    updateOrderSummary(updatedCart);
  };

  const updateOrderSummary = (updatedCart) => {
    const totalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setOrderSummary({ totalItems, totalPrice });
  };

  const updateQuantity = (medicineId, change) => {
    const updatedCart = cart.map(item =>
      item.id === medicineId
        ? { ...item, quantity: item.quantity + change }
        : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
    updateOrderSummary(updatedCart);
  };

  const renderMedicineItem = ({ item }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicinePrice}>₹ {item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicinePrice}>₹ {item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => updateQuantity(item.id, -1)}
      >
        <Text style={styles.buttonText}>Remove 1</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Pharmacy Order</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Medicines"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicineItem}
        style={styles.medicineList}
      />

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Your Cart</Text>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            style={styles.cartList}
          />
        ) : (
          <Text style={styles.noItemsText}>No items in the cart</Text>
        )}
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryText}>Total Items: {orderSummary.totalItems}</Text>
        <Text style={styles.summaryText}>Total Price: ₹ {orderSummary.totalPrice}</Text>
      </View>

      <Button 
        title="Place Order" 
        onPress={() => {
            if (cart.length === 0) {
            alert('No items in the cart');
            } else {
            alert('Order Placed!');
            }
        }} 
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2980b9',
    fontSize: 16,
  },
  medicineList: {
    marginBottom: 20,
  },
  medicineItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: '#2980b9',
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  medicinePrice: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cartContainer: {
    marginTop: 30,
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: '#2980b9',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  noItemsText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  orderSummary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: '#2980b9',
  },
  summaryText: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 5,
  },
});
