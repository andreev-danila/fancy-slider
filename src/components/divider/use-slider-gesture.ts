import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, withDecay, withSpring } from 'react-native-reanimated';

import { DIVIDER_SIZE, SPRING_CONFIG } from '~/constants';
import { WithIsAnyLabelIntersected, WithLayout, WithTranslationX } from '~/types';

function clamp(value: number, min: number, max: number) {
  'worklet';

  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

export function useSliderGesture({
  layout,
  translationX,
  isAnyLabelIntersected,
}: WithLayout & WithTranslationX & WithIsAnyLabelIntersected) {
  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = clamp(translationX.value + event.changeX, 0, layout.value.width);
    })
    .onFinalize((event) => {
      translationX.value = withDecay({
        rubberBandEffect: false,
        velocity: event.velocityX,
        velocityFactor: 0.35,
        clamp: [0, layout.value.width],
      });
    });

  const dividerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isAnyLabelIntersected.value ? 22 : DIVIDER_SIZE.height, SPRING_CONFIG),
      transform: [
        {
          translateX: translationX.value,
        },
        {
          translateY: withSpring(isAnyLabelIntersected.value ? 0 : -5),
        },
      ],
    };
  });

  return {
    gesture,
    dividerStyle,
  };
}
