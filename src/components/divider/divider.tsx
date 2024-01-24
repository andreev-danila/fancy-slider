import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useSliderGesture } from './use-slider-gesture';

import { DIVIDER_SIZE } from '~/constants';
import { WithIsAnyLabelIntersected, WithLayout, WithTranslationX } from '~/types';

type Props = WithLayout & WithTranslationX & WithIsAnyLabelIntersected;

const hitSlop = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
};

export function Divider({ layout, translationX, isAnyLabelIntersected }: Props) {
  const { gesture, dividerStyle } = useSliderGesture({
    layout,
    translationX,
    isAnyLabelIntersected,
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View hitSlop={hitSlop} style={[styles.divider, dividerStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  divider: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: DIVIDER_SIZE.width,
    height: DIVIDER_SIZE.height,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
