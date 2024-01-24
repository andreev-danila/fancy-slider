import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FancySlider } from '~/components';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <FancySlider />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
