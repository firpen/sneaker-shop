package com.github.Luythen.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Base64;

public class ImageService {
    
    public ImageService () {
        try {
            File file = new File("./Images");
            if (file.mkdir()) {
                System.out.println("1");
            } else {
                System.out.println("2");
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    public String SaveImage (String base64, String imgName) throws Exception {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64);
            File file = new File(imgName.replace(" ", "_") + ".png");

            FileOutputStream fos = new FileOutputStream("Images/" + file);
            fos.write(imageBytes);
            fos.close();

            return file.getName();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public byte[] findImage (String imgName) throws Exception {
        File file = new File("Images/" + imgName);
        if (!file.exists()) throw new Exception(imgName + " dont exits");
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            return fileInputStream.readAllBytes();
        } catch (Exception e) {
            
            throw new Exception("Images");
        }
    }

}
