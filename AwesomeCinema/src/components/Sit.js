import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

import {COLORS} from '../constants';

// komponent zwracający obiekt siedzonka
const Sit = ({color, size, text, addToSelectedSits, rmFromSelectedSits}) => {
  const [myColor, setMyColor] = useState(color);

  return (
    <View>
      <Icon
        name="circle"
        type="MaterialIcons"
        color={myColor}
        size={size}
        iconStyle={{margin: 2}}
        onPress={() => {
          // jeśli jest tekst (wtedy obiekt należy do legenedy) lub jeśli color === red (wtedy miejsce już zajęte)
          // nic nie robimy
          if (text || myColor === COLORS.red) return;
          // jeśli jest yellow to zmieniamy na szary i usuwamy z zarezerowanych
          if (myColor === COLORS.yellow) {
            setMyColor(COLORS.grey);
            rmFromSelectedSits();
          } else {
            // jeśli jest szare to zmieniamy na żółty i dodajemy do zarezerwowanych
            setMyColor(COLORS.yellow);
            addToSelectedSits();
          }
        }}
      />
      {text && (
        <Text style={{fontSize: 18, color: '#333', fontWeight: 'bold'}}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default Sit;
