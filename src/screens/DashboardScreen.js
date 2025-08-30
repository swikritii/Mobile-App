import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState({ name: 'John Doe', type: 'Member' });
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    
    // Try different navigation methods to see what works
    try {
      // Method 1: Try navigate first
      navigation.navigate('Login');
      
      // If that doesn't work after a delay, try replace
      setTimeout(() => {
        if (!navigation.isFocused()) return; // If we already navigated away
        
        try {
          navigation.replace('Login');
        } catch (e) {
          console.log('Replace also failed, trying reset');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 100);
      
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Cannot navigate to login screen. Please check your navigation setup.');
    } finally {
      setLoading(false);
    }
  };

  // Alternative direct approach
  const simpleLogout = () => {
    // Try the most direct approach
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Pustak Point</Text>
          <Text style={styles.subtitle}>{user?.name} ({user?.type})</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Books Borrowed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Books Reserved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Books Read</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Browse Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Borrowing History</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Returned "The Alchemist"</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Borrowed "Atomic Habits"</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Reserved "Thinking Fast and Slow"</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Debug information */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Press this button to test navigation:</Text>
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => {
            Alert.alert(
              "Debug Info",
              "Try these navigation methods:\n\n1. navigation.navigate('Login')\n2. navigation.replace('Login')\n3. navigation.reset()",
              [
                {
                  text: "Try navigate",
                  onPress: () => navigation.navigate('LoginScreen')
                },
                {
                  text: "Try replace", 
                  onPress: () => navigation.replace('LoginScreen')
                },
                {
                  text: "Try reset",
                  onPress: () => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                }
              ]
            );
          }}
        >
          <Text style={styles.debugButtonText}>Test Navigation</Text>
        </TouchableOpacity>
      </View>
      
      {/* Logout button */}
      <TouchableOpacity 
        style={[styles.logoutButton, loading && styles.disabledButton]} 
        onPress={simpleLogout}
        disabled={loading}
      >
        <Text style={styles.logoutButtonText}>
          {loading ? 'Logging out...' : 'Logout Now'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 180,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2c3e50',
    paddingLeft: 5,
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  activityTime: {
    fontSize: 12,
    color: '#95a5a6',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f1f2f6',
    padding: 10,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
    textAlign: 'center',
  },
  debugButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default DashboardScreen;