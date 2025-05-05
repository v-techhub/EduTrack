import { StudentCard, StudentCount } from "@/components";

import font from "@/constants/font";
import spacing from "@/constants/spacing";
import { useGetStudents } from "@/hooks/student";
import { Student } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const { data: allStudents, getStudents } = useGetStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Filter students based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(allStudents);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = allStudents.filter((student) => {
      if (student.name.toLowerCase().includes(query)) return true;
      if (
        student.enrollmentStatus &&
        student.enrollmentStatus.toLowerCase().includes(query)
      )
        return true;

      return false;
    });

    setFilteredStudents(filtered);
  }, [searchQuery, allStudents]);

  // Memoize the count of filtered students for performance
  const studentCount: number = useMemo(
    () => filteredStudents.length,
    [filteredStudents]
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getStudents()
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        console.log("error refreshing ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StudentCount students={allStudents} />
      <View style={styles.searchWrapper}>
        <AntDesign
          name="search1"
          color={"#000"}
          size={20}
          style={{ flex: 0.1, marginLeft: spacing.xxs }}
        />
        <TextInput
          placeholder="Search by name or status..."
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <AntDesign
            name="close"
            color={"#777"}
            size={18}
            style={styles.clearIcon}
            onPress={handleClearSearch}
          />
        )}
      </View>

      {/* Search results info */}
      {searchQuery.length > 0 && (
        <Text style={styles.resultsInfo}>
          Found {studentCount} {studentCount === 1 ? "student" : "students"}
        </Text>
      )}

      {/* Student lists */}
      <FlatList
        data={filteredStudents}
        refreshControl={
          <RefreshControl
            colors={["#777"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm }}
        scrollEventThrottle={60}
        renderItem={({ item }) => <StudentCard {...item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery.length > 0
                ? "No students match your search"
                : "No students available"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.sm,
  },
  searchWrapper: {
    backgroundColor: "gainsboro",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  input: {
    flex: 0.92,
    padding: spacing.md,
    fontFamily: font.default,
  },
  clearIcon: {
    padding: spacing.xs,
    marginRight: spacing.xxs,
  },
  resultsInfo: {
    marginBottom: spacing.xs,
    fontFamily: font.default,
    color: "#555",
    fontSize: 12,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: font.default,
    color: "#777",
    textAlign: "center",
  },
});
