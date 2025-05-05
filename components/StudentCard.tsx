import font from "@/constants/font";
import fontSize from "@/constants/fontSize";
import spacing from "@/constants/spacing";
import { useDeleteStudent } from "@/hooks/student";
import { Student } from "@/types";
import { userAvatar } from "@/utilities";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const ENROLLMENT_STATUS_MAP_STYLES = {
  Graduated: {
    color: "#8167A3",
    backgroundColor: "#F1DEFA",
  },
  Enrolled: {
    color: "#B88044",
    backgroundColor: "#FDE7DC",
  },
  Alumni: {
    color: "#5A9779",
    backgroundColor: "#D4EDE0",
  },
};

export default function StudentCard({
  email,
  enrollmentStatus,
  name,
  profilePhoto,
  gender,
  id,
}: Student) {
  const image = profilePhoto ? { uri: profilePhoto } : userAvatar(gender);
  const { deleteStudent } = useDeleteStudent();
  function handleDelete() {
    const data = {
      email,
      enrollmentStatus,
      name,
      profilePhoto,
      gender,
      id,
    };
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: "Are you sure?",
      textBody: `You can't recover this account once deleted`,
      button: "DELETE",
      onPressButton() {
        deleteStudent(data);
        Dialog.hide();
      },
    });
  }
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <Image source={image} resizeMode="cover" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View
        style={[styles.status, ENROLLMENT_STATUS_MAP_STYLES[enrollmentStatus]]}
      >
        <Text style={styles.statusText}>{enrollmentStatus}</Text>
      </View>
      <AntDesign name="delete" size={24} color="red" onPress={handleDelete} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textContainer: {
    gap: spacing.xxs,
    flex: 1,
  },
  name: {
    fontFamily: font.default,
    fontSize: fontSize.md,
  },
  email: {
    fontFamily: font.default,
    fontSize: fontSize.sm,
    color: "#888",
  },
  status: {
    padding: spacing.xs,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: font.default,
    fontWeight: 500,
    fontSize: fontSize.sm,
  },
});
