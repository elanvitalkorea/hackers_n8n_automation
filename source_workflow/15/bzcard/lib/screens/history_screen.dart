import 'package:flutter/material.dart';
import '../utils/constants.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(Constants.primaryBlack),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'History',
          style: TextStyle(color: Color(Constants.primaryWhite)),
        ),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'History',
          style: TextStyle(
            color: Color(Constants.primaryWhite),
            fontSize: 24,
          ),
        ),
      ),
    );
  }
}

