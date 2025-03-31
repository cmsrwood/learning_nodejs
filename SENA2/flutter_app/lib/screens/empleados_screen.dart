import 'package:flutter/material.dart';
import '../models/empleado.dart';
import '../services/api_service.dart';

class EmpleadosScreen extends StatefulWidget {
  @override
  _EmpleadosScreenState createState() => _EmpleadosScreenState();
}

class _EmpleadosScreenState extends State<EmpleadosScreen> {
  final ApiService _apiService = ApiService();
  List<Empleado> empleados = [];
  final _nombreController = TextEditingController();
  final _apellidosController = TextEditingController();
  final _correoController = TextEditingController();
  final _telefonoController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadEmpleados();
  }

  void _loadEmpleados() async {
    try {
      final data = await _apiService.getEmpleados();
      setState(() => empleados = data);
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _addEmpleado() async {
    try {
      await _apiService.createEmpleado(
        Empleado(
          nombre: _nombreController.text,
          apellidos: _apellidosController.text,
          correo: _correoController.text,
          telefono: _telefonoController.text,
        ),
      );
      _loadEmpleados();
      _clearFields();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _updateEmpleado(int id) async {
    try {
      await _apiService.updateEmpleado(
        id,
        Empleado(
          nombre: _nombreController.text,
          apellidos: _apellidosController.text,
          correo: _correoController.text,
          telefono: _telefonoController.text,
        ),
      );
      _loadEmpleados();
      _clearFields();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _deleteEmpleado(int id) async {
    try {
      await _apiService.deleteEmpleado(id);
      _loadEmpleados();
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _clearFields() {
    _nombreController.clear();
    _apellidosController.clear();
    _correoController.clear();
    _telefonoController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Empleados')),
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
                TextField(
                    controller: _correoController,
                    decoration: InputDecoration(labelText: 'Correo')),
                TextField(
                    controller: _telefonoController,
                    decoration: InputDecoration(labelText: 'Teléfono')),
                SizedBox(height: 20),
                ElevatedButton(
                    onPressed: _addEmpleado, child: Text('Agregar Empleado')),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: empleados.length,
              itemBuilder: (context, index) {
                final empleado = empleados[index];
                return ListTile(
                  title: Text('${empleado.nombre} ${empleado.apellidos}'),
                  subtitle: Text('${empleado.correo} - ${empleado.telefono}'),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.edit),
                        onPressed: () {
                          _nombreController.text = empleado.nombre;
                          _apellidosController.text = empleado.apellidos;
                          _correoController.text = empleado.correo;
                          _telefonoController.text = empleado.telefono;
                          showDialog(
                            context: context,
                            builder: (_) => AlertDialog(
                              title: Text('Editar Empleado'),
                              content: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TextField(controller: _nombreController),
                                  TextField(controller: _apellidosController),
                                  TextField(controller: _correoController),
                                  TextField(controller: _telefonoController),
                                ],
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    _updateEmpleado(empleado.id!);
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
                        onPressed: () => _deleteEmpleado(empleado.id!),
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
