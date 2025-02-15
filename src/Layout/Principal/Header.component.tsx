import {Appbar, useTheme} from 'react-native-paper';
import {Image, useColorScheme} from 'react-native';
import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {styles} from '../../assets/styles/index.styles';

const Header: React.FC<
  Pick<NativeStackHeaderProps, 'navigation' | 'options' | 'back'>
> = ({navigation}): React.JSX.Element => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  return (
    <Appbar.Header
      style={styles.appBar}
      theme={{colors: {primary: theme.colors.surface}}}>
      <Appbar.Content title={''} mode="medium" color={theme.colors.surface} />
      <Appbar.Content
        title={
          <Image
            source={
              useColorScheme() === 'dark'
                ? require('../../assets/image/logo-dark.png')
                : require('../../assets/image/logo.png')
            }
            style={{width: 110, height: 50}}
          />
        }
      />
      <Appbar.Content title={''} mode="medium" color={theme.colors.surface} />
    </Appbar.Header>
  );
};
export const HeaderProps: React.FC<
  Pick<NativeStackHeaderProps, 'navigation' | 'options' | 'back'>
> = ({navigation, options}): React.JSX.Element => {
  const theme = useTheme();
  const goBack = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      <Appbar.BackAction onPress={() => goBack()} />
      <Appbar.Content title={options.title} />
    </Appbar.Header>
  );
};

export default Header;
