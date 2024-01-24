import { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { LayoutValue } from '~/types';

export function useLayout() {
  const layout = useSharedValue<LayoutValue>({
    width: 0,
    height: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    layout.value = { width, height };
  }, []);

  return {
    layout,
    onLayout,
  };
}
