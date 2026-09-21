import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface MultiSelectSearchDropdownProps {

  title?: string;

  label?: string;

  placeholder: string;

  data: string[];

  value: string;

  onChangeValue:
    (value: string) => void;

  selectedItems: string[];

  onChangeSelectedItems:
    (items: string[]) => void;

  maxSelectedItems?: number;
}

export default function MultiSelectSearchDropdown({

  title,

  label,

  placeholder,

  data,

  value,

  onChangeValue,

  selectedItems,

  onChangeSelectedItems,

  maxSelectedItems,

}: MultiSelectSearchDropdownProps) {

  const [
    isFocused,

    setIsFocused,

  ] = useState(false);

  const filteredItems =
    useMemo(() => {

      if (!value.trim()) {
        return [];
      }

      return data.filter(
        (item: string) =>

          item
            .toLowerCase()
            .includes(
              value.toLowerCase()
            ) &&

          !selectedItems.includes(
            item
          )
      ).slice(0, 6);

    }, [
      value,
      data,
      selectedItems,
    ]);

  return (

    <View
      style={
        styles.container
      }
    >

      {(title || label) && (

        <Text
          style={
            styles.label
          }
        >

          {title || label}

        </Text>

      )}

      {/* INPUT */}
      <View
        style={[

          styles.inputWrapper,

          isFocused &&
            styles.activeInputWrapper,

        ]}
      >

        <TextInput
          value={value}

          onChangeText={
            onChangeValue
          }

          onFocus={() =>
            setIsFocused(
              true
            )
          }

          onBlur={() => {

            setTimeout(() => {

              setIsFocused(
                false
              );

            }, 150);

          }}

          placeholder={placeholder}

          placeholderTextColor={
            COLORS.textMuted
          }

          style={
            styles.input
          }
        />

      </View>

      {/* SELECTED CHIPS */}
      {selectedItems.length >
        0 && (

        <View
          style={
            styles.selectedWrapper
          }
        >

          {selectedItems.map(
            (
              item: string
            ) => (

              <View
                key={item}

                style={
                  styles.selectedChip
                }
              >

                <Text
                  style={
                    styles.selectedChipText
                  }
                >

                  {item}

                </Text>

                <Pressable
                  hitSlop={10}

                  onPress={() => {

                    onChangeSelectedItems(

                      selectedItems.filter(
                        (
                          selectedItem: string
                        ) =>

                          selectedItem !==
                          item
                      )

                    );

                  }}
                >

                  <Text
                    style={
                      styles.removeText
                    }
                  >

                    ✕

                  </Text>

                </Pressable>

              </View>

            )
          )}

        </View>

      )}

      {/* DROPDOWN */}
      {filteredItems.length >
        0 && (

        <View
          style={
            styles.dropdown
          }
        >

          {filteredItems.map(
            (
              item: string
            ) => (

              <Pressable
                key={item}

                android_disableSound

                onPress={() => {
                  if (maxSelectedItems && selectedItems.length >= maxSelectedItems) {
                    const { Alert } = require('react-native');
                    Alert.alert("Limit Reached", `You can only select up to ${maxSelectedItems} items.`);
                    return;
                  }

                  onChangeSelectedItems([
                    ...selectedItems,
                    item,
                  ]);

                  onChangeValue("");

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

                  {item}

                </Text>

              </Pressable>

            )
          )}

        </View>

      )}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginTop:
      SPACING.lg,

    zIndex: 999,
  },

  label: {

  fontSize:
    TYPOGRAPHY.caption,

  fontWeight: "700",

  color:
    COLORS.textPrimary,

  marginBottom:
    SPACING.sm,

  includeFontPadding:
    false,
},

  inputWrapper: {

  borderRadius:
    SPACING.xl,
},

  activeInputWrapper: {
    borderWidth: 1,

    borderColor:
      COLORS.accent,

    backgroundColor:
      COLORS.surface,
  },

  input: {

  minHeight: 54,

  borderRadius:
    SPACING.xl,

  backgroundColor:
    COLORS.surface,

  borderWidth: 1,

  borderColor:
    COLORS.border,

  paddingHorizontal:
    SPACING.lg,

  paddingVertical:
    SPACING.md,

  color:
    COLORS.textPrimary,

  fontSize:
    TYPOGRAPHY.body,

  textAlignVertical:
    "center",

  includeFontPadding:
    false,
},

  selectedWrapper: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: SPACING.sm,

    marginTop:
      SPACING.md,
  },

  selectedChip: {

  flexDirection: "row",

  alignItems: "center",

  backgroundColor:
    COLORS.accent,

  borderRadius: 999,

  paddingHorizontal:
    SPACING.md,

  paddingVertical:
    SPACING.sm,

  gap:
    SPACING.sm,
},

  selectedChipText: {

  color:
    COLORS.white,

  fontSize:
    TYPOGRAPHY.caption,

  fontWeight: "700",

  includeFontPadding:
    false,
},

  removeText: {

  color:
    COLORS.white,

  fontWeight: "700",

  fontSize:
    TYPOGRAPHY.caption,

  includeFontPadding:
    false,
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
    SPACING.sm,

  overflow: "hidden",

  elevation: 6,

  zIndex: 999,

  maxHeight: 260,
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