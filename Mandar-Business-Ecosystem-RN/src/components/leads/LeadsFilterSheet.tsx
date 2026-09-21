import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  useMemo,
  useState,
} from "react";

import {
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react-native";

import MultiSelectDropdown
from "../shared/MultiSelectSearchDropdown";

import CitySelector
from "../shared/CitySelector";

import PrimaryButton
from "../shared/PrimaryButton";

import {
  COLORS,
  SPACING,
} from "../../theme";

import {
  INDUSTRIES,
} from "../../constants/industries";

interface LeadsFilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (industries: string[], city: string, state: string) => void;
  initialIndustries: string[];
  initialCity: string;
  initialState: string;
}

export default function LeadsFilterSheet({
  visible,
  onClose,
  onApply,
  initialIndustries,
  initialCity,
  initialState
}: LeadsFilterSheetProps) {

  const insets =
  useSafeAreaInsets();

  const [
    industryInput,
    setIndustryInput,
  ] = useState("");

  const [
    selectedIndustries,
    setSelectedIndustries,
  ] = useState<string[]>(initialIndustries || []);

  const [
    city,
    setCity,
  ] = useState(initialCity || "");

  const [
    state,
    setState,
  ] = useState(initialState || "");

  const [
    applying,

    setApplying,

  ] = useState(false);

  const activeFiltersCount =
    useMemo(() => {

      let count = 0;

      if (
        selectedIndustries.length
      ) {
        count +=
          selectedIndustries.length;
      }

      if (city) {
        count += 1;
      }

      if (state) {
        count += 1;
      }

      return count;

    }, [

      selectedIndustries,
      city,
      state,

    ]);

  const clearFilters = () => {

    setIndustryInput("");

    setSelectedIndustries([]);

    setCity("");

    setState("");

  };

  return (

    <Modal
      visible={visible}

      transparent

      animationType="slide"
    >

      {/* OVERLAY */}
      <View style={styles.overlay}>

        {/* SHEET */}
        <View style={styles.sheet}>

          {/* HANDLE */}
          <View style={styles.handle} />

          {/* HEADER */}
          <View style={styles.header}>

            <View
              style={
                styles.headerContent
              }
            >

              <View
                style={
                  styles.titleRow
                }
              >

                <View
                  style={
                    styles.iconWrapper
                  }
                >

                  <SlidersHorizontal
                    size={18}
                    color={
                      COLORS.accent
                    }
                  />

                </View>

                <Text
                  style={
                    styles.title
                  }
                >

                  Lead Filters

                </Text>

              </View>

              <Text
                style={
                  styles.subtitle
                }
              >

                Discover high-quality business opportunities faster.

              </Text>

            </View>

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={onClose}

              style={
                styles.closeButton
              }
            >

              <X
                size={18}
                color={
                  COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          {/* ACTIVE FILTERS */}
          {activeFiltersCount >
            0 && (

            <View
              style={
                styles.activeBox
              }
            >

              <View
                style={
                  styles.activeTop
                }
              >

                <Sparkles
                  size={15}
                  color={
                    COLORS.accent
                  }
                />

                <Text
                  style={
                    styles.activeTitle
                  }
                >

                  Active Filters

                </Text>

              </View>

              <Text
                style={
                  styles.activeText
                }
              >

                {
                  activeFiltersCount
                }{" "}
                filters currently applied

              </Text>

            </View>

          )}

          {/* CONTENT */}
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }

            keyboardShouldPersistTaps="handled"

            contentContainerStyle={
              styles.contentContainer
            }
          >

            {/* INDUSTRIES */}
            <View
              style={
                styles.section
              }
            >

              <MultiSelectDropdown
                label="Industries"

                placeholder="Search Industries"

                data={INDUSTRIES}

                value={industryInput}

                onChangeValue={
                  setIndustryInput
                }

                selectedItems={
                  selectedIndustries
                }

                onChangeSelectedItems={
                  setSelectedIndustries
                }
              />

            </View>

            {/* LOCATION */}
            <View
              style={
                styles.section
              }
            >

              <CitySelector
                city={city}

                state={state}

                setCity={setCity}

                setState={setState}
              />

            </View>

          </ScrollView>

          {/* FOOTER */}
          <View
  style={[

    styles.footer,

    {
      paddingBottom:
        insets.bottom + 16,
    },

  ]}
>

            {/* RESET */}
            <TouchableOpacity
              activeOpacity={0.85}

              onPress={
                clearFilters
              }

              style={
                styles.resetButton
              }
            >

              <Text
                style={
                  styles.resetText
                }
              >

                Reset

              </Text>

            </TouchableOpacity>

            {/* APPLY */}
            <View
              style={
                styles.applyWrapper
              }
            >

              <PrimaryButton
                text={
                  applying
                    ? "Applying..."
                    : "Apply Filters"
                }

                disabled={
                  applying
                }

                onPress={() => {
                  setApplying(true);
                  setTimeout(() => {
                    setApplying(false);
                    onApply(selectedIndustries, city, state);
                    onClose();
                  }, 500);
                }}
              />

            </View>

          </View>

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
    backgroundColor:
      COLORS.background,

    borderTopLeftRadius: 34,

    borderTopRightRadius: 34,

    paddingTop:
      SPACING.lg,

    maxHeight: "90%",
  },

  handle: {
    width: 54,

    height: 5,

    borderRadius: 999,

    backgroundColor:
      "#d8d1c5",

    alignSelf: "center",

    marginBottom:
      SPACING.lg,
  },

  header: {
    flexDirection: "row",

    alignItems: "flex-start",

    justifyContent:
      "space-between",

    paddingHorizontal:
      SPACING.lg,

    marginBottom:
      SPACING.lg,
  },

  headerContent: {
    flex: 1,

    paddingRight:
      SPACING.md,
  },

  titleRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconWrapper: {
    width: 40,

    height: 40,

    borderRadius: 14,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    marginRight:
      SPACING.sm,
  },

  title: {
    fontSize: 20,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  subtitle: {
    marginTop: 8,

    fontSize: 12,

    lineHeight: 19,

    color:
      COLORS.textSecondary,
  },

  closeButton: {
    width: 42,

    height: 42,

    borderRadius: 14,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  activeBox: {
    marginHorizontal:
      SPACING.lg,

    marginBottom:
      SPACING.lg,

    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,

    padding:
      SPACING.lg,
  },

  activeTop: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,
  },

  activeTitle: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  activeText: {
    marginTop: 6,

    fontSize: 12,

    lineHeight: 18,

    color:
      COLORS.textSecondary,
  },

  contentContainer: {
    paddingHorizontal:
      SPACING.lg,

    paddingBottom:
      SPACING.xl,

    gap:
      SPACING.xl,
  },

  section: {
    gap: SPACING.md,
  },

  footer: {
    flexDirection: "row",

    alignItems: "center",

    gap:
      SPACING.md,

    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.xl,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,
  },

  resetButton: {
    height: 54,

    paddingHorizontal:
      SPACING.xl,

    borderRadius: 18,

    backgroundColor:
      COLORS.surfaceSecondary,

    alignItems: "center",

    justifyContent: "center",
  },

  resetText: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  applyWrapper: {
    flex: 1,
  },

});