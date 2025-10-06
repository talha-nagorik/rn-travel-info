import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack } from 'expo-router';
import { MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const quickNavLinks = [
  { title: 'Destinations', href: '/(tabs)/destinations' as const, icon: 'globe.europe.africa.fill' as const },
  { title: 'Gallery', href: '/(tabs)/gallery' as const, icon: 'photo.on.rectangle' as const },
  { title: 'Tips', href: '/(tabs)/tips' as const, icon: 'lightbulb.fill' as const },
] as const;

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          {/* Animated Icon */}
          <MotiView
            from={{ scale: 0, rotate: '-180deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            transition={{
              type: 'spring',
              delay: 100,
              damping: 20,
              stiffness: 100,
            }}
          >
            <LinearGradient
              colors={
                isDark
                  ? ['rgba(239, 68, 68, 0.2)', 'rgba(249, 115, 22, 0.2)']
                  : ['rgba(239, 68, 68, 0.15)', 'rgba(249, 115, 22, 0.15)']
              }
              style={styles.iconContainer}
            >
              <MotiView
                from={{ rotate: '0deg' }}
                animate={{ rotate: '10deg' }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  loop: true,
                  repeatReverse: true,
                }}
              >
                <IconSymbol size={90} name="exclamationmark.triangle" color="#f59e0b" />
              </MotiView>
            </LinearGradient>
          </MotiView>

          {/* Title */}
          <Animated.View entering={FadeInDown.duration(600).delay(300).springify()}>
            <ThemedText type="title" style={styles.title}>
              Lost in Transit
            </ThemedText>
          </Animated.View>

          {/* Message */}
          <Animated.View entering={FadeInDown.duration(600).delay(400).springify()}>
            <ThemedText style={styles.message}>
              Looks like this destination doesn&apos;t exist. Let&apos;s get you back on track!
            </ThemedText>
          </Animated.View>

          {/* Home Button */}
          <Animated.View entering={FadeInDown.duration(600).delay(500).springify()}>
            <Link href="/(tabs)" style={styles.linkButton}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <IconSymbol size={22} name="house.fill" color="#fff" />
                <ThemedText style={styles.buttonText}>Go to Home</ThemedText>
              </LinearGradient>
            </Link>
          </Animated.View>

          {/* Quick Links */}
          <View style={styles.helpSection}>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                delay: 700,
                damping: 20,
                stiffness: 100,
              }}
            >
              <ThemedText style={styles.helpTitle}>Or explore these sections:</ThemedText>
            </MotiView>

            <View style={styles.quickNavGrid}>
              {quickNavLinks.map((link, index) => (
                <MotiView
                  key={link.title}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                delay: 800 + index * 100,
                damping: 20,
                stiffness: 100,
              }}
                >
                  <Link href={link.href} asChild>
                    <View
                      style={[
                        styles.quickNavCard,
                        {
                          backgroundColor: isDark
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(0,0,0,0.04)',
                        },
                      ]}
                    >
                      <IconSymbol
                        size={28}
                        name={link.icon}
                        color={Colors[colorScheme].tint}
                      />
                      <ThemedText style={styles.quickNavText}>{link.title}</ThemedText>
                    </View>
                  </Link>
                </MotiView>
              ))}
            </View>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.8,
    maxWidth: 320,
    fontWeight: '500',
  },
  linkButton: {
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  helpSection: {
    marginTop: 24,
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '700',
    opacity: 0.7,
  },
  quickNavGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  quickNavCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickNavText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
