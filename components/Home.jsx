import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactUs from './ContactUs';
import DoctorImg from "../assets/images/DoctorImg.jpg";

const features = [
  { id: 1, title: 'Track Your Health', description: 'Manage your health records.' },
  { id: 2, title: 'Book Appointments', description: 'Schedule meetings with doctors.' },
  { id: 3, title: 'Online Consultations', description: 'Consult with doctors virtually.' },
];

const sliderWidth = Dimensions.get('window').width;

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuItems = [
    { id: 1, title: 'Patient List' },
    { id: 2, title: 'Get Appointments' },
    { id: 3, title: 'Online Orders' },
    { id: 4, title: 'Contact Us' },
  ];

  const notifications = [
    { id: 1, message: 'Appointment confirmed with Dr. Smith at 10:00 AM' },
    { id: 2, message: 'Your order has been shipped!' },
    { id: 3, message: 'New health tips are available.' },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const handleMenuItemPress = (title) => {
    if (title === 'Contact Us') {
      setShowContactForm(true);
    }
    setMenuVisible(false);
  };

  const screenWidth = Dimensions.get("window").width;

  const StatusSection = () => (
    <View style={styles.statusContainer}>
      <View style={[styles.statBox, { backgroundColor: "#E9D8FD", width: screenWidth * 0.4 }]}>
        <Image source={DoctorImg} style={styles.icon} />
        <Text style={styles.number}>100+</Text>
        <Text style={styles.label}>Doctors</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: "#B2F5EA", width: screenWidth * 0.4 }]}>
        <Image source={DoctorImg} style={styles.icon} />
        <Text style={styles.number}>100k+</Text>
        <Text style={styles.label}>Happy Patients</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: "#FED7D7", width: screenWidth * 0.4 }]}>
        <Image source={DoctorImg} style={styles.icon} />
        <Text style={styles.number}>50+</Text>
        <Text style={styles.label}>Specialty</Text>
      </View>

      <View style={[styles.statBox, { backgroundColor: "#C6F6D5", width: screenWidth * 0.4 }]}>
        <Image source={DoctorImg} style={styles.icon} />
        <Text style={styles.number}>4</Text>
        <Text style={styles.label}>Total Branches</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Mediversal</Text>
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible((prev) => !prev)}
          >
            <Icon name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => setShowNotifications(true)}
          >
            <Icon name="notifications" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.title)}
              >
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {showNotifications && (
        <View style={styles.notificationPanel}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowNotifications(false)}
          >
            <Icon name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>{item.message}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View style={styles.body}>
        {showContactForm ? (
          <ContactUs onClose={() => setShowContactForm(false)} />
        ) : (
          <View style={styles.sliderContainer}>
            <ImageBackground
              style={styles.slide}
              imageStyle={styles.imageStyle}
              source={require('./../assets/images/LoginBack.jpg')}
            >
              <Text style={styles.featureTitle}>
                {features[currentSlide].title}
              </Text>
              <Text style={styles.featureDescription}>
                {features[currentSlide].description}
              </Text>
            </ImageBackground>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextSlide}>
              <Icon name="chevron-right" size={30} color="#007bff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View>
        <StatusSection />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#444', 
    shadowColor: '#000',
    shadowOpacity: 0.4, 
    zIndex: 2,
},
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 5,
  },
  notification: {
    marginLeft: 15,
    padding: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.1,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    zIndex: 1,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  sliderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  slide: {
    width: sliderWidth * 0.9,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    opacity: 0.3,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowRadius: 4,
  },
  notificationPanel: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 250,
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    elevation: 5,
    zIndex: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  notificationItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  statBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  label: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
