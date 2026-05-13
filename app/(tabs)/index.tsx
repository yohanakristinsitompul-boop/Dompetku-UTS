import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

export default function App() {
  const [deskripsi, setDeskripsi] = useState('');
  const [nominal, setNominal] = useState('');
  const [transaksi, setTransaksi] = useState([
    { id: '1', ket: 'Uang Saku', nominal: 50000, tipe: 'masuk' },
    { id: '2', ket: 'Beli Cilok', nominal: 5000, tipe: 'keluar' },
  ]);

  // Logika menghitung total saldo otomatis
  const totalSaldo = transaksi.reduce((total, item) => {
    return item.tipe === 'masuk' ? total + item.nominal : total - item.nominal;
  }, 0);

  const tambahTransaksi = (tipe) => {
    if (!deskripsi || !nominal) return;

    const baru = {
      id: Math.random().toString(),
      ket: deskripsi,
      nominal: parseInt(nominal),
      tipe: tipe, 
    };

    setTransaksi([baru, ...transaksi]);
    setDeskripsi('');
    setNominal('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Saldo - Sesuai Screenshot_20260513_115046_Chrome.jpg */}
      <View style={styles.header}>
        <Text style={styles.title}>Total Saldo</Text>
        <Text style={styles.saldo}>Rp {totalSaldo.toLocaleString()}</Text>
      </View>

      {/* Form Input - Sesuai Screenshot_20260513_115046_Chrome.jpg */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi (ex: Beli Makan)"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
        <TextInput
          style={styles.input}
          placeholder="Nominal (ex: 50000)"
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2ecc71' }]} 
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#e74c3c' }]} 
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List History menggunakan FlatList - Sesuai Screenshot_20260513_115046_Chrome.jpg */}
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemKet}>{item.ket}</Text>
            {/* Styling & Logika Warna - Sesuai Screenshot_20260513_115057_Chrome.jpg */}
            <Text style={[
              styles.itemNominal, 
              { color: item.tipe === 'masuk' ? 'green' : 'red' }
            ]}>
              {item.tipe === 'masuk' ? '+' : '-'} Rp {item.nominal.toLocaleString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 20, paddingTop: 50 },
  header: { backgroundColor: '#2980b9', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  title: { color: '#fff', fontSize: 16 },
  saldo: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  form: { marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 0.48, padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  listItem: { backgroundColor: '#fff', padding: 15, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, elevation: 2 },
  itemKet: { fontSize: 16 },
  itemNominal: { fontSize: 16, fontWeight: 'bold' },
});