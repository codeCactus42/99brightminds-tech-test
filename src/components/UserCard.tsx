import { Avatar, Card, Chip } from "heroui-native";
import { Text, View } from "react-native";

export interface DirectoryUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: {
    city?: string;
    street?: string;
    suite?: string;
    zipcode?: string;
  };
  company?: {
    bs?: string;
    catchPhrase?: string;
    name?: string;
  };
}

interface DetailItemProps {
  label: string;
  value: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <View className="flex-row items-start justify-between gap-3 py-1.5">
      <Text className="w-[72px] text-[12px] font-bold text-muted">{label}</Text>
      <Text
        numberOfLines={1}
        className="min-w-0 flex-1 text-right text-sm font-semibold text-foreground"
      >
        {value}
      </Text>
    </View>
  );
}

export function UserCard({ user }: { user: DirectoryUser }) {
  const city = user.address?.city ?? "Remote";
  const location = [user.address?.suite, user.address?.street, city].filter(Boolean).join(", ");

  return (
    <Card className="mb-3 overflow-hidden rounded-lg border border-border bg-surface p-0">
      <Card.Body className="p-3.5">
        <View className="flex-row items-center gap-3">
          <Avatar size="lg" color="accent" variant="soft" alt={`${user.name} avatar`}>
            <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
          </Avatar>
          <View className="min-w-0 flex-1">
            <Text numberOfLines={1} className="text-[17px] font-extrabold text-foreground">
              {user.name}
            </Text>
            <Text numberOfLines={1} className="mt-0.5 text-[13px] text-muted">
              @{user.username}
            </Text>
          </View>
          <Chip color="default" size="sm" variant="soft">
            <Chip.Label>ID {user.id}</Chip.Label>
          </Chip>
        </View>

        <View className="mt-3 border-t border-border pt-2">
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Phone" value={user.phone} />
          <DetailItem label="Website" value={user.website} />
          <DetailItem label="Location" value={location || city} />
        </View>
      </Card.Body>
    </Card>
  );
}
