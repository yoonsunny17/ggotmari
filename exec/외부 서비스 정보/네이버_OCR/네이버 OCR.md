# 네이버 OCR

# NAVER CLOVA OCR API

---

## 1. NAVER CLOVA OCR 도메인 추가 및 설정

- NAVER CLOVA OCR 이용 신청([https://guide.ncloud-docs.com/docs/clovaocr-start](https://guide.ncloud-docs.com/docs/clovaocr-start))을 한다.
- CLOVA OCR > Domain 메뉴에서 도메인 생성 버튼을 누른 후 [General/Template]로 도메인을 생성한다.
- 도메인 생성 후 Text OCR 버튼을 눌러 API Gateway 자동 연결 후 생성되는 Secret Key, invoke URL을 저장합니다.

![Untitled](/exec/외부 서비스 정보/네이버_OCR/네이버 OCR/Untitled.png)

## 2. Spring boot에서 API호출하기

- **CLOVA OCR API의 경우 Java Script에서 호출이 안되게 막아 놓은 경우가 있어 Front-end가 아닌 Back-end에서 호출하여 사용합니다.**
- RESET Controller로 MultipartFile 형태로 이미지 파일을 요청 받습니다.

```java
public ResponseEntity<? extends RecommendOcrRes> getTextByOCR(@RequestPart(value = "recommendOcrInfo")RecommendOcrReq recommendOcrInfo,
                                                                   @RequestPart(value = "image") MultipartFile multipartFile){

    String content = naverClovaService.getOcrText(multipartFile,recommendOcrInfo);

    return ResponseEntity.status(201).body(RecommendOcrRes.of(201, "정상적으로 텍스트를 추출했습니다.", content));

}
```

- CLOVA OCR API 사용 가이드에 적힌 예제와 같이 코드를 작성해줍니다.

```java
@Value("${naver.clova.url}")
private String NAVER_CLOVA_URL;
@Value("${naver.clova.key}")
private String NAVER_CLOVA_KEY;

public String getOcrText(MultipartFile multipartFile, RecommendOcrReq recommendOcrReq) {
    String result = "";
    StringBuilder builder = new StringBuilder();
    try {
        URL url = new URL(NAVER_CLOVA_URL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setUseCaches(false);
        con.setDoInput(true);
        con.setDoOutput(true);
        con.setReadTimeout(30000);
        con.setRequestMethod("POST");
        String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
        con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
        con.setRequestProperty("X-OCR-SECRET", NAVER_CLOVA_KEY);

        JSONObject json = new JSONObject();
        json.put("version", "V2");
        json.put("requestId", UUID.randomUUID().toString());
        json.put("timestamp", System.currentTimeMillis());
        JSONObject image = new JSONObject();
        image.put("format", recommendOcrReq.getFormat());
        image.put("name", recommendOcrReq.getName());
        JSONArray images = new JSONArray();
        images.put(image);
        json.put("images", images);
        String postParams = json.toString();

        con.connect();
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        long start = System.currentTimeMillis();
        File file = convert(multipartFile);
        writeMultiPart(wr, postParams, file, boundary);
        wr.close();

        int responseCode = con.getResponseCode();
        BufferedReader br;
        if (responseCode == 200) {
            br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else {
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();
        result = response.toString();

        JSONObject jsonObject = new JSONObject(result);
        JSONArray getImages = (JSONArray) jsonObject.get("images");
        JSONArray fields = (JSONArray)((JSONObject)getImages.get(0)).get("fields");
        for(Object field : fields){
            JSONObject jsonField = (JSONObject) field;
            builder.append(jsonField.getString("inferText")).append(" ");
        }

    } catch (Exception e) {
        System.out.println(e);
    }

    return builder.toString();
}
```

```java
private void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws
        IOException {
    StringBuilder sb = new StringBuilder();
    sb.append("--").append(boundary).append("\r\n");
    sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
    sb.append(jsonMessage);
    sb.append("\r\n");

    out.write(sb.toString().getBytes("UTF-8"));
    out.flush();

    if (file != null && file.isFile()) {
        out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
        StringBuilder fileString = new StringBuilder();
        fileString
                .append("Content-Disposition:form-data; name=\"file\"; filename=");
        fileString.append("\"" + file.getName() + "\"\r\n");
        fileString.append("Content-Type: application/octet-stream\r\n\r\n");
        out.write(fileString.toString().getBytes("UTF-8"));
        out.flush();

        try (FileInputStream fis = new FileInputStream(file)) {
            byte[] buffer = new byte[8192];
            int count;
            while ((count = fis.read(buffer)) != -1) {
                out.write(buffer, 0, count);
            }
            out.write("\r\n".getBytes());
        }

        out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));
    }
    out.flush();
}
```

- 예제 코드는 File을 사용하고 꽃마리의 Controller는 MultipartFile을 사용하기 때문에 File 형태로 변환시켜 줍니다.

```java
public File convert(MultipartFile mfile) throws IOException {
    File file = new File(mfile.getOriginalFilename());
    file.createNewFile();
    FileOutputStream fos = new FileOutputStream(file);
    fos.write(mfile.getBytes());
    fos.close();
    return file;
}
```

- API를 호출하여 받아온 값을 필요한 Text부분만 추출하기 위한 부분입니다.

```java
JSONObject jsonObject = new JSONObject(result);
JSONArray getImages = (JSONArray) jsonObject.get("images");
JSONArray fields = (JSONArray)((JSONObject)getImages.get(0)).get("fields");
for(Object field : fields){
    JSONObject jsonField = (JSONObject) field;
    builder.append(jsonField.getString("inferText")).append(" ");
}
```
