import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Layout from './Layout';

export default function CustomTabBar({ state, descriptors, navigation, position }) {
    return (
        // <Layout>
        <View style={{
            flexDirection: 'row', borderRadius: 15, backgroundColor: "#6DBF97", height: 44, width: "100%",
            maxWidth: 300, alignSelf: "center",
            alignItems: "center",
            marginTop: 20
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                // // modify inputRange for custom behavior
                // // const inputRange = state.routes.map((_, i) => i);
                // const opacity = Animated.interpolate(position, {
                //     inputRange,
                //     outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                // });

                return (
                    // <View>
                    <TouchableOpacity
                        key={index + 1}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            // flexDirection: "row",
                            // backgroundColor: "#6DBF97",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            borderColor: "#6DBF97",
                            fontWeight: "bold",
                        }}
                    >
                        <Animated.Text style={{ opacity: 20 }}>{label}</Animated.Text>
                    </TouchableOpacity>
                    // </View>
                );
            })}
        </View>
        // </Layout>
    )
}
