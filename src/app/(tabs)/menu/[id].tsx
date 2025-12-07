import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn("Adding to cart, size: ", selectedSize);
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select Size:</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    aspectRatio: 1,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    marginStart: 20,
  },
});
export default ProductDetailsScreen;
