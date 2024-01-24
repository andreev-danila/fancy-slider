import Animated, { useSharedValue } from 'react-native-reanimated';

import { Box } from './box';
import { BoxLabel } from './box-label';
import { Divider } from './divider';

import { useIsAnyLabelIntersected, useLayout } from '~/hooks';

export function FancySlider() {
  const { layout, onLayout } = useLayout();

  const translationX = useSharedValue(0);

  const { labelLeftAref, labelRightAref, isAnyLabelIntersected } = useIsAnyLabelIntersected({
    layout,
    translationX,
  });

  return (
    <Animated.View onLayout={onLayout}>
      <Box
        left
        layout={layout}
        translationX={translationX}
        isAnyLabelIntersected={isAnyLabelIntersected}
      />
      <BoxLabel
        left
        aref={labelLeftAref}
        layout={layout}
        translationX={translationX}
        isAnyLabelIntersected={isAnyLabelIntersected}
      />
      <Box
        layout={layout}
        translationX={translationX}
        isAnyLabelIntersected={isAnyLabelIntersected}
      />
      <BoxLabel
        aref={labelRightAref}
        layout={layout}
        translationX={translationX}
        isAnyLabelIntersected={isAnyLabelIntersected}
      />
      <Divider
        layout={layout}
        translationX={translationX}
        isAnyLabelIntersected={isAnyLabelIntersected}
      />
    </Animated.View>
  );
}
