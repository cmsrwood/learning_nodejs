import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/cliente.dart';
import '../models/empleado.dart';
import '../models/usuario.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  Future<String> register(Usuario usuario) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(usuario.toJson()),
    );
    if (response.statusCode == 201) return 'Usuario registrado';
    throw Exception('Error al registrar');
  }

  Future<String> login(Usuario usuario) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(usuario.toJson()),
    );
    if (response.statusCode == 200) return jsonDecode(response.body)['token'];
    throw Exception('Error al iniciar sesión');
  }

  Future<List<Cliente>> getClientes() async {
    final response = await http.get(Uri.parse('$baseUrl/clientes'));
    if (response.statusCode == 200) {
      List jsonResponse = jsonDecode(response.body);
      return jsonResponse.map((data) => Cliente.fromJson(data)).toList();
    }
    throw Exception('Error al obtener clientes');
  }

  Future<void> createCliente(Cliente cliente) async {
    await http.post(
      Uri.parse('$baseUrl/clientes'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(cliente.toJson()),
    );
  }

  Future<void> updateCliente(int id, Cliente cliente) async {
    await http.put(
      Uri.parse('$baseUrl/clientes/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(cliente.toJson()),
    );
  }

  Future<void> deleteCliente(int id) async {
    await http.delete(Uri.parse('$baseUrl/clientes/$id'));
  }

  Future<List<Empleado>> getEmpleados() async {
    final response = await http.get(Uri.parse('$baseUrl/empleados'));
    if (response.statusCode == 200) {
      List jsonResponse = jsonDecode(response.body);
      return jsonResponse.map((data) => Empleado.fromJson(data)).toList();
    }
    throw Exception('Error al obtener empleados');
  }

  Future<void> createEmpleado(Empleado empleado) async {
    await http.post(
      Uri.parse('$baseUrl/empleados'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(empleado.toJson()),
    );
  }

  Future<void> updateEmpleado(int id, Empleado empleado) async {
    await http.put(
      Uri.parse('$baseUrl/empleados/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(empleado.toJson()),
    );
  }

  Future<void> deleteEmpleado(int id) async {
    await http.delete(Uri.parse('$baseUrl/empleados/$id'));
  }
}
