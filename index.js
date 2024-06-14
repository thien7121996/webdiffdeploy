const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Cấu hình AWS SDK với thông tin xác thực và khu vực của bạn
AWS.config.update({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'us-west-2'
});

const s3 = new AWS.S3();
const app = express();
const port = 3000;

// Hàm để tải nội dung của tệp M3U8 từ S3
async function fetchM3U8FromS3(bucketName, m3u8Key) {
    const params = {
        Bucket: bucketName,
        Key: m3u8Key
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body.toString('utf-8');
    } catch (err) {
        console.error("Error fetching M3U8 file from S3:", err);
        throw err;
    }
}

// Hàm để phân tích cú pháp tệp M3U8 và lấy danh sách các URL của các tệp TS
function parseM3U8(m3u8Content) {
    const lines = m3u8Content.split('\n');
    return lines.filter(line => line.endsWith('.ts'));
}

// Hàm để tạo presigned URL cho một tệp TS
function createPresignedUrl(bucketName, tsKey) {
    const params = {
        Bucket: bucketName,
        Key: tsKey,
        Expires: 60 * 60 // URL có chữ ký hết hạn sau 1 giờ
    };
    return s3.getSignedUrl('getObject', params);
}

// Endpoint để cung cấp tệp M3U8 với các presigned URLs
app.get('/get-presigned-m3u8', async (req, res) => {
    const bucketName = 'your-bucket-name';
    const m3u8Key = 'path/to/your/file.m3u8';

    try {
        const m3u8Content = await fetchM3U8FromS3(bucketName, m3u8Key);
        const tsUrls = parseM3U8(m3u8Content);

        const baseKey = path.dirname(m3u8Key);

        const presignedTsUrls = tsUrls.map(tsUrl => {
            const tsKey = path.join(baseKey, tsUrl);
            return createPresignedUrl(bucketName, tsKey);
        });

        const presignedM3u8Content = m3u8Content.split('\n').map(line => {
            if (line.endsWith('.ts')) {
                const index = tsUrls.indexOf(line);
                return presignedTsUrls[index];
            }
            return line;
        }).join('\n');

        res.set('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(presignedM3u8Content);
    } catch (err) {
        console.error("Error generating presigned M3U8:", err);
        res.status(500).json({ error: 'Failed to generate presigned M3U8' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
