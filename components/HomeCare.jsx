import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomecareServices() {
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    { id: '1', name: 'Nursing' },
    { id: '2', name: 'Physiotherapy' },
    { id: '3', name: 'Elderly Care' },
  ];

  const validateMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const validateInputs = () => {
    const newErrors = {};
    if (!selectedService) newErrors.service = 'Please select a service.';
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!contact.trim()) {
      newErrors.contact = 'Contact number is required.';
    } else if (!validateMobileNumber(contact)) {
      newErrors.contact = 'Please enter a valid 10-digit mobile number.';
    }
    return newErrors;
  };

  const handleRequestSubmit = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setRequestSent(true);
      setTimeout(() => setRequestSent(false), 3000);
      setSelectedService(null);
      setName('');
      setContact('');
      setNotes('');
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceItem,
        selectedService === item.name && styles.selectedService,
      ]}
      onPress={() => {
        setSelectedService(item.name);
        setErrors((prev) => ({ ...prev, service: '' }));
      }}
    >
      <Text style={styles.serviceText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Homecare Services</Text>

      <Text style={styles.sectionHeader}>Available Services</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.serviceList}
      />
      {errors.service && <Text style={styles.errorText}>{errors.service}</Text>}

      <Text style={styles.sectionHeader}>Request a Service</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors((prev) => ({ ...prev, name: '' }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={(text) => {
          setContact(text);
          setErrors((prev) => ({ ...prev, contact: '' }));
        }}
      />
      {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Additional Notes (Optional)"
        placeholderTextColor="#aaa"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleRequestSubmit}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>

      {requestSent && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Request Sent Successfully!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  serviceList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  serviceItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  selectedService: {
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  serviceText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    shadowColor: '#000',
  },
  notesInput: {
    textAlignVertical: 'top',
    height: 100,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: '#e0f7e9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#4caf50',
    borderWidth: 1,
    shadowColor: '#000',
  },
  successText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
