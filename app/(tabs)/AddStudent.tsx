import { CustomSelect } from "@/components";
import colors from "@/constants/colors";
import font from "@/constants/font";
import fontSize from "@/constants/fontSize";
import spacing from "@/constants/spacing";
import { useImagePicker } from "@/hooks/image";
import { useCreateStudent } from "@/hooks/student";
import { Student, StudentFormData } from "@/types";
import { studentSchema } from "@/utilities/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const enrollmentOptions = [
  { title: "Enrolled", value: "Enrolled" },
  { title: "Alumni", value: "Alumni" },
  { title: "Graduated", value: "Graduated" },
];

export default function AddStudentScreen() {
  const animation = useRef<LottieView>(null);
  const { top } = useSafeAreaInsets();
  const { pickImage } = useImagePicker();
  const [image, setImage] = useState("");
  const { createStudent } = useCreateStudent();
  const router = useRouter();
  const {
    // register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors, isLoading },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    const res = await createStudent(data as Student);
    if (res) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Student created successfully",
        button: "ok",
      });
      router.back();
      reset();
    }
  };

  function handleChange(
    name: keyof StudentFormData | any,
    value: string
  ): void {
    setValue(name, value);
  }

  return (
    <View style={styles.wrapper}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: "100%",
          height: 200,
          position: "absolute",
          zIndex: 1,
        }}
        source={require("@/assets/gradient.json")}
      />
      <ScrollView style={styles.container}>
        <View style={[styles.textsContainer, { marginTop: top + 10 }]}>
          <Text style={styles.title}>Add New Student</Text>
          <Text style={styles.text}>
            Enter student details to register them into the system.
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <Animated.View entering={FadeInDown}>
            <TextInput
              placeholder="Name"
              keyboardType="default"
              onChangeText={(text) => setValue("name", text as any)}
              style={styles.input}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(text) => setValue("email", text as any)}
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400)}>
            <CustomSelect
              data={enrollmentOptions}
              handleChange={handleChange}
              name="enrollmentStatus"
            />
            {errors.enrollmentStatus && (
              <Text style={styles.error}>
                {errors.enrollmentStatus.message}
              </Text>
            )}
          </Animated.View>
          <Button
            title="Choose profile photo"
            color={"#514846"}
            onPress={async () => {
              const res = await pickImage();
              if (res) {
                setImage(res);
                setValue("profilePhoto", res);
              }
            }}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {errors.profilePhoto && (
            <Text style={styles.error}>{errors.profilePhoto.message}</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitBtn}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    // zIndex: 2,
  },
  wrapper: {
    flex: 1,
  },
  textsContainer: {
    gap: spacing.xxs,
  },
  title: {
    fontFamily: font.default,
    fontSize: fontSize.lg,
    fontWeight: 500,
  },
  text: {
    fontFamily: font.default,
  },
  formWrapper: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  input: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  error: { color: "red", fontSize: 12 },
  submitBtn: {
    backgroundColor: colors.black,
    borderRadius: 50,
    marginHorizontal: "auto",
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  btnText: {
    color: colors.white,
    fontWeight: 500,
    textAlign: "center",
    fontFamily: font.default,
    fontSize: fontSize.md,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginHorizontal: "auto",
  },
});
