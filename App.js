import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const App = () => {
  const [requirement, setRequirement] = useState('');
  const [nameError, setnameError] = useState("This field can't be empty");
  const [nameTrip, setNametrip] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateShow, setDateShow] = useState('');
  const [description, setDescripstion] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getDate();
    setDateShow(fDate);
    console.log('🚀 ~ file: App.js ~ line 31 ~ onChange ~ fDate', fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const handleChangeNameTrip = text => {
    setNametrip(text);
  };
  const handleChangeDestination = text => {
    setDestination(text);
  };
  const handleChangeDate = text => {
    setDate(text);
  };
  const handleChangeRequire = risk => {
    setRequirement(risk);
  };
  const handleChangeDescription = text => {
    setDescripstion(text);
  };
  const handleLogin = () => {
    if (!nameTrip.trim()) {
      alert("Name trip field can't be empty!");
    } else if (!destination.trim()) {
      alert("Destination field can't be empty!");
    } else if (!dateShow.trim()) {
      alert("Date field can't be empty!");
    } else {
      alert(
        'Name trip: ' +
          nameTrip +
          '\n' +
          'Destination: ' +
          destination +
          '\n' +
          'Date: ' +
          dateShow +
          '\n' +
          'Risk Requirement: ' +
          requirement +
          '\n' +
          'Description: ' +
          description +
          '\n',
      );
    }
  };
  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <Text style={styles.title}>Create new Trip</Text>
        <Text style={styles.text}>Name trip:</Text>
        <TextInput
          onChangeText={handleChangeNameTrip}
          value={nameTrip}
          style={styles.input_container}></TextInput>
        <Text style={styles.text}>Destination:</Text>
        <TextInput
          onChangeText={handleChangeDestination}
          style={styles.input_container}></TextInput>
        <Text style={styles.text}>Date:</Text>
        <Text style={styles.text} onPress={() => showMode('date')}>
          Selecte Date
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="default"
            mode={mode}
            onChange={onChange}
          />
        )}
        <Text style={styles.text}>{dateShow}</Text>
        <View>
          <Text style={styles.text}>Risk Requirement?</Text>
          <View style={styles.wrapper}>
            {['Yes', 'No'].map(risk => (
              <View key={risk} style={styles.mood}>
                <Text>{risk}</Text>
                <TouchableOpacity
                  onChangeText={handleChangeRequire}
                  style={styles.outter}
                  onPress={() => setRequirement(risk)}>
                  {requirement === risk && <View style={styles.inner} />}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.text}>Description:</Text>
        <TextInput
          onChangeText={handleChangeDescription}
          style={styles.input_container}></TextInput>
        <TouchableOpacity onPress={handleLogin} style={styles.btn_login}>
          <Text style={styles.txt_login}>Add to Database</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 45,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input_container: {
    borderWidth: 0.5,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  btn_login: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  txt_login: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: 'grey',
    borderRadius: 15,
  },
  outter: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontweight: 'bold',
    fontSize: 20,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  mood: {
    marginHorizontal: 15,
  },
});
