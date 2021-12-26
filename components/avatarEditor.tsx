import { Dialog, Pane, MediaIcon, Icon, toaster } from "evergreen-ui";
import AvatarEditor from "react-avatar-editor";
import { useState } from "react";
import { supabase } from "lib/supabaseClient";

export default function AvatarEditorDialog({
  image,
  setImage,
  isShown,
  setIsShown,
  avatarUrl,
  setAvatarUrl,
}: {
  image: File;
  setImage: (image: File) => void;
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
  avatarUrl: string;
  setAvatarUrl: (avatarUrl: string) => void;
}) {
  const [changedImage, setChangedImage] = useState(image);
  const [scale, setScale] = useState(1.2);
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(file: File) {
    console.log("file", file);
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      setAvatarUrl(filePath);
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog
      isShown={isShown}
      title="Edit Avatar"
      onCloseComplete={() => setIsShown(false)}
      confirmLabel="Save"
      onConfirm={() => {
        setImage(changedImage);
        setIsShown(false);
        uploadAvatar(changedImage);
      }}
      onCancel={() => setIsShown(false)}
      isConfirmLoading={uploading}
    >
      <Pane display="flex" flexDirection="column">
        <AvatarEditor
          width={400}
          height={400}
          border={50}
          borderRadius={300}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={0}
          image={image}
          onImageChange={(image: File) => {
            console.log(image);
            setChangedImage(image);
          }}
          onLoadSuccess={(info) => {
            console.log(info);
          }}
        />
        <Pane
          display="flex"
          gap="0.5rem"
          alignItems="center"
          justifyContent="center"
        >
          <Icon icon={MediaIcon} size={20} />
          <input
            type="range"
            className="avatar-scale-slider"
            onChange={(e) => {
              setScale(parseInt(e.target.value) / 100);
            }}
            max={400}
            min={100}
          />
          <Icon icon={MediaIcon} size={32} />
        </Pane>
      </Pane>
    </Dialog>
  );
}
