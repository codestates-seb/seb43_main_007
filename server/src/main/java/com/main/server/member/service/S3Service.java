//package com.main.server.member.service;
//
//
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.ByteArrayInputStream;
//
//@Configuration
//public class S3Service {
//
//    public String uploadImageToS3(String bucketName, String imageName, byte[] fileBytes) {
//        AmazonS3 s3client = AmazonS3ClientBuilder.defaultClient();
//        ObjectMetadata metadata = new ObjectMetadata();
//        metadata.setContentLength(fileBytes.length);
//
//        ByteArrayInputStream inputStream = new ByteArrayInputStream(fileBytes);
//        s3client.putObject(bucketName, imageName, inputStream, metadata);
//        s3client.putObject(bucketName, inputStream, imageName);
//        return s3client.getUrl(bucketName, imageName).toString();
//    }
//}
