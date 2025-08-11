import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { layout } from '../styles/layout';
import { typography } from '../styles/typography';

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const categories = [
    { id: 'all', label: 'All Actions', icon: 'trophy' },
    { id: 'recycling', label: 'Recycling', icon: 'leaf' },
    { id: 'biking', label: 'Biking', icon: 'bicycle' },
    { id: 'energy', label: 'Energy', icon: 'flash' },
    { id: 'trees', label: 'Trees', icon: 'leaf' },
  ];

  const [leaderboardData] = useState([
    {
      id: 1,
      rank: 1,
      name: 'EcoWarrior23',
      points: 2450,
      level: 5,
      avatar: 'EW',
      trend: 'up',
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: 'GreenQueen',
      points: 2380,
      level: 5,
      avatar: 'GQ',
      trend: 'up',
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: 'TreeHugger',
      points: 2250,
      level: 4,
      avatar: 'TH',
      trend: 'down',
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: 'CleanCyclist',
      points: 2100,
      level: 4,
      avatar: 'CC',
      trend: 'up',
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      name: 'EcoMaster',
      points: 1980,
      level: 4,
      avatar: 'EM',
      trend: 'same',
      isCurrentUser: false,
    },
    // ... more entries
    {
      id: 15,
      rank: 15,
      name: 'Alex Green (You)',
      points: 1250,
      level: 3,
      avatar: 'AG',
      trend: 'up',
      isCurrentUser: true,
    },
  ]);

  const getRankColor = (rank) => {
    if (rank === 1) return colors.accent; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return colors.textSecondary;
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) return 'trophy';
    return 'medal';
  };

  const TopThreeCard = ({ user }) => (
    <View style={[styles.topThreeCard, user.rank === 1 && styles.firstPlace]}>
      <View style={styles.topThreeRank}>
        <Ionicons
          name={getRankIcon(user.rank)}
          size={24}
          color={getRankColor(user.rank)}
        />
        <Text style={[styles.topThreeRankText, { color: getRankColor(user.rank) }]}>
          #{user.rank}
        </Text>
      </View>
      
      <View style={[styles.topThreeAvatar, user.rank === 1 && styles.firstPlaceAvatar]}>
        <Text style={styles.topThreeAvatarText}>{user.avatar}</Text>
      </View>
      
      <Text style={styles.topThreeName}>{user.name}</Text>
      <Text style={styles.topThreePoints}>{user.points.toLocaleString()}</Text>
      <Text style={styles.topThreeLevel}>Level {user.level}</Text>
    </View>
  );

  const LeaderboardItem = ({ user, index }) => (
    <View style={[
      styles.leaderboardItem,
      user.isCurrentUser && styles.currentUserItem
    ]}>
      <View style={styles.rankContainer}>
        <Text style={[
          styles.rankText,
          user.isCurrentUser && styles.currentUserText
        ]}>
          #{user.rank}
        </Text>
        <Ionicons
          name={
            user.trend === 'up' ? 'trending-up' :
            user.trend === 'down' ? 'trending-down' : 'remove'
          }
          size={16}
          color={
            user.trend === 'up' ? colors.success :
            user.trend === 'down' ? colors.error : colors.textSecondary
          }
        />
      </View>
      
      <View style={[styles.avatar, user.isCurrentUser && styles.currentUserAvatar]}>
        <Text style={[styles.avatarText, user.isCurrentUser && styles.currentUserAvatarText]}>
          {user.avatar}
        </Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={[
          styles.userName,
          user.isCurrentUser && styles.currentUserText
        ]}>
          {user.name}
        </Text>
        <Text style={styles.userLevel}>Level {user.level}</Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={[
          styles.pointsText,
          user.isCurrentUser && styles.currentUserText
        ]}>
          {user.points.toLocaleString()}
        </Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );

  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <View style={layout.container}>
      {/* Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>
          Compete with eco-warriors worldwide
        </Text>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.selectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.selectorButton,
                selectedPeriod === period.id && styles.selectorButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.selectorButtonText,
                selectedPeriod === period.id && styles.selectorButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Selector */}
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

      <ScrollView style={styles.content}>
        {/* Top 3 */}
        <View style={styles.topThreeContainer}>
          <Text style={[typography.h4, { marginBottom: 20, textAlign: 'center' }]}>
            Top Performers
          </Text>
          <View style={styles.topThreeRow}>
            {topThree.map((user) => (
              <TopThreeCard key={user.id} user={user} />
            ))}
          </View>
        </View>

        {/* Rest of Leaderboard */}
        <View style={layout.card}>
          <Text style={[typography.h4, { marginBottom: 16 }]}>Full Rankings</Text>
          {others.map((user, index) => (
            <LeaderboardItem key={user.id} user={user} index={index} />
          ))}
        </View>

        {/* Your Stats */}
        <View style={layout.card}>
          <Text style={[typography.h4, { marginBottom: 16 }]}>Your Performance</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Rank</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>+3</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,250</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  selectorContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  selectorButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  selectorButtonActive: {
    backgroundColor: colors.primary,
  },
  selectorButtonText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectorButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingBottom: 16,
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
  topThreeContainer: {
    marginBottom: 20,
  },
  topThreeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topThreeCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    width: '30%',
    ...layout.shadow,
  },
  firstPlace: {
    backgroundColor: colors.accent + '10',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  topThreeRank: {
    alignItems: 'center',
    marginBottom: 12,
  },
  topThreeRankText: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  topThreeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  firstPlaceAvatar: {
    backgroundColor: colors.accent,
  },
  topThreeAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topThreeName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  topThreePoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  topThreeLevel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  currentUserItem: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
    marginVertical: 4,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currentUserAvatar: {
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  currentUserAvatarText: {
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userLevel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  currentUserText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  pointsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});