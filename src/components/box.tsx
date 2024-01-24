import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { DIVIDER_GAP, DIVIDER_SIZE, SPRING_CONFIG } from '~/constants';
import { WithIsAnyLabelIntersected, WithLayout, WithTranslationX } from '~/types';

type Props = WithLayout &
  WithTranslationX &
  WithIsAnyLabelIntersected & {
    left?: boolean;
  };

const timingBasedConfig = {
  duration: 250,
  dampingRatio: 1,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

export function Box({ layout, translationX, left = false, isAnyLabelIntersected }: Props) {
  const translateY = useDerivedValue(() => {
    return withSequence(
      withSpring(isAnyLabelIntersected.value ? -4 : 4, timingBasedConfig),
      withSpring(0, timingBasedConfig)
    );
  }, [isAnyLabelIntersected]);

  const boxStyle = useAnimatedStyle(() => {
    if (layout.value.width === 0) {
      return {};
    }

    const width = left
      ? translationX.value - DIVIDER_GAP
      : layout.value.width - translationX.value - DIVIDER_SIZE.width - DIVIDER_GAP;

    const opacityOutputRange = [0.25, 0.7];

    const opacity = interpolate(
      (layout.value.width - translationX.value) / layout.value.width,
      [0.1, 0.55],
      left ? opacityOutputRange.reverse() : opacityOutputRange,
      Extrapolate.CLAMP
    );

    const height = withSpring(isAnyLabelIntersected.value ? 22 : 55, SPRING_CONFIG);

    return {
      width,
      opacity,
      height,
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={[styles.box, !left && styles.boxRightSide, boxStyle]} />;
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    left: 0,
    bottom: 0,

    height: 55,
    borderRadius: 4,

    backgroundColor: '#6895D2',
  },
  boxRightSide: {
    left: undefined,
    right: 0,
    backgroundColor: 'rgba(255, 104, 104, 0.8)',
  },
});
