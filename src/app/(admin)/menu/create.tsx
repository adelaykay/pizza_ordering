import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreatePoductScreeen = () => {
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  
  
  const { id } = useLocalSearchParams();
  
  const product = products.find((p) => p.id.toString() === id);
  const isUpdate = !!id;
  const [name, setName] = useState(isUpdate && product ? product.name : "");
  const [price, setPrice] = useState(isUpdate && product ? product.price.toString() : "");
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdate) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    if (!validateInput()) {
      resetFields();
      return;
    }
    console.warn("Update product");

    // save in database

    resetFields();
  };

  const onCreate = () => {
    if (!validateInput()) {
      resetFields();
      return;
    }
    console.warn("Create product");

    // save in database
    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      image: image || defaultPizzaImage,
    };
    products.push(newProduct);
    console.log("New product created:", newProduct);

    resetFields();
    // navigate back to menu list
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdate ? "Update Product" : "Create Product" }}
      />

      <Image
        source={isUpdate ? { uri: product?.image || defaultPizzaImage } : { uri: defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      ></TextInput>
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      ></TextInput>

      <Text style={{ color: "red", marginBottom: 10 }}>{errors}</Text>

      <Button onPress={onSubmit} text={isUpdate ? "Update" : "Create"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    marginTop: 5,
    marginBottom: 15,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  textButton: {
    color: Colors.light.tint,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default CreatePoductScreeen;
