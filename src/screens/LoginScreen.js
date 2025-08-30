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
  ActivityIndicator,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('swi@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Dashboard screen
      navigation.navigate('DashboardScreen'); // Make sure this matches the name in your App.js
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to Pustak Point</Text>
            <Text style={styles.subtitle}>
              A comprehensive solution for managing books, borrowers, and library operations
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Login</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
            
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => Alert.alert('Info', 'Forgot password functionality would go here')}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Register Section */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Features Preview */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Features</Text>
            
            <View style={styles.featureCategory}>
              <Text style={styles.featureCategoryTitle}>For Borrowers</Text>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Browse and search books</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Borrow and return books</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>View your borrowing history</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Manage your profile</Text>
              </View>
            </View>
            
            <View style={styles.featureCategory}>
              <Text style={styles.featureCategoryTitle}>For Librarians</Text>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Add, edit, and delete books</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Manage borrowing records</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Track overdue books</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>Monitor library inventory</Text>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About Our Library</Text>
            <Text style={styles.aboutText}>
              Our Library Management System provides a modern, efficient way to manage library operations. 
              Built with React and Node.js, it offers a seamless experience for both librarians and borrowers.
            </Text>
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => Alert.alert('Info', 'Learn more functionality would go here')}
              disabled={isLoading}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Keep your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  registerLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#7f8c8d',
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureCategory: {
    marginBottom: 20,
  },
  featureCategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkmark: {
    color: '#27ae60',
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#34495e',
    fontSize: 15,
  },
  aboutContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutText: {
    color: '#7f8c8d',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
  learnMoreButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  learnMoreText: {
    color: '#3498db',
    fontWeight: '600',
  },
});

export default LoginScreen;