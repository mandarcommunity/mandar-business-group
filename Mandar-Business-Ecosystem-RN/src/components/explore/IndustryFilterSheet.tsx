import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  X,
} from "lucide-react-native";

import {
  dummyBusinesses,
} from "../../data/dummyBusinesses";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface IndustryFilterSheetProps {

  visible: boolean;

  onClose: () => void;

  selectedStates: string[];

  setSelectedStates:
    (states: string[]) => void;

  selectedCities: string[];

  setSelectedCities:
    (cities: string[]) => void;

  featuredOnly: boolean;

  setFeaturedOnly:
    (value: boolean) => void;

  recentlyActiveOnly: boolean;

  setRecentlyActiveOnly:
    (value: boolean) => void;

  hasCatalogOnly: boolean;

  setHasCatalogOnly:
    (value: boolean) => void;
}

export default function IndustryFilterSheet({
  visible,
  onClose,
  selectedStates,
  setSelectedStates,
  selectedCities,
  setSelectedCities,
  featuredOnly,
  setFeaturedOnly,
  recentlyActiveOnly,
  setRecentlyActiveOnly,
  hasCatalogOnly,
  setHasCatalogOnly,
}: IndustryFilterSheetProps) {

  const [stateSearch, setStateSearch] =
    useState("");

  const [citySearch, setCitySearch] =
    useState("");

  /* STATES */
  const states = useMemo(() => {

    const uniqueStates =
      dummyBusinesses.map(
        (business) =>
          business.location
            .split(",")[1]
            ?.trim()
      );

    return [...new Set(uniqueStates)];

  }, []);

  /* CITIES */
  const cities = useMemo(() => {

    const uniqueCities =
      dummyBusinesses.map(
        (business) =>
          business.location
            .split(",")[0]
            ?.trim()
      );

    return [...new Set(uniqueCities)];

  }, []);

  /* FILTERED STATES */
  const filteredStates =
    states.filter((state) =>
      state
        ?.toLowerCase()
        .includes(
          stateSearch.toLowerCase()
        )
    );

  /* FILTERED CITIES */
  const filteredCities =
    cities.filter((city) =>
      city
        ?.toLowerCase()
        .includes(
          citySearch.toLowerCase()
        )
    );

  /* TOGGLE STATE */
  const toggleState =
    (state: string) => {

      if (
        selectedStates.includes(
          state
        )
      ) {

        setSelectedStates(
          selectedStates.filter(
            (item) =>
              item !== state
          )
        );

      } else {

        setSelectedStates([
          ...selectedStates,
          state,
        ]);
      }
    };

  /* TOGGLE CITY */
  const toggleCity =
    (city: string) => {

      if (
        selectedCities.includes(
          city
        )
      ) {

        setSelectedCities(
          selectedCities.filter(
            (item) =>
              item !== city
          )
        );

      } else {

        setSelectedCities([
          ...selectedCities,
          city,
        ]);
      }
    };

  return (
    <Modal
      visible={visible}

      transparent

      animationType="slide"
    >

      <View style={styles.overlay}>

        <View style={styles.sheet}>

          {/* HEADER */}
          <View style={styles.header}>

            <Text style={styles.title}>
              Filters
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClose}
            >

              <X
                size={22}
                color={
                  COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
          >

            {/* STATE */}
            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                States
              </Text>

              <TextInput
                value={stateSearch}

                onChangeText={
                  setStateSearch
                }

                placeholder="Search states..."

                placeholderTextColor={
                  COLORS.textSecondary
                }

                style={styles.searchInput}
              />

              <View style={styles.options}>

                {filteredStates.map(
                  (state) => {

                    const active =
                      selectedStates.includes(
                        state || ""
                      );

                    return (
                      <TouchableOpacity
                        key={state}

                        activeOpacity={0.85}

                        onPress={() =>
                          toggleState(
                            state || ""
                          )
                        }

                        style={[
                          styles.optionChip,

                          active &&
                            styles.activeChip,
                        ]}
                      >

                        <Text
                          style={[
                            styles.optionText,

                            active &&
                              styles.activeText,
                          ]}
                        >
                          {state}
                        </Text>

                      </TouchableOpacity>
                    );
                  }
                )}

              </View>

            </View>

            {/* CITY */}
            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Cities
              </Text>

              <TextInput
                value={citySearch}

                onChangeText={
                  setCitySearch
                }

                placeholder="Search cities..."

                placeholderTextColor={
                  COLORS.textSecondary
                }

                style={styles.searchInput}
              />

              <View style={styles.options}>

                {filteredCities.map(
                  (city) => {

                    const active =
                      selectedCities.includes(
                        city || ""
                      );

                    return (
                      <TouchableOpacity
                        key={city}

                        activeOpacity={0.85}

                        onPress={() =>
                          toggleCity(
                            city || ""
                          )
                        }

                        style={[
                          styles.optionChip,

                          active &&
                            styles.activeChip,
                        ]}
                      >

                        <Text
                          style={[
                            styles.optionText,

                            active &&
                              styles.activeText,
                          ]}
                        >
                          {city}
                        </Text>

                      </TouchableOpacity>
                    );
                  }
                )}

              </View>

            </View>

            {/* TOGGLES */}
            <View style={styles.section}>

              <View style={styles.toggleRow}>

                <Text style={styles.toggleText}>
                  Featured Only
                </Text>

                <Switch
                  value={featuredOnly}
                  onValueChange={
                    setFeaturedOnly
                  }
                />

              </View>

              <View style={styles.toggleRow}>

                <Text style={styles.toggleText}>
                  Recently Active
                </Text>

                <Switch
                  value={
                    recentlyActiveOnly
                  }

                  onValueChange={
                    setRecentlyActiveOnly
                  }
                />

              </View>

              <View style={styles.toggleRow}>

                <Text style={styles.toggleText}>
                  Has Catalog
                </Text>

                <Switch
                  value={hasCatalogOnly}

                  onValueChange={
                    setHasCatalogOnly
                  }
                />

              </View>

            </View>

            {/* APPLY */}
            <TouchableOpacity
              activeOpacity={0.9}

              onPress={onClose}

              style={styles.applyButton}
            >

              <Text style={styles.applyText}>
                Apply Filters
              </Text>

            </TouchableOpacity>

          </ScrollView>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.35)",

    justifyContent: "flex-end",
  },

  sheet: {
    height: "88%",

    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 34,

    borderTopRightRadius: 34,

    padding: SPACING.xl,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.xl,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  section: {
    marginBottom:
      SPACING.xxxl,
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.md,
  },

  searchInput: {
    height: 54,

    borderRadius: 20,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    fontSize: 14,

    color:
      COLORS.textPrimary,

    marginBottom:
      SPACING.lg,
  },

  options: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,
  },

  optionChip: {
    height: 42,

    borderRadius: 999,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    alignItems: "center",

    justifyContent: "center",
  },

  activeChip: {
    backgroundColor:
      COLORS.accent,

    borderColor:
      COLORS.accent,
  },

  optionText: {
    fontSize: 13,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  activeText: {
    color: COLORS.white,
  },

  toggleRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom:
      SPACING.xl,
  },

  toggleText: {
    fontSize: 14,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  applyButton: {
    height: 56,

    borderRadius: 22,

    backgroundColor:
      COLORS.accent,

    alignItems: "center",

    justifyContent: "center",

    marginBottom:
      SPACING.xxxl,
  },

  applyText: {
    fontSize: 15,

    fontWeight: "700",

    color: COLORS.white,
  },
});