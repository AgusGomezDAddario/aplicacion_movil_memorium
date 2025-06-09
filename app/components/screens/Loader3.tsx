import React from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

const NewLoader = () => {
    const animatedValue = new Animated.Value(0);

    const startAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(0);
            startAnimation();
        });
    };

    React.useEffect(() => {
        startAnimation();
    }, []);

    const rotate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Image
                 source={{ uri: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/10/giphy1.gif?fit=500%2C312&quality=50&strip=all&ssl=1' }}
                style={[styles.image]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
});

export default NewLoader;