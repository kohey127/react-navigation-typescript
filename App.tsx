import { NavigationContainer, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* <RootStack.Navigator initialRouteName="A"> */}
      <RootStack.Navigator initialRouteName="C">
        <RootStack.Screen name="A" component={AScreen}/>
        <RootStack.Screen name="B" component={BScreen}/>
        <RootStack.Screen name="C" component={CScreen}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AScreen: React.FC = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log(rootNavigation)
  return (
    <View>
      <Text>A Screen</Text>
      <Text>{JSON.stringify(rootNavigation.getState().routes)}</Text>
      {/* <Button 
        title="Go To B Screen" 
        onPress={() => rootNavigation.navigate('B')} 
      /> */}
      <Button 
        title="Go To B Screen" 
        onPress={() => rootNavigation.navigate('B', { isFromA: true })} 
      />
    </View>
  )
}
const BScreen: React.FC = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'B'>>()

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        // headerLeft: () => (
        //   <Button 
        //     title="Go Back C Screen" 
        //     onPress={() => rootNavigation.navigate('C')} 
        //   />
        // ),
        headerLeft: () => (
          params.isFromA ? (
            <Button 
              title="Go Back C Screen" 
              onPress={() => rootNavigation.navigate('C')} 
            />
          ) : (
            <Button 
              title="Go Back" 
              onPress={() => rootNavigation.goBack()} 
            />
          )
        )
      });
    }, []),
  );
  return (
    <View>
      <Text>B Screen</Text>
      <Text>{JSON.stringify(rootNavigation.getState().routes)}</Text>
      <Button 
        title="Go To New B Screen" 
        onPress={() => rootNavigation.push('B', { isFromA: false })} 
      />
      {/* <Button 
        title="Go To C Screen" 
        onPress={() => rootNavigation.navigate('C')} 
      /> */}
    </View>
  )
}
const CScreen: React.FC = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>C Screen</Text>
      <Text>{JSON.stringify(rootNavigation.getState().routes)}</Text>
      <Button 
        title="Go To B Screen" 
        // onPress={() => rootNavigation.navigate('B')} 
        onPress={() => rootNavigation.navigate('B', { isFromA: false })} 
      />
    </View>
  )
}



// const Tab = createBottomTabNavigator<HomeTabsParamList>();
// const HomeTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="HelpStack" component={HelpStackScreen} options={{headerShown: false}}/>
//       <Tab.Screen name="MessageStack" component={MessageStackScreen} options={{headerShown: false}} />
//     </Tab.Navigator>
//   );
// }

// const HomeScreen: React.FC = () => {
//   const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const helpNavigation = useNavigation<NativeStackNavigationProp<HelpStackParamList>>();
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//       {/* <Text>RootStackのState: {JSON.stringify(rootNavigation.getState().routes)}</Text>
//       <Text>HelpStackのState: {JSON.stringify(helpNavigation.getState().routes)}</Text> */}
//       <Button 
//         title="Go To UserScreen" 
//         onPress={() => rootNavigation.navigate('User')} 
//       />
//     </View>
//   )
// }

// const UserScreen: React.FC = () => {
//   const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const bottomTabNavigation = useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
//   return (
//     <View>
//       <Text>UserScreen</Text>
//       <Text>RootStackのState: {JSON.stringify(rootNavigation.getState().routes)}</Text>
//       <Button 
//         title="Go To New UserScreen" 
//         onPress={() => rootNavigation.push('User')} 
//       />
//       <Button title='Go To Help Detail'
//         onPress={() => bottomTabNavigation.navigate('MessageStack', {screen: 'Message'})} />
//     </View>
//   )
// }

// const HelpStack = createNativeStackNavigator<HelpStackParamList>();
// const HelpStackScreen: React.FC = () => {
//   return (
//     <HelpStack.Navigator initialRouteName="Help">
//       <HelpStack.Screen 
//         name='Help'
//         component={HelpScreen} 
//       />
//       <HelpStack.Screen name='HelpDetail' component={HelpDetailScreen} />
//     </HelpStack.Navigator>
//   )
// }

// const HelpScreen: React.FC = () => {
//   const helpNavigation = useNavigation<NativeStackNavigationProp<HelpStackParamList>>();
//   const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   return (
//     <View>
//       <Text>HelpScreen</Text>
//       <Text>HelpStackのState: {JSON.stringify(helpNavigation.getState().routes)}</Text>
//       <Button
//         title="Go To HelpDetailScreen" 
//         onPress={() => helpNavigation.navigate('HelpDetail')} 
//       />
//       {/* <Button title='Go To User'
//         onPress={() => rootNavigation.navigate('User')}  /> */}
//     </View>
//   )
// } 

// const HelpDetailScreen: React.FC = () => {
//   const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const helpNavigation = useNavigation<NativeStackNavigationProp<HelpStackParamList>>();
//   return (
//     <View>
//       <Text>RootStackのState: {JSON.stringify(rootNavigation.getState().routes)}</Text>
//       <Text>HelpStackのState: {JSON.stringify(helpNavigation.getState().routes)}</Text>
//       <Text>HelpDetailScreen</Text>
//     </View>
//   )
// } 

// const MessageStack = createNativeStackNavigator<MessageStackParamList>();
// const MessageStackScreen: React.FC = () => {
//   return (
//     <MessageStack.Navigator initialRouteName="Message">
//       <MessageStack.Screen 
//         name='Message'
//         component={MessageScreen} 
//       />
//     </MessageStack.Navigator>
//   )
// }

// const MessageScreen: React.FC = () => {
//   return (
//     <View>
//       <Text>MessageScreen</Text>
//     </View>
//   )
// }