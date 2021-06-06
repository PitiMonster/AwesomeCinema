import React, {useEffect, useContext, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import {COLORS} from '../constants';
import {Context as MovieContext} from '../context/MovieContext';
import Loading from '../components/Loading';

import Sit from '../components/Sit';

// ekran pozwalający na zarezerwowanie biletu
const ChoosePlaceScreen = ({route, navigation}) => {
  const {state, getScreening, getHall, getFreeTickets, buyTicket} =
    useContext(MovieContext);

  const [screening, setScreening] = useState(null);
  const [hall, setHall] = useState(null);
  const [freeTickets, setFreeTickets] = useState(null);
  const [selectedSits, setSetelectedSits] = useState([]);

  const screeningId = route.params?.screeningId ?? null;

  useEffect(() => {
    const fetchData = async () => {
      getScreening(screeningId);
    };

    const fetchAddData = async () => {
      getHall(state.currScreening.hall_id);
      getFreeTickets(state.currScreening.id);
    };

    // pobieranie danych po kolei
    if (!state.currScreening) {
      fetchData();
    } else if (
      (!state.currHall && state.freeTickets.length === 0) ||
      !screening
    ) {
      setScreening(state.currScreening);
      fetchAddData();
    } else {
      setHall(state.currHall);
      setFreeTickets(state.freeTickets);
    }
  }, [state.currScreening, state.currHall, state.freeTickets]);

  // dopóki wszystkie dane nie są pobrane z serwera to powiadamimay o ładowaniu
  if (!hall || freeTickets.length === 0) {
    return <Loading />;
  }

  // dodanie siedzonka do wybranych siedzień
  const addToSelectedSits = id => {
    setSetelectedSits(prevState => [...prevState, id]);
  };

  // usunięcie siedzonka z wybranych siedzeń
  const rmFromSelectedSits = id => {
    const newSits = selectedSits.filter(item => item !== id);
    setSetelectedSits(newSits);
  };

  // kupienie biletu i przejście do ekranu końcowego
  const buyTickets = async () => {
    for (id of selectedSits) {
      await buyTicket(id);
    }
    navigation.navigate('PaymentSuccess');
  };

  // wygenerowanie obiektu siedzonek
  const generateSitsView = () => {
    // max sala 8x8
    const columns = Math.min(hall.columns, 8);
    const rows = Math.min(hall.rows, 8);

    let sits = [];
    const sitsNumber = columns * rows;
    const board = [];
    let freeSitId = 0;

    // iterujemy po wszystkich numerach siedzeń
    // jeśli to siedzenie jest wolne to dajemy je jako szare
    // jeśli zarezerwowane to jako czerwone
    for (let i = 0; i < sitsNumber; i++) {
      const freeTicket = freeTickets[freeSitId];
      if (freeTicket.seat_number - 1 === i) {
        sits.push(
          <Sit
            key={i}
            color={COLORS.grey}
            size={30}
            addToSelectedSits={() => addToSelectedSits(freeTicket.id)}
            rmFromSelectedSits={() => rmFromSelectedSits(freeTicket.id)}
          />,
        );
        freeSitId++;
      } else {
        sits.push(
          <Sit
            key={i}
            color={COLORS.red}
            size={30}
            addToSelectedSits={() => {}}
            rmFromSelectedSits={() => {}}
          />,
        );
      }
      // stworzenie nowego rzędu siedzeń jeśli już mamy maksa w aktualnym rzędzie
      if ((i + 1) % rows === 0) {
        board.push(
          <View
            key={i + 1 / rows}
            style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {sits}
          </View>,
        );
        sits = [];
      }
    }

    return <View style={styles.board}>{board}</View>;
  };

  // stowrzenie trzech siedzonek jako legenda
  const generateLegend = () => {
    const items = [];
    items.push(<Sit key={1} color={COLORS.yellow} size={50} text="Wybrane" />);
    items.push(<Sit key={2} color={COLORS.grey} size={50} text="Wolne" />);
    items.push(<Sit key={3} color={COLORS.red} size={50} text="Zajęte" />);

    return <View style={styles.legendContainer}>{items}</View>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wybierz miejsce</Text>
      {generateSitsView()}
      {generateLegend()}
      {console.log(screening)}
      <View style={styles.modalView}>
        <Text style={styles.title}>
          {screening.movie_name.replace(/\(.*\)/, '')}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.hour}>{screening.date.split(' ')[1]}</Text>
          <Text style={styles.day}>
            {screening.date.split(' ')[0].slice(5)}
          </Text>
        </View>
        <Pressable
          style={[
            styles.acceptBtn,
            {
              backgroundColor: selectedSits.length ? 'white' : COLORS.grey,
            },
          ]}
          onPress={() => buyTickets()}
          disabled={!selectedSits.length}>
          <Text
            style={[
              styles.acceptText,
              {color: selectedSits.length ? 'black' : '#eee'},
            ]}>
            Zarezerwuj
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7263',
    width: '30%',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  board: {
    marginTop: 30,
  },
  day: {
    fontSize: 18,
    color: '#fff',
  },
  hour: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  legendContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    height: '30%',
    width: '90%',
    backgroundColor: COLORS.red,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  acceptBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 20,
  },
  acceptText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ChoosePlaceScreen;
