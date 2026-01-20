import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:image_picker/image_picker.dart';
import 'recognition_screen.dart';
import '../utils/constants.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<void> _pickImage(ImageSource source) async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(
        source: source,
        imageQuality: 85,
      );

      if (image != null && mounted) {
        // 웹에서는 이미지 바이트를 읽어서 전달
        Uint8List? imageBytes;
        if (kIsWeb) {
          imageBytes = await image.readAsBytes();
        }

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => RecognitionScreen(
              imagePath: image.path,
              imageBytes: imageBytes,
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('이미지 선택 중 오류가 발생했습니다: ${e.toString()}'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(Constants.primaryBlack),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'Business Card Recognition',
          style: TextStyle(color: Color(Constants.primaryWhite)),
        ),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // 원형 이미지 플레이스홀더
            Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.grey[900],
                border: Border.all(color: Colors.grey[700]!, width: 2),
              ),
              child: Icon(
                Icons.business_center,
                size: 80,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 40),
            const Text(
              'Business Card',
              style: TextStyle(
                color: Color(Constants.primaryWhite),
                fontSize: 32,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Capture your business card',
              style: TextStyle(
                color: Color(Constants.primaryWhite),
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 40),
            // 카메라 촬영 버튼
            ElevatedButton(
              onPressed: () => _pickImage(ImageSource.camera),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(Constants.accentYellow),
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 16,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Text(
                'Camera',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            // 갤러리 업로드 버튼
            ElevatedButton(
              onPressed: () => _pickImage(ImageSource.gallery),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(Constants.accentYellow),
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 16,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Text(
                'Gallery',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
