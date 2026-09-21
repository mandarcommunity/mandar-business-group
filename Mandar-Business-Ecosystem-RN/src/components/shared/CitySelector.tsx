import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import PrimaryInput from "../auth/PrimaryInput";

import {
  INDIA_LOCATIONS,
} from "../../constants/indiaLocations";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface CitySelectorProps {

  city: string;

  setCity:
    (value: string) => void;

  state: string;

  setState:
    (value: string) => void;
}

export default function CitySelector({

  city,

  setCity,

  state,

  setState,

}: CitySelectorProps) {

  const [
    showDropdown,

    setShowDropdown,

  ] = useState(false);

  const filteredCities =
    useMemo(() => {

      if (!city.trim()) {
        return [];
      }

      return INDIA_LOCATIONS.flatMap(
        (item: {
          state: string;

          cities: string[];
        }) =>

          item.cities.map(
            (cityName: string) => ({

              city: cityName,

              state:
                item.state,
            })
          )
      )

        .filter(
          (item: {
            city: string;

            state: string;
          }) =>

            item.city
              .toLowerCase()
              .includes(
                city.toLowerCase()
              )
        )

        .slice(0, 5);

    }, [city]);

  return (

    <View
      style={
        styles.container
      }
    >

      {/* CITY */}
      <PrimaryInput
        value={city}

        onChangeText={(
          text
        ) => {

          setCity(text);

          setState("");

          setShowDropdown(
            true
          );

        }}

        placeholder="City"

        autoCapitalize="words"
      />

      {/* DROPDOWN */}
      {showDropdown &&
      filteredCities.length >
        0 && (

        <View
          style={
            styles.dropdown
          }
        >

          {filteredCities.map(
            (
              item: {
                city: string;

                state: string;
              }
            ) => (

              <Pressable
                key={item.city}

                android_disableSound

                onPress={() => {

                  setCity(
                    item.city
                  );

                  setState(
                    item.state
                  );

                  setShowDropdown(
                    false
                  );

                }}

                style={
                  styles.dropdownItem
                }
              >

                <Text
                  style={
                    styles.dropdownText
                  }
                >

                  {item.city}
                  {" • "}
                  {item.state}

                </Text>

              </Pressable>

            )
          )}

        </View>

      )}

      {/* STATE */}
      <PrimaryInput
        value={state}

        editable={false}

        placeholder="State"
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginTop:
      SPACING.lg,

    zIndex: 999,
  },

  dropdown: {

  backgroundColor:
    COLORS.surface,

  borderRadius:
    SPACING.xl,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  marginTop:
    SPACING.xs,

  marginBottom:
    SPACING.md,

  overflow: "hidden",

  elevation: 5,

  zIndex: 999,

  maxHeight: 240,
},

  dropdownItem: {
    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.md,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,
  },

  dropdownText: {

  color:
    COLORS.textPrimary,

  fontSize:
    TYPOGRAPHY.body,

  fontWeight: "600",

  includeFontPadding:
    false,
},
});