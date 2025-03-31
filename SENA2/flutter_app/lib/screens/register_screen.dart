import 'package:flutter/material.dart';
import '../models/usuario.dart';
import '../services/api_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _usuarioController = TextEditingController();
  final _passwordController = TextEditingController();
  final ApiService _apiService = ApiService();

  void _register() async {
    try {
      final message = await _apiService.register(
        Usuario(
            usuario: _usuarioController.text,
            password: _passwordController.text),
      );
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(message)));
      Navigator.pop(context);
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Registro')),
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
            ElevatedButton(onPressed: _register, child: Text('Registrarse')),
          ],
        ),
      ),
    );
  }
}
