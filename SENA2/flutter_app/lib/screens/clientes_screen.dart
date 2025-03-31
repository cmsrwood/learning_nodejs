import 'package:flutter/material.dart';
import '../models/cliente.dart';
import '../services/api_service.dart';

class ClientesScreen extends StatefulWidget {
  @override
  _ClientesScreenState createState() => _ClientesScreenState();
}

class _ClientesScreenState extends State<ClientesScreen> {
  final ApiService _apiService = ApiService();
  List<Cliente> clientes = [];
  final _nombreController = TextEditingController();
  final _apellidosController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadClientes();
  }

  void _loadClientes() async {
    try {
      final data = await _apiService.getClientes();
      setState(() => clientes = data);
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _addCliente() async {
    try {
      await _apiService.createCliente(
        Cliente(
            nombre: _nombreController.text,
            apellidos: _apellidosController.text),
      );
      _loadClientes();
      _nombreController.clear();
      _apellidosController.clear();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _updateCliente(int id) async {
    try {
      await _apiService.updateCliente(
        id,
        Cliente(
            nombre: _nombreController.text,
            apellidos: _apellidosController.text),
      );
      _loadClientes();
      _nombreController.clear();
      _apellidosController.clear();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _deleteCliente(int id) async {
    try {
      await _apiService.deleteCliente(id);
      _loadClientes();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Clientes')),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              children: [
                TextField(
                    controller: _nombreController,
                    decoration: InputDecoration(labelText: 'Nombre')),
                TextField(
                    controller: _apellidosController,
                    decoration: InputDecoration(labelText: 'Apellidos')),
                SizedBox(height: 20),
                ElevatedButton(
                    onPressed: _addCliente, child: Text('Agregar Cliente')),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: clientes.length,
              itemBuilder: (context, index) {
                final cliente = clientes[index];
                return ListTile(
                  title: Text('${cliente.nombre} ${cliente.apellidos}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.edit),
                        onPressed: () {
                          _nombreController.text = cliente.nombre;
                          _apellidosController.text = cliente.apellidos;
                          showDialog(
                            context: context,
                            builder: (_) => AlertDialog(
                              title: Text('Editar Cliente'),
                              content: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TextField(controller: _nombreController),
                                  TextField(controller: _apellidosController),
                                ],
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    _updateCliente(cliente.id!);
                                    Navigator.pop(context);
                                  },
                                  child: Text('Guardar'),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () => _deleteCliente(cliente.id!),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
