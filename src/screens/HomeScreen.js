import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { layout } from '../styles/layout';
import { typography } from '../styles/typography';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [userStats, setUserStats] = useState({
    totalPoints: 1250,
    level: 3,
    actionsThisWeek: 8,
    rank: 15,
  });

  const [recentActions] = useState([
    { id: 1, type: 'Recycling', points: 50, time: '2 hours ago', icon: 'leaf' },
    { id: 2, type: 'Bike Commute', points: 30, time: '1 day ago', icon: 'bicycle' },
    { id: 3, type: 'Energy Save', points: 20, time: '2 days ago', icon: 'flash' },
  ]);

  return (
    <ScrollView style={layout.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.pointsText}>{userStats.totalPoints} EcoPoints</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {userStats.level}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[layout.card, styles.statCard]}>
          <Ionicons name="trophy" size={24} color={colors.accent} />
          <Text style={styles.statNumber}>#{userStats.rank}</Text>
          <Text style={styles.statLabel}>Global Rank</Text>
        </View>
        
        <View style={[layout.card, styles.statCard]}>
          <Ionicons name="calendar" size={24} color={colors.info} />
          <Text style={styles.statNumber}>{userStats.actionsThisWeek}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        
        <View style={[layout.card, styles.statCard]}>
          <Ionicons name="leaf" size={24} color={colors.success} />
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Total Actions</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: colors.recycling }]}
            onPress={() => navigation.navigate('Actions', { actionType: 'recycling' })}
          >
            <Ionicons name="leaf" size={32} color="white" />
            <Text style={styles.quickActionText}>Recycle</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: colors.biking }]}
            onPress={() => navigation.navigate('Actions', { actionType: 'biking' })}
          >
            <Ionicons name="bicycle" size={32} color="white" />
            <Text style={styles.quickActionText}>Bike</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: colors.energy }]}
            onPress={() => navigation.navigate('Actions', { actionType: 'energy' })}
          >
            <Ionicons name="flash" size={32} color="white" />
            <Text style={styles.quickActionText}>Save Energy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.quickActionButton, { backgroundColor: colors.trees }]}
            onPress={() => navigation.navigate('Actions', { actionType: 'trees' })}
          >
            <Ionicons name="leaf" size={32} color="white" />
            <Text style={styles.quickActionText}>Plant Tree</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Recent Activities</Text>
        {recentActions.map((action) => (
          <View key={action.id} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name={action.icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={typography.body}>{action.type}</Text>
              <Text style={typography.caption}>{action.time}</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>+{action.points}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Progress to Next Level */}
      <View style={layout.card}>
        <Text style={[typography.h4, { marginBottom: 16 }]}>Progress to Level {userStats.level + 1}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
        <Text style={[typography.caption, { marginTop: 8, textAlign: 'center' }]}>
          750 / 1500 points
        </Text>
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
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: (width - 72) / 2,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  pointsBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});