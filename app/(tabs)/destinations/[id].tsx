import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { destinations } from '@/constants/destinations';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';

  const destination = useMemo(() => destinations.find(item => item.id === id), [id]);

  if (!destination) {
    return (
      <View style={styles.center}>
        <ThemedText type="subtitle">Destination not found.</ThemedText>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={
        colorScheme === 'dark'
          ? ['#0f1419', '#1a1f2e']
          : ['#f7f9fb', '#e8f0f7']
      }
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Image with Gradient */}
      <Animated.View entering={FadeIn.duration(600)}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: destination.heroImage }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.heroGradient}
          />
        </View>
      </Animated.View>

      {/* Title Section */}
      <Animated.View entering={FadeInUp.duration(600).delay(200).springify()}>
        <View style={styles.section}>
          <View style={styles.regionBadge}>
            <IconSymbol size={16} name="mappin.circle.fill" color={Colors[colorScheme].tint} />
            <ThemedText style={[styles.regionText, { color: Colors[colorScheme].tint }]}>
              {destination.region}
            </ThemedText>
          </View>

          <ThemedText type="title" style={styles.title}>
            {destination.title}
          </ThemedText>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <IconSymbol size={18} name="calendar" color={Colors[colorScheme].icon} />
              <ThemedText style={styles.metaText}>{destination.bestTime}</ThemedText>
            </View>
          </View>

          <ThemedText style={styles.summary}>{destination.summary}</ThemedText>
        </View>
      </Animated.View>

      {/* Highlights Section */}
      <Animated.View entering={SlideInRight.duration(600).delay(400)}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol size={24} name="sparkles" color={Colors[colorScheme].tint} />
            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Highlights
            </ThemedText>
          </View>
          <View style={styles.listContainer}>
            {destination.highlights.map((item, index) => (
              <MotiView
                key={item}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  delay: 600 + index * 150,
                  damping: 20,
                  stiffness: 100,
                }}
              >
                <BulletRow icon="star.fill">{item}</BulletRow>
              </MotiView>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Travel Tips Section */}
      <Animated.View entering={SlideInRight.duration(600).delay(600)}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol size={24} name="lightbulb.fill" color="#f59e0b" />
            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Travel Tips
            </ThemedText>
          </View>
          <View style={styles.listContainer}>
            {destination.travelTips.map((item, index) => (
              <MotiView
                key={item}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  delay: 800 + index * 150,
                  damping: 20,
                  stiffness: 100,
                }}
              >
                <BulletRow icon="checkmark.circle.fill">{item}</BulletRow>
              </MotiView>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Climate Section */}
      <Animated.View entering={FadeInDown.duration(600).delay(900)}>
        <LinearGradient
          colors={
            colorScheme === 'dark'
              ? ['rgba(59, 130, 246, 0.15)', 'rgba(139, 92, 246, 0.15)']
              : ['rgba(59, 130, 246, 0.1)', 'rgba(139, 92, 246, 0.1)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.climateSection}
        >
          <View style={styles.sectionHeader}>
            <IconSymbol size={24} name="cloud.sun.fill" color="#60a5fa" />
            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Climate Snapshot
            </ThemedText>
          </View>
          <ThemedText style={styles.summary}>{destination.climate}</ThemedText>
        </LinearGradient>
      </Animated.View>

      {/* Photo Gallery */}
      <Animated.View entering={FadeInDown.duration(600).delay(1000)}>
        <View style={[styles.section, styles.gallerySection]}>
          <View style={styles.sectionHeader}>
            <IconSymbol size={24} name="photo.on.rectangle" color="#8b5cf6" />
            <ThemedText type="subtitle" style={styles.sectionLabel}>
              Photo Gallery
            </ThemedText>
          </View>
          <View style={styles.galleryGrid}>
            {destination.gallery.map((uri, index) => (
              <MotiView
                key={uri}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  delay: 1100 + index * 100,
                  damping: 20,
                  stiffness: 100,
                }}
                style={styles.galleryImageWrapper}
              >
                <Image source={{ uri }} style={styles.galleryImage} />
              </MotiView>
            ))}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
    </LinearGradient>
  );
}

type BulletRowProps = {
  children: string;
  icon: 'star.fill' | 'checkmark.circle.fill';
};

function BulletRow({ children, icon }: BulletRowProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletIconContainer}>
        <IconSymbol size={16} name={icon} color={Colors[colorScheme].tint} />
      </View>
      <ThemedText style={styles.bulletText}>{children}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    backgroundColor: 'transparent',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heroContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  regionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontWeight: '900',
    lineHeight: 38,
    fontSize: 32,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    opacity: 0.8,
    fontWeight: '600',
    flex: 1,
  },
  summary: {
    lineHeight: 24,
    fontSize: 16,
    opacity: 0.85,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionLabel: {
    fontWeight: '800',
    fontSize: 20,
  },
  listContainer: {
    gap: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 4,
  },
  bulletIconContainer: {
    width: 24,
    height: 24,
    marginTop: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  bulletText: {
    flex: 1,
    lineHeight: 22,
    fontSize: 15,
  },
  climateSection: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 20,
    borderRadius: 20,
    gap: 16,
  },
  gallerySection: {
    gap: 20,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  galleryImageWrapper: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
});
