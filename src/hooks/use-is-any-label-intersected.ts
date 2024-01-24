import { TextInput } from 'react-native';
import { measure, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';

import { BOX_LABEL_OFFSET } from '~/constants';
import { WithLayout, WithTranslationX } from '~/types';

type HookArgs = WithLayout & WithTranslationX;

export function useIsAnyLabelIntersected({ layout, translationX }: HookArgs) {
  const labelLeftAref = useAnimatedRef<TextInput>();
  const labelRightAref = useAnimatedRef<TextInput>();

  const isAnyLabelIntersected = useDerivedValue(() => {
    const measurementLeft = measure(labelLeftAref);
    const measurementRight = measure(labelRightAref);

    if (measurementLeft === null || measurementRight === null) {
      return false;
    }

    const isLeftIntersected = translationX.value - BOX_LABEL_OFFSET * 2 < measurementLeft.width;
    const isRightIntersected =
      translationX.value > layout.value.width - measurementRight.width - BOX_LABEL_OFFSET * 2;

    return isLeftIntersected || isRightIntersected;
  });

  return {
    labelLeftAref,
    labelRightAref,
    isAnyLabelIntersected,
  };
}
