import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { DirectoryEmptyState } from "@/components/DirectoryEmptyState";
import { DirectoryHeader } from "@/components/DirectoryHeader";
import { type DirectoryUser, UserCard } from "@/components/UserCard";
import { useDebounce } from "@/hooks/useDebounce";

const API_URL = "https://jsonplaceholder.cypress.io/users";

function getSearchBody(user: DirectoryUser) {
  return [
    user.name,
    user.username,
    user.email,
    user.phone,
    user.website,
    user.company?.name,
    user.company?.catchPhrase,
    user.address?.city,
    user.address?.street,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export default function HomeScreen() {
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceEnabled, setDebounceEnabled] = useState(true);
  const accentColor = useThemeColor("accent");

  const debouncedValue = useDebounce(searchQuery);
  const searchValue = debounceEnabled ? debouncedValue : searchQuery;

  const loadUsers = useCallback(async () => {
    try {
      const { data } = await axios.get<DirectoryUser[]>(API_URL, { timeout: 10000 });
      setUsers(data);
      setLoadError(null);
    } catch {
      setLoadError("We couldn't reach the people directory. Pull to retry.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const refreshUsers = useCallback(() => {
    setRefreshing(true);
    void loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const syncTimer = setTimeout(() => {
      void loadUsers();
    }, 0);

    return () => {
      clearTimeout(syncTimer);
    };
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => getSearchBody(user).includes(query));
  }, [searchValue, users]);

  const isShowingLoadError = users.length === 0 && Boolean(loadError);
  const emptyStateTitle = isShowingLoadError ? "Unable to load users" : "No matches found";
  const emptyStateMessage = isShowingLoadError
    ? (loadError ?? "")
    : "Try a different name, city, company, email, or phone number.";

  return (
    <SafeAreaView className="flex-1 bg-background-secondary" edges={["bottom"]}>
      <Stack.Screen options={{ headerShown: true }} />
      <Stack.Header style={{ backgroundColor: "#000" }} />
      <Stack.Title asChild>
        <Image
          source={require("@/assets/logo.png")}
          style={{ width: 150, height: 35 }}
          resizeMode="contain"
        />
      </Stack.Title>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UserCard user={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-7"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshUsers}
            tintColor={accentColor}
            colors={[accentColor]}
          />
        }
        ListHeaderComponent={
          <DirectoryHeader
            accentColor={accentColor}
            debounceEnabled={debounceEnabled}
            isRefreshing={refreshing}
            onDebounceEnabledChange={setDebounceEnabled}
            onRefresh={refreshUsers}
            onSearchQueryChange={setSearchQuery}
            resultCount={filteredUsers.length}
            searchQuery={searchQuery}
          />
        }
        ListEmptyComponent={
          <DirectoryEmptyState message={emptyStateMessage} title={emptyStateTitle} />
        }
      />
    </SafeAreaView>
  );
}
