import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {Text, FlatList, Pressable, View} from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useCallback} from "react";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const exampleItems = [{id: 1, key: 1, name: "Item 1"}, {id: 2, key: 2, name: "Item 2"}]

const ListItem = ({item: {id, name, key}}) => {
    const {navigate} = useNavigation();
    const onPress = useCallback(() => navigate("detail"), [navigate]);

    return (
        <Pressable
            onPress={onPress}
            key={`${key}-${id}`}
            style={{
                flex: 1,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lightblue",
                marginBottom: 4
            }}
        >
            <Text>{name}</Text>
        </Pressable>
    )
}

const GenericScreen = ({screenId}) => {
    return (
        <View style={{flex: 1}}>
            <Text>Screen {screenId}</Text>
            <FlatList data={exampleItems} renderItem={(props) => <ListItem {...props} />}/>
        </View>
    )
}

const FirstTab = (props) => <GenericScreen screenId={1} {...props} />
const SecondTab = (props) => <GenericScreen screenId={2} {...props} />
const ThirdTab = (props) => <GenericScreen screenId={2} {...props} />

const OverviewPage = () => {
    const {navigate} = useNavigation();

    const manualOnPress = useCallback(() => navigate("detail"), [navigate]);


    return (
        <>
            <Tab.Navigator name="tabs">
                <Tab.Screen name="screen1" component={FirstTab}/>
                <Tab.Screen name="screen2" component={SecondTab}/>
                <Tab.Screen name="screen3" component={ThirdTab}/>
            </Tab.Navigator>
            <Pressable onPress={manualOnPress}><Text>Manual navigate to details page</Text></Pressable>
        </>
    )
}

const DetailPage = () => <Text>DETAIL PAGE</Text>

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="overview" component={OverviewPage}/>
                <Stack.Screen name="detail" component={DetailPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
