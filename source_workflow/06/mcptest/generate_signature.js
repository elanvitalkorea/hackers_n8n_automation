const CryptoJS = require("crypto-js");

function makeSignature() {
    const space = " ";
    const newLine = "\n";
    const method = "GET"; // 요청하려는 HTTP 메소드
    const url = "/photos/puppy.jpg?query1=&query2"; // 요청하려는 URL (쿼리 스트링 포함)
    
    // 네이버 클라우드 플랫폼 포털에서 발급받은 키
    const accessKey = process.env.NAVER_CLOUD_ACCESS_KEY_ID || '';
    const secretKey = process.env.NAVER_CLOUD_SECRET_KEY || '';
    
    const timestamp = Date.now().toString();

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    console.log(`Timestamp: ${timestamp}`);
    console.log(`Signature: ${signature}`);
    
    return { timestamp, signature };
}

makeSignature();
