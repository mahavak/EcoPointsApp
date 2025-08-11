import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { layout } from '../styles/layout';
import { typography } from '../styles/typography';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [user] = useState({
    name: 'Alex Green',
    email: 'alex.green@email.com',
    joinDate: '2024-01-15',
    totalPoints: 1250,
    level: 3,
    rank: 15,
    achievements: [
      { id: 1, name: 'First Step', description: 'Logged your first eco action', icon: 'footsteps', earned: true },
      { id: 2, name: 'Recycler', description: 'Recycled 10kg of materials', icon: 'leaf', earned: true },
      { id: 3, name: 'Cyclist', description: 'Biked 50km in total', icon: 'bicycle', earned: true },
      { id: 4, name: 'Energy Saver', description: 'Saved 100kWh of energy', icon: 'flash', earned: false },
      { id: 5, name: 'Tree Hugger', description: 'Planted 5 trees', icon: 'leaf', earned: false },
      { id: 6, name: 'Eco Champion', description: 'Reach level 5', icon: 'trophy', earned: false },
    ],
  });

  const [stats] = useState([
    { label: 'Total Actions', value: '42', icon: 'checkmark-circle' },
    { label: 'Days Active', value: '28', icon: 'calendar' },
    { label: 'CO₂ Saved', value: '156kg', icon: 'leaf' },
    { label: 'Trees Equivalent', value: '7', icon: 'leaf' },
  ]);

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (user.level - 1) * 500;
    const nextLevelPoints = user.level * 500;
    const progress = (user.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
    return Math.max(0, Math.min(1, progress));
  };

  return (
    <ScrollView style={layout.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AG</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {user.level}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${getProgressToNextLevel() * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round((getProgressToNextLevel() * 100))}% to Level {user.level + 1}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[layout.card, styles.statCard]}>
            <Ionicons name={stat.icon} size={24} color={colors.primary} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Stats */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Quick Stats</Text>
        <View style={styles.quickStatRow}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{user.totalPoints}</Text>
            <Text style={styles.quickStatLabel}>Total Points</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>#{user.rank}</Text>
            <Text style={styles.quickStatLabel}>Global Rank</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{user.level}</Text>
            <Text style={styles.quickStatLabel}>Level</Text>
          </View>
        </View>
      </View>

      {/* Achievements */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {user.achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementCardLocked
              ]}
            >
              <View style={[
                styles.achievementIcon,
                { backgroundColor: achievement.earned ? colors.primary : colors.textSecondary }
              ]}>
                <Ionicons
                  name={achievement.earned ? achievement.icon : 'lock-closed'}
                  size={20}
                  color="white"
                />
              </View>
              <Text style={[
                styles.achievementName,
                !achievement.earned && styles.achievementNameLocked
              ]}>
                {achievement.name}
              </Text>
              <Text style={[
                styles.achievementDescription,
                !achievement.earned && styles.achievementDescriptionLocked
              ]}>
                {achievement.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Environmental Impact */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Environmental Impact</Text>
        
        <View style={styles.impactItem}>
          <Ionicons name="leaf" size={24} color={colors.success} />
          <View style={styles.impactInfo}>
            <Text style={typography.body}>CO₂ Reduced</Text>
            <Text style={typography.caption}>Equivalent to 7 trees planted</Text>
          </View>
          <Text style={styles.impactValue}>156kg</Text>
        </View>
        
        <View style={styles.impactItem}>
          <Ionicons name="water" size={24} color={colors.info} />
          <View style={styles.impactInfo}>
            <Text style={typography.body}>Water Saved</Text>
            <Text style={typography.caption}>Through energy conservation</Text>
          </View>
          <Text style={styles.impactValue}>2,340L</Text>
        </View>
        
        <View style={styles.impactItem}>
          <Ionicons name="flash" size={24} color={colors.warning} />
          <View style={styles.impactInfo}>
            <Text style={typography.body}>Energy Saved</Text>
            <Text style={typography.caption}>Equivalent to 12 days of lighting</Text>
          </View>
          <Text style={styles.impactValue}>48kWh</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications" size={24} color={colors.textSecondary} />
          <Text style={[typography.body, { flex: 1, marginLeft: 12 }]}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="share" size={24} color={colors.textSecondary} />
          <Text style={[typography.body, { flex: 1, marginLeft: 12 }]}>Share Profile</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle" size={24} color={colors.textSecondary} />
          <Text style={[typography.body, { flex: 1, marginLeft: 12 }]}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginBottom: 20,
  },
  levelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  quickStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 72) / 2,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementNameLocked: {
    color: colors.textSecondary,
  },
  achievementDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: colors.textSecondary,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  impactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
});