import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

// ====== Ganti sesuai kebutuhan ======
const NAMA_KAMU = 'Muhammad Briant';
const EMAIL_BENAR = 'admin@mail.com';
const PASSWORD_BENAR = '123456';
// ====================================

// ---------- Halaman Login ----------
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Peringatan', 'Email dan password wajib diisi');
    } else if (email === EMAIL_BENAR && password === PASSWORD_BENAR) {
      onLogin();
    } else {
      Alert.alert('Gagal', 'Email atau password salah');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.center}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.appName}>MY APP</Text>
      <Text style={styles.appSub}>UTS MOBILE 1</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9AA5B1"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9AA5B1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>
        {EMAIL_BENAR} / {PASSWORD_BENAR}
      </Text>
    </KeyboardAvoidingView>
  );
}

// ---------- Halaman Home ----------
function HomeScreen({ onLogout }) {
  const menus = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4'];

  return (
    <View style={styles.home}>
      <Text style={styles.homeTitle}>Home Page</Text>

      {/* Kartu profil */}
      <View style={[styles.card, styles.profileCard]}>
        <Image source={require('./foto.jpg')} style={styles.photo} />
        <Text style={styles.name}>{NAMA_KAMU}</Text>
      </View>

      {/* Menu 2 x 2 */}
      <View style={styles.menuWrap}>
        {menus.map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.card, styles.menuItem]}
            onPress={() => Alert.alert('Info', m + ' ditekan')}
          >
            <Text style={styles.menuText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- App utama ----------
export default function App() {
  const [sudahLogin, setSudahLogin] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {sudahLogin ? (
        <HomeScreen onLogout={() => setSudahLogin(false)} />
      ) : (
        <LoginScreen onLogin={() => setSudahLogin(true)} />
      )}
    </View>
  );
}

// ---------- Style ----------
const BLUE = '#2D8CFF';
const TEXT = '#1F2D3D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCEFFF', // light blue
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },

  // kartu putih dengan bayangan lembut (dipakai di banyak tempat)
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#1B4F8A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  // login
  center: { flex: 1, justifyContent: 'center', padding: 28 },
  appName: { fontSize: 34, fontWeight: '800', color: TEXT, textAlign: 'center' },
  appSub: {
    fontSize: 14,
    letterSpacing: 3,
    color: '#5B7A99',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F2F6FA',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    fontSize: 15,
    color: TEXT,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: BLUE,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 18, color: '#7A93AD', fontSize: 12, textAlign: 'center' },

  // home
  home: { flex: 1, padding: 24 },
  homeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT,
    textAlign: 'center',
    marginVertical: 18,
  },
  profileCard: { alignItems: 'center', paddingVertical: 28 },
  photo: { width: 96, height: 96, borderRadius: 26 },
  name: { marginTop: 14, fontSize: 18, fontWeight: '700', color: TEXT },

  menuWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuItem: {
    width: '48%',
    height: 80,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { fontSize: 15, fontWeight: '600', color: TEXT },

  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 13,
    paddingHorizontal: 44,
    alignSelf: 'center',
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#E5484D',
  },
  logoutText: { color: '#E5484D', fontSize: 15, fontWeight: '700' },
});