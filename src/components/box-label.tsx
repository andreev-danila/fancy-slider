import { RefObject } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { BOX_LABEL_OFFSET, SPRING_CONFIG } from '~/constants';
import { WithIsAnyLabelIntersected, WithLayout, WithTranslationX } from '~/types';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = WithTranslationX &
  WithLayout &
  WithIsAnyLabelIntersected & {
    aref: RefObject<TextInput>;
    left?: boolean;
  };

export function BoxLabel({
  aref,
  layout,
  translationX,
  left = false,
  isAnyLabelIntersected,
}: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isAnyLabelIntersected.value ? -36 : -18, SPRING_CONFIG),
        },
      ],
    };
  });

  const animatedProps = useAnimatedProps<AnimateProps<TextInputProps & { text: string }>>(() => {
    if (layout.value.width === 0) {
      return {};
    }

    const percentage = left
      ? Math.round((translationX.value / layout.value.width) * 100)
      : Math.round(((layout.value.width - translationX.value) / layout.value.width) * 100);

    const text = left ? `YES ${percentage}%` : `${percentage}% NO`;

    return {
      text,
    };
  });

  return (
    <AnimatedTextInput
      ref={aref}
      animatedProps={animatedProps}
      style={[styles.text, !left && styles.textRightSide, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    position: 'absolute',
    left: BOX_LABEL_OFFSET,
    bottom: 0,
    color: '#6895D2',
    textAlign: 'right',
  },
  textRightSide: {
    left: undefined,
    right: BOX_LABEL_OFFSET,
    color: '#FF6868',
  },
});
