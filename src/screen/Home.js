import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Text,
  Image,
  ScrollView,
  HStack,
  Pressable,
} from "native-base";
import { Ionicons, AntDesign, MaterialIcons} from "react-native-vector-icons";

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack  backgroundColor={"gray.100"}>
      <Image
        source={require("../assets/images/cathatlat.jpeg")}
        alt={"Home Image"}
        width={"full"}
        height={"270"}
      />

      <VStack p={4} >

        <Text fontSize="2xl" fontWeight={"bold"} color={"gray.900"}>
        E-SENSOR AQUA
        </Text>
        <Text fontSize="2xl" fontWeight={"bold"} color={"gray.900"}>
          GIÁM SÁT AO NUÔI THỦY SẢN
        </Text>
        <Text fontSize="lg" textAlign={"justify"}>
        "E-Sensor Aqua" Hệ thống  thu thập, đánh giá và phân tích nồng độ pH có
          trong nước. Từ đó hỗ trợ giám sát, cảnh báo, định hướng cải tạo và quản lý bền
          vững cho nguồn nước trong ao nuôi thủy sản.
        </Text>
        <ScrollView>
      
          <VStack alignItems={"stretch"} space={4}>
        
            {/* <MenuItem
              icon={
                <Ionicons name="images-outline" size={50} color={"#e11d48"} />
              }
              title={"Ảnh chụp cây lúa"}
              description={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              onPress={() => navigation.navigate("Images")}
            /> */}
            <MenuItem
              icon={<AntDesign name="linechart" size={50} color={"#059669"} />}
              title={"Độ pH và nhiệt độ trong ao"}
              description={"Hiển thị nồng độ pH và nhiệt độ trong ao."}
              onPress={() => navigation.navigate("Chart")}
            />
            <MenuItem
              icon={<Ionicons name="map-outline" size={50} color={"#dc2626"} />}
              onPress={() => navigation.navigate("Map")}
              title={"Bản đồ đánh giá tình trạng pH"}
              description={
                "Ghi nhận vị trí pH trong ao nuôi."
              }
            />
            <MenuItem
              icon={
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={50}
                  color={"#0284c7"}
                />
              }
              onPress={() => navigation.navigate("Group")}
              title={"Hỏi đáp thắc mắc"}
              description={"Kết nối và chia sẽ với chuyên gia."}
            />
           
          </VStack>
          </ScrollView>
       
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
