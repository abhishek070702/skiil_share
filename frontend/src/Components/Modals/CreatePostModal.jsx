import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Spin } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import { UploadOutlined } from "@ant-design/icons";
import PostService from "../../Services/PostService";

const uploader = new UploadFileService();

const CreatePostModal = () => {
  const snap = useSnapshot(state);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [fileType, setFileType] = useState("image");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const body = {
        ...values,
        mediaLink: image,
        userId: snap.currentUser?.uid,
        mediaType: fileType,
      };

      const tempId = `temp-${Date.now()}`;
      const tempPost = {
        ...body,
        id: tempId,
        createdAt: new Date().toISOString(),
      };

      state.posts = [tempPost, ...state.posts];

      const newPost = await PostService.createPost(body);

      state.posts = state.posts.map((post) =>
        post.id === tempId ? newPost : post
      );

      message.success("Post created successfully!");

      form.resetFields();
      setImage("");
      setFileType("image");
      state.createPostModalOpened = false;
    } catch (error) {
      state.posts = state.posts.filter((post) => !post.id.startsWith("temp-"));
      console.error("Failed to create post:", error);
      message.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (info) => {
    if (info.file) {
      setImageUploading(true);
      const type = info.file.type.split("/")[0];
      setFileType(type);
      const url = await uploader.uploadFile(info.fileList[0].originFileObj, "posts");
      setImage(url);
      setImageUploading(false);
    }
  };

  return (
    <Modal
      open={state.createPostModalOpened}
      title={<h2 style={{ textAlign: "center", fontWeight: "bold" }}>Create a New Post</h2>}
      centered
      onCancel={() => {
        form.resetFields();
        setImage("");
        setFileType("image");
        state.createPostModalOpened = false;
      }}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="contentDescription"
          label={<span style={{ fontWeight: "500" }}>Content Description</span>}
          rules={[{ required: true, message: "Please enter content description" }]}
        >
          <Input.TextArea rows={4} placeholder="What's on your mind?" />
        </Form.Item>

        <div style={{ marginBottom: 20 }}>
          {imageUploading ? (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Spin size="large" tip="Uploading media..." />
            </div>
          ) : (
            <Form.Item
              name="mediaLink"
              label={<span style={{ fontWeight: "500" }}>Upload Media</span>}
              rules={[{ required: true, message: "Please upload a media file" }]}
            >
              <Upload
                accept="image/*,video/*"
                onChange={handleFileChange}
                showUploadList={false}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} block>
                  Select Media
                </Button>
              </Upload>
            </Form.Item>
          )}
        </div>

        {image && (
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            {fileType === "image" ? (
              <img
                src={image}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              />
            ) : (
              <video
                controls
                src={image}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                  backgroundColor: "#000",
                }}
              />
            )}
          </div>
        )}

        <Form.Item style={{ marginTop: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ fontWeight: "600" }}
          >
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
