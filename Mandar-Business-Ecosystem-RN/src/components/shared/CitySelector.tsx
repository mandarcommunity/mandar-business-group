import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useMemo, useState } from "react";
import PrimaryInput from "../auth/PrimaryInput";
import { INDIA_LOCATIONS } from "../../constants/indiaLocations";
import { COLORS, SPACING, TYPOGRAPHY } from "../../theme";

interface CitySelectorProps {
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
}

export default function CitySelector({ city, setCity, state, setState }: CitySelectorProps) {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Get list of all states for the state dropdown
  const filteredStates = useMemo(() => {
    const allStates = INDIA_LOCATIONS.map(item => item.state);
    if (!state.trim()) return allStates;
    return allStates.filter(s => s.toLowerCase().includes(state.toLowerCase()));
  }, [state]);

  // Get list of cities for the selected state
  const filteredCities = useMemo(() => {
    if (!city.trim() || !state.trim()) return [];
    
    // Exact state match
    const stateObj = INDIA_LOCATIONS.find(item => item.state.toLowerCase() === state.toLowerCase());
    if (!stateObj) return [];

    return stateObj.cities
      .filter(c => c.toLowerCase().includes(city.toLowerCase()))
      .slice(0, 5); // show top 5 matches
  }, [city, state]);

  return (
    <View style={styles.container}>
      {/* STATE INPUT */}
      <PrimaryInput
        value={state}
        onChangeText={(text) => {
          setState(text);
          setShowStateDropdown(true);
          setShowCityDropdown(false);
        }}
        onFocus={() => {
          setShowStateDropdown(true);
          setShowCityDropdown(false);
        }}
        placeholder="State"
        autoCapitalize="words"
      />

      {/* STATE DROPDOWN */}
      {showStateDropdown && filteredStates.length > 0 && (
        <View style={styles.dropdown}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {filteredStates.map((s) => (
              <Pressable
                key={s}
                android_disableSound
                onPress={() => {
                  setState(s);
                  setShowStateDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{s}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={{ height: SPACING.md }} />

      {/* CITY / VILLAGE INPUT */}
      <PrimaryInput
        value={city}
        onChangeText={(text) => {
          setCity(text);
          setShowCityDropdown(true);
          setShowStateDropdown(false);
        }}
        onFocus={() => {
          setShowCityDropdown(true);
          setShowStateDropdown(false);
        }}
        placeholder="City or Village"
        autoCapitalize="words"
      />

      {/* CITY DROPDOWN */}
      {showCityDropdown && filteredCities.length > 0 && (
        <View style={styles.dropdown}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {filteredCities.map((c) => (
              <Pressable
                key={c}
                android_disableSound
                onPress={() => {
                  setCity(c);
                  setShowCityDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    zIndex: 999,
  },
  dropdown: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 5,
    zIndex: 999,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownText: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: "600",
    includeFontPadding: false,
  },
});
