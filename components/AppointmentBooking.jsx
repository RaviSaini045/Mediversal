import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Platform, 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AppointmentBooking() {
  const [doctor, setDoctor] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(new Date()); 
  const [openDoctor, setOpenDoctor] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 

  const doctorOptions = [
    { label: 'Dr. Smith - Cardiologist', value: 'cardiologist' },
    { label: 'Dr. Johnson - Dermatologist', value: 'dermatologist' },
    { label: 'Dr. Brown - Neurologist', value: 'neurologist' },
  ];

  const timeOptions = [
    { label: '9:00 AM', value: '9:00 AM' },
    { label: '10:00 AM', value: '10:00 AM' },
    { label: '11:00 AM', value: '11:00 AM' },
  ];

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate); 
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    if (!doctor || !date || !time) {
      Alert.alert('Validation Error', 'Please fill in all fields before submitting.');
    } else {
      const formattedDate = date.toISOString().split('T')[0]; 
      setSuccessMessage(`Your appointment with ${doctor} is booked for ${formattedDate} at ${time}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Book an Appointment</Text>

      <DropDownPicker
        open={openDoctor}
        value={doctor}
        items={doctorOptions}
        setOpen={setOpenDoctor}
        setValue={setDoctor}
        placeholder="Select Doctor"
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity
        style={[styles.dateButton, date ? styles.selectedDate : styles.unselectedDate]}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={styles.dateText}>
          {date ? `Selected Date: ${date.toDateString()}` : 'Select Appointment Date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DropDownPicker
        open={openTime}
        value={time}
        items={timeOptions}
        setOpen={setOpenTime}
        setValue={setTime}
        placeholder="Select Time"
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dateButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedDate: {
    backgroundColor: '#d1f7d6',
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  unselectedDate: {
    backgroundColor: '#f7f7f7',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#4da6ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
