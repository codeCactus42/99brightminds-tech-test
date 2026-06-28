import { Text, View } from "react-native";

interface DirectoryEmptyStateProps {
  message: string;
  title: string;
}

export function DirectoryEmptyState({ message, title }: DirectoryEmptyStateProps) {
  return (
    <View className="items-center rounded-lg border border-border bg-surface px-5 py-7">
      <Text className="text-center text-lg font-extrabold text-foreground">{title}</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-muted">{message}</Text>
    </View>
  );
}
