import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Image, HStack, Pressable } from "native-base";
import { Ionicons, AntDesign } from "react-native-vector-icons";

export const ImageNPKScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack space={4} backgroundColor={"gray.100"}>
      <Image
        source={require("../assets/images/bangnpk.png")}
        alt={"Home Image"}
        width={"full"}
        height={"200"}
      />
      <VStack p={4} space={4}>
        <Text fontSize="2xl" fontWeight={"bold"} color={"gray.900"}>
          BẢNG KHUYẾN NGHỊ SỬ DỤNG NPK TRÊN VÙNG ĐẤT PHÈN
        </Text>
      </VStack>
    </VStack>
  );
};

const MenuItem = ({ title, description, icon, onPress }) => (
  <Pressable
    backgroundColor={"white"}
    _pressed={{
      backgroundColor: "gray.200",
    }}
    rounded={10}
    onPress={onPress}
  >
    <HStack p={4} space={4} alignItems={"center"}>
      {icon}

      <VStack flexGrow={1} width={"1"}>
        <Text color={"#f97316"} fontSize="lg" fontWeight={"medium"}>
          {title}
        </Text>
        <Text fontSize="md">{description}</Text>
      </VStack>
    </HStack>
  </Pressable>
);
