import { Feather } from "@expo/vector-icons";
import { Button, SearchField, Switch } from "heroui-native";
import { Text, View } from "react-native";

interface DirectoryHeaderProps {
  accentColor: string;
  debounceEnabled: boolean;
  isRefreshing: boolean;
  onDebounceEnabledChange: (isEnabled: boolean) => void;
  onRefresh: () => void;
  onSearchQueryChange: (query: string) => void;
  resultCount: number;
  searchQuery: string;
}

export function DirectoryHeader({
  accentColor,
  debounceEnabled,
  isRefreshing,
  onDebounceEnabledChange,
  onRefresh,
  onSearchQueryChange,
  resultCount,
  searchQuery,
}: DirectoryHeaderProps) {
  return (
    <View className="pb-1.5 pt-[18px]">
      <View className="mb-[18px] flex-row items-start gap-3.5">
        <View className="min-w-0 flex-1">
          <Text className="text-[34px] font-extrabold leading-[38px] text-foreground">
            Search
          </Text>
          <Text className="mt-2 text-[15px] leading-[21px] text-muted">
            This is a task for 99brightminds.com
          </Text>
        </View>
        <Button
          accessibilityLabel="Refresh users"
          isDisabled={isRefreshing}
          isIconOnly
          onPress={onRefresh}
          size="md"
          variant="secondary"
        >
          <Feather color={accentColor} name="refresh-cw" size={18} />
        </Button>
      </View>

      <SearchField className="mb-4" onChange={onSearchQueryChange} value={searchQuery}>
        <SearchField.Group className="h-[52px] rounded-2xl border border-border bg-surface">
          <SearchField.SearchIcon />
          <SearchField.Input
            autoCapitalize="none"
            autoCorrect={false}
            className="pl-10 pr-10"
            placeholder="Search people, cities, companies"
          />
          <SearchField.ClearButton isIconOnly size="sm" variant="ghost" />
        </SearchField.Group>
      </SearchField>

      <View className="mb-[18px] min-h-[58px] flex-row items-center justify-between gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5">
        <View className="min-w-0 flex-1">
          <Text className="text-[15px] font-extrabold text-foreground">Debounced search</Text>
          <Text className="mt-0.5 text-[13px] text-muted">
            {debounceEnabled ? "Balanced" : "Instant"} filtering
          </Text>
        </View>
        <Switch
          className="h-[30px] w-[52px]"
          isSelected={debounceEnabled}
          onSelectedChange={onDebounceEnabledChange}
        >
          <Switch.Thumb className="size-[22px]" />
        </Switch>
      </View>

      <View className="mb-3 flex-row items-center justify-between gap-3">
        <Text className="text-lg font-extrabold text-foreground">Results</Text>
        <Text className="text-[13px] font-bold text-muted">
          {resultCount} {resultCount === 1 ? "match" : "matches"}
        </Text>
      </View>
    </View>
  );
}
