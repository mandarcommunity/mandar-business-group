import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable, StyleSheet, Text, View, Linking } from "react-native";
import { useEffect, useRef, useState, useMemo } from "react";
import { Sparkles } from "lucide-react-native";
import { COLORS, SPACING } from "../../theme";

const PREMIUM_CARD_WIDTH = 280;
const PLAIN_CARD_WIDTH = 220;

export default function SponsoredCarousel({ ads }: { ads: any[] }) {
  const navigation = useNavigation<any>();
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Split and sort ads
  const topRowAds = useMemo(() => {
    let top = ads?.filter(a => a.row_placement === 'top' || !a.row_placement) || [];
    // Ensure Paxzillion or Premium is first
    top.sort((a, b) => {
      if (a.title?.toLowerCase().includes("paxzillion")) return -1;
      if (b.title?.toLowerCase().includes("paxzillion")) return 1;
      if (a.image_url && !b.image_url) return -1;
      if (!a.image_url && b.image_url) return 1;
      return 0;
    });
    return top;
  }, [ads]);

  let bottomRowAds = useMemo(() => {
    return ads?.filter(a => a.row_placement === 'bottom') || [];
  }, [ads]);
  
  if (bottomRowAds.length === 0 && topRowAds.length > 3) {
    bottomRowAds = topRowAds.slice(3);
  }

  // Duplicate for infinite marquee effect
  const extendedBottomRowAds = useMemo(() => Array(100).fill(bottomRowAds).flat(), [bottomRowAds]);

  useEffect(() => {
    let topIndex = 0;
    const topInterval = setInterval(() => {
      if (!topRowAds || topRowAds.length === 0) return;
      
      topIndex = (topIndex + 1) % topRowAds.length;
      
      setActiveIndex(topIndex);
      topRef.current?.scrollToIndex({
        index: topIndex,
        animated: true,
      });
    }, 2500);

    // Continuous slow marquee for bottom row
    let bottomOffset = 0;
    const bottomInterval = setInterval(() => {
      if (!bottomRowAds || bottomRowAds.length === 0) return;
      bottomOffset += 1; // Slow constant speed
      bottomRef.current?.scrollToOffset({
        offset: bottomOffset,
        animated: false,
      });
    }, 16);

    return () => {
      clearInterval(topInterval);
      clearInterval(bottomInterval);
    };
  }, [topRowAds, bottomRowAds]);

  function handlePress(url?: string) {
    if (url) {
      Linking.openURL(url).catch(() => navigation.navigate("SponsorEnquiry"));
    } else {
      navigation.navigate("SponsorEnquiry");
    }
  }

  const getTopItemLayout = (data: any, index: number) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (data[i]?.image_url ? PREMIUM_CARD_WIDTH : PLAIN_CARD_WIDTH) + SPACING.md;
    }
    const length = (data[index]?.image_url ? PREMIUM_CARD_WIDTH : PLAIN_CARD_WIDTH) + SPACING.md;
    return { length, offset, index };
  };

  function renderCard({ item, index }: { item: any, index: number }) {
    if (item.image_url) {
      return (
        <Pressable style={styles.premiumCard} onPress={() => handlePress(item.destination_url)}>
          <Image source={{ uri: item.image_url }} style={styles.premiumImage} />
          <View style={styles.darkOverlay} />
          <View style={styles.glowCircle} />
          <View style={styles.overlay}>
            {item.badge && (
              <View style={styles.badge}>
                <Sparkles size={10} color={COLORS.white} />
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            <View>
              <Text numberOfLines={2} style={styles.premiumTitle}>{item.title}</Text>
              {item.subtitle && <Text numberOfLines={2} style={styles.premiumSubtitle}>{item.subtitle}</Text>}
              {item.description && <Text numberOfLines={3} style={styles.premiumDescription}>{item.description}</Text>}
            </View>
            <Text style={styles.ctaText}>Explore Sponsorship ✨</Text>
          </View>
        </Pressable>
      );
    }
    
    // Fallback plain card
    return (
      <Pressable style={styles.plainCard} onPress={() => handlePress(item.destination_url)}>
        <Text numberOfLines={1} style={styles.plainTitle}>{item.title}</Text>
        {item.subtitle && <Text numberOfLines={1} style={styles.plainSubtitle}>{item.subtitle}</Text>}
        <Text style={styles.plainCTA}>{item.destination_url ? "Learn More" : "Contact Us"}</Text>
      </Pressable>
    );
  }

  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled={false}
        decelerationRate="fast"
        data={topRowAds}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={getTopItemLayout}
      />
      
      {bottomRowAds.length > 0 && (
        <View style={styles.bottomRowContainer}>
          <FlatList
            ref={bottomRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={extendedBottomRowAds}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderCard}
            contentContainerStyle={styles.bottomListContent}
            decelerationRate="fast"
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={styles.dotsRow}>
        {topRowAds.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  listContent: { paddingRight: SPACING.lg, paddingLeft: SPACING.md },
  bottomListContent: { paddingRight: SPACING.lg, paddingLeft: SPACING.xl },
  bottomRowContainer: { marginTop: SPACING.md },
  premiumCard: { width: PREMIUM_CARD_WIDTH, height: 180, borderRadius: SPACING.xxxl, overflow: "hidden", marginRight: SPACING.md, backgroundColor: COLORS.surface, position: "relative" },
  premiumImage: { width: "100%", height: "100%" },
  darkOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.72)" },
  glowCircle: { position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)" },
  overlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, padding: SPACING.lg, gap: SPACING.sm, justifyContent: "space-between" },
  badge: { flexDirection: "row", alignItems: "center", gap: SPACING.xs, alignSelf: "flex-start", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.12)", paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  badgeText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.5, color: COLORS.white, includeFontPadding: false },
  premiumTitle: { marginTop: SPACING.md, fontSize: 20, lineHeight: 24, fontWeight: "800", color: COLORS.white, includeFontPadding: false },
  premiumSubtitle: { marginTop: SPACING.xs, fontSize: 12, lineHeight: 18, fontWeight: "700", color: "rgba(255,255,255,0.82)", includeFontPadding: false },
  premiumDescription: { marginTop: SPACING.sm, fontSize: 11, lineHeight: 18, color: "rgba(255,255,255,0.88)", includeFontPadding: false },
  ctaText: { fontSize: 12, fontWeight: "800", color: "#bbf7d0", includeFontPadding: false },
  dotsRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: SPACING.md, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 999, backgroundColor: COLORS.border },
  activeDot: { width: 22, backgroundColor: COLORS.accent },
  plainCard: { width: PLAIN_CARD_WIDTH, height: 120, borderRadius: SPACING.xxxl, marginRight: SPACING.md, backgroundColor: COLORS.primary, padding: SPACING.lg, justifyContent: "center" },
  plainTitle: { fontSize: 20, fontWeight: "800", color: COLORS.white, includeFontPadding: false },
  plainSubtitle: { marginTop: SPACING.xs, fontSize: 12, lineHeight: 18, color: "rgba(255,255,255,0.82)", includeFontPadding: false },
  plainCTA: { marginTop: SPACING.md, fontSize: 12, fontWeight: "700", color: "#bbf7d0", includeFontPadding: false }
});