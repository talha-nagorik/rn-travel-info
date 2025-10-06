import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { useMemo, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { destinations } from '@/constants/destinations';
import { useColorScheme } from '@/hooks/use-color-scheme';

const sections = ['All', 'Asia', 'Europe', 'South America'] as const;

export default function DestinationsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [activeFilter, setActiveFilter] = useState<(typeof sections)[number]>('All');

  const filteredDestinations = useMemo(() => {
    if (activeFilter === 'All') {
      return destinations;
    }

    return destinations.filter(destination => destination.region === activeFilter);
  }, [activeFilter]);

  return (
    <LinearGradient
      colors={
        colorScheme === 'dark'
          ? ['#0f1419', '#1a1f2e']
          : ['#f7f9fb', '#e8f0f7']
      }
      style={styles.container}
    >
      {/* Filter Chips */}
      <View style={styles.content}>
      <Animated.View 
        entering={FadeInRight.duration(600).delay(200)}
        style={styles.filters}
      >
        {sections.map((section, index) => {
          const isActive = section === activeFilter;
          return (
            <MotiView
              key={section}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                delay: index * 100,
                damping: 18,
                stiffness: 100,
              }}
            >
              <Pressable onPress={() => setActiveFilter(section)}>
                {isActive ? (
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.filterChip}
                  >
                    <ThemedText style={styles.filterChipTextActive}>{section}</ThemedText>
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor:
                          colorScheme === 'dark'
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.06)',
                      },
                    ]}
                  >
                    <ThemedText style={styles.filterChipTextInactive}>{section}</ThemedText>
                  </View>
                )}
              </Pressable>
            </MotiView>
          );
        })}
      </Animated.View>

      {/* Destinations List */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <DestinationCard destinationId={item.id} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </LinearGradient>
  );
}

type DestinationCardProps = {
  destinationId: string;
  index: number;
};

function DestinationCard({ destinationId, index }: DestinationCardProps) {
  const destination = useMemo(
    () => destinations.find(item => item.id === destinationId),
    [destinationId],
  );

  if (!destination) {
    return null;
  }

  return (
    <Link
      href={{
        pathname: '/(tabs)/destinations/[id]',
        params: { id: destination.id },
      }}
      asChild
    >
      <Pressable>
        <Animated.View
          entering={FadeInDown.duration(600).delay(index * 150).springify().damping(20).stiffness(100)}
        >
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'timing',
              duration: 200,
            }}
            style={styles.card}
          >
            <ImageBackground source={{ uri: destination.heroImage }} style={styles.image}>
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.75)']}
                style={styles.overlay}
              />
              <View style={styles.cardContent}>
                <View style={styles.regionBadge}>
                  <IconSymbol size={14} name="mappin.circle.fill" color="#fff" />
                  <ThemedText style={styles.regionText}>{destination.region}</ThemedText>
                </View>

                <View style={styles.cardTextContent}>
                  <ThemedText type="subtitle" style={styles.cardTitle}>
                    {destination.title}
                  </ThemedText>
                  <ThemedText style={styles.cardSummary}>{destination.summary}</ThemedText>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.bestTimeContainer}>
                    <IconSymbol size={16} name="calendar" color="#fff" />
                    <ThemedText style={styles.bestTimeText}>
                      {destination.bestTime.split(' ')[0]}
                    </ThemedText>
                  </View>
                  <View style={styles.arrowContainer}>
                    <IconSymbol size={20} name="arrow.right.circle.fill" color="#fff" />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </MotiView>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 20,
    gap: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  filterChipTextInactive: {
    fontWeight: '600',
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 280,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    padding: 20,
    gap: 12,
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    backdropFilter: 'blur(10px)',
  },
  regionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  cardTextContent: {
    gap: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardSummary: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  bestTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bestTimeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  arrowContainer: {
    opacity: 0.9,
  },
});
