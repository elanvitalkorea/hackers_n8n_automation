class BusinessCard {
  final String? name;
  final String? email;
  final String? phone;
  final String? company;
  final String? position;
  final String? website;
  final String? address;

  BusinessCard({
    this.name,
    this.email,
    this.phone,
    this.company,
    this.position,
    this.website,
    this.address,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name ?? '',
      'email': email ?? '',
      'phone': phone ?? '',
      'company': company ?? '',
      'position': position ?? '',
      'website': website ?? '',
      'address': address ?? '',
    };
  }

  BusinessCard copyWith({
    String? name,
    String? email,
    String? phone,
    String? company,
    String? position,
    String? website,
    String? address,
  }) {
    return BusinessCard(
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      company: company ?? this.company,
      position: position ?? this.position,
      website: website ?? this.website,
      address: address ?? this.address,
    );
  }
}

