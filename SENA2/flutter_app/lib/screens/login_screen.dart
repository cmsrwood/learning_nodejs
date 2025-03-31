import 'package:flutter/material.dart';
import '../models/usuario.dart';
import '../services/api_service.dart'; // Agrega esta línea
import 'register_screen.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usuarioController = TextEditingController();
  final _passwordController = TextEditingController();
  final ApiService _apiService = ApiService();

  void _login() async {
    try {
      final token = await _apiService.login(
        Usuario(
            usuario: _usuarioController.text,
            password: _passwordController.text),
      );
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (_) => HomeScreen()));
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
                controller: _usuarioController,
                decoration: InputDecoration(labelText: 'Usuario')),
            TextField(
                controller: _passwordController,
                decoration: InputDecoration(labelText: 'Contraseña'),
                obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(onPressed: _login, child: Text('Iniciar Sesión')),
            TextButton(
              onPressed: () => Navigator.push(
                  context, MaterialPageRoute(builder: (_) => RegisterScreen())),
              child: Text('Registrarse'),
            ),
          ],
        ),
      ),
    );
  }
}
