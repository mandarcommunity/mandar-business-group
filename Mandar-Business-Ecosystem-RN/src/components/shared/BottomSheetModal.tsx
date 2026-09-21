import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  ReactNode,
} from "react";

import {
  COLORS,
  SPACING,
} from "../../theme";

interface BottomSheetModalProps {
  visible: boolean;

  onClose: () => void;

  children: ReactNode;
}

export default function BottomSheetModal({
  visible,
  onClose,
  children,
}: BottomSheetModalProps) {

  const insets =
    useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >

      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >

        <Pressable
  style={[

    styles.sheet,

    {
      paddingBottom:
        insets.bottom +
        SPACING.xl,
    },

  ]}
>

          <View style={styles.handle} />

          {children}

        </Pressable>

      </Pressable>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.35)",

    justifyContent: "flex-end",
  },

  sheet: {

  backgroundColor:
    COLORS.background,

  borderTopLeftRadius:
    SPACING.xxxl,

  borderTopRightRadius:
    SPACING.xxxl,

  paddingTop:
    SPACING.xl,

  paddingHorizontal:
    SPACING.xl,

  maxHeight: "90%",
},

  handle: {
    width: 54,

    height: 5,

    borderRadius: 999,

    backgroundColor: COLORS.border,

    alignSelf: "center",

    marginBottom: SPACING.xl,
  },
});