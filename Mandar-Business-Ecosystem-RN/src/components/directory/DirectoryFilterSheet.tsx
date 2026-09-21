import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  useState,
} from "react";

import {
  X,
} from "lucide-react-native";

import PrimaryButton from "../shared/PrimaryButton";

import MultiSelectDropdown
from "../shared/MultiSelectSearchDropdown";

import CitySelector
from "../shared/CitySelector";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

import {
  INDUSTRIES,
} from "../../constants/industries";

interface DirectoryFilterSheetProps {

  visible: boolean;

  onClose: () => void;

  selectedIndustries: string[];

  setSelectedIndustries:
    React.Dispatch<
      React.SetStateAction<string[]>
    >;

  city: string;

  setCity:
    React.Dispatch<
      React.SetStateAction<string>
    >;

  state: string;

  setState:
    React.Dispatch<
      React.SetStateAction<string>
    >;

  verifiedOnly: boolean;

  setVerifiedOnly:
    React.Dispatch<
      React.SetStateAction<boolean>
    >;

}

export default function DirectoryFilterSheet({

  visible,

  onClose,

  selectedIndustries,

  setSelectedIndustries,

  city,

  setCity,

  state,

  setState,

  verifiedOnly,

  setVerifiedOnly,

}: DirectoryFilterSheetProps) {

  const insets =
  useSafeAreaInsets();

  const [
    industryInput,

    setIndustryInput,

  ] = useState("");

  const [
    applying,

    setApplying,

  ] = useState(false);

  const handleApply = () => {

    setApplying(true);

    setTimeout(() => {

      setApplying(false);

      onClose();

    }, 400);

  };

  const handleReset = () => {

    setIndustryInput("");

    setSelectedIndustries([]);

    setCity("");

    setState("");

    setVerifiedOnly(false);

  };

  return (

    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >

      <View style={styles.overlay}>

        <View style={styles.sheet}>

          {/* HANDLE */}
          <View style={styles.handle} />

          {/* HEADER */}
          <View style={styles.header}>

            <View style={styles.headerContent}>

              <Text style={styles.title}>
                Filters
              </Text>

              <Text style={styles.subtitle}>
                Refine directory results.
              </Text>

            </View>

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={onClose}

              style={styles.closeButton}
            >

              <X
                size={18}
                color={
                  COLORS.textPrimary
                }
              />

            </TouchableOpacity>

          </View>

          {/* BODY */}
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }

            keyboardShouldPersistTaps="handled"

            contentContainerStyle={
              styles.scrollContent
            }
          >

            {/* INDUSTRIES */}
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

            {/* CITY */}
            <CitySelector
              city={city}

              state={state}

              setCity={setCity}

              setState={setState}
            />

            {/* VERIFIED */}
            <View style={styles.switchRow}>

              <View
                style={
                  styles.switchContent
                }
              >

                <Text
                  style={
                    styles.switchTitle
                  }
                >

                  Verified Businesses

                </Text>

                <Text
                  style={
                    styles.switchSubtitle
                  }
                >

                  Show verified businesses only.

                </Text>

              </View>

              <Switch
                value={verifiedOnly}

                onValueChange={
                  setVerifiedOnly
                }

                trackColor={{

                  false: "#d9d2c7",

                  true: COLORS.accent,

                }}

                thumbColor={
                  COLORS.white
                }
              />

            </View>

            {/* ACTIVE FILTERS */}
            {(selectedIndustries.length > 0 ||

              city ||

              state ||

              verifiedOnly) && (

              <View
                style={
                  styles.activeFiltersBox
                }
              >

                <Text
                  style={
                    styles.activeFiltersTitle
                  }
                >

                  Active Filters

                </Text>

                {!!selectedIndustries.length && (

                  <Text
                    style={
                      styles.activeFilterText
                    }
                  >

                    Industries:
                    {" "}
                    {selectedIndustries.join(
                      ", "
                    )}

                  </Text>

                )}

                {!!city && (

                  <Text
                    style={
                      styles.activeFilterText
                    }
                  >

                    City:
                    {" "}
                    {city}

                  </Text>

                )}

                {!!state && (

                  <Text
                    style={
                      styles.activeFilterText
                    }
                  >

                    State:
                    {" "}
                    {state}

                  </Text>

                )}

                {verifiedOnly && (

                  <Text
                    style={
                      styles.activeFilterText
                    }
                  >

                    Verified Only Enabled

                  </Text>

                )}

              </View>

            )}

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

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={handleReset}

              style={styles.resetButton}
            >

              <Text
                style={styles.resetText}
              >

                Reset

              </Text>

            </TouchableOpacity>

            <View
              style={
                styles.applyButtonWrapper
              }
            >

              <PrimaryButton
                text={
                  applying
                    ? "Applying..."
                    : "Apply Filters"
                }

                disabled={applying}

                onPress={handleApply}
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

    borderTopLeftRadius: 32,

    borderTopRightRadius: 32,

    paddingTop:
      SPACING.lg,

    maxHeight: "88%",
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

  title: {
    fontSize: 18,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  subtitle: {
    marginTop: 6,

    fontSize: 12,

    lineHeight: 18,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
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

  scrollContent: {
    paddingHorizontal:
      SPACING.lg,

    paddingBottom:
      SPACING.lg,

    gap:
      SPACING.lg,
  },

  switchRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    padding:
      SPACING.lg,

    borderRadius: 24,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,
  },

  switchContent: {
    flex: 1,

    paddingRight:
      SPACING.md,
  },

  switchTitle: {
    fontSize: 14,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  switchSubtitle: {
    marginTop: 4,

    fontSize:
      TYPOGRAPHY.small,

    lineHeight: 18,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
  },

  activeFiltersBox: {
    borderRadius: 24,

    backgroundColor:
      COLORS.surfaceSecondary,

    padding:
      SPACING.lg,

    gap:
      SPACING.sm,
  },

  activeFiltersTitle: {
    fontSize: 13,

    fontWeight: "700",

    color:
      COLORS.textPrimary,

    includeFontPadding:
      false,
  },

  activeFilterText: {
    fontSize: 12,

    lineHeight: 18,

    color:
      COLORS.textSecondary,

    includeFontPadding:
      false,
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

    includeFontPadding:
      false,
  },

  applyButtonWrapper: {
    flex: 1,
  },

});