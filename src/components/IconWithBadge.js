import React from 'react'
import {View, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import theme from '../screens/theme'

export default class IconWithBadge extends React.Component {
    render() {
      const { name, badgeCount, color, size } = this.props;
      return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
          <Ionicons name={name} size={size} color={color} />
          {badgeCount > 0 && (
            <View
              style={{
                // If you're using react-native < 0.57 overflow outside of parent
                // will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -14,
                top: -3,
                backgroundColor: theme.COLORS.PRIMARY,
                borderRadius: 8,
                width: 16,
                height: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                {badgeCount}
              </Text>
            </View>
          )}
        </View>
      );
    }
  }

//   const HomeIconWithBadge = props => {
//     // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
//     return <IconWithBadge {...props} badgeCount={3} />;
//   };
//   export default HomeIconWithBadge;