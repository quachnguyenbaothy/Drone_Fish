import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Dimensions } from "react-native";
import { View, StyleSheet, Linking } from "react-native";
import { fDatabase } from "../firebase";
import { onValue, ref, update } from "firebase/database";
import { Fab, VStack, Image, Text, Link } from "native-base";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Ionicons } from "react-native-vector-icons";

const DEFAULT_LOCATION = {
  // lat: 9.661340,
  // long: 105.524829,
  lat: 9.695278,
  long: 105.525433,
};

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const MapScreen = () => {
  const [data, setData] = useState([]);
  const { width, height } = Dimensions.get("screen");
  const [showImagePh, setShowImagePh] = useState(false);
  const [errors, setErrors] = useState([]);
  const websiteLink =
    "https://nongnghiepcnc.ninhbinh.gov.vn/ky-thuat-cong-nghe/quan-ly-ph-trong-ao-nuoi-ca-nuoc-ngot-342.html";

  const imagePh = () => {
    setShowImagePh(!showImagePh);
  };

    const linkGiaiPhap = () => {
    Linking.openURL(websiteLink);
  };

  const addMockData = () => {
    const key = Math.floor(Date.now() / 1000);
    const dataRef = ref(fDatabase, `data/${key}`);
    update(dataRef, {
      n: Math.random() * 100,
      p: Math.random() * 100,
      k: Math.random() * 100,
      ph: randomIntFromInterval(0, 14),
      ec: randomIntFromInterval(0, 20),
      humidity: Math.random() * 100,
      temperature: Math.random() * 100,
      lat: DEFAULT_LOCATION.lat + Math.random() / 1000,
      long: DEFAULT_LOCATION.long + Math.random() / 1000,
    });
  };

  useEffect(() => {
    const dataRef = ref(fDatabase, `data`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);

      setData(
        keys.slice(keys.length - 15, keys.length).map((key) => {
          const value = data[key];

          return {
            time: format(new Date(key * 1000), "dd/MM/yyyy: hh:mm:ss"),
            // Date: format(new Date(key), "dd/mm/yyyy"),
            ...data[key],
          };
        })
      );
    });
  }, []);

  //Tính giá trị sai số
  const renderErrors = () => {
    return data.slice(data.length - 15, data.length).map((item) => {
      if (data.length === 5) {
        const calculatedErrors = data.map((item) =>
          Math.abs((item?.ph ?? 0).toFixed(2) - 6)
        ); // 6 là giá trị mục tiêu
        setErrors(calculatedErrors);
        return errors.map((error, index) => (
          <Text key={index}>
            Sai số của Marker {index + 1}: {error}
          </Text>
        ));
      }
    });
  };

  //lây dữ liệu ph
  const renderMarkers = () => {
    return data.map((item) => {
      //Do pH thấp
      if ((item?.ph ?? 0).toFixed(2) <= 6.5) {
        return (
          <Marker
            key={item.time}
            coordinate={{
              latitude: item?.lat ?? DEFAULT_LOCATION.lat,
              longitude: item?.long ?? DEFAULT_LOCATION.long,
            }}
            title={item.time}
            // description={`pH: ${(item?.ph ?? 0).toFixed(2)}, EC:${(item?.ec ?? 0).toFixed(2)}`}
            description={`pH: ${(item?.ph ?? 0).toFixed(2)},pH thấp, Nhiệt độ:${(
              item?.ec ?? 0
            ).toFixed(2)}`}
          >
            <Ionicons
              name="pin-sharp"
              size={50}
              color={`hsl(${(item?.ph ?? 0) * 17}, 100%, 50%)`}
            />
          </Marker>
        );

        //Đất kiềm
      } else if ((item?.ph ?? 0).toFixed(2) >= 8) {
        return (
          <Marker
            key={item.time}
            coordinate={{
              latitude: item?.lat ?? DEFAULT_LOCATION.lat,
              longitude: item?.long ?? DEFAULT_LOCATION.long,
            }}
            title={item.time}
            // description={`pH: ${(item?.ph ?? 0).toFixed(2)}, EC:${(item?.ec ?? 0).toFixed(2)}`}

            description={`pH: ${(item?.ph ?? 0).toFixed(2)},pH cao, Nhiệt độ:${(
              item?.ec ?? 0
            ).toFixed(2)}`}
          >
            <Ionicons
              name="pin-sharp"
              size={50}
              color={`hsl(${(item?.ph ?? 0) * 17}, 100%, 50%)`}
            />
          </Marker>
        );
      } else {
        return (
          <Marker
            key={item.time}
            coordinate={{
              latitude: item?.lat ?? DEFAULT_LOCATION.lat,
              longitude: item?.long ?? DEFAULT_LOCATION.long,
            }}
            title={item.time}
            // description={`pH: ${(item?.ph ?? 0).toFixed(2)}, EC:${(item?.ec ?? 0).toFixed(2)}`}

            description={`pH: ${(item?.ph ?? 0).toFixed(
              2
            )},pH lý tưởng, Nhiệt độ:${(item?.ec ?? 0).toFixed(2)}`}
          >
            <Ionicons
              name="pin-sharp"
              size={50}
              color={`hsl(${(item?.ph ?? 0) * 17}, 100%, 50%)`}
            />
          </Marker>
        );
      }
      return null;
    });
  };

  return (
    <VStack>
      <Text
        style={{
          padding: 10,
          marginTop: 50,
          left: 20,
          fontSize: 20,
          color: "red",
        }}
      >
        {" "}
        {renderErrors()}
      </Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width,
          height,
        }}
        initialRegion={{
          latitude: data[0]?.lat ?? DEFAULT_LOCATION.lat,
          longitude: data[0]?.long ?? DEFAULT_LOCATION.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {renderMarkers()}

       
      </MapView>
      {showImagePh && (
        <View style={styles.imagePh}>
          <Image
            source={require("../assets/images/bangdopH.jpg")}
            width={"400"}
            height={"220"}
          />
        </View>
      )}
      
      <Fab
        bottom={150}
        shadow={2}
        size="xs"
        fontWeight={"bold"}
        label={"Bảng pH khuyến nghị"}
        onPress={imagePh}
      />

      <Fab
        bottom={90}
        shadow={2}
        size="xs"
        fontWeight={"bold"}
        label={"Biện pháp cải tạo ao nuôi"}
        onPress={linkGiaiPhap}
      />
      
    </VStack>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  imagePh: {
    position: "absolute",
    bottom: 450,
    left: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  
  linkGiaiPhap: {
    position: "absolute",
    bottom: 250,
    left: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
