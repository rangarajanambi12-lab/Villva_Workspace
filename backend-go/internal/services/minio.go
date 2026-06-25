package services

import (
	"context"
	"log"
	"mime/multipart"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var MinioClient *minio.Client

func InitMinio(endpoint, accessKey, secretKey string, useSSL bool) error {
	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		return err
	}
	MinioClient = client
	log.Println("MinIO initialized successfully")

	// Ensure default bucket exists
	err = CreateBucket("villva-assets")
	if err != nil {
		log.Println("Bucket error:", err)
	}

	return nil
}

func CreateBucket(bucketName string) error {
	ctx := context.Background()
	exists, err := MinioClient.BucketExists(ctx, bucketName)
	if err != nil {
		return err
	}
	if !exists {
		err = MinioClient.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{Region: "us-east-1"})
		if err != nil {
			return err
		}
		
		// Set bucket policy to public read
		policy := `{"Version": "2012-10-17", "Statement": [{"Action": ["s3:GetObject"], "Effect": "Allow", "Principal": "*", "Resource": ["arn:aws:s3:::` + bucketName + `/*"]}]}`
		err = MinioClient.SetBucketPolicy(ctx, bucketName, policy)
		if err != nil {
			return err
		}
	}
	return nil
}

func UploadFile(bucketName string, objectName string, file multipart.File, fileSize int64, contentType string) (string, error) {
	ctx := context.Background()
	
	_, err := MinioClient.PutObject(ctx, bucketName, objectName, file, fileSize, minio.PutObjectOptions{
		ContentType: contentType,
	})
	if err != nil {
		return "", err
	}

	// Assuming MinIO runs on localhost:9000 for local dev
	return "http://localhost:9000/" + bucketName + "/" + objectName, nil
}
