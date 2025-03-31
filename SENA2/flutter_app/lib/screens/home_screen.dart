import 'package:flutter/material.dart';
import 'clientes_screen.dart';
import 'empleados_screen.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => Navigator.push(
                  context, MaterialPageRoute(builder: (_) => ClientesScreen())),
              child: Text('Clientes'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.push(context,
                  MaterialPageRoute(builder: (_) => EmpleadosScreen())),
              child: Text('Empleados'),
            ),
          ],
        ),
      ),
    );
  }
}
