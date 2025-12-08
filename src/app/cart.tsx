import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
    const { items, totalPrice} = useCart();

  return (
    <View style={styles.container}>
        <FlatList data={items} renderItem={({item})=><CartListItem cartItem={item} />} />

        <Text style={styles.text}> Total Price: ${totalPrice}</Text>
        <Button onPress={() => console.log("Checking out...") } text="Checkout" />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default CartScreen;