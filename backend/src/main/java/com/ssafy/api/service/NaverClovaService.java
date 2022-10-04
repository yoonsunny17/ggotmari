package com.ssafy.api.service;

import com.ssafy.api.request.RecommendOcrReq;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

@Service
public class NaverClovaService {
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

//            System.out.println(builder.toString());
        } catch (Exception e) {
            System.out.println(e);
        }

        return builder.toString();
    }

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

    public File convert(MultipartFile mfile) throws IOException {
        File file = new File(mfile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(mfile.getBytes());
        fos.close();
        return file;
    }
}
