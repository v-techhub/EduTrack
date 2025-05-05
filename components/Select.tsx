import colors from "@/constants/colors";
import font from "@/constants/font";
import fontSize from "@/constants/fontSize";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface Props<T> {
  data: T[];
  handleChange: (name: string, value: string) => void;
  name: string;
}

export default function Select<T>({
  data,
  handleChange,
  name,
}: Props<T>): React.JSX.Element {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, _) => handleChange(name, selectedItem.value)}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Enrollment Type"}
            </Text>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    color: colors.placeholder,
    fontFamily: font.default,
  },
  dropdownButtonArrowStyle: {
    color: colors.placeholder,
    fontSize: 20,
  },
  dropdownButtonIconStyle: {
    fontSize: fontSize.sm,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    // backgroundColor: colors.darkGray,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.placeholder,
  },
  dropdownItemIconStyle: {
    fontSize: fontSize.sm,
    marginRight: 8,
  },
});
