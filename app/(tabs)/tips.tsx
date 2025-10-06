import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const quickTips = [
  {
    title: 'Pack smart layers',
    description:
      'Focus on breathable base layers, a windproof shell, and hand-washable fabrics to adapt to any climate.',
    icon: '🧳',
    gradient: ['#667eea', '#764ba2'] as const,
  },
  {
    title: 'Plan buffer days',
    description:
      'Leave space between long-haul flights and key experiences to absorb delays without stress.',
    icon: '🗓️',
    gradient: ['#f093fb', '#f5576c'] as const,
  },
  {
    title: 'Stay hydrated',
    description:
      'Carry a collapsible bottle and refill often. Jet lag fades faster when you keep water within reach.',
    icon: '💧',
    gradient: ['#4facfe', '#00f2fe'] as const,
  },
  {
    title: 'Respect local rhythm',
    description:
      "Observe local mealtimes, greetings, and customs—you'll find quicker connections with hosts and guides.",
    icon: '🤝',
    gradient: ['#43e97b', '#38f9d7'] as const,
  },
  {
    title: 'Collect experiences',
    description: 'Swap souvenir shopping for immersive workshops, food tours, and nature walks.',
    icon: '📸',
    gradient: ['#fa709a', '#fee140'] as const,
  },
];

export default function TipsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <LinearGradient
      colors={
        colorScheme === 'dark'
          ? ['#0f1419', '#1a1f2e']
          : ['#f7f9fb', '#e8f0f7']
      }
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Section */}
        <Animated.View
          entering={FadeInRight.duration(600).delay(200)}
          style={styles.introSection}
        >
          <ThemedText style={styles.introText}>
            Build your own playbook of mindful adventures with these curated tips ✨
          </ThemedText>
        </Animated.View>

        {/* Tips List */}
        <View style={styles.tipList}>
          {quickTips.map((tip, index) => (
            <MotiView
              key={tip.title}
              from={{ opacity: 0, translateY: 30, scale: 0.95 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{
                type: 'spring',
                delay: 400 + index * 150,
                damping: 20,
                stiffness: 100,
              }}
            >
              <LinearGradient
                colors={tip.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tipCard}
              >
                <View style={styles.tipIconContainer}>
                  <ThemedText style={styles.tipIcon}>{tip.icon}</ThemedText>
                </View>
                <View style={styles.tipContent}>
                  <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
                  <ThemedText style={styles.tipDescription}>{tip.description}</ThemedText>
                </View>
                <View style={styles.tipBadge}>
                  <IconSymbol size={16} name="checkmark" color="#fff" />
                </View>
              </LinearGradient>
            </MotiView>
          ))}
        </View>

        {/* Bonus Tip Banner */}
        <Animated.View entering={FadeInDown.duration(600).delay(1200)}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.3)']
                : ['#667eea', '#764ba2']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerHeader}>
              <View style={styles.bonusIconContainer}>
                <IconSymbol size={24} name="gift.fill" color="#fff" />
              </View>
              <ThemedText style={styles.bannerTitle}>Bonus Tip</ThemedText>
            </View>
            <ThemedText style={styles.bannerBody}>
              Use offline maps and pinned translations before heading into remote areas—future you
              will thank you.
            </ThemedText>
          </LinearGradient>
        </Animated.View>

        {/* Pro Tips Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(1400)}>
          <View style={styles.proTipsSection}>
            <View style={styles.proTipsHeader}>
              <IconSymbol size={24} name="star.fill" color="#fbbf24" />
              <ThemedText type="subtitle" style={styles.proTipsTitle}>
                Pro Tips
              </ThemedText>
            </View>

            <View style={styles.proTipsList}>
              {['Download maps offline', 'Learn basic local phrases', 'Save emergency contacts'].map(
                (proTip, index) => (
                  <MotiView
                    key={proTip}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{
                      type: 'spring',
                      delay: 1600 + index * 100,
                      damping: 20,
                      stiffness: 100,
                    }}
                    style={[
                      styles.proTipItem,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.04)',
                      },
                    ]}
                  >
                    <IconSymbol
                      size={18}
                      name="checkmark.circle.fill"
                      color={Colors[colorScheme].tint}
                    />
                    <ThemedText style={styles.proTipText}>{proTip}</ThemedText>
                  </MotiView>
                ),
              )}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
    paddingHorizontal: 24,
    gap: 24,
  },
  introSection: {
    paddingVertical: 8,
  },
  introText: {
    fontSize: 17,
    lineHeight: 26,
    opacity: 0.85,
    fontWeight: '500',
  },
  tipList: {
    gap: 18,
  },
  tipCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
    borderRadius: 24,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  tipIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tipIcon: {
    fontSize: 26,
  },
  tipContent: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  tipTitle: {
    fontWeight: '800',
    fontSize: 18,
    color: '#fff',
  },
  tipDescription: {
    lineHeight: 22,
    color: '#fff',
    opacity: 0.95,
    fontSize: 14,
    fontWeight: '500',
  },
  tipBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bonusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
  bannerBody: {
    color: '#fff',
    lineHeight: 24,
    fontSize: 15,
    fontWeight: '500',
  },
  proTipsSection: {
    gap: 16,
  },
  proTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  proTipsTitle: {
    fontWeight: '800',
    fontSize: 20,
  },
  proTipsList: {
    gap: 12,
  },
  proTipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  proTipText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
