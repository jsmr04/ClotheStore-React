/* eslint-disable object-curly-newline */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'
// galio components
import Block from './Block';
import Text from '../../node_modules/galio-framework/src/atomic/ions/Text';
import Icon from '../../node_modules/galio-framework/src/atomic/ions/Icon';
import GalioTheme, { withGalio } from '../../node_modules/galio-framework/src/theme';
import Theme from "../screens/theme"

function Card({
  avatar,
  borderless, 
  caption, 
  captionColor,
  card, 
  children,
  footerStyle,
  image,
  favoriteIcon,
  imageBlockStyle,
  imageStyle,
  location, 
  locationColor, 
  shadow,
  style, 
  styles,
  title, 
  titleColor,
  theme,
  ...props 
}) {
  function renderImage() {
    if (!image) return null;
    return (
      <Block card style={[styles.imageBlock, imageBlockStyle]}>
        <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
        <Ionicons name = { favoriteIcon } size = { 30 } style={{position:"absolute", right: 5, top:5}} color= {Theme.COLORS.PRIMARY}/>
      </Block>
    );
  }

  function renderAvatar() {
    if (!avatar) return null;
    return <Image source={{ uri: avatar }} style={styles.avatar} />;
  }

  function renderLocation() {
    if (!location) return null;
    if (typeof location !== 'string') {
      return location;
    }

    return (
      <Block row right>
        <Text
          muted
          size={23 * 0.875}
          color={theme.COLORS.BLACK}
          style={{ marginLeft: theme.SIZES.BASE * 0.25, fontWeight: "700" }}>
          {location}
        </Text>
      </Block>
    );
  }

  function renderAuthor() {
    return (
      <Block flex row style={[styles.footer, footerStyle]} space="between">
        <Block flex={0}>{renderAvatar()}</Block>
        <Block flex={1.7}>
          <Block style={styles.title}>
            <Text size={22 * 0.875} color={titleColor}>
              {title}
            </Text>
          </Block>
          <Block row space="between">
            <Block row right>
              <Text p muted size={22 * 0.875} color={captionColor}>
                {caption}
              </Text>
            </Block>
            {renderLocation()}
          </Block>
        </Block>
      </Block>
    );
  }


  const styleCard = [borderless && { borderWidth: 0 }, style];

  return (
    <Block {...props} card={card} shadow={shadow} style={styleCard}>
      {renderImage()}
      {renderAuthor()}
      {children}
    </Block>
  );
}

Card.defaultProps = {
  card: true,
  shadow: true,
  borderless: false,
  styles: {},
  theme: GalioTheme,
  title: '',
  titleColor: '',
  caption: '',
  captionColor: '',
  footerStyle: {},
  avatar: '',
};

Card.propTypes = {
  card: PropTypes.bool,
  shadow: PropTypes.bool,
  borderless: PropTypes.bool,
  styles: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.string,
  favoriteIcon: PropTypes.string,
  titleColor: PropTypes.string,
  caption: PropTypes.string,
  captionColor: PropTypes.string,
  avatar: PropTypes.string,
  footerStyle: PropTypes.object,
};

const styles = theme =>
  StyleSheet.create({
    card: {
      borderWidth: 0,
      backgroundColor: theme.COLORS.WHITE,
      width: theme.SIZES.CARD_WIDTH,
      marginVertical: theme.SIZES.CARD_MARGIN_VERTICAL,
    },
    footer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: theme.SIZES.CARD_FOOTER_HORIZONTAL,
      paddingVertical: theme.SIZES.CARD_FOOTER_VERTICAL,
      backgroundColor: theme.COLORS.TRANSPARENT,
      zIndex: 1,
    },
    avatar: {
      width: theme.SIZES.CARD_AVATAR_WIDTH,
      height: theme.SIZES.CARD_AVATAR_HEIGHT,
      borderRadius: theme.SIZES.CARD_AVATAR_RADIUS,
    },
    title: {
      justifyContent: 'center',
    },
    imageBlock: {
      borderWidth: 0,
      overflow: 'hidden',
    },
    image: {
      width: 'auto',
      height: theme.SIZES.CARD_IMAGE_HEIGHT,
    },
    round: {
      borderRadius: theme.SIZES.CARD_ROUND,
    },
    rounded: {
      borderRadius: theme.SIZES.CARD_ROUNDED,
    },
  });

export default withGalio(Card, styles);
