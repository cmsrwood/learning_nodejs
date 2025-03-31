class Usuario {
  final int? id;
  final String usuario;
  final String password;

  Usuario({this.id, required this.usuario, required this.password});

  Map<String, dynamic> toJson() => {
        'usuario': usuario,
        'password': password,
      };
}
