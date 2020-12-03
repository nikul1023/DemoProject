import React,{useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,Switch,ActivityIndicator,ImageBackground,ImageStyle,TouchableOpacity, View} from "react-native"
import { Screen, Text, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-crop-picker';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent:'center',
  alignItems:"center"
}
const IMAGE: ImageStyle = {
  height :100,
  width :100,
   marginTop:20,
}
const BUTTON: ViewStyle = {
  backgroundColor: color.palette.black,
  height : 40,
  width:155,
  justifyContent : "center",
  alignItems:"center",
  marginTop :20,
}
const OPTION: ViewStyle = {
  marginTop:20,
}

export const AppScreen = observer(function AppScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [image,setImage] = useState();
  const [date,setDate] = useState('2020-12-02');
  const [time,setTime] = useState('20:20')
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      
    });
  }
  return (
    <Screen style={ROOT} preset="scroll">
       <Switch
        trackColor={{ false: color.palette.orange, true: color.error }}
        thumbColor={isEnabled ? color.palette.orange : color.palette.offWhite}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
{isEnabled ? 
  <ActivityIndicator size='large' color='#0000ff' style={OPTION}/>
:
<>
<DatePicker
        style={{width: 200,marginTop:20}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-12-01"
        maxDate="2020-12-10"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
         
        }}
        onDateChange={(date) => {setDate(date)}}
      />

      <DatePicker
        style={{width: 200}}
        
        date={time}
        mode="time"
        placeholder="select time"
       
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
         
        }}
        
        onDateChange={(time) => {setTime(time)}}
      />
      </>
  }
  <View>
  <ImageBackground source={{uri : image}} style={IMAGE}></ImageBackground>
  </View>
  <TouchableOpacity style={BUTTON} onPress={takePhotoFromCamera} >
          <Text style ={{color : color.palette.white}} >Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BUTTON} onPress={choosePhotoFromLibrary} >
          <Text style ={{color : color.palette.white}} >Choose From Lirary</Text>
      </TouchableOpacity>
    </Screen>
  )
})
