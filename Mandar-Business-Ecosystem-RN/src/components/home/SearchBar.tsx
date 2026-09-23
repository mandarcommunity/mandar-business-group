import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Search, MapPin, BriefcaseBusiness, BadgeCheck } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";
import { getAllBusinesses } from "../../services/business.service";
import { getAccessToken } from "../../utils/storage";

export default function SearchBar() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchBiz = async () => {
      try {
        const token = await getAccessToken();
        const res = await getAllBusinesses(token as string);
        
        const mapped = res.data.map((b: any) => ({
          id: b.id,
          businessName: b.business_name || "Unknown Business",
          industry: b.industries?.join(", ") || "",
          location: b.city && b.state ? `${b.city}, ${b.state}` : (b.city || b.state || ""),
          image: b.profile_image,
          products: b.products?.map((p: any) => p.name).join(", ") || "",
          verified: b.verified || false
        }));
        setBusinesses(mapped);
      } catch (err) {}
    };
    fetchBiz();
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    
    let filtered = businesses.filter(b => {
      return (
        b.businessName.toLowerCase().includes(q) ||
        b.industry.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.products.toLowerCase().includes(q)
      );
    });
    
    filtered.sort((a, b) => {
      if (a.verified === b.verified) return 0;
      return a.verified ? -1 : 1;
    });
    
    return filtered.slice(0, 5); // top 5 results
  }, [query, businesses]);

  const handleResultPress = (item: any) => {
    setQuery(""); // Clear search after selection
    navigation.navigate("BusinessProfile", { businessId: item.id });
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, isFocused && styles.containerFocused]}>
        <Search size={18} color={isFocused ? COLORS.primary : COLORS.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search businesses or products..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.input}
          returnKeyType="search"
        />
      </View>

      {query.length > 0 && (
        <View style={styles.resultsContainer}>
          {filteredResults.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No matches found</Text>
            </View>
          ) : (
            filteredResults.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.resultItem,
                  index === filteredResults.length - 1 && styles.lastResultItem
                ]}
                onPress={() => handleResultPress(item)}
              >
                <View style={styles.resultImageContainer}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.resultImage} />
                  ) : (
                    <BriefcaseBusiness size={20} color={COLORS.textMuted} />
                  )}
                </View>
                
                <View style={styles.resultInfo}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 }}><Text style={[styles.resultName, { marginBottom: 0 }]} numberOfLines={1}>{item.businessName}</Text>{item.verified && <BadgeCheck size={14} color="#3b82f6" />}</View>
                  
                  <View style={styles.resultMeta}>
                      {item.industry ? (
                        <Text style={[styles.resultMetaText, { flexShrink: 1 }]} numberOfLines={1}>{item.industry}</Text>
                      ) : null}
                      {item.industry && item.location ? (
                        <Text style={styles.metaDot}>-</Text>
                      ) : null}
                      {item.location ? (
                        <View style={{ flexDirection: "row", alignItems: "center", flexShrink: 1, gap: 2 }}>
                          <MapPin size={10} color="#71717a" />
                          <Text style={[styles.resultMetaText, { flexShrink: 1 }]} numberOfLines={1}>{item.location}</Text>
                        </View>
                      ) : null}
                    </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.xl,
    zIndex: 10,
  },
  container: {
    minHeight: 52,
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  containerFocused: {
    borderColor: COLORS.primary,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  resultsContainer: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  lastResultItem: {
    borderBottomWidth: 0,
  },
  resultImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
    overflow: "hidden",
  },
  resultImage: {
    width: "100%",
    height: "100%",
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  resultMetaText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  metaDot: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginHorizontal: 2,
  },
  emptyState: {
    padding: SPACING.lg,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
  }
});
