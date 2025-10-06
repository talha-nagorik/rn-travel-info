import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const curatedGallery = [
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=1600&q=80',
];

export default function GalleryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={
        colorScheme === 'dark'
          ? ['#0f1419', '#1a1f2e']
          : ['#f7f9fb', '#e8f0f7']
      }
      style={styles.container}
    >
      <FlatList
        data={curatedGallery}
        keyExtractor={uri => uri}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.duration(600)
              .delay(index * 100)
              .springify()
              .damping(20)
              .stiffness(100)}
            style={styles.gridItem}
          >
            <Pressable onPress={() => setSelectedImage(item)}>
              <MotiView
                from={{ scale: 1 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 200,
                }}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item }} style={styles.thumbnail} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  />
                  <View style={styles.imageIconContainer}>
                    <IconSymbol size={20} name="eye.fill" color="#fff" />
                  </View>
                </View>
              </MotiView>
            </Pressable>
          </Animated.View>
        )}
        numColumns={2}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Enhanced Modal */}
      <Modal
        animationType="fade"
        visible={!!selectedImage}
        transparent
        onRequestClose={() => setSelectedImage(null)}
        statusBarTranslucent
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.backdropPressable} onPress={() => setSelectedImage(null)} />

          <Animated.View
            entering={ZoomIn.duration(400).springify().damping(20).stiffness(100)}
            style={styles.modalContentWrapper}
          >
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? 'rgba(18,18,18,0.98)' : 'rgba(255,255,255,0.98)',
                },
              ]}
            >
              {selectedImage && (
                <>
                  <View style={styles.modalImageContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.modalImage} />
                  </View>

                  <View style={styles.modalActions}>
                    <Pressable
                      onPress={() => setSelectedImage(null)}
                      style={[
                        styles.modalButton,
                        { backgroundColor: Colors[colorScheme].tint },
                      ]}
                    >
                      <IconSymbol size={18} name="xmark" color="#fff" />
                      <ThemedText style={styles.modalButtonText}>Close</ThemedText>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  gridItem: {
    flex: 1,
  },
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  imageIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContentWrapper: {
    width: '100%',
    maxWidth: 500,
  },
  modalContent: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 16,
  },
  modalImageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalActions: {
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
