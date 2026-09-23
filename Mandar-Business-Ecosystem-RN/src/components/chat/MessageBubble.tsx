import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../../theme";

interface MessageBubbleProps {
  message: string;

  time: string;

  isSender?: boolean;
}

export default function MessageBubble({
  message,
  time,
  isSender,
}: MessageBubbleProps) {

  return (
    <View
      style={[
        styles.wrapper,

        isSender
          ? styles.senderWrapper
          : styles.receiverWrapper,
      ]}
    >

      <View
        style={[
          styles.bubble,

          isSender
            ? styles.senderBubble
            : styles.receiverBubble,
        ]}
      >

        {/* MESSAGE */}
                {message.startsWith("[IMAGE]") ? (
          <Image 
            source={{ uri: message.substring(7) }} 
            style={{ width: 220, height: 220, borderRadius: 12, marginBottom: 8, backgroundColor: "#f0f0f0" }} 
            resizeMode="cover"
          />
        ) : (
          <Text
            style={[
              styles.message,
              isSender && styles.senderMessage,
            ]}
          >
            {message}
          </Text>
        )}

        {/* TIME */}
        <Text
          style={[
            styles.time,

            isSender
              ? styles.senderTime
              : styles.receiverTime,
          ]}
        >
          {time}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    marginBottom: SPACING.md,
  },

  senderWrapper: {
    alignItems: "flex-end",
  },

  receiverWrapper: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "78%",

    paddingHorizontal: SPACING.lg,

    paddingVertical: SPACING.md,

    borderRadius: 24,
  },

  senderBubble: {
    backgroundColor: "#dce8df",

    borderBottomRightRadius: 8,
  },

  receiverBubble: {
    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderBottomLeftRadius: 8,
  },

  message: {
    fontSize: 13,

    lineHeight: 21,

    color: COLORS.textPrimary,
  },

  senderMessage: {
    color: COLORS.textPrimary,
  },

  time: {
    marginTop: 6,

    fontSize: 10,
  },

  senderTime: {
    color: COLORS.textSecondary,

    textAlign: "right",
  },

  receiverTime: {
    color: COLORS.textMuted,
  },
});