import { LayoutRectangle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type LayoutValue = Pick<LayoutRectangle, 'width' | 'height'>;

export type WithLayout<T = unknown> = T & {
  layout: SharedValue<LayoutValue>;
};

export type WithTranslationX<T = unknown> = T & {
  translationX: SharedValue<number>;
};

export type WithIsAnyLabelIntersected<T = unknown> = T & {
  isAnyLabelIntersected: SharedValue<boolean>;
};
