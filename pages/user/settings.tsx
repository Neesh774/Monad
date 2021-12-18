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
} from "evergreen-ui";
import MetaTags from "components/MetaTags";
import { useRouter } from "next/router";
import { tags } from "components/langs";
import { useTheme } from "next-themes";

const maxOptions = 10;
function findDuplicates(arr: string[]) {
  return new Set(arr).size !== arr.length;
}

export default function UserSettings() {
  const loggedIn = useLoggedIn();
  const [updated, setUpdated] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedTags, setSelectedTags] = useState([]);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File>();

  useEffect(() => {
    if (!supabase.auth.user()) {
      router.push("/");
    }
    if (loggedIn) {
      setSelectedTags(loggedIn.tags);
    }
  }, [router, loggedIn]);

  const changeAvatar = (file: File) => {
    if(file) {
      if (file.size > 256000) {
        toaster.danger("File must be under 256kb!");
        return;
      }
      setAvatar(file);
      setUpdated(true);
    }
  };

  return (
    <>
      <MetaTags
        title="Settings"
        description="Edit your user settings on Monad"
      />
      <Pane className="sign-in-parent">
        <Pane className="sign-in-island">
          <h4 className="header">Update your settings</h4>

          <Pane display="flex" flexDirection="column" gap="1rem" marginY="1rem">
            {loggedIn ? (
              <>
                <Pane display="flex" gap="1rem" alignItems="center">
                  <Avatar
                    size={60}
                    src={loggedIn.avatar}
                    name={loggedIn.username}
                  />
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
                    width="40%"
                    onChange={(e) => {
                      setUpdated(true);
                      setUsername(e.target.value);
                    }}
                  />
                  <TextareaField
                    defaultValue={loggedIn.bio}
                    label="Bio"
                    width="90%"
                    resize="none"
                    maxLength={100}
                    onChange={(e) => {
                      setUpdated(true);
                      setBio(e.target.value);
                    }}
                  />
                  <FormField label="Tags">
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
                            return t.name.toLowerCase() === value.toLowerCase();
                          }
                          return t.name.find((n) => {
                            return n.toLowerCase() === value.toLowerCase();
                          });
                        });
                        return {
                          color: tagObj
                            ? `hsl(${tagObj.color}, 100%, 81%)`
                            : theme === "dark"
                            ? "#5b5b5b"
                            : "neutral",
                        };
                      }}
                      backgroundColor="var(--input)"
                      className="tag-input"
                      onChange={(values : string[]) => {
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
                        }
                        setUpdated(true);                        
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
            >
              Save
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </>
  );
}
