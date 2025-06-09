import React from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

const DogLoader = () => {
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
                 source={{ uri: 'https://blog.digimind.com/hs-fs/hubfs/Imported_Blog_Media/giphy-202.gif?width=500&height=375&name=giphy-202.gif' }}
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

export default DogLoader;