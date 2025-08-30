import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { register } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please enter your first and last name');
      return false;
    }
    
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!formData.birthDate) {
      Alert.alert('Error', 'Please enter your birth date');
      return false;
    }
    
    if (!formData.phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    if (!acceptedTerms) {
      Alert.alert('Error', 'You must accept the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    const result = await register(formData);
    
    if (result.success) {
      // Navigation is handled by the auth state change
    } else {
      Alert.alert('Registration Failed', result.error || 'Please try again');
      setIsLoading(false);
    }
  };

  const TermsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={termsModalVisible}
      onRequestClose={() => setTermsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Terms and Conditions</Text>
          <ScrollView style={styles.termsScroll}>
            <Text style={styles.termsText}>
              By creating an account with Pustak Point, you agree to the following terms and conditions:
              {"\n\n"}
              1. You are responsible for maintaining the confidentiality of your account and password.
              {"\n\n"}
              2. You agree to accept responsibility for all activities that occur under your account.
              {"\n\n"}
              3. You must be at least 13 years old to use this service.
              {"\n\n"}
              4. You agree not to use the service for any illegal or unauthorized purpose.
              {"\n\n"}
              5. We reserve the right to modify or terminate the service for any reason without notice.
              {"\n\n"}
              6. We reserve the right to refuse service to anyone for any reason at any time.
              {"\n\n"}
              7. Your use of the service is at your sole risk.
              {"\n\n"}
              These terms may be updated from time to time. Continued use of the service constitutes acceptance of the updated terms.
            </Text>
          </ScrollView>
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setTermsModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Sign up</Text>
          </View>

          {/* Registration Form */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#999"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#999"
                value={formData.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Birth date (MM/DD/YYYY)"
                placeholderTextColor="#999"
                value={formData.birthDate}
                onChangeText={(text) => handleInputChange('birthDate', text)}
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#999"
                value={formData.phoneNumber}
                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                keyboardType="phone-pad"
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#999"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry
                editable={!isLoading}
              />
              
              <View style={styles.termsContainer}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  disabled={isLoading}
                >
                  <View style={[styles.checkboxBox, acceptedTerms && styles.checkboxBoxChecked]}>
                    {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text 
                    style={styles.termsLink}
                    onPress={() => setTermsModalVisible(true)}
                  >
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Login')}
                  disabled={isLoading}
                >
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <TermsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  checkboxBoxChecked: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  termsText: {
    flex: 1,
    color: '#7f8c8d',
    fontSize: 14,
  },
  termsLink: {
    color: '#3498db',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  loginLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  termsScroll: {
    maxHeight: '80%',
    marginBottom: 15,
  },
  modalCloseButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;