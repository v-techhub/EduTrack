import colors from "@/constants/colors";
import font from "@/constants/font";
import fontSize from "@/constants/fontSize";
import spacing from "@/constants/spacing";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <StatusBar barStyle={"dark-content"} />
      <View>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={require("@/assets/images/candidate.png")}
            resizeMode="contain"
            style={styles.image}
            entering={FadeInDown.duration(800)}
          />
          <Animated.Image
            source={require("@/assets/images/backdrop.png")}
            resizeMode="contain"
            style={styles.gradient}
            entering={FadeIn.duration(800)}
          />
          <Animated.Image
            source={require("@/assets/images/shadow.png")}
            resizeMode="contain"
            style={styles.imageShadow}
            entering={FadeIn.duration(800)}
          />
          <Animated.Image
            source={require("@/assets/images/vector-line.png")}
            resizeMode="contain"
            style={styles.vectorLine}
            entering={FadeInRight.duration(500).delay(400)}
          />
          <Animated.Image
            source={require("@/assets/images/clock.png")}
            resizeMode="contain"
            style={styles.clock}
            entering={BounceIn.delay(900)}
          />
        </View>
        <Text style={styles.title}>Student Management App</Text>
        <Text style={styles.subText}>
          Effortlessly manage student data, performance, and communication — all
          in one powerful platform.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.navigate("/(tabs)/Home")}
        style={[styles.startBtn, { marginBottom: bottom }]}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>PROCEED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center",
    height: height * 0.6,
  },
  image: {
    width: width * 0.7,
    zIndex: 2,
  },
  startBtn: {
    backgroundColor: colors.black,
    borderRadius: 50,
    width: width * 0.7,
    marginHorizontal: "auto",
    height: 50,
    justifyContent: "center",
  },
  title: {
    fontFamily: font.default,
    fontSize: fontSize.xxxl,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    fontWeight: 500,
  },
  subText: {
    fontFamily: font.default,
    fontSize: fontSize.md,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  text: {
    color: colors.white,
    fontWeight: 500,
    textAlign: "center",
    fontFamily: font.default,
    fontSize: fontSize.md,
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  vectorLine: {
    position: "absolute",
    right: 40,
    top: 70,
    zIndex: 1,
    height: 100,
  },
  imageShadow: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    zIndex: 1,
  },
  clock: {
    position: "absolute",
    top: 50,
    zIndex: 1,
    height: 80,
    width: 100,
  },
});
