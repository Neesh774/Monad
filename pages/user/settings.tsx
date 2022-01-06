import { supabase } from "lib/supabaseClient";
import { useLoggedIn } from "lib/useLoggedIn";
import { useEffect, useState } from "react";
import {
  Pane,
  Avatar,
  TextInputField,
  Button,
  FilePicker,
  Spinner,
  TextareaField,
  TagInput,
  toaster,
  FormField,
  Heading,
} from "evergreen-ui";
import MetaTags from "components/MetaTags";
import { useRouter } from "next/router";
import { tags } from "components/langs";
import Filter from "bad-words";
import { getAnonymous } from "lib/getAnonymousAvatar";

const maxOptions = 10;
function findDuplicates(arr: string[]) {
  return new Set(arr).size !== arr.length;
}
const filter = new Filter();

export default function UserSettings() {
  const loggedIn = useLoggedIn();
  const [updatedAvatar, setUpdatedAvatar] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(false);
  const [updatedTags, setUpdatedTags] = useState(false);

  const updated = updatedAvatar || updatedUsername || updatedBio || updatedTags;

  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState([]);
  const [username, setUsername] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [avatarURL, setAvatarURL] = useState<string>();
  const [avatarData, setAvatarData] = useState<File>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [bioInvalid, setBioInvalid] = useState(false);
  const [fallbackAvatar, setFallbackAvatar] = useState(false);

  useEffect(() => {
    if (!supabase.auth.user()) {
      router.push("/");
    }
    if (loggedIn) {
      setSelectedTags(loggedIn.tags);
      setAvatarURL(loggedIn.avatar);
      setUsername(loggedIn.username);
      setBio(loggedIn.bio);
    }
  }, [router, loggedIn]);

  const changeAvatar = async (file: File) => {
    if (file) {
      if (file.size > 256000) {
        toaster.danger("File must be under 256kb!");
        return;
      }
      setUpdatedAvatar(true);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const loadedImage = reader.result;
        setAvatarURL(loadedImage as string);
      });
      setAvatarData(file);
      reader.readAsDataURL(file);
      setFallbackAvatar(false);
    }
  };

  const updateUser = async () => {
    setSubmitLoading(true);
    if (!updatedAvatar && !updatedBio && !updatedUsername && !updatedTags) {
      return;
    }
    if (!username || username.length < 3 || username.length > 20) {
      setUsernameInvalid(true);
      setSubmitLoading(false);
      return;
    } else {
      setUsernameInvalid(false);
    }
    if (!bio || bio.length < 10 || bio.length > 200) {
      setBioInvalid(true);
      setSubmitLoading(false);
      return;
    } else {
      setBioInvalid(false);
    }
    if (filter.isProfane(bio) || filter.isProfane(username)) {
      toaster.danger("Profanity detected in username or bio!");
      setSubmitLoading(false);
      return;
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
          tags: selectedTags,
        })
        .eq("id", supabase.auth.user().id);
      if (error) {
        throw error;
      }

      if (updatedAvatar) {
        const { error: updateAvatarErr } = await supabase.storage
          .from("avatars")
          .update(`${supabase.auth.user().id}/avatar.png`, avatarData);
        if (updateAvatarErr) {
          const { error: uploadAvatarErr } = await supabase.storage
            .from("avatars")
            .upload(`${supabase.auth.user().id}/avatar.png`, avatarData);
          if (uploadAvatarErr) {
            throw uploadAvatarErr;
          }
        }
      }
      toaster.success("Updated successfully! It may take some time to update.");
      setSubmitLoading(false);
    } catch (error) {
      toaster.danger(error.message);
      setSubmitLoading(false);
    }
    setUpdatedAvatar(false);
    setUpdatedBio(false);
    setUpdatedUsername(false);
    setUpdatedTags(false);
  };

  return (
    <>
      <MetaTags title="Settings" description="" />
      <Pane className="sign-in-parent">
        <Pane className="sign-in-island">
          <Heading className="header" size={600}>
            Update your settings
          </Heading>

          <Pane display="flex" flexDirection="column" gap="1rem" marginY="1rem">
            {loggedIn ? (
              <>
                <Pane display="flex" gap="1rem" alignItems="center">
                  {fallbackAvatar ? (
                    <Avatar
                      size={60}
                      src={avatarURL}
                      name={loggedIn.username}
                    />
                  ) : (
                    <img
                      className="settings-avatar"
                      alt={loggedIn.username}
                      src={avatarURL}
                      width={60}
                      height={60}
                      onError={() => setFallbackAvatar(true)}
                    />
                  )}
                  <FilePicker
                    accept={["image/png", "image/jpg", "image/jpeg"]}
                    multiple={false}
                    width={250}
                    placeholder="Select a new avatar"
                    onChange={(files) => changeAvatar(files[0])}
                  />
                </Pane>
                <Pane>
                  <TextInputField
                    defaultValue={loggedIn.username}
                    label="Username"
                    className="username-change-input"
                    isInvalid={usernameInvalid}
                    validationMessage={
                      usernameInvalid
                        ? "Username must be between 3 and 20 characters"
                        : null
                    }
                    description="Select a username between 3 and 20 characters."
                    onChange={(e) => {
                      setUpdatedUsername(true);
                      setUsername(e.target.value);
                    }}
                  />
                  <TextareaField
                    defaultValue={loggedIn.bio}
                    label="Bio"
                    width="90%"
                    resize="none"
                    isInvalid={bioInvalid}
                    validationMessage={
                      bioInvalid
                        ? "Bio must be between 10 and 200 characters"
                        : null
                    }
                    description="Express yourself in under 200 characters!"
                    maxLength={100}
                    onChange={(e) => {
                      setUpdatedBio(true);
                      setBio(e.target.value);
                    }}
                  />
                  <FormField
                    label="Tags"
                    description="We'll use these selections to recommend snippets"
                  >
                    <TagInput
                      inputProps={{
                        placeholder: "Set tags",
                        color: "var(--text-primary)",
                      }}
                      paddingY="0.4rem"
                      values={selectedTags}
                      tagProps={(value) => {
                        const tagObj = tags.find((t) => {
                          if (typeof t.name === "string") {
                            return value.toLowerCase().includes(t.name.toLowerCase());
                          }
                          return t.name.find((n) => {
                            return value.toLowerCase().includes(n.toLowerCase());
                          });
                        });
                        return {
                          color: tagObj
                            ? `hsl(${tagObj.color}, 100%, 81%)`
                            : "neutral",
                        };
                      }}
                      backgroundColor="var(--input)"
                      className="tag-input"
                      onChange={(values: string[]) => {
                        if (values.length > maxOptions) {
                          toaster.warning(
                            `You can only select up to ${maxOptions} tags!`,
                            {
                              id: "tag-error",
                            }
                          );
                          return;
                        } else if (values.some((x) => x.length > 20)) {
                          toaster.warning("Tags must be under 20 characters!", {
                            id: "tag-error",
                          });
                          return;
                        } else if (values.some((x) => x.length < 2)) {
                          toaster.warning("Tags must be over 1 character!", {
                            id: "tag-error",
                          });
                          return;
                        } else if (findDuplicates(values)) {
                          toaster.warning("Tags must be unique!", {
                            id: "tag-error",
                          });
                          return;
                        } else if (values.some((x) => filter.isProfane(x))) {
                          toaster.warning("Detected profanity in your tag!", {
                            id: "tag-error",
                          });
                          return;
                        }
                        setUpdatedTags(true);
                        setSelectedTags(values);
                      }}
                      width="90%"
                    />
                  </FormField>
                </Pane>
              </>
            ) : (
              <Spinner marginX="auto" />
            )}
          </Pane>

          <Pane display="flex" gap="1rem" className="sign-in-footer">
            <Button
              className="sign-in-button"
              appearance="primary"
              backgroundColor="var(--green)"
              border="none"
              disabled={!updated}
              cursor={updated ? "pointer" : "not-allowed"}
              onClick={updateUser}
              isLoading={submitLoading}
            >
              Save
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </>
  );
}
