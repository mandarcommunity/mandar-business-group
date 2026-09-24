import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
  isRead?: boolean;
  onImagePress?: (uri: string) => void;
  selected?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
}

export default function MessageBubble({
  message,
  time,
  isSender,
  isRead,
  onImagePress,
  selected,
  onLongPress,
  onPress,
}: MessageBubbleProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={onLongPress}
      onPress={onPress}
      delayLongPress={300}
      style={[
        styles.wrapper,
        selected && { backgroundColor: 'rgba(0,0,0,0.1)', paddingVertical: 5 },

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
                {message?.startsWith("[IMAGE]") ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => onImagePress && onImagePress(message.substring(7))}>
              <Image 
                source={{ uri: message.substring(7) }} 
                style={{ width: 220, height: 220, borderRadius: 12, marginBottom: 8, backgroundColor: "#f0f0f0" }} 
                resizeMode="cover"
              />
            </TouchableOpacity>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 4 }}>
          <Text
            style={[
              styles.time,
              { marginTop: 0 },
              isSender
                ? styles.senderTime
                : styles.receiverTime,
            ]}
          >
            {time}
          </Text>
          {isSender && (
            <Text style={{ color: isRead ? '#34B7F1' : '#999', fontSize: 11, marginLeft: 4 }}>
              {isRead ? "\u2713\u2713" : "\u2713"}
            </Text>
          )}
        </View>

      </View>

    </TouchableOpacity>
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