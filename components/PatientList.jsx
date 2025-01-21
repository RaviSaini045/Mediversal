import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

const patients = [
  { id: '1', name: 'Rajesh Kumar', age: 30, gender: 'Male', condition: 'Flu' },
  { id: '2', name: 'Priya Sharma', age: 25, gender: 'Female', condition: 'Cold' },
  { id: '3', name: 'Amit Verma', age: 40, gender: 'Male', condition: 'Cough' },
  { id: '4', name: 'Sita Rani', age: 35, gender: 'Female', condition: 'Fever' },
  { id: '5', name: 'Vikas Singh', age: 28, gender: 'Male', condition: 'Headache' },
  { id: '6', name: 'Anjali Patel', age: 32, gender: 'Female', condition: 'Stomach Ache' },
  { id: '7', name: 'Suresh Gupta', age: 45, gender: 'Male', condition: 'Back Pain' },
  { id: '8', name: 'Meena Yadav', age: 29, gender: 'Female', condition: 'Migraine' }
];

export default function PatientList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedPatients, setSortedPatients] = useState([]);

  useEffect(() => {
    const sortedData = [...patients].sort((a, b) => a.name.localeCompare(b.name));
    setSortedPatients(sortedData);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedPatients(filteredPatients);
  };

  const renderItem = ({ item }) => (
    <View style={styles.patientItem}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientDetails}>
        Age: {item.age} | Gender: {item.gender} | Condition: {item.condition}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Patient List</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {sortedPatients.length === 0 ? (
        <Text style={styles.noPatientsText}>No patients found</Text>
      ) : (
        <FlatList
          data={sortedPatients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2980b9',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  patientItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: '#2980b9',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  patientDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  noPatientsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#e74c3c',
  },
});
