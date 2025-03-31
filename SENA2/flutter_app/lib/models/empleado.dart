class Empleado {
  final int? id;
  final String nombre;
  final String apellidos;
  final String correo;
  final String telefono;

  Empleado(
      {this.id,
      required this.nombre,
      required this.apellidos,
      required this.correo,
      required this.telefono});

  factory Empleado.fromJson(Map<String, dynamic> json) => Empleado(
        id: json['id'],
        nombre: json['nombre'],
        apellidos: json['apellidos'],
        correo: json['correo'],
        telefono: json['telefono'],
      );

  Map<String, dynamic> toJson() => {
        'nombre': nombre,
        'apellidos': apellidos,
        'correo': correo,
        'telefono': telefono,
      };
}
