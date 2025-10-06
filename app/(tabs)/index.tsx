import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { MotiText, MotiView } from 'moti';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const heroImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80';

const quickLinks = [
  {
    title: 'Destinations',
    description: 'Discover amazing places',
    icon: 'globe.europe.africa.fill' as const,
    href: '/(tabs)/destinations' as const,
    gradient: ['#667eea', '#764ba2'] as const,
  },
  {
    title: 'Gallery',
    description: 'Inspiring travel photos',
    icon: 'photo.on.rectangle' as const,
    href: '/(tabs)/gallery' as const,
    gradient: ['#f093fb', '#f5576c'] as const,
  },
  {
    title: 'Tips',
    description: 'Expert travel advice',
    icon: 'lightbulb.fill' as const,
    href: '/(tabs)/tips' as const,
    gradient: ['#4facfe', '#00f2fe'] as const,
  },
];

const stats = [
  { value: '50+', label: 'Destinations' },
  { value: '200+', label: 'Photos' },
  { value: '100+', label: 'Travel Tips' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Gradient Overlay */}
        <MotiView
          from={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.hero}
        >
          <Image source={{ uri: heroImage }} style={styles.heroImage} blurRadius={0} />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <MotiText
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 800,
                delay: 300,
                easing: Easing.out(Easing.cubic),
              }}
              style={styles.heroTitle}
            >
              Explore the World
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 800,
                delay: 500,
                easing: Easing.out(Easing.cubic),
              }}
              style={styles.heroSubtitle}
            >
              Your journey to unforgettable adventures starts here
            </MotiText>
          </View>
        </MotiView>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                delay: 600 + index * 100,
                damping: 20,
                stiffness: 90,
              }}
              style={[
                styles.statCard,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                },
              ]}
            >
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </MotiView>
          ))}
        </View>

        {/* Welcome Section */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 800,
            delay: 900,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.welcomeSection}
        >
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome Traveler! ✨
          </ThemedText>
          <ThemedText style={styles.welcomeText}>
            Dive into curated destinations, stunning photography, and insider tips to make every
            trip extraordinary.
          </ThemedText>
        </MotiView>

        {/* Quick Links with Gradient Cards */}
        <View style={styles.quickLinksSection}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 1000,
            }}
          >
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Start Exploring
            </ThemedText>
          </MotiView>

          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <Link key={link.title} href={link.href} asChild>
                <Pressable>
                  <MotiView
                    from={{ opacity: 0, scale: 0.9, translateY: 30 }}
                    animate={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{
                      type: 'spring',
                      delay: 1100 + index * 150,
                      damping: 18,
                      stiffness: 100,
                    }}
                  >
                    <LinearGradient
                      colors={link.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.quickLinkCard}
                    >
                      <View style={styles.quickLinkIconContainer}>
                        <IconSymbol size={36} name={link.icon} color="#fff" />
                      </View>
                      <ThemedText style={styles.quickLinkTitle}>{link.title}</ThemedText>
                      <ThemedText style={styles.quickLinkDescription}>
                        {link.description}
                      </ThemedText>
                      <View style={styles.quickLinkArrow}>
                        <IconSymbol size={20} name="arrow.right" color="#fff" />
                      </View>
                    </LinearGradient>
                  </MotiView>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        {/* Featured Quote with Floating Animation */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            delay: 1600,
            damping: 20,
            stiffness: 100,
          }}
        >
          <LinearGradient
            colors={
              isDark
                ? ['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']
                : ['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.quoteSection}
          >
            <View style={styles.quoteIconContainer}>
              <IconSymbol size={32} name="quote.opening" color={Colors[colorScheme].tint} />
            </View>
            <ThemedText style={styles.quoteText}>
              The world is a book, and those who do not travel read only one page.
            </ThemedText>
            <ThemedText style={styles.quoteAuthor}>— Saint Augustine</ThemedText>
          </LinearGradient>
        </MotiView>

        {/* Floating Action Hint */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 2000,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.scrollHint}
        >
          <IconSymbol size={24} name="chevron.up" color={Colors[colorScheme].text} />
          <ThemedText style={styles.scrollHintText}>Scroll to explore more</ThemedText>
        </MotiView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  hero: {
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 28,
    gap: 12,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 12,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '600',
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  welcomeTitle: {
    fontWeight: '800',
    fontSize: 28,
  },
  welcomeText: {
    lineHeight: 24,
    opacity: 0.8,
    fontSize: 16,
  },
  quickLinksSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 18,
  },
  sectionTitle: {
    fontWeight: '800',
    fontSize: 22,
  },
  quickLinksGrid: {
    gap: 16,
  },
  quickLinkCard: {
    padding: 24,
    borderRadius: 24,
    minHeight: 140,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  quickLinkIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  quickLinkTitle: {
    fontWeight: '800',
    fontSize: 22,
    color: '#fff',
  },
  quickLinkDescription: {
    opacity: 0.95,
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  quickLinkArrow: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  quoteSection: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    borderRadius: 20,
    gap: 12,
  },
  quoteIconContainer: {
    marginBottom: 4,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
    fontWeight: '500',
  },
  quoteAuthor: {
    fontSize: 15,
    fontWeight: '700',
    opacity: 0.7,
  },
  scrollHint: {
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  scrollHintText: {
    fontSize: 13,
    opacity: 0.5,
    fontWeight: '600',
  },
});
