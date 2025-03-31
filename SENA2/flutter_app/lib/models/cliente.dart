class Cliente {
  final int? id;
  final String nombre;
  final String apellidos;

  Cliente({this.id, required this.nombre, required this.apellidos});

  factory Cliente.fromJson(Map<String, dynamic> json) => Cliente(
        id: json['id'],
        nombre: json['nombre'],
        apellidos: json['apellidos'],
      );

  Map<String, dynamic> toJson() => {
        'nombre': nombre,
        'apellidos': apellidos,
      };
}
