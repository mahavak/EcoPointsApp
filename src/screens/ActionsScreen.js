import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { layout } from '../styles/layout';
import { typography } from '../styles/typography';

const actionTypes = [
  {
    id: 'recycling',
    name: 'Recycling',
    icon: 'leaf',
    color: colors.recycling,
    unit: 'kg',
    pointsPerUnit: 10,
    description: 'Recycle paper, plastic, glass, or metal',
  },
  {
    id: 'biking',
    name: 'Bike Commute',
    icon: 'bicycle',
    color: colors.biking,
    unit: 'km',
    pointsPerUnit: 15,
    description: 'Use bike instead of car for transportation',
  },
  {
    id: 'energy',
    name: 'Energy Conservation',
    icon: 'flash',
    color: colors.energy,
    unit: 'kWh saved',
    pointsPerUnit: 25,
    description: 'Turn off lights, unplug devices, use less AC',
  },
  {
    id: 'trees',
    name: 'Tree Planting',
    icon: 'leaf',
    color: colors.trees,
    unit: 'trees',
    pointsPerUnit: 100,
    description: 'Plant or sponsor tree planting',
  },
];

export default function ActionsScreen({ navigation, route }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (route.params?.actionType) {
      const action = actionTypes.find(a => a.id === route.params.actionType);
      if (action) {
        setSelectedAction(action);
        setShowModal(true);
      }
    }
  }, [route.params]);

  const calculatePoints = (action, qty) => {
    return action.pointsPerUnit * parseFloat(qty || 0);
  };

  const handleSubmitAction = async () => {
    if (!selectedAction || !quantity || parseFloat(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const points = calculatePoints(selectedAction, quantity);
      
      Alert.alert(
        'Action Logged!',
        `You earned ${points} EcoPoints for ${selectedAction.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setShowModal(false);
              setSelectedAction(null);
              setQuantity('');
              navigation.navigate('Home');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log action. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ActionCard = ({ action }) => (
    <TouchableOpacity
      style={[styles.actionCard, layout.card]}
      onPress={() => {
        setSelectedAction(action);
        setShowModal(true);
      }}
    >
      <LinearGradient
        colors={[action.color, action.color + '80']}
        style={styles.actionIcon}
      >
        <Ionicons name={action.icon} size={32} color="white" />
      </LinearGradient>
      
      <View style={styles.actionInfo}>
        <Text style={[typography.h4, { marginBottom: 4 }]}>{action.name}</Text>
        <Text style={[typography.caption, { marginBottom: 8 }]}>
          {action.description}
        </Text>
        <View style={styles.pointsInfo}>
          <Ionicons name="star" size={16} color={colors.accent} />
          <Text style={[typography.caption, { marginLeft: 4 }]}>
            {action.pointsPerUnit} points per {action.unit}
          </Text>
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={layout.container}>
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Log Eco Action</Text>
        <Text style={styles.headerSubtitle}>
          Record your environmental activities and earn EcoPoints
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Text style={[typography.h3, { marginBottom: 20 }]}>Choose an Action</Text>
        
        {actionTypes.map(action => (
          <ActionCard key={action.id} action={action} />
        ))}

        {/* Recent Actions */}
        <View style={[layout.card, { marginTop: 20 }]}>
          <Text style={[typography.h4, { marginBottom: 16 }]}>Today's Actions</Text>
          <View style={styles.recentAction}>
            <View style={[styles.smallIcon, { backgroundColor: colors.recycling }]}>
              <Ionicons name="leaf" size={16} color="white" />
            </View>
            <View style={styles.recentActionInfo}>
              <Text style={typography.body}>Recycling - 2 kg</Text>
              <Text style={typography.caption}>2 hours ago</Text>
            </View>
            <Text style={styles.recentPoints}>+20</Text>
          </View>
          
          <View style={styles.recentAction}>
            <View style={[styles.smallIcon, { backgroundColor: colors.biking }]}>
              <Ionicons name="bicycle" size={16} color="white" />
            </View>
            <View style={styles.recentActionInfo}>
              <Text style={typography.body}>Bike Commute - 5 km</Text>
              <Text style={typography.caption}>This morning</Text>
            </View>
            <Text style={styles.recentPoints}>+75</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Input Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h3, { flex: 1 }]}>
                {selectedAction?.name}
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {selectedAction && (
              <>
                <View style={[styles.actionIcon, { backgroundColor: selectedAction.color, marginBottom: 20 }]}>
                  <Ionicons name={selectedAction.icon} size={32} color="white" />
                </View>

                <Text style={[typography.body, { textAlign: 'center', marginBottom: 20 }]}>
                  {selectedAction.description}
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={typography.label}>
                    Quantity ({selectedAction.unit})
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder={`Enter ${selectedAction.unit}`}
                  />
                </View>

                {quantity && (
                  <View style={styles.pointsPreview}>
                    <Text style={[typography.h4, { color: colors.primary }]}>
                      {calculatePoints(selectedAction, quantity)} EcoPoints
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { backgroundColor: selectedAction.color },
                    isSubmitting && styles.submitButtonDisabled
                  ]}
                  onPress={handleSubmitAction}
                  disabled={isSubmitting}
                >
                  <Text style={styles.submitButtonText}>
                    {isSubmitting ? 'Logging Action...' : 'Log Action'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  pointsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  smallIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentActionInfo: {
    flex: 1,
  },
  recentPoints: {
    color: colors.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
  },
  pointsPreview: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});