import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { layout } from '../styles/layout';
import { typography } from '../styles/typography';

export default function RewardsScreen() {
  const [userPoints] = useState(1250);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [rewards] = useState([
    {
      id: 1,
      title: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel, 500ml capacity',
      points: 500,
      category: 'physical',
      icon: 'water',
      color: colors.info,
      inStock: true,
      popular: true,
    },
    {
      id: 2,
      title: 'Tree Planting Certificate',
      description: 'Plant a tree in your name',
      points: 300,
      category: 'impact',
      icon: 'leaf',
      color: colors.success,
      inStock: true,
      popular: false,
    },
    {
      id: 3,
      title: 'Solar Power Bank',
      description: '10,000mAh solar-powered charger',
      points: 1200,
      category: 'physical',
      icon: 'battery-charging',
      color: colors.warning,
      inStock: true,
      popular: true,
    },
    {
      id: 4,
      title: 'Bamboo Utensil Set',
      description: 'Fork, knife, spoon, and carrying case',
      points: 400,
      category: 'physical',
      icon: 'restaurant',
      color: colors.primary,
      inStock: true,
      popular: false,
    },
    {
      id: 5,
      title: 'Carbon Offset - 1 Ton CO₂',
      description: 'Offset your carbon footprint',
      points: 800,
      category: 'impact',
      icon: 'cloud',
      color: colors.info,
      inStock: true,
      popular: true,
    },
    {
      id: 6,
      title: 'Organic Cotton Tote Bag',
      description: 'Reusable shopping bag',
      points: 250,
      category: 'physical',
      icon: 'bag',
      color: colors.secondary,
      inStock: true,
      popular: false,
    },
    {
      id: 7,
      title: 'EcoPoints Premium Badge',
      description: 'Show off your eco-warrior status',
      points: 150,
      category: 'digital',
      icon: 'medal',
      color: colors.accent,
      inStock: true,
      popular: false,
    },
    {
      id: 8,
      title: 'Renewable Energy Donation',
      description: 'Fund 1 month of solar power',
      points: 1000,
      category: 'impact',
      icon: 'flash',
      color: colors.warning,
      inStock: true,
      popular: true,
    },
  ]);

  const categories = [
    { id: 'all', label: 'All Rewards', icon: 'gift' },
    { id: 'physical', label: 'Physical', icon: 'cube' },
    { id: 'digital', label: 'Digital', icon: 'phone-portrait' },
    { id: 'impact', label: 'Impact', icon: 'leaf' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const canAfford = (points) => userPoints >= points;

  const handleClaimReward = () => {
    if (!selectedReward) return;

    if (!canAfford(selectedReward.points)) {
      Alert.alert(
        'Insufficient Points',
        `You need ${selectedReward.points - userPoints} more points to claim this reward.`
      );
      return;
    }

    Alert.alert(
      'Claim Reward',
      `Are you sure you want to claim "${selectedReward.title}" for ${selectedReward.points} EcoPoints?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Claim',
          onPress: () => {
            // Simulate reward claiming
            Alert.alert(
              'Reward Claimed!',
              `Congratulations! You've successfully claimed "${selectedReward.title}". We'll process your reward within 24 hours.`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setShowModal(false);
                    setSelectedReward(null);
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const RewardCard = ({ reward }) => (
    <TouchableOpacity
      style={[styles.rewardCard, layout.card]}
      onPress={() => {
        setSelectedReward(reward);
        setShowModal(true);
      }}
    >
      {reward.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}
      
      <View style={[styles.rewardIcon, { backgroundColor: reward.color }]}>
        <Ionicons name={reward.icon} size={32} color="white" />
      </View>
      
      <View style={styles.rewardInfo}>
        <Text style={[typography.h4, { marginBottom: 4 }]}>{reward.title}</Text>
        <Text style={[typography.caption, { marginBottom: 12 }]}>
          {reward.description}
        </Text>
        
        <View style={styles.rewardFooter}>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={16} color={colors.accent} />
            <Text style={[styles.pointsText, { color: canAfford(reward.points) ? colors.primary : colors.error }]}>
              {reward.points} points
            </Text>
          </View>
          
          <View style={[
            styles.stockIndicator,
            { backgroundColor: reward.inStock ? colors.success : colors.error }
          ]}>
            <Text style={styles.stockText}>
              {reward.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={layout.container}>
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Rewards Store</Text>
        <Text style={styles.headerSubtitle}>
          Redeem your EcoPoints for amazing rewards
        </Text>
        
        <View style={styles.pointsBalance}>
          <Ionicons name="star" size={24} color="white" />
          <Text style={styles.balanceText}>{userPoints.toLocaleString()} Points</Text>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={selectedCategory === category.id ? 'white' : colors.textSecondary}
              />
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rewards Grid */}
      <ScrollView style={styles.content}>
        <View style={styles.rewardsGrid}>
          {filteredRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </View>

        {/* Earn More Points */}
        <View style={layout.card}>
          <Text style={[typography.h4, { marginBottom: 16 }]}>Need More Points?</Text>
          <Text style={[typography.body, { marginBottom: 16 }]}>
            Complete eco-actions to earn more EcoPoints and unlock amazing rewards!
          </Text>
          <TouchableOpacity
            style={styles.earnPointsButton}
            onPress={() => {/* Navigate to actions */}}
          >
            <Text style={styles.earnPointsButtonText}>Log Eco Action</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reward Detail Modal */}
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
                {selectedReward?.title}
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {selectedReward && (
              <>
                <View style={[styles.rewardIcon, { 
                  backgroundColor: selectedReward.color,
                  alignSelf: 'center',
                  marginBottom: 20
                }]}>
                  <Ionicons name={selectedReward.icon} size={48} color="white" />
                </View>

                <Text style={[typography.body, { textAlign: 'center', marginBottom: 20 }]}>
                  {selectedReward.description}
                </Text>

                <View style={styles.modalInfo}>
                  <View style={styles.modalInfoRow}>
                    <Text style={typography.body}>Cost:</Text>
                    <Text style={[styles.pointsText, { 
                      color: canAfford(selectedReward.points) ? colors.primary : colors.error,
                      fontSize: 18,
                      fontWeight: 'bold'
                    }]}>
                      {selectedReward.points} points
                    </Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={typography.body}>Your Balance:</Text>
                    <Text style={[typography.body, { fontWeight: 'bold' }]}>
                      {userPoints.toLocaleString()} points
                    </Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={typography.body}>Category:</Text>
                    <Text style={[typography.body, { textTransform: 'capitalize' }]}>
                      {selectedReward.category}
                    </Text>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <Text style={typography.body}>Availability:</Text>
                    <Text style={[
                      typography.body,
                      { color: selectedReward.inStock ? colors.success : colors.error }
                    ]}>
                      {selectedReward.inStock ? 'In Stock' : 'Out of Stock'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.claimButton,
                    { backgroundColor: selectedReward.color },
                    (!canAfford(selectedReward.points) || !selectedReward.inStock) && styles.claimButtonDisabled
                  ]}
                  onPress={handleClaimReward}
                  disabled={!canAfford(selectedReward.points) || !selectedReward.inStock}
                >
                  <Text style={styles.claimButtonText}>
                    {!canAfford(selectedReward.points) 
                      ? 'Insufficient Points' 
                      : !selectedReward.inStock
                      ? 'Out of Stock'
                      : 'Claim Reward'
                    }
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
    marginBottom: 20,
  },
  pointsBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.textSecondary,
    fontWeight: '500',
    marginLeft: 6,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  rewardsGrid: {
    marginBottom: 20,
  },
  rewardCard: {
    marginBottom: 16,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  rewardIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  rewardInfo: {
    alignItems: 'center',
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  stockIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  earnPointsButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  earnPointsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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
  modalInfo: {
    marginBottom: 24,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  claimButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.6,
  },
  claimButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});